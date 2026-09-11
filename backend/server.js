import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import assessmentRoutes from './routes/assessment.js';
import gapsRoutes from './routes/gaps.js';
import recommendationsRoutes from './routes/recommendations.js';
import quizRoutes from './routes/quiz.js';
import adminRoutes from './routes/admin.js';
import coursesRoutes from './routes/courses.js';
import chatbotRoutes from './routes/chatbot.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get(['/', '/api/health'], (req, res) => {
  res.json({
    status: 'ok',
    service: 'Skill Setu Backend API (MoSPI)',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/gaps', gapsRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/chatbot', chatbotRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Skill Setu Backend Server running on http://localhost:${PORT}`);
});
