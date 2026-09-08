import React, { useState, useEffect } from 'react';
import { GraduationCap, Sparkles, BarChart3, MessageSquare, Puzzle, Briefcase } from 'lucide-react';

export default function KarmayogiHubs() {
  const [activeTab, setActiveTab] = useState(0);

  const hubs = [
    {
      id: 'assessment',
      name: 'Skill Assessment Hub',
      icon: Puzzle,
      color: 'bg-blue-600',
      tagline: '27-Skill Competency Profiling & Multi-Factor Scoring',
      description: 'Profiles MoSPI officers across Statistical, Technical, Digital Governance, and Leadership domains to compute zero-bias competency scores and identify role-based skill gaps.',
      highlights: ['27-Skill Radar Profiling', 'Multi-Factor Weighted Scoring', 'Real-Time Gap Identification']
    },
    {
      id: 'diagnostic',
      name: 'AI Diagnostic Hub',
      icon: Sparkles,
      color: 'bg-indigo-600',
      tagline: 'Groq LLM Automated MCQ Quiz Generator',
      description: 'Generates dynamic, manual-specific multiple choice quizzes powered by Groq Llama 3.3 to objectively measure officer knowledge against national benchmarks.',
      highlights: ['Automated MCQ Generation', 'Official Manual Ingestion', 'Objective Score Calibration']
    },
    {
      id: 'courses',
      name: 'Course Routing Hub',
      icon: GraduationCap,
      color: 'bg-purple-600',
      tagline: 'Targeted iGOT Karmayogi & NSSTA TPAC Learning',
      description: 'Directly maps individual officer skill gaps to 6,700+ iGOT micro-courses and NSSTA Greater Noida residential masterclasses with live progress tracking.',
      highlights: ['iGOT API Course Sync', 'NSSTA Greater Noida Retreats', 'Adaptive Learning Pathways']
    },
    {
      id: 'analytics',
      name: 'Predictive Analytics Hub',
      icon: BarChart3,
      color: 'bg-amber-600',
      tagline: '12-Month Capacity Building & Policy Gap Forecasts',
      description: 'Equips admin leadership with predictive deficit projections, DPDP compliance targets, and workforce readiness metrics for MoSPI strategic planning.',
      highlights: ['12-Month Deficit Forecasting', 'DPDP & NSSO Policy Alignment', 'Workforce Readiness Dashboard']
    },
    {
      id: 'knowledge',
      name: 'Knowledge Sharing Hub',
      icon: MessageSquare,
      color: 'bg-emerald-600',
      tagline: 'Amrit Gyaan Kosh & Code Snippet Repository',
      description: 'Shares standardized policy brief templates, Python & R statistical scripts, and survey methodology notes across CSO, NSSO, and Price Statistics divisions.',
      highlights: ['Amrit Gyaan Kosh Integration', 'Python & R Code Snippets', 'Inter-Departmental Case Studies']
    },
    {
      id: 'career',
      name: 'Career & APAR Hub',
      icon: Briefcase,
      color: 'bg-rose-600',
      tagline: 'eHRMS Profile Synchronization & SPARROW Alignment',
      description: 'Synchronizes completed training credits with eHRMS and SPARROW APAR appraisals, opening clear career advancement pathways for statistical officers.',
      highlights: ['eHRMS Profile Sync', 'SPARROW APAR Credit Alignment', 'Senior Role Benchmarking']
    }
  ];

  // Auto-rotation timer (5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % hubs.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [hubs.length]);

  const activeHub = hubs[activeTab];
  const ActiveIcon = activeHub.icon;

  // Exact 6-node circular positions around central emblem
  const nodePositions = [
    { top: '8%', left: '50%' },   // 0: Top (Assessment)
    { top: '26%', left: '86%' },  // 1: Top-Right (Diagnostic)
    { top: '70%', left: '86%' },  // 2: Bottom-Right (Courses)
    { top: '88%', left: '50%' },  // 3: Bottom (Analytics)
    { top: '70%', left: '14%' },  // 4: Bottom-Left (Knowledge)
    { top: '26%', left: '14%' }   // 5: Top-Left (Career)
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-12 border-t border-slate/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sandstone/10 border border-sandstone/20 text-xs font-bold text-sandstone uppercase tracking-wider mb-1">
            <span>INTEGRATED CAPACITY PLATFORM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#1e293b]">
            Skill Setu Ecosystem Hubs
          </h2>
          <p className="text-xs sm:text-sm text-slate leading-relaxed">
            Discover how Skill Setu connects competency profiling, AI diagnostics, course routing, and predictive analytics for MoSPI.
          </p>
        </div>

        {/* Main Clean Layout Container matching reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
          
          {/* Left: Concentric Clean Soft Rings with 6 Floating Circular Nodes (6 cols) */}
          <div className="lg:col-span-6 flex justify-center py-4">
            <div className="relative w-[310px] sm:w-[360px] h-[310px] sm:h-[360px] flex items-center justify-center">
              
              {/* Outer Subtle Light Ring */}
              <div className="absolute inset-0 rounded-full border border-amber-200/50 pointer-events-none" />
              
              {/* Middle Subtle Light Ring */}
              <div className="absolute w-[240px] sm:w-[270px] h-[240px] sm:h-[270px] rounded-full border border-amber-200/60 pointer-events-none" />

              {/* Inner Subtle Light Ring */}
              <div className="absolute w-[160px] sm:w-[180px] h-[160px] sm:h-[180px] rounded-full border border-amber-200/70 bg-amber-50/20 pointer-events-none" />

              {/* Central Skill Setu Official Emblem Node */}
              <div className="z-10 w-28 sm:w-32 h-28 sm:h-32 rounded-full bg-[#fdfbf7] shadow-md border-2 border-amber-200/80 flex items-center justify-center p-3 text-center transition duration-300 overflow-hidden">
                <img 
                  src="/images/skill-setu-logo-mark.png" 
                  alt="Skill Setu Logo Mark" 
                  className="w-full h-auto object-contain" 
                />
              </div>

              {/* 6 Circular Nodes */}
              {hubs.map((hub, idx) => {
                const Icon = hub.icon;
                const isActive = activeTab === idx;
                const pos = nodePositions[idx];

                return (
                  <button
                    key={hub.id}
                    onClick={() => setActiveTab(idx)}
                    style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}
                    className={`absolute z-20 w-12 sm:w-14 h-12 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                      isActive
                        ? 'bg-[#2b4c9b] text-white shadow-lg scale-110'
                        : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0] hover:text-[#1e293b]'
                    }`}
                    title={hub.name}
                    aria-label={hub.name}
                  >
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6" />
                  </button>
                );
              })}

            </div>
          </div>

          {/* Right: Clean Text & Subtle Divider Details Panel (6 cols) */}
          <div className="lg:col-span-6 pl-0 lg:pl-8 flex items-center border-l-0 lg:border-l border-slate-200/70 min-h-[220px]">
            <div className="space-y-4 max-w-lg animate-in fade-in duration-300">
              
              {/* Active Hub Icon */}
              <div className="w-12 h-12 rounded-2xl bg-[#2b4c9b] text-white flex items-center justify-center shadow-sm">
                <ActiveIcon className="w-6 h-6" />
              </div>

              {/* Hub Title & Tagline */}
              <div>
                <h3 className="text-2xl font-bold font-display text-[#1e293b]">
                  {activeHub.name}
                </h3>
                <p className="text-sm text-[#475569] mt-1 font-medium">
                  {activeHub.tagline}
                </p>
              </div>

              {/* Detailed Description */}
              <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
                {activeHub.description}
              </p>

              {/* Subtle Pagination Indicator Line & Dots */}
              <div className="pt-2 flex items-center space-x-2">
                {hubs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeTab === i ? 'w-6 bg-[#d97706]' : 'w-1.5 bg-slate-200'
                    }`}
                    aria-label={`Go to hub ${i + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
