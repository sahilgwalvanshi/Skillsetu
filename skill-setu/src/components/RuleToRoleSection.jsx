import React from 'react';
import { Target, Award, Cpu, ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function RuleToRoleSection() {
  const pillars = [
    {
      title: 'Rule to Role Framework',
      description: 'Transitioning government training from generic tenure-based rules to role-specific Capacity Building Plans (CBPs).',
      stat: '43.4 Lakh+',
      statLabel: 'Employees with Role-Based CBPs'
    },
    {
      title: 'AI Daksh Program',
      description: 'Specialized AI & Machine Learning badge program preparing officers for modern survey automation & analytics.',
      stat: '3.38 Crore+',
      statLabel: 'AI & Emerging Tech Course Completions'
    },
    {
      title: 'Shared National Priorities',
      description: 'Courses aligned with Viksit Bharat 2047, Jan Bhagidari, and National Data Governance Framework.',
      stat: '1.10 Crore+',
      statLabel: 'Viksit Bharat Priority Learners'
    },
    {
      title: 'eHRMS & SPARROW Integration',
      description: 'Direct synchronization of completed course certificates into officer service records and APAR appraisals.',
      stat: '8.48 Lakh+',
      statLabel: 'Officers with Linked eHRMS Access'
    }
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-12 border-t border-slate/15">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate/15 pb-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sandstone/10 border border-sandstone/20 text-xs font-bold text-sandstone uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MISSION KARMAYOGI BHARAT PARADIGM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-ink">
              From Rule-Based Training to Role-Based Competency Growth
            </h2>
            <p className="text-sm text-slate leading-relaxed">
              Skill Setu directly Operationalizes Mission Karmayogi's core framework by mapping officer self-assessments and diagnostic quiz scores against official <b>Domain</b>, <b>Functional</b>, and <b>Behavioural</b> competency benchmarks.
            </p>
          </div>

          <a
            href="https://igotkarmayogi.gov.in/#/"
            target="_blank"
            rel="noreferrer"
            className="btn-liquid-glass px-5 py-3 rounded-2xl text-xs font-bold text-white flex items-center space-x-2 shadow-md shrink-0 self-start md:self-auto"
          >
            <span>Visit iGOT Karmayogi Portal</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#f8f6f0] border border-slate/15 hover:border-sandstone transition-all duration-300 flex flex-col justify-between space-y-6 group hover:shadow-lg"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-white text-sandstone flex items-center justify-center border border-slate/15 font-bold text-sm shadow-sm group-hover:bg-sandstone group-hover:text-white transition">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-ink text-base group-hover:text-sandstone transition">
                  {p.title}
                </h3>
                <p className="text-xs text-slate leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate/15 space-y-1">
                <div className="text-xl font-bold font-display text-sandstone-dark">{p.stat}</div>
                <div className="text-[11px] font-semibold text-slate">{p.statLabel}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Official Karmayogi Bharat Banner & AI Daksh Integration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Official Image Banner (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-lg border border-slate/15 relative group">
            <img 
              src="/images/karmayogi-bharat-banner.png" 
              alt="Karmayogi Bharat - National Program For Civil Services Capacity Building" 
              className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition duration-500"
            />
          </div>

          {/* AI Daksh & SPARROW Integration Card (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-ink via-[#1e293b] to-[#0f172a] p-8 text-white space-y-6 shadow-xl relative overflow-hidden border border-sandstone/30 h-full flex flex-col justify-between">
            <div className="space-y-3 relative z-10">
              <span className="px-3 py-1 rounded-full bg-ochre/20 text-ochre text-xs font-bold uppercase tracking-wider border border-ochre/30 inline-block">
                AI Daksh Badge & APAR Sync
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-parchment leading-snug">
                Complete AI & Statistical Learning Modules to Earn Badges
              </h3>
              <p className="text-xs text-parchment/80 leading-relaxed">
                Skill Setu automatically routes completed course certificates from iGOT Karmayogi and NSSTA TPAC directly into the officer's digital service profile and Annual Performance Assessment Report (APAR).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 shrink-0 relative z-10 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center space-y-0.5">
                <div className="text-base font-bold text-ochre">AI Daksh</div>
                <div className="text-[10px] text-parchment/70 font-medium">Certified Badge</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center space-y-0.5">
                <div className="text-base font-bold text-emerald-400">SPARROW</div>
                <div className="text-[10px] text-parchment/70 font-medium">APAR Credit Sync</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
