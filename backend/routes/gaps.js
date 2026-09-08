import express from 'express';
import { PrismaClient } from '@prisma/client';
import { calculateSkillScore, calculateGap } from '../services/scoringEngine.js';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/gaps/:userId
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        selfAssessments: true,
        quizResults: true,
        courseProgress: {
          include: { course: true }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const jobRole = user.profile?.jobRole || 'Senior Statistical Officer';
    const experienceYears = user.profile?.experience || 5;
    const pastTrainings = user.profile?.pastTrainings || '';

    // Calculate completed courses count & matching skill tags
    const completedCourses = (user.courseProgress || []).filter(cp => cp.status === 'completed');
    const completedCoursesCount = completedCourses.length;

    // Set of skill IDs tagged in completed courses
    const completedSkillIds = new Set();
    for (const cp of completedCourses) {
      try {
        const tags = JSON.parse(cp.course?.skillTags || '[]');
        tags.forEach(t => completedSkillIds.add(t));
      } catch (e) {}
    }

    // Fetch all skills and benchmark requirements
    const allSkills = await prisma.skill.findMany();
    const roleReqs = await prisma.roleRequirement.findMany({
      where: { jobRole }
    });

    const roleReqMap = roleReqs.reduce((acc, r) => {
      acc[r.skillId] = r.requiredLevel;
      return acc;
    }, {});

    const selfMap = user.selfAssessments.reduce((acc, s) => {
      acc[s.skillId] = s.rating;
      return acc;
    }, {});

    const quizMap = user.quizResults.reduce((acc, q) => {
      acc[q.skillId] = q.score;
      return acc;
    }, {});

    const skillAnalysis = allSkills.map((skill) => {
      const selfRating = selfMap[skill.id] || 3.0;
      const diagnosticScore = quizMap[skill.id] || 3.0;
      const requiredLevel = roleReqMap[skill.id] || 3.8;

      const finalScore = calculateSkillScore({
        selfRating,
        diagnosticScore,
        experienceYears,
        pastTrainings,
        completedCoursesCount,
        isSkillCourseCompleted: completedSkillIds.has(skill.id),
        outputScore: 3.5
      });

      const gap = calculateGap(finalScore, requiredLevel);

      return {
        id: skill.id,
        name: skill.name,
        domain: skill.domain,
        description: skill.description,
        selfRating,
        diagnosticScore,
        finalScore,
        requiredLevel,
        gap
      };
    });

    // Group by Domain
    const domainBreakdown = skillAnalysis.reduce((acc, item) => {
      acc[item.domain] = acc[item.domain] || {
        domain: item.domain,
        skills: [],
        avgScore: 0,
        avgRequired: 0,
        avgGap: 0
      };
      acc[item.domain].skills.push(item);
      return acc;
    }, {});

    // Compute domain averages for Radar Chart
    const radarData = Object.values(domainBreakdown).map((d) => {
      const count = d.skills.length;
      const avgScore = Number((d.skills.reduce((sum, s) => sum + s.finalScore, 0) / count).toFixed(2));
      const avgRequired = Number((d.skills.reduce((sum, s) => sum + s.requiredLevel, 0) / count).toFixed(2));
      const avgGap = Number((d.skills.reduce((sum, s) => sum + s.gap, 0) / count).toFixed(2));

      return {
        domain: d.domain,
        score: avgScore,
        benchmark: avgRequired,
        gap: avgGap
      };
    });

    // Top gap skills sorted by gap size descending
    const sortedGaps = [...skillAnalysis].sort((a, b) => b.gap - a.gap);

    res.json({
      userId: user.id,
      userName: user.name,
      jobRole,
      department: user.profile?.department,
      profile: user.profile,
      completedCoursesCount,
      skills: skillAnalysis,
      radarData,
      topGaps: sortedGaps.filter((s) => s.gap > 0)
    });
  } catch (err) {
    console.error('Gap calculation error:', err);
    res.status(500).json({ error: 'Failed to calculate skill gaps.' });
  }
});

export default router;
