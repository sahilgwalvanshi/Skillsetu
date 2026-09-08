import express from 'express';
import { PrismaClient } from '@prisma/client';
import { calculateSkillScore, calculateGap } from '../services/scoringEngine.js';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/recommendations/:userId
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        selfAssessments: true,
        quizResults: true,
        courseProgress: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const progressMap = (user.courseProgress || []).reduce((acc, cp) => {
      acc[cp.courseId] = cp.status;
      return acc;
    }, {});

    const jobRole = user.profile?.jobRole || 'Senior Statistical Officer';
    const experienceYears = user.profile?.experience || 5;

    const allSkills = await prisma.skill.findMany();
    const roleReqs = await prisma.roleRequirement.findMany({ where: { jobRole } });

    const roleReqMap = roleReqs.reduce((acc, r) => { acc[r.skillId] = r.requiredLevel; return acc; }, {});
    const selfMap = user.selfAssessments.reduce((acc, s) => { acc[s.skillId] = s.rating; return acc; }, {});
    const quizMap = user.quizResults.reduce((acc, q) => { acc[q.skillId] = q.score; return acc; }, {});

    // Compute gaps
    const gapSkills = allSkills
      .map((skill) => {
        const selfRating = selfMap[skill.id] || 3.0;
        const diagnosticScore = quizMap[skill.id] || 3.0;
        const requiredLevel = roleReqMap[skill.id] || 3.8;
        const finalScore = calculateSkillScore({ selfRating, diagnosticScore, experienceYears });
        const gap = calculateGap(finalScore, requiredLevel);
        return { ...skill, finalScore, requiredLevel, gap };
      })
      .filter((s) => s.gap > 0)
      .sort((a, b) => b.gap - a.gap);

    const gapSkillIds = new Set(gapSkills.map((s) => s.id));

    // Fetch all courses
    const allCourses = await prisma.course.findMany();

    const scoredCourses = allCourses.map((course) => {
      let tags = [];
      try {
        tags = JSON.parse(course.skillTags || '[]');
      } catch (e) {
        tags = [];
      }

      // Count overlap with officer's gap skill IDs
      const matchingGapSkills = gapSkills.filter((s) => tags.includes(s.id));
      const matchScore = matchingGapSkills.reduce((sum, s) => sum + s.gap, 0);

      return {
        ...course,
        status: progressMap[course.id] || 'recommended',
        skillTagsParsed: tags,
        matchingSkills: matchingGapSkills.map((s) => ({ id: s.id, name: s.name, domain: s.domain, gap: s.gap })),
        matchScore: Number(matchScore.toFixed(2))
      };
    });

    // Filter courses that match at least one gap (or top general courses if no gap)
    let matched = scoredCourses.filter((c) => c.matchScore > 0);
    if (matched.length === 0) {
      matched = scoredCourses; // Fallback to all if no specific gap match
    }

    matched.sort((a, b) => b.matchScore - a.matchScore);

    const igotCourses = matched.filter((c) => c.source === 'igot');
    const nsstaCourses = matched.filter((c) => c.source === 'nssta');

    res.json({
      userId: user.id,
      totalGapsCount: gapSkills.length,
      topGapSkills: gapSkills.slice(0, 5),
      igotCourses,
      nsstaCourses
    });
  } catch (err) {
    console.error('Recommendations error:', err);
    res.status(500).json({ error: 'Failed to generate course recommendations.' });
  }
});

export default router;
