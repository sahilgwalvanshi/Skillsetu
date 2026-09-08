import express from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { name, role, email } = req.body;

    if (!name || !role) {
      return res.status(400).json({ error: 'Name and role ("officer" | "admin") are required.' });
    }

    const userEmail = email || `${name.toLowerCase().replace(/\s+/g, '.')}@mospi.gov.in`;

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { profile: true }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email: userEmail,
          role,
          profile: {
            create: {
              designation: role === 'admin' ? 'Director General' : 'Senior Statistical Officer',
              department: role === 'admin' ? 'NSSTA / MoSPI HQ' : 'Central Statistics Office (CSO)',
              jobRole: role === 'admin' ? 'Data Analyst / Director' : 'Senior Statistical Officer',
              experience: 5
            }
          }
        },
        include: { profile: true }
      });
    }

    const token = jwt.sign(
      { userId: user.id, name: user.name, role: user.role, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        onboardingComplete: user.onboardingComplete,
        profile: user.profile
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Authentication failed.' });
  }
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { profile: true }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

export default router;
