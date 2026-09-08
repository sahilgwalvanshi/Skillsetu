import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/courses/progress — Update course status ("recommended" | "in_progress" | "completed")
router.post('/progress', async (req, res) => {
  try {
    const { userId, courseId, status } = req.body;

    if (!userId || !courseId || !status) {
      return res.status(400).json({ error: 'userId, courseId, and status are required.' });
    }

    const validStatuses = ['recommended', 'in_progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const existing = await prisma.courseProgress.findFirst({
      where: { userId, courseId }
    });

    const isCompleted = status === 'completed';

    let progress;
    if (existing) {
      progress = await prisma.courseProgress.update({
        where: { id: existing.id },
        data: {
          status,
          completedAt: isCompleted ? (existing.completedAt || new Date()) : null
        }
      });
    } else {
      progress = await prisma.courseProgress.create({
        data: {
          userId,
          courseId,
          status,
          completedAt: isCompleted ? new Date() : null
        }
      });
    }

    res.json({ message: 'Course progress updated successfully', progress });
  } catch (err) {
    console.error('Error updating course progress:', err);
    res.status(500).json({ error: 'Failed to update course progress.' });
  }
});

// GET /api/courses/progress/:userId — Get officer's course progress list
router.get('/progress/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const progressList = await prisma.courseProgress.findMany({
      where: { userId },
      include: { course: true },
      orderBy: { updatedAt: 'desc' }
    });

    res.json(progressList);
  } catch (err) {
    console.error('Error fetching course progress:', err);
    res.status(500).json({ error: 'Failed to fetch course progress.' });
  }
});

export default router;
