import { mockStore } from './mockDataStore';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://skill-setu-api.onrender.com/api';

const getHeaders = () => {
  const token = localStorage.getItem('skill_setu_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

// Helper for fetch with retries (handles Render free tier cold starts)
const fetchWithRetry = async (url, options = {}, retries = 2, delayMs = 1500) => {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.ok || i === retries) return res;
    } catch (err) {
      if (i === retries) throw err;
    }
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
};

// Helper for fetch with seamless fallback to mockStore for zero-break demos
const fetchWithFallback = async (url, options = {}, fallbackFn = null) => {
  try {
    const res = await fetchWithRetry(url, options);
    if (res && res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`API call failed for ${url}, using fallback engine:`, err);
  }
  if (fallbackFn) {
    return await fallbackFn();
  }
  throw new Error(`Failed request for ${url}`);
};

export const api = {
  // Auth
  login: async (name, role, email) => {
    try {
      const res = await fetchWithRetry(`${API_BASE_URL}/auth/login`, {
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
    } catch (err) {
      console.warn('Backend login fallback active:', err);
      // Client-side seamless fallback for demo resilience
      const mockUser = {
        id: 'demo_' + Date.now(),
        name: name || 'Rajesh Sharma',
        role: role || 'officer',
        email: email || `${(name || 'user').toLowerCase().replace(/\s+/g, '.')}@mospi.gov.in`,
        onboardingComplete: false
      };
      const mockToken = 'mock_demo_jwt_token_' + Date.now();
      localStorage.setItem('skill_setu_token', mockToken);
      localStorage.setItem('skill_setu_user', JSON.stringify(mockUser));
      return { user: mockUser, token: mockToken };
    }
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
