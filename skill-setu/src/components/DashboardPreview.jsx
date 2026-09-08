import React from 'react';
import { LayoutDashboard, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function DashboardPreview({ onExplore }) {
  return (
    <section className="bg-[#f8f6f0] py-24 px-6 md:px-12 text-ink relative overflow-hidden border-t border-slate/15">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sandstone/10 border border-sandstone/20 text-xs font-bold text-sandstone uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ROLE-BASED USER EXPERIENCE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight">
            One platform, tailored for officers and administrators.
          </h2>
          <p className="text-base text-slate leading-relaxed">
            Skill Setu enforces strict privacy scoping — officers see their personal radar charts and gap pathways, while department heads access aggregated organizational statistics.
          </p>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Officer View */}
          <div className="bg-white rounded-3xl p-8 border border-slate/20 hover:border-sandstone/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-sandstone/10 text-sandstone text-xs font-bold uppercase tracking-wider border border-sandstone/20">
                  Officer View
                </span>
                <LayoutDashboard className="w-6 h-6 text-sandstone" />
              </div>

              <h3 className="font-display text-2xl font-bold text-ink">
                Personalized Learner Dashboard
              </h3>
              <p className="text-sm text-slate leading-relaxed">
                Empowers individual officers with direct visibility into their competency benchmarks and personalized course recommendations.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center space-x-2 text-xs text-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Interactive 27-skill competency radar chart</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Prioritized skill gap list (Deficit vs Benchmark)</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Dual iGOT & NSSTA course recommendation tabs</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Interactive Groq AI document quiz generator</span>
                </div>
              </div>
            </div>

            <button
              onClick={onExplore}
              className="btn-liquid-glass py-3.5 px-6 rounded-2xl text-xs font-bold text-white flex items-center justify-center space-x-2 shadow-md"
            >
              <span>Explore Learner Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Admin View */}
          <div className="bg-white rounded-3xl p-8 border border-slate/20 hover:border-sandstone/50 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 text-ochre text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                  Admin & Trainer View
                </span>
                <ShieldCheck className="w-6 h-6 text-ochre" />
              </div>

              <h3 className="font-display text-2xl font-bold text-ink">
                Organizational Analytics Console
              </h3>
              <p className="text-sm text-slate leading-relaxed">
                Provides department directors with aggregated skill intelligence to plan training budgets and identify high-gap domains.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center space-x-2 text-xs text-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Departmental competency bar charts (CSO, NSSO, PSCD)</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Ministry-wide top 5 skill gap priority tracker</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Training completion rate monitoring by division</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Strict privacy control — Zero individual score disclosure</span>
                </div>
              </div>
            </div>

            <button
              onClick={onExplore}
              className="btn-liquid-glass-light py-3.5 px-6 rounded-2xl text-xs font-bold text-ink flex items-center justify-center space-x-2 shadow-sm"
            >
              <span>View Admin Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Banner Light Theme */}
        <div className="bg-white rounded-3xl p-8 border border-slate/20 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-display text-xl font-bold text-ink">
              Ready to Upgrade Your Statistical Competency Profile?
            </h3>
            <p className="text-xs text-slate">
              Sign in as an officer or administrator to experience Skill Setu live.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="/login"
              className="btn-liquid-glass py-3.5 px-8 rounded-2xl text-xs font-bold text-white shadow-md flex items-center space-x-2"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
