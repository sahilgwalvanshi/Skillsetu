import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import OnboardingProfile from './pages/OnboardingProfile';
import OnboardingAssessment from './pages/OnboardingAssessment';
import OnboardingQuiz from './pages/OnboardingQuiz';
import LearnerDashboard from './pages/LearnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import QuizGenerator from './pages/QuizGenerator';
import Footer from './components/Footer';
import { api } from './services/api';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentUser, setCurrentUser] = useState(null);

  // Sync state with browser location URL
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('skill_setu_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
      }
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      navigate('/admin');
    } else if (!user.onboardingComplete) {
      navigate('/onboarding/profile');
    } else {
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-parchment font-body text-ink flex flex-col justify-between">
      {/* Navigation Header */}
      <Nav
        currentUser={currentUser}
        currentPath={currentPath}
        navigate={navigate}
        onLogout={handleLogout}
      />

      {/* 8-Route Page Router */}
      <main className="flex-grow">
        {/* Route 1: Public Landing Page */}
        {currentPath === '/' && (
          <LandingPage
            onGetStarted={() => {
              if (!currentUser) navigate('/login');
              else if (!currentUser.onboardingComplete) navigate('/onboarding/profile');
              else navigate('/dashboard');
            }}
            onOpenAdmin={() => {
              if (currentUser?.role === 'admin') navigate('/admin');
              else navigate('/login');
            }}
            onExploreDashboard={() => {
              if (!currentUser) navigate('/login');
              else navigate('/dashboard');
            }}
          />
        )}

        {/* Route 2: Login Page */}
        {currentPath === '/login' && (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        )}

        {/* Route 3: Officer Onboarding Step 1 - Profile Fields ONLY */}
        {currentPath === '/onboarding/profile' && (
          <OnboardingProfile
            currentUser={currentUser}
            onNext={() => navigate('/onboarding/self-assessment')}
          />
        )}

        {/* Route 4: Officer Onboarding Step 2 - 27 Skill Rating Sliders ONLY */}
        {currentPath === '/onboarding/self-assessment' && (
          <OnboardingAssessment
            currentUser={currentUser}
            onNext={() => navigate('/onboarding/diagnostic-quiz')}
          />
        )}

        {/* Route 5: Officer Onboarding Step 3 - Diagnostic Quiz MCQs ONLY */}
        {currentPath === '/onboarding/diagnostic-quiz' && (
          <OnboardingQuiz
            currentUser={currentUser}
            onComplete={() => navigate('/dashboard')}
          />
        )}

        {/* Route 6: Officer Learner Dashboard */}
        {currentPath === '/dashboard' && (
          <LearnerDashboard
            currentUser={currentUser}
            onNavigateAssessment={() => navigate('/onboarding/self-assessment')}
          />
        )}

        {/* Route 7: Admin Dashboard (Aggregated stats only) */}
        {currentPath === '/admin' && (
          <AdminDashboard />
        )}

        {/* Route 8: AI Quiz Generator */}
        {currentPath === '/quiz-generator' && (
          <QuizGenerator currentUser={currentUser} />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
