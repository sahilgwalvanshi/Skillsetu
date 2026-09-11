import { mockStore } from './mockDataStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('skill_setu_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

/**
 * Fetch with fast timeout and transparent mock fallback.
 * Allows full standalone execution on Vercel or when backend is offline.
 */
async function fetchWithFallback(url, options, fallbackFn) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Graceful offline fallback
  }

  if (typeof fallbackFn === 'function') {
    return await fallbackFn();
  }
  throw new Error('Operation failed');
}

export const api = {
  // Auth
  login: async (name, role, email) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, email }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem('skill_setu_token', data.token);
          localStorage.setItem('skill_setu_user', JSON.stringify(data.user));
        }
        return data;
      }
    } catch (err) {
      // Backend unavailable or network error
    }

    const fallbackData = mockStore.login(name, role, email);
    return fallbackData;
  },

  getCurrentUser: async () => {
    return await fetchWithFallback(
      `${API_BASE_URL}/auth/me`,
      { headers: getHeaders() },
      () => mockStore.getCurrentUser()
    );
  },

  logout: () => {
    localStorage.removeItem('skill_setu_token');
    localStorage.removeItem('skill_setu_user');
  },

  // Profile
  saveProfile: async (profileData) => {
    return await fetchWithFallback(
      `${API_BASE_URL}/profile`,
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(profileData)
      },
      () => mockStore.saveProfile(profileData)
    );
  },

  getProfile: async (userId) => {
    return await fetchWithFallback(
      `${API_BASE_URL}/profile/${userId}`,
      { headers: getHeaders() },
      () => mockStore.getProfile(userId)
    );
  },

  completeOnboarding: async (userId) => {
    const result = await fetchWithFallback(
      `${API_BASE_URL}/profile/complete-onboarding`,
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ userId })
      },
      () => mockStore.completeOnboarding(userId)
    );
    if (result?.user) {
      localStorage.setItem('skill_setu_user', JSON.stringify(result.user));
    }
    return result;
  },

  // Skills & Assessment
  getSkills: async () => {
    return await fetchWithFallback(
      `${API_BASE_URL}/assessment/skills`,
      { headers: getHeaders() },
      () => mockStore.getSkills()
    );
  },

  saveSelfAssessment: async (userId, ratings) => {
    return await fetchWithFallback(
      `${API_BASE_URL}/assessment/self`,
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ userId, ratings })
      },
      () => mockStore.saveSelfAssessment(userId, ratings)
    );
  },

  saveQuizResult: async (userId, results) => {
    return await fetchWithFallback(
      `${API_BASE_URL}/assessment/quiz`,
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ userId, results })
      },
      () => mockStore.saveQuizResult(userId, results)
    );
  },

  // Skill Gaps & Radar Chart Data
  getSkillGaps: async (userId) => {
    return await fetchWithFallback(
      `${API_BASE_URL}/gaps/${userId}`,
      { headers: getHeaders() },
      () => mockStore.getSkillGaps(userId)
    );
  },

  // Course Recommendations & Progress
  getRecommendations: async (userId) => {
    return await fetchWithFallback(
      `${API_BASE_URL}/recommendations/${userId}`,
      { headers: getHeaders() },
      () => mockStore.getRecommendations(userId)
    );
  },

  updateCourseProgress: async (userId, courseId, status) => {
    return await fetchWithFallback(
      `${API_BASE_URL}/courses/progress`,
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ userId, courseId, status })
      },
      () => mockStore.updateCourseProgress(userId, courseId, status)
    );
  },

  getCourseProgress: async (userId) => {
    return await fetchWithFallback(
      `${API_BASE_URL}/courses/progress/${userId}`,
      { headers: getHeaders() },
      () => mockStore.getCourseProgress(userId)
    );
  },

  // Upload Learning Material
  uploadMaterial: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const token = localStorage.getItem('skill_setu_token');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const res = await fetch(`${API_BASE_URL}/quiz/upload-material`, {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: formData,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        return await res.json();
      }
    } catch (err) {}

    return await mockStore.uploadMaterial(file);
  },

  // Quiz Generator
  generateQuiz: async (text, numQuestions, title, createdBy) => {
    return await fetchWithFallback(
      `${API_BASE_URL}/quiz/generate`,
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ text, numQuestions, title, createdBy })
      },
      () => mockStore.generateQuiz(text, numQuestions, title, createdBy)
    );
  },

  getQuizHistory: async () => {
    return await fetchWithFallback(
      `${API_BASE_URL}/quiz/history`,
      { headers: getHeaders() },
      () => mockStore.getQuizHistory()
    );
  },

  // Admin Overview Metrics
  getAdminOverview: async () => {
    return await fetchWithFallback(
      `${API_BASE_URL}/admin/overview`,
      { headers: getHeaders() },
      () => mockStore.getAdminOverview()
    );
  },

  // AI Learner Support Chatbot
  askChatbot: async (message) => {
    return await fetchWithFallback(
      `${API_BASE_URL}/chatbot/ask`,
      {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ message })
      },
      () => mockStore.askChatbot(message)
    );
  }
};
