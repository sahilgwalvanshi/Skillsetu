import React, { useState } from 'react';
import { Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export default function OnboardingQuiz({ currentUser, onComplete }) {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const diagnosticQuestions = [
    {
      id: 'q1',
      skillId: 'stat-1',
      domain: 'Statistical',
      question: 'Which sampling technique is most appropriate for a national household expenditure survey with large regional variance?',
      options: ['Simple Random Sampling', 'Stratified Multi-Stage Cluster Sampling', 'Convenience Sampling', 'Systematic Sampling'],
      correct: 1
    },
    {
      id: 'q2',
      skillId: 'tech-1',
      domain: 'Technical',
      question: 'Which Python Pandas method is used to remove missing statistical values by linear interpolation?',
      options: ['df.dropna()', 'df.interpolate(method="linear")', 'df.fillna(0)', 'df.replace(np.nan)'],
      correct: 1
    },
    {
      id: 'q3',
      skillId: 'gov-1',
      domain: 'Digital Governance',
      question: 'Under India\'s DPDP Act, what is the required compliance measure when publishing survey data on open data portals?',
      options: ['Full raw data dump', 'Differential Privacy & Anonymization', 'IP Blocking', 'Manual PDF scanning'],
      correct: 1
    },
    {
      id: 'q4',
      skillId: 'beh-1',
      domain: 'Behavioural',
      question: 'What is the primary objective of an executive policy brief drafted for the MoSPI Cabinet Secretary?',
      options: ['Detailed mathematical derivations', 'Concise evidence-based recommendations in 2 pages', 'Raw data tables', 'Software user manuals'],
      correct: 1
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Save diagnostic quiz results
      const results = {
        'stat-1': quizAnswers['q1'] === 1 ? 4.8 : 2.5,
        'tech-1': quizAnswers['q2'] === 1 ? 4.5 : 2.5,
        'gov-1': quizAnswers['q3'] === 1 ? 4.6 : 2.8,
        'beh-1': quizAnswers['q4'] === 1 ? 4.7 : 3.0
      };
      await api.saveQuizResult(currentUser.id, results);
      // Mark onboarding complete in DB
      await api.completeOnboarding(currentUser.id);
      onComplete();
    } catch (err) {
      alert('Failed to complete diagnostic quiz setup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-parchment py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Onboarding Step Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate/15 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-sandstone uppercase tracking-wider">Step 3 of 3 (Final Step)</span>
            <h1 className="text-xl font-display font-bold text-ink">Verification Diagnostic Quiz</h1>
          </div>
          <div className="flex space-x-1.5">
            <div className="w-8 h-2 rounded-full bg-emerald-500" />
            <div className="w-8 h-2 rounded-full bg-emerald-500" />
            <div className="w-8 h-2 rounded-full bg-sandstone" />
          </div>
        </div>

        {/* Diagnostic Quiz MCQs ONLY */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate/15 space-y-6">
          <div className="border-b border-slate/10 pb-4">
            <h2 className="text-lg font-bold text-ink flex items-center space-x-2">
              <Award className="w-5 h-5 text-sandstone" />
              <span>Competency Calibration Quiz</span>
            </h2>
            <p className="text-xs text-slate mt-1">Answer 4 quick domain verification questions to calculate your skill gaps.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {diagnosticQuestions.map((q, idx) => (
              <div key={q.id} className="p-5 rounded-2xl border border-slate/15 bg-parchment/20 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-sandstone">
                  <span className="px-2 py-0.5 rounded bg-sandstone/10">{q.domain}</span>
                  <span>Question {idx + 1} of 4</span>
                </div>
                <div className="text-sm font-bold text-ink">{q.question}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: oIdx }))}
                      className={`p-3.5 rounded-xl text-left text-xs transition border ${
                        quizAnswers[q.id] === oIdx
                          ? 'border-sandstone bg-sandstone/10 font-bold text-sandstone-dark'
                          : 'border-slate/20 bg-white hover:bg-parchment'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading || Object.keys(quizAnswers).length < diagnosticQuestions.length}
                className="px-8 py-3.5 bg-gradient-to-r from-sandstone to-sandstone-dark text-white rounded-xl font-bold text-sm transition shadow-lg hover:shadow-xl flex items-center space-x-2 disabled:opacity-40"
              >
                <Sparkles className="w-4 h-4" />
                <span>Complete Setup & Generate Dashboard</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
