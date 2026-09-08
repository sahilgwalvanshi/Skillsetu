import React from 'react';
import { UserCheck, Sliders, AlertCircle, BookOpen, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';

const steps = [
  {
    n: "01",
    title: "Official Profile Setup",
    desc: "Specify official MoSPI designation, department (CSO, NSSO, PSCD), job role benchmark, and experience in service.",
    icon: UserCheck
  },
  {
    n: "02",
    title: "27-Skill Self Assessment & Diagnostic",
    desc: "Rate your skills from 1 to 5 and complete a quick domain diagnostic test to calibrate objective score metrics.",
    icon: Sliders
  },
  {
    n: "03",
    title: "Multi-factor Skill Gap Engine",
    desc: "Calculates overall proficiency using weighted formula (20% self + 35% quiz + 20% experience + 15% training + 10% output) against role benchmarks.",
    icon: AlertCircle
  },
  {
    n: "04",
    title: "Dual Course Recommendations",
    desc: "Rule-based matching maps your highest gap competencies directly to iGOT Karmayogi online modules and NSSTA TPAC institutional programs.",
    icon: BookOpen
  },
  {
    n: "05",
    title: "Continuous Progress & Admin Analytics",
    desc: "Scores update automatically upon course completion. Department heads view aggregated analytics without exposing individual scores.",
    icon: TrendingUp
  }
];

export default function HowItWorks() {
  return (
    <section className="bg-[#f3efe6] py-24 px-6 md:px-12 text-ink relative overflow-hidden border-t border-slate/15">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sandstone/10 border border-sandstone/20 text-xs font-bold text-sandstone uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-sandstone" />
            <span>STEP-BY-STEP WORKFLOW</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight">
            How Skill Setu empowers India's statistical officers.
          </h2>
          <p className="text-base text-slate leading-relaxed">
            From initial onboarding profile setup to automated Groq AI quiz assessments and course routing — here is how the platform works end-to-end.
          </p>
        </div>

        {/* Steps Grid Showcase Layout - Light Theme */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Feature Showcase Card (5 cols) */}
          <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-3xl border border-slate/20 flex flex-col justify-between space-y-8 shadow-sm relative overflow-hidden">
            <div className="space-y-4">
              <span className="text-xs font-bold text-sandstone uppercase tracking-wider">Automated Intelligence</span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                Objective competency scoring with zero manual bias.
              </h3>
              <p className="text-sm text-slate leading-relaxed">
                Skill Setu eliminates self-reporting errors by weighting diagnostic test results, service years, and completed training records into a single verified benchmark deficit score.
              </p>
            </div>

            {/* Mock Visual Metric Badge */}
            <div className="bg-[#f8f6f0] rounded-2xl p-5 border border-slate/15 space-y-3">
              <div className="flex items-center justify-between text-xs text-ink">
                <span className="font-bold">SSO Role Benchmark Engine</span>
                <span className="text-sandstone font-bold">27 Skills Analyzed</span>
              </div>
              <div className="w-full bg-slate/20 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-sandstone to-ochre h-full w-[82%] rounded-full" />
              </div>
              <div className="flex justify-between text-[11px] text-slate font-medium">
                <span>Statistical: 4.5/5.0</span>
                <span className="text-sandstone-dark font-bold">Technical Gap: +1.2</span>
              </div>
            </div>

            {/* Liquid Glass Button */}
            <a
              href="/login"
              className="btn-liquid-glass py-4 px-8 rounded-2xl font-bold text-sm text-white flex items-center justify-center space-x-2 group text-center shadow-md"
            >
              <span>Begin Officer Assessment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition transform" />
            </a>
          </div>

          {/* Right Steps Cards Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {steps.map((s, idx) => {
              return (
                <div
                  key={s.n}
                  className="bg-white hover:bg-white/90 p-6 rounded-3xl border border-slate/20 hover:border-sandstone/50 shadow-sm hover:shadow-md transition-all duration-300 flex items-start space-x-5 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sandstone/10 text-sandstone font-bold font-display text-lg flex items-center justify-center flex-shrink-0 group-hover:bg-sandstone group-hover:text-white transition">
                    {s.n}
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-base text-ink group-hover:text-sandstone transition flex items-center space-x-2">
                      <span>{s.title}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
