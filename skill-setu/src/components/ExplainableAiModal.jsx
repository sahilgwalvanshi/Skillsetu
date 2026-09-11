import React from 'react';
import { X, Sparkles, ShieldCheck, Scale, Cpu, CheckCircle2, ArrowRight, Info } from 'lucide-react';

export default function ExplainableAiModal({ isOpen, onClose, traceData }) {
  if (!isOpen || !traceData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0c1836] via-[#14234b] to-[#1c3268] text-white p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-amber-400">
                  EXPLAINABLE AI (XAI) DECISION AUDIT
                </span>
                <h2 className="text-base sm:text-lg font-bold font-display text-white">
                  Why did the AI say this?
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-3 p-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm text-xs font-semibold text-amber-200 flex items-center space-x-2">
            <Info className="w-4 h-4 shrink-0 text-amber-400" />
            <span>{traceData.verdict}</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700 text-xs">
          
          {/* Section: Factor Weighting Breakdown */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
              <Scale className="w-4 h-4 text-sandstone" />
              <span>Multi-Factor Mathematical Decomposition</span>
            </h3>

            <div className="space-y-2 border border-slate-200/80 rounded-2xl p-3.5 bg-slate-50">
              {traceData.parameters?.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-200/50 last:border-0">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-800">{p.name}</span>
                    <div className="text-[10px] text-slate-500 font-mono">Weight: {p.weight}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900">{p.value}</span>
                    <div className="text-[10px] font-bold text-sandstone">Impact: +{p.contribution}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Decay Engine Penalty */}
          {traceData.decayFactorApplied && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
              <div className="font-bold text-rose-900 text-xs flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-rose-600" />
                <span>Competency Half-Life & Decay Penalty Factor</span>
              </div>
              <p className="text-[11px] text-rose-800 leading-relaxed font-mono">
                {traceData.decayFactorApplied}
              </p>
            </div>
          )}

          {/* Compliance & Trust Box */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start space-x-2.5 text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <span className="font-bold">Transparent Algorithmic Governance: </span>
              {traceData.nitiAayogCompliance || 'Compliant with GoI Responsible AI Audit Standards.'}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[10px] text-slate-500 font-mono">Algorithm: MoSPI-XAI v2.4 (Deterministic)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
}
