import express from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { calculateSkillScore, calculateGap } from '../services/scoringEngine.js';
import { generateChatResponse } from '../services/groqClient.js';

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/chatbot/ask
router.post('/ask', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header required.' });
    }

    const token = authHeader.split(' ')[1];
    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      userId = decoded.userId;
    } catch (e) {
      return res.status(401).json({ error: 'Invalid or expired authentication token.' });
    }

    const { message } = req.body;
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Please provide a message string.' });
    }

    // Fetch user and profile from DB
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
      return res.status(404).json({ error: 'Officer profile not found.' });
    }

    const jobRole = user.profile?.jobRole || 'Senior Statistical Officer';
    const designation = user.profile?.designation || 'Statistical Officer';
    const department = user.profile?.department || 'Central Statistics Office (CSO)';
    const experienceYears = user.profile?.experience || 5;
    const pastTrainings = user.profile?.pastTrainings || '';

    // Calculate completed courses count & matching skill tags
    const completedCourses = (user.courseProgress || []).filter(cp => cp.status === 'completed');
    const completedCoursesCount = completedCourses.length;

    const completedSkillIds = new Set();
    for (const cp of completedCourses) {
      try {
        const tags = JSON.parse(cp.course?.skillTags || '[]');
        tags.forEach(t => completedSkillIds.add(t));
      } catch (e) {}
    }

    // Fetch skills and role requirements
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
        return { ...skill, finalScore, requiredLevel, gap };
      })
      .filter((s) => s.gap > 0)
      .sort((a, b) => b.gap - a.gap);

    const top5Gaps = gapSkills.slice(0, 5);

    // Fetch recommended courses
    const allCourses = await prisma.course.findMany();
    const scoredCourses = allCourses.map((course) => {
      let tags = [];
      try { tags = JSON.parse(course.skillTags || '[]'); } catch (e) { tags = []; }
      const matchingGapSkills = gapSkills.filter((s) => tags.includes(s.id));
      const matchScore = matchingGapSkills.reduce((sum, s) => sum + s.gap, 0);
      return { ...course, matchScore: Number(matchScore.toFixed(2)) };
    }).filter(c => c.matchScore > 0).sort((a, b) => b.matchScore - a.matchScore);

    const igotTitles = scoredCourses.filter(c => c.source === 'igot').map(c => c.title).slice(0, 3);
    const nsstaTitles = scoredCourses.filter(c => c.source === 'nssta').map(c => c.title).slice(0, 3);

    // Build system prompt with officer context
    const gapsFormatted = top5Gaps.length > 0
      ? top5Gaps.map(g => `- ${g.name} (Domain: ${g.domain}, Score: ${g.finalScore}/5.0, Benchmark: ${g.requiredLevel}, Gap: +${g.gap})`).join('\n')
      : 'No critical skill gaps detected.';

    const igotFormatted = igotTitles.length > 0 ? igotTitles.join(', ') : 'No specific iGOT courses matched.';
    const nsstaFormatted = nsstaTitles.length > 0 ? nsstaTitles.join(', ') : 'No specific NSSTA TPAC programs matched.';

    const systemPrompt = `You are a helpful assistant inside Skill Setu, an AI-enabled government training platform for MoSPI (Ministry of Statistics and Programme Implementation).
You are talking to ${user.name}, who is a ${designation} in ${department}.

Their current top priority skill gaps are:
${gapsFormatted}

Their recommended courses are:
- iGOT Karmayogi: ${igotFormatted}
- NSSTA TPAC: ${nsstaFormatted}

Answer their question using only this information. Keep answers short (2-4 sentences), practical, and encouraging. If asked something outside this scope (such as weather, sports, general trivia, recipes, movies, or non-MoSPI topics), politely decline and state that you can only help with their skill gaps and training recommendations.`;

    const reply = await generateChatResponse(systemPrompt, message);

    res.json({ reply });
  } catch (err) {
    console.error('Chatbot route error:', err);
    res.status(500).json({ error: 'Failed to process chatbot request.' });
  }
});

export default router;
