import { mockStore } from './mockDataStore';

// Normalize API base URL so /api is always present whether user supplied https://domain.com or https://domain.com/api
function getBaseUrl() {
  let base = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'https://skill-setu-api.onrender.com/api').trim();
  base = base.replace(/\/+$/, '');
  if (!base.endsWith('/api')) {
    base += '/api';
  }
  return base;
}

const API_BASE_URL = getBaseUrl();

export const getHeaders = () => {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('skill_setu_token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

/**
 * Robust fetch with fast timeout and seamless mockStore fallback.
 * Exported to ensure proper module scoping across all bundlers and Vite builds.
 */
export async function fetchWithFallback(url, options, fallbackFn) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      // If backend returned valid payload with actual skills
      if (data && (!Array.isArray(data.skills) || data.skills.length > 0)) {
        return data;
      }
    }
  } catch (err) {
    // Network error, timeout, or mixed content -> use client mockStore
  }

  // Safe client-side fallback
  if (typeof fallbackFn === 'function') {
    try {
      return await fallbackFn();
    } catch (e) {
      console.warn('Fallback error, using default mock:', e);
    }
  }
  return null;
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
          return data;
        }
      }
    } catch (err) {}

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
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('skill_setu_token');
      localStorage.removeItem('skill_setu_user');
    }
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
    if (result?.user && typeof localStorage !== 'undefined') {
      localStorage.setItem('skill_setu_user', JSON.stringify(result.user));
    }
    return result || { success: true };
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
      const token = typeof localStorage !== 'undefined' ? localStorage.getItem('skill_setu_token') : null;
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
