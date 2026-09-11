import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, AlertCircle, Play, ArrowRight, Zap } from 'lucide-react';

export default function MicroNudgeModal({ isOpen, onClose, nudge, onQuizComplete }) {
  if (!isOpen || !nudge) return null;

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = nudge.quizQuestions || [];
  const currentQ = questions[currentQIndex];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      if (onQuizComplete) {
        onQuizComplete(nudge.skillId);
      }
    }
  };

  const handleClose = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 font-body">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0c1836] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-wider uppercase text-amber-400">
                90-SECOND MICRO-LEARNING NUDGE
              </div>
              <h2 className="text-sm sm:text-base font-bold font-display text-white">
                {nudge.skillName}
              </h2>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs">
          
          {!isCompleted ? (
            <>
              {/* Concept Tip Box */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-1">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                  💡 Key Takeaway
                </span>
                <p className="text-xs text-amber-950 leading-relaxed">
                  {nudge.conceptTip}
                </p>
              </div>

              {/* Question Header */}
              <div className="pt-2 flex items-center justify-between text-slate-500 font-semibold text-[11px]">
                <span>Question {currentQIndex + 1} of {questions.length}</span>
                <span>Score: {score} / {questions.length}</span>
              </div>

              {/* Question Title */}
              <h3 className="font-bold text-slate-900 text-sm leading-snug">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {currentQ.options.map((opt, idx) => {
                  let optStyle = "border-slate-200 bg-white hover:border-sandstone hover:bg-slate-50 text-slate-800";
                  if (isAnswered) {
                    if (idx === currentQ.correctIndex) {
                      optStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
                    } else if (selectedOption === idx) {
                      optStyle = "border-rose-500 bg-rose-50 text-rose-900 font-semibold";
                    } else {
                      optStyle = "border-slate-200 bg-slate-50 text-slate-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full p-3 rounded-xl border text-left text-xs transition flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation on answer */}
              {isAnswered && (
                <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-[11px] leading-relaxed animate-in fade-in duration-150">
                  <span className="font-bold">Explanation: </span>
                  {currentQ.explanation}
                </div>
              )}

              {/* Next Button */}
              {isAnswered && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-5 py-2 rounded-xl bg-sandstone hover:bg-sandstone-dark text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition"
                  >
                    <span>{currentQIndex + 1 < questions.length ? 'Next Question' : 'Complete Challenge'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Completed State */
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-300 shadow-sm animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Micro-Nudge Completed!
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                  You scored {score} / {questions.length}. Skill score for <b>{nudge.skillName}</b> refreshed with <b>+0.3 retention boost</b>!
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                ✓ Decay factor reset for {nudge.skillName}
              </div>

              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                Back to Dashboard
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
