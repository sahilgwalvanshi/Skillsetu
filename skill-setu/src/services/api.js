const API_BASE_URL = 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('skill_setu_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Auth
  login: async (name, role, email) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role, email })
    });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('skill_setu_token', data.token);
      localStorage.setItem('skill_setu_user', JSON.stringify(data.user));
    }
    return data;
  },

  getCurrentUser: async () => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, { headers: getHeaders() });
    if (!res.ok) return null;
    return await res.json();
  },

  logout: () => {
    localStorage.removeItem('skill_setu_token');
    localStorage.removeItem('skill_setu_user');
  },

  // Profile
  saveProfile: async (profileData) => {
    const res = await fetch(`${API_BASE_URL}/profile`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(profileData)
    });
    return await res.json();
  },

  getProfile: async (userId) => {
    const res = await fetch(`${API_BASE_URL}/profile/${userId}`, { headers: getHeaders() });
    return await res.json();
  },

  completeOnboarding: async (userId) => {
    const res = await fetch(`${API_BASE_URL}/profile/complete-onboarding`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ userId })
    });
    const data = await res.json();
    if (data.user) {
      localStorage.setItem('skill_setu_user', JSON.stringify(data.user));
    }
    return data;
  },

  // Skills & Assessment
  getSkills: async () => {
    const res = await fetch(`${API_BASE_URL}/assessment/skills`, { headers: getHeaders() });
    return await res.json();
  },

  saveSelfAssessment: async (userId, ratings) => {
    const res = await fetch(`${API_BASE_URL}/assessment/self`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ userId, ratings })
    });
    return await res.json();
  },

  saveQuizResult: async (userId, results) => {
    const res = await fetch(`${API_BASE_URL}/assessment/quiz`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ userId, results })
    });
    return await res.json();
  },

  // Skill Gaps & Radar Chart Data
  getSkillGaps: async (userId) => {
    const res = await fetch(`${API_BASE_URL}/gaps/${userId}`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch skill gaps');
    return await res.json();
  },

  // Course Recommendations & Progress
  getRecommendations: async (userId) => {
    const res = await fetch(`${API_BASE_URL}/recommendations/${userId}`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch course recommendations');
    return await res.json();
  },

  updateCourseProgress: async (userId, courseId, status) => {
    const res = await fetch(`${API_BASE_URL}/courses/progress`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ userId, courseId, status })
    });
    if (!res.ok) throw new Error('Failed to update course progress');
    return await res.json();
  },

  getCourseProgress: async (userId) => {
    const res = await fetch(`${API_BASE_URL}/courses/progress/${userId}`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch course progress');
    return await res.json();
  },

  // Upload Learning Material (Docs, Presentations, Videos/Transcripts)
  uploadMaterial: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const token = localStorage.getItem('skill_setu_token');
    const res = await fetch(`${API_BASE_URL}/quiz/upload-material`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: formData
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to upload material');
    }
    return await res.json();
  },

  // Groq AI Quiz Generator
  generateQuiz: async (text, numQuestions, title, createdBy) => {
    const res = await fetch(`${API_BASE_URL}/quiz/generate`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ text, numQuestions, title, createdBy })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to generate quiz');
    }
    return await res.json();
  },

  getQuizHistory: async () => {
    const res = await fetch(`${API_BASE_URL}/quiz/history`, { headers: getHeaders() });
    return await res.json();
  },

  // Admin Overview Metrics
  getAdminOverview: async () => {
    const res = await fetch(`${API_BASE_URL}/admin/overview`, { headers: getHeaders() });
    if (!res.ok) throw new Error('Failed to fetch admin overview');
    return await res.json();
  },

  // AI Learner Support Chatbot
  askChatbot: async (message) => {
    const res = await fetch(`${API_BASE_URL}/chatbot/ask`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ message })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to get chatbot response.');
    }
    return await res.json();
  }
};
