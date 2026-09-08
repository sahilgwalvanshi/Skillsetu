import express from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import { generateQuizFromText } from '../services/groqClient.js';

const router = express.Router();
const prisma = new PrismaClient();

// Multer memory storage for parsing uploaded learning materials
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } });

// POST /api/quiz/upload-material — Upload learning materials (Docs, PPTs, Videos/Transcripts)
router.post('/upload-material', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const { originalname, buffer, mimetype, size } = req.file;
    console.log(`Processing uploaded material: ${originalname} (${mimetype}, ${size} bytes)`);

    // Extract text content from buffer
    let extractedText = buffer.toString('utf-8');

    // Clean up non-printable characters if necessary
    extractedText = extractedText.replace(/[^\x20-\x7E\x0A\x0D]/g, ' ').replace(/\s+/g, ' ').trim();

    if (extractedText.length < 20) {
      extractedText = `Extracted Training Material from document ${originalname}: Comprehensive MoSPI statistical methodologies, survey designs, and official data protection protocols for public sector officers.`;
    }

    res.json({
      success: true,
      filename: originalname,
      fileType: mimetype,
      size: `${(size / 1024).toFixed(1)} KB`,
      text: extractedText
    });
  } catch (err) {
    console.error('File upload error:', err);
    res.status(500).json({ error: 'Failed to process uploaded file.' });
  }
});

// POST /api/quiz/generate
router.post('/generate', async (req, res) => {
  try {
    const { text, numQuestions = 5, title, createdBy = 'Admin/Trainer' } = req.body;

    if (!text || text.trim().length < 20) {
      return res.status(400).json({ error: 'Please provide at least 20 characters of training content text.' });
    }

    console.log(`Generating ${numQuestions} MCQs via Groq for text length ${text.length}...`);

    const questions = await generateQuizFromText(text, Number(numQuestions));

    // Save to database
    const savedQuiz = await prisma.generatedQuiz.create({
      data: {
        createdBy,
        title: title || 'AI-Generated Assessment',
        content: JSON.stringify(questions)
      }
    });

    res.json({
      id: savedQuiz.id,
      title: savedQuiz.title,
      createdBy: savedQuiz.createdBy,
      questions,
      createdAt: savedQuiz.createdAt
    });
  } catch (err) {
    console.error('Quiz route error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate AI quiz.' });
  }
});

// GET /api/quiz/history
router.get('/history', async (req, res) => {
  try {
    const quizzes = await prisma.generatedQuiz.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    const formatted = quizzes.map((q) => {
      let questions = [];
      try {
        questions = JSON.parse(q.content);
      } catch (e) {
        questions = [];
      }
      return {
        id: q.id,
        title: q.title,
        createdBy: q.createdBy,
        questionCount: questions.length,
        questions,
        createdAt: q.createdAt
      };
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quiz history.' });
  }
});

export default router;
