import React from 'react';
import { ExternalLink, CheckCircle2, Monitor, School, ArrowRight } from 'lucide-react';

export default function IntegrationSection() {
  return (
    <section className="bg-parchment py-24 px-6 md:px-12 relative overflow-hidden border-t border-slate/15">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sandstone/10 border border-sandstone/20 text-xs font-bold text-sandstone uppercase tracking-wider">
            <span>OFFICIAL GOVERNMENT TRAINING PIPELINE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight">
            Two distinct training sources, one unified recommendation engine.
          </h2>
          <p className="text-base text-slate leading-relaxed">
            Skill Setu routes officers directly into existing government training infrastructure — matching self-paced online learning for technical gaps and residential programs for institutional mastery.
          </p>
        </div>

        {/* Dual Channel Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: iGOT Karmayogi */}
          <div className="bg-white rounded-3xl p-8 border border-slate/15 hover:border-sandstone/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-800 border border-blue-200 flex items-center space-x-2">
                  <Monitor className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">iGOT Karmayogi Portal</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
                  Self-Paced • Online
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-ink group-hover:text-sandstone transition">
                Digital Micro-Courses & E-Learning
              </h3>
              <p className="text-sm text-slate leading-relaxed">
                Courses matched by exact skill tags from the official iGOT Karmayogi course catalog. Designed for flexible, online self-paced study in technical and analytical tools.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2 text-xs text-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Python, R, SQL & PowerBI Data Visualization</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>DPDP Data Privacy & Open Data Publishing</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Cabinet Brief Drafting & Macroeconomic Series</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate/10 flex items-center justify-between">
              <span className="text-xs text-slate font-medium">Digital Public Infrastructure</span>
              <a
                href="https://igotkarmayogi.gov.in"
                target="_blank"
                rel="noreferrer"
                className="btn-liquid-glass px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center space-x-1.5 shadow-md"
              >
                <span>Explore iGOT Catalog</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: NSSTA TPAC */}
          <div className="bg-white rounded-3xl p-8 border border-slate/15 hover:border-sandstone/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center space-x-2">
                  <School className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">NSSTA TPAC Academy</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                  Institutional • Residential
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-ink group-hover:text-sandstone transition">
                Formal Training Programs & Retreats
              </h3>
              <p className="text-sm text-slate leading-relaxed">
                Specialized programs recommended by the Training Programme Advisory Committee (TPAC) for role-critical statistical methodologies and senior leadership development.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2 text-xs text-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Advanced Econometrics & Causal Inference</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>NSSO Geospatial Mapping & Remote Sensing</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-ink font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>SDMX Standards & Public Leadership Retreats</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate/10 flex items-center justify-between">
              <span className="text-xs text-slate font-medium">National Statistical Academy</span>
              <a
                href="https://mospi.gov.in"
                target="_blank"
                rel="noreferrer"
                className="btn-liquid-glass-dark px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md"
              >
                <span>View TPAC Calendar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
