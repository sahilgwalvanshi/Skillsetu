import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/assessment/skills
router.get('/skills', async (req, res) => {
  try {
    const skills = await prisma.skill.findMany();
    // Group by domain
    const grouped = skills.reduce((acc, skill) => {
      acc[skill.domain] = acc[skill.domain] || [];
      acc[skill.domain].push(skill);
      return acc;
    }, {});

    res.json({ skills, grouped });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// POST /api/assessment/self
router.post('/self', async (req, res) => {
  try {
    const { userId, ratings } = req.body; // ratings: { [skillId]: number }

    if (!userId || !ratings) {
      return res.status(400).json({ error: 'userId and ratings object are required.' });
    }

    const saved = [];
    for (const [skillId, rating] of Object.entries(ratings)) {
      // Upsert self assessment
      const existing = await prisma.selfAssessment.findFirst({
        where: { userId, skillId }
      });

      if (existing) {
        const updated = await prisma.selfAssessment.update({
          where: { id: existing.id },
          data: { rating: Number(rating) }
        });
        saved.push(updated);
      } else {
        const created = await prisma.selfAssessment.create({
          data: { userId, skillId, rating: Number(rating) }
        });
        saved.push(created);
      }
    }

    res.json({ message: 'Self-assessment saved successfully', count: saved.length });
  } catch (err) {
    console.error('Self assessment error:', err);
    res.status(500).json({ error: 'Failed to save self assessment' });
  }
});

// POST /api/assessment/quiz
router.post('/quiz', async (req, res) => {
  try {
    const { userId, results } = req.body; // results: { [skillId]: score (1-5 or 0-100) }

    if (!userId || !results) {
      return res.status(400).json({ error: 'userId and results object are required.' });
    }

    const saved = [];
    for (const [skillId, rawScore] of Object.entries(results)) {
      // Normalize score to 1-5 scale if passed in 0-100
      let score = Number(rawScore);
      if (score > 5) score = (score / 100) * 5;

      const existing = await prisma.quizResult.findFirst({
        where: { userId, skillId }
      });

      if (existing) {
        const updated = await prisma.quizResult.update({
          where: { id: existing.id },
          data: { score: Number(score.toFixed(1)) }
        });
        saved.push(updated);
      } else {
        const created = await prisma.quizResult.create({
          data: { userId, skillId, score: Number(score.toFixed(1)) }
        });
        saved.push(created);
      }
    }

    res.json({ message: 'Diagnostic quiz results saved successfully', count: saved.length });
  } catch (err) {
    console.error('Quiz result error:', err);
    res.status(500).json({ error: 'Failed to save diagnostic quiz results' });
  }
});

export default router;
