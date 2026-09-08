import React from 'react';
import { Users, BookOpen, Award, CheckCircle2, TrendingUp } from 'lucide-react';

export default function IgotMetricsBar() {
  const metrics = [
    {
      icon: Users,
      value: '1,72,38,715',
      label: 'Total Karmayogis Onboarded',
      subtext: 'Across All Ministries & States'
    },
    {
      icon: BookOpen,
      value: '6,747+',
      label: 'Official Courses',
      subtext: 'Domain, Functional & Behavioural'
    },
    {
      icon: CheckCircle2,
      value: '15,29,90,373',
      label: 'Total Completions',
      subtext: 'Verified Learning Modules'
    },
    {
      icon: TrendingUp,
      value: '16,37,126',
      label: 'Monthly Active Users',
      subtext: 'Active Government Officers'
    },
    {
      icon: Award,
      value: '2,49,682',
      label: 'Certificates Issued / Day',
      subtext: 'iGOT Karmayogi & SPARROW APAR'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-ink via-ink-light to-sandstone-dark text-parchment py-10 px-6 border-y border-sandstone/20 shadow-inner">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left border-b border-parchment/15 pb-4">
          <div>
            <span className="text-[10px] font-bold text-ochre uppercase tracking-widest">
              MISSION KARMAYOGI BHARAT • NATIONAL LEARNING ECOSYSTEM
            </span>
            <h3 className="text-lg font-bold font-display text-white">
              Official iGOT Karmayogi Live Platform Impact
            </h3>
          </div>
          <a
            href="https://igotkarmayogi.gov.in/#/"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-ochre hover:text-white transition underline flex items-center space-x-1"
          >
            <span>Data synced with igotkarmayogi.gov.in</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-2 hover:bg-white/10 transition group"
              >
                <div className="flex items-center justify-between text-ochre">
                  <Icon className="w-5 h-5 group-hover:scale-110 transition transform" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-2xl font-bold font-display text-white group-hover:text-parchment transition">
                  {m.value}
                </div>
                <div>
                  <div className="text-xs font-bold text-parchment">{m.label}</div>
                  <div className="text-[10px] text-parchment/60 mt-0.5">{m.subtext}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
