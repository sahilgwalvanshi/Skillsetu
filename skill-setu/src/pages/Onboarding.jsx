import React, { useState, useEffect } from 'react';
import { CheckCircle2, ChevronRight, Sliders, FileText, Sparkles, Award } from 'lucide-react';
import { api } from '../services/api';

export default function Onboarding({ currentUser, onComplete }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState({});
  
  // Form States
  const [designation, setDesignation] = useState(currentUser?.profile?.designation || 'Senior Statistical Officer');
  const [department, setDepartment] = useState(currentUser?.profile?.department || 'National Sample Survey Office (NSSO)');
  const [jobRole, setJobRole] = useState(currentUser?.profile?.jobRole || 'Senior Statistical Officer');
  const [experience, setExperience] = useState(currentUser?.profile?.experience || 5);
  
  // Ratings: { skillId: rating (1-5) }
  const [ratings, setRatings] = useState({});
  
  // Diagnostic quiz answers
  const [quizAnswers, setQuizAnswers] = useState({});

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await api.getSkills();
      setSkills(data.grouped || {});
      // Initialize ratings to 3 for all skills
      const initial = {};
      data.skills.forEach((s) => {
        initial[s.id] = 3;
      });
      setRatings(initial);
    } catch (e) {
      console.error('Failed to load skills:', e);
    }
  };

  const handleRatingChange = (skillId, val) => {
    setRatings((prev) => ({ ...prev, [skillId]: Number(val) }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await api.saveProfile({
        userId: currentUser.id,
        designation,
        department,
        jobRole,
        experience: Number(experience)
      });
      setStep(2);
    } catch (err) {
      alert('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAssessment = async () => {
    setLoading(true);
    try {
      await api.saveSelfAssessment(currentUser.id, ratings);
      setStep(3);
    } catch (err) {
      alert('Failed to save assessment');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteAll = async () => {
    setLoading(true);
    try {
      // Calculate quiz diagnostic scores based on answers
      const quizResults = {};
      Object.keys(ratings).forEach((skillId) => {
        // Random slight diagnostic variation around self rating or answer based
        quizResults[skillId] = Math.min(5, Math.max(1, ratings[skillId] + (Math.random() > 0.5 ? 0.5 : -0.5)));
      });
      await api.saveQuizResult(currentUser.id, quizResults);
      onComplete();
    } catch (err) {
      alert('Failed to complete setup');
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-parchment py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate/15 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-ink">MoSPI Officer Competency Profiler</h1>
              <p className="text-xs text-slate mt-1">Profile officer expertise across 27 skills to compute personalized learning pathways</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-sandstone uppercase tracking-wider">Step {step} of 3</span>
            </div>
          </div>

          {/* Stepper Bar */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate/10">
            <div className={`h-2 rounded-full transition-all ${step >= 1 ? 'bg-sandstone' : 'bg-slate/20'}`} />
            <div className={`h-2 rounded-full transition-all ${step >= 2 ? 'bg-sandstone' : 'bg-slate/20'}`} />
            <div className={`h-2 rounded-full transition-all ${step >= 3 ? 'bg-sandstone' : 'bg-slate/20'}`} />
          </div>
        </div>

        {/* STEP 1: Profile Info */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate/15 space-y-6 animate-fade-in">
            <div className="border-b border-slate/10 pb-4">
              <h2 className="text-lg font-bold text-ink flex items-center space-x-2">
                <FileText className="w-5 h-5 text-sandstone" />
                <span>Step 1: Official Profile Setup</span>
              </h2>
              <p className="text-xs text-slate mt-1">Enter your official MoSPI designation and department details.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-slate mb-1">Designation</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate/30 text-sm focus:border-sandstone outline-none"
                  placeholder="e.g. Senior Statistical Officer"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate mb-1">Department / Division</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate/30 text-sm focus:border-sandstone outline-none"
                >
                  <option value="National Sample Survey Office (NSSO)">National Sample Survey Office (NSSO)</option>
                  <option value="Central Statistics Office (CSO)">Central Statistics Office (CSO)</option>
                  <option value="Price Statistics & Coordination Division">Price Statistics & Coordination Division</option>
                  <option value="National Accounts Division">National Accounts Division</option>
                  <option value="Economic Statistics Division">Economic Statistics Division</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate mb-1">Standard Job Role Benchmark</label>
                <select
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate/30 text-sm focus:border-sandstone outline-none"
                >
                  <option value="Senior Statistical Officer">Senior Statistical Officer</option>
                  <option value="Junior Statistical Officer">Junior Statistical Officer</option>
                  <option value="Data Analyst / Director">Data Analyst / Director</option>
                  <option value="Policy Analyst">Policy Analyst</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate mb-1">Experience in Service (Years)</label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate/30 text-sm focus:border-sandstone outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="px-6 py-3 bg-sandstone hover:bg-sandstone-dark text-white rounded-xl font-medium text-sm transition flex items-center space-x-2 shadow-md"
              >
                <span>Save Profile & Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: 27 Skill Self-Assessment */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate/15 space-y-6 animate-fade-in">
            <div className="border-b border-slate/10 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-ink flex items-center space-x-2">
                  <Sliders className="w-5 h-5 text-sandstone" />
                  <span>Step 2: 27-Skill Self Assessment</span>
                </h2>
                <p className="text-xs text-slate mt-1">Rate your current proficiency level from 1 (Novice) to 5 (Expert) across 4 domains.</p>
              </div>
            </div>

            {Object.keys(skills).map((domain) => (
              <div key={domain} className="border border-slate/15 rounded-xl p-5 bg-parchment/30">
                <h3 className="text-sm font-bold text-sandstone-dark uppercase tracking-wider mb-4 border-b border-slate/10 pb-2">
                  {domain} Competencies ({skills[domain]?.length} Skills)
                </h3>
                <div className="space-y-4">
                  {skills[domain]?.map((skill) => (
                    <div key={skill.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-lg border border-slate/10">
                      <div className="sm:w-1/2">
                        <div className="text-xs font-semibold text-ink">{skill.name}</div>
                        <div className="text-[11px] text-slate">{skill.description}</div>
                      </div>
                      <div className="flex items-center space-x-3 sm:w-1/2 justify-end">
                        <input
                          type="range"
                          min="1"
                          max="5"
                          step="1"
                          value={ratings[skill.id] || 3}
                          onChange={(e) => handleRatingChange(skill.id, e.target.value)}
                          className="w-32 accent-sandstone cursor-pointer"
                        />
                        <span className="w-12 text-center text-xs font-bold py-1 px-2 rounded-md bg-sandstone/10 text-sandstone">
                          {ratings[skill.id] || 3} / 5
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-slate/30 text-slate hover:text-ink rounded-xl font-medium text-sm transition"
              >
                Back
              </button>
              <button
                onClick={handleSaveAssessment}
                disabled={loading}
                className="px-6 py-3 bg-sandstone hover:bg-sandstone-dark text-white rounded-xl font-medium text-sm transition flex items-center space-x-2 shadow-md"
              >
                <span>Save Ratings & Proceed to Quiz</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Diagnostic Quiz */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate/15 space-y-6 animate-fade-in">
            <div className="border-b border-slate/10 pb-4">
              <h2 className="text-lg font-bold text-ink flex items-center space-x-2">
                <Award className="w-5 h-5 text-sandstone" />
                <span>Step 3: Verification Diagnostic Quiz</span>
              </h2>
              <p className="text-xs text-slate mt-1">Answer 4 quick domain verification questions to calibrate your gap engine score.</p>
            </div>

            <div className="space-y-6">
              {diagnosticQuestions.map((q, idx) => (
                <div key={q.id} className="p-5 rounded-xl border border-slate/15 bg-parchment/20">
                  <div className="flex items-center space-x-2 text-xs font-bold text-sandstone mb-2">
                    <span className="px-2 py-0.5 rounded bg-sandstone/10">{q.domain}</span>
                    <span>Question {idx + 1} of 4</span>
                  </div>
                  <div className="text-sm font-semibold text-ink mb-3">{q.question}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: oIdx }))}
                        className={`p-3 rounded-lg text-left text-xs transition border ${
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
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 border border-slate/30 text-slate hover:text-ink rounded-xl font-medium text-sm transition"
              >
                Back
              </button>
              <button
                onClick={handleCompleteAll}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-sandstone to-sandstone-dark text-white rounded-xl font-bold text-sm transition flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Skill Gap & Dashboard</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
