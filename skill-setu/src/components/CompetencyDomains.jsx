import React from 'react';
import { BarChart3, Code2, Shield, Users, ArrowRight, Target, Scale, GraduationCap, Sparkles } from 'lucide-react';

const domains = [
  {
    label: "Statistical Domain",
    count: "7 Skills",
    icon: BarChart3,
    color: "from-blue-500/10 to-indigo-500/10 text-blue-700 border-blue-200",
    desc: "Survey design, multi-stage sampling, national accounts compilation, Consumer Price Index (CPI), time series forecasting, SDMX standards, and small area estimation.",
    tags: ["Sampling Methods", "CPI / WPI", "Time Series", "SDMX", "Data Validation"]
  },
  {
    label: "Technical Domain",
    count: "7 Skills",
    icon: Code2,
    color: "from-sandstone/10 to-ochre/10 text-sandstone border-sandstone/20",
    desc: "Python & R for statistical computing, SQL databases, PowerBI/Tableau executive dashboards, PySpark big data analytics, GIS spatial mapping, and machine learning.",
    tags: ["Python / R", "SQL", "PowerBI", "PySpark", "GIS Mapping"]
  },
  {
    label: "Digital Governance",
    count: "6 Skills",
    icon: Shield,
    color: "from-amber-500/10 to-yellow-500/10 text-amber-800 border-amber-200",
    desc: "Digital Personal Data Protection (DPDP) Act compliance, Open Government Data (OGD) publishing, cloud architecture, CERT-In cybersecurity, and National Data Governance.",
    tags: ["DPDP Act", "Open Data (OGD)", "Cloud APIs", "Cybersecurity"]
  },
  {
    label: "Behavioural & Leadership",
    count: "7 Skills",
    icon: Users,
    color: "from-emerald-500/10 to-teal-500/10 text-emerald-800 border-emerald-200",
    desc: "Cabinet & policy brief drafting, evidence-based decision making, inter-departmental stakeholder briefing, agile survey management, and public sector leadership.",
    tags: ["Policy Briefs", "Evidence Decision", "Stakeholder Comms", "Public Leadership"]
  }
];

const highlights = [
  { icon: Target, title: "Role Benchmarking", desc: "Maps skills against SSO, JSO, Director & Policy Officer benchmarks." },
  { icon: Scale, title: "Weighted Scoring", desc: "Combines 20% self-rating, 35% diagnostic quiz, 20% experience & output." },
  { icon: GraduationCap, title: "Direct Course Routing", desc: "Matches top gaps to iGOT Karmayogi & NSSTA TPAC courses." },
  { icon: Sparkles, title: "Groq LLM MCQ Engine", desc: "Generates interactive quizzes directly from uploaded official manuals." }
];

export default function CompetencyDomains() {
  return (
    <section className="bg-parchment py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sandstone/10 border border-sandstone/20 text-xs font-bold text-sandstone uppercase tracking-wider">
            <span>27 COMPETENCY FRAMEWORK</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight">
            Every officer measured against four core statistical domains.
          </h2>
          <p className="text-base text-slate leading-relaxed">
            Skill Setu profiles an officer across 27 distinct competencies to compute multi-factor scores, identify role deficits, and build targeted learning pathways.
          </p>
        </div>

        {/* 4 Cards Grid - Styled like reference image cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {domains.map((d, idx) => {
            const Icon = d.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate/15 hover:border-sandstone/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3.5 rounded-2xl border ${d.color} group-hover:scale-105 transition transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-parchment text-slate text-xs font-bold border border-slate/15">
                      {d.count}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-ink group-hover:text-sandstone transition">
                    {d.label}
                  </h3>
                  <p className="text-sm text-slate leading-relaxed">
                    {d.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate/10 mt-6">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate mb-2">
                    Key Competency Area Tags:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {d.tags.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-parchment/60 border border-slate/15 text-xs font-semibold text-ink/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Horizontal Feature Bar matching Reference Design */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate/15 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((h, idx) => {
            const Icon = h.icon;
            return (
              <div key={idx} className="flex items-start space-x-4 p-2">
                <div className="w-11 h-11 rounded-2xl bg-sandstone/10 text-sandstone flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-ink">{h.title}</h4>
                  <p className="text-xs text-slate leading-relaxed">{h.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
