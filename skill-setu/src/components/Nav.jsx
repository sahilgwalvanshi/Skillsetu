import React from 'react';
import { User, ShieldCheck, Sparkles, LayoutDashboard, LogOut, Code2, Target } from 'lucide-react';

export default function Nav({ currentUser, currentPath, navigate, onLogout }) {
  const isLanding = currentPath === '/';

  return (
    <header className={`${isLanding ? 'absolute top-0 left-0 right-0 z-30' : 'sticky top-0 z-40 bg-ink/95 backdrop-blur-md border-b border-white/10 shadow-lg'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        {/* Brand Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-3 text-left focus:outline-none group"
        >
          <img 
            src="/images/nav-logo-mark.png" 
            alt="Skill Setu Logo" 
            className="h-10 w-auto object-contain filter drop-shadow transition transform group-hover:scale-105" 
          />
          <div>
            <span className="font-display text-xl font-bold text-parchment tracking-tight group-hover:text-ochre transition block leading-tight">
              Skill Setu
            </span>
            <span className="text-[9px] text-parchment/60 font-semibold tracking-wider uppercase block">
              MoSPI Platform
            </span>
          </div>
        </button>

        {/* Central Nav Links */}
        {!currentUser ? (
          /* Public Unauthenticated Navigation Links */
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <button
                onClick={() => navigate('/login')}
                className="text-sm text-parchment/80 transition-colors hover:text-parchment font-medium"
              >
                Officers
              </button>
            </li>
            <li>
              <a
                href="#competencies"
                onClick={(e) => {
                  if (currentPath !== '/') {
                    e.preventDefault();
                    navigate('/');
                    setTimeout(() => {
                      document.getElementById('competencies')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className="text-sm text-parchment/80 transition-colors hover:text-parchment font-medium"
              >
                Competencies
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                onClick={(e) => {
                  if (currentPath !== '/') {
                    e.preventDefault();
                    navigate('/');
                    setTimeout(() => {
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className="text-sm text-parchment/80 transition-colors hover:text-parchment font-medium"
              >
                How it works
              </a>
            </li>
            <li>
              <button
                onClick={() => navigate('/login')}
                className="text-sm text-parchment/80 transition-colors hover:text-parchment font-medium"
              >
                Admin
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/learning-hub')}
                className="text-sm text-amber-400 hover:text-amber-300 transition-colors font-semibold flex items-center space-x-1"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Virtual Labs</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/career-twin')}
                className="text-sm text-parchment/80 hover:text-parchment font-medium flex items-center space-x-1"
              >
                <Target className="w-3.5 h-3.5 text-sandstone" />
                <span>Career Twin</span>
              </button>
            </li>
          </ul>
        ) : (
          /* Authenticated Logged-In Navigation Links */
          <ul className="hidden md:flex items-center space-x-6">
            {currentUser.role === 'officer' && (
              <li>
                <button
                  onClick={() => navigate('/dashboard')}
                  className={`text-sm font-medium flex items-center space-x-1.5 transition ${
                    currentPath === '/dashboard' ? 'text-ochre font-bold' : 'text-parchment/80 hover:text-parchment'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-sandstone" />
                  <span>My Dashboard</span>
                </button>
              </li>
            )}

            <li>
              <button
                onClick={() => navigate('/career-twin')}
                className={`text-sm font-medium flex items-center space-x-1.5 transition ${
                  currentPath === '/career-twin' ? 'text-ochre font-bold' : 'text-parchment/80 hover:text-parchment'
                }`}
              >
                <Target className="w-4 h-4 text-amber-400" />
                <span>Career Twin</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => navigate('/learning-hub')}
                className={`text-sm font-medium flex items-center space-x-1.5 transition ${
                  currentPath === '/learning-hub' ? 'text-ochre font-bold' : 'text-parchment/80 hover:text-parchment'
                }`}
              >
                <Code2 className="w-4 h-4 text-amber-400" />
                <span>Learning Hub & Labs</span>
              </button>
            </li>

            {currentUser.role === 'admin' && (
              <li>
                <button
                  onClick={() => navigate('/admin')}
                  className={`text-sm font-medium flex items-center space-x-1.5 transition ${
                    currentPath === '/admin' ? 'text-ochre font-bold' : 'text-parchment/80 hover:text-parchment'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-sandstone" />
                  <span>Admin Overview</span>
                </button>
              </li>
            )}

            <li>
              <button
                onClick={() => navigate('/quiz-generator')}
                className={`text-sm font-medium flex items-center space-x-1.5 transition ${
                  currentPath === '/quiz-generator' ? 'text-ochre font-bold' : 'text-parchment/80 hover:text-parchment'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI Quiz Generator</span>
              </button>
            </li>
          </ul>
        )}

        {/* Right Action Button */}
        <div className="flex items-center space-x-3">
          {!currentUser ? (
            /* Unauthenticated -> ONLY Officer login button */
            <button
              onClick={() => navigate('/login')}
              className="rounded-full border border-parchment/30 px-5 py-2 text-sm text-parchment transition-colors hover:border-parchment hover:bg-parchment hover:text-ink font-medium"
            >
              Officer login
            </button>
          ) : (
            /* Authenticated -> User Badge + Logout Button */
            <div className="flex items-center space-x-2">
              <div className="px-3.5 py-1.5 rounded-full bg-white/10 text-xs text-parchment border border-white/20 flex items-center space-x-2">
                {currentUser.role === 'admin' ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <User className="w-3.5 h-3.5 text-sandstone" />
                )}
                <span className="font-semibold text-parchment">
                  {currentUser.name} ({currentUser.role})
                </span>
              </div>
              <button
                onClick={onLogout}
                title="Logout"
                className="p-2 rounded-full text-parchment/70 hover:text-parchment hover:bg-white/10 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
