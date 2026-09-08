import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/profile
router.post('/', async (req, res) => {
  try {
    const { userId, designation, department, jobRole, experience, education, pastTrainings } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const updatedProfile = await prisma.profile.upsert({
      where: { userId },
      update: {
        designation,
        department,
        jobRole,
        experience: Number(experience) || 0,
        education,
        pastTrainings
      },
      create: {
        userId,
        designation: designation || 'Statistical Officer',
        department: department || 'Central Statistics Office (CSO)',
        jobRole: jobRole || 'Senior Statistical Officer',
        experience: Number(experience) || 0,
        education,
        pastTrainings
      }
    });

    res.json({ message: 'Profile updated successfully', profile: updatedProfile });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: 'Failed to update profile.' });
  }
});

// GET /api/profile/:userId
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: { user: true }
    });

    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile.' });
  }
});

// POST /api/profile/complete-onboarding
router.post('/complete-onboarding', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId is required' });

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { onboardingComplete: true },
      include: { profile: true }
    });

    res.json({ message: 'Onboarding marked complete', user: updatedUser });
  } catch (err) {
    console.error('Complete onboarding error:', err);
    res.status(500).json({ error: 'Failed to complete onboarding.' });
  }
});

export default router;
