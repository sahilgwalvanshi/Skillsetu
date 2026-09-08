import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groqApiKey = process.env.GROQ_API_KEY;

let groq = null;
if (groqApiKey) {
  groq = new Groq({ apiKey: groqApiKey });
}

export async function generateQuizFromText(text, numQuestions = 5) {
  const prompt = `You are an expert AI quiz generator for MoSPI (Ministry of Statistics and Programme Implementation).
Analyze the following training material or document content and generate exactly ${numQuestions} multiple-choice questions (MCQs).

Return ONLY a valid JSON array of question objects (do not include markdown tags like \`\`\`json).
Each object MUST strictly adhere to this format:
{
  "question": "Clear, precise question text",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correctIndex": 0,
  "explanation": "Brief explanation why the answer is correct based on the provided text."
}

Document Content:
"""
${text.slice(0, 4000)}
"""`;

  if (groq && groqApiKey) {
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a strict JSON generator. Never output markdown codeblocks, commentary, or text outside the JSON array.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.2,
        max_tokens: 2048
      });

      const rawContent = chatCompletion.choices[0]?.message?.content || '[]';
      const cleaned = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (err) {
      console.warn('Groq API Live Call fallback activated (Reason:', err.message || err, ')');
    }
  }

  // Smart Fallback Rule Engine if Groq API key is invalid/expired
  return generateFallbackQuiz(text, numQuestions);
}

function generateFallbackQuiz(text, numQuestions = 5) {
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);

  const questions = [];

  for (let i = 0; i < Math.min(numQuestions, Math.max(1, sentences.length)); i++) {
    const s = sentences[i % sentences.length];
    const words = s.split(/\s+/);
    const keyTerm = words.find((w) => w.length > 5 && /^[A-Za-z]+$/.test(w)) || 'methodology';

    questions.push({
      question: `According to the official document material, what is the primary focus regarding "${keyTerm}"?`,
      options: [
        `${s.slice(0, 70)}...`,
        `Alternative administrative protocol for ${keyTerm}`,
        `Standard operating guidelines issued prior to 2020`,
        `General policy framework excluding ${keyTerm}`
      ],
      correctIndex: 0,
      explanation: `Direct statement from training text: "${s}"`
    });
  }

  return questions;
}

export async function generateChatResponse(systemPrompt, userMessage) {
  if (groq && groqApiKey) {
    try {
      console.log('Calling Groq API (llama-3.3-70b-versatile) for Chatbot response...');
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.3,
        max_tokens: 512
      });

      const reply = chatCompletion.choices[0]?.message?.content;
      if (reply) {
        return reply.trim();
      }
    } catch (err) {
      console.warn('Groq Chatbot API call failed (Reason:', err.message || err, '). Triggering error-handling fallback.');
    }
  }

  // Error-handling fallback if Groq API call fails or key is missing
  return fallbackChatReply(systemPrompt, userMessage);
}

function fallbackChatReply(systemPrompt, userMessage) {
  const msg = userMessage.toLowerCase();
  
  // Scope check for out-of-scope questions
  const outOfScopeTerms = ['weather', 'recipe', 'movie', 'sports', 'cricket', 'president', 'capital of', 'joke', 'song', 'who is'];
  if (outOfScopeTerms.some((term) => msg.includes(term))) {
    return 'I can only assist you with your MoSPI skill gaps and recommended training courses. Please ask me about your competency profile or courses on iGOT / NSSTA.';
  }

  // Extract top gap from system prompt if present
  let topGapName = 'your priority skill gaps';
  let topCourseName = 'iGOT Karmayogi or NSSTA TPAC courses';

  const gapMatch = systemPrompt.match(/- ([^:\n(]+) \(Score:/);
  if (gapMatch && gapMatch[1]) {
    topGapName = gapMatch[1].trim();
  }

  const courseMatch = systemPrompt.match(/(?:iGOT Karmayogi|NSSTA TPAC):\s*([^\n]+)/);
  if (courseMatch && courseMatch[1]) {
    topCourseName = courseMatch[1].trim().split(',')[0];
  }

  return `Based on your profile, your primary skill focus area is ${topGapName}. I recommend enrolling in ${topCourseName} to strengthen this domain. Let me know if you would like more details on your training recommendations!`;
}
