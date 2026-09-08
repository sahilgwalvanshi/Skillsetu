import React, { useState, useEffect } from 'react';
import { Sliders, ChevronRight } from 'lucide-react';
import { api } from '../services/api';

export default function OnboardingAssessment({ currentUser, onNext }) {
  const [skills, setSkills] = useState({});
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await api.getSkills();
      setSkills(data.grouped || {});
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.saveSelfAssessment(currentUser.id, ratings);
      onNext();
    } catch (err) {
      alert('Failed to save skill self-assessment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-parchment py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Onboarding Step Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate/15 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-sandstone uppercase tracking-wider">Step 2 of 3</span>
            <h1 className="text-xl font-display font-bold text-ink">27-Skill Self-Assessment</h1>
          </div>
          <div className="flex space-x-1.5">
            <div className="w-8 h-2 rounded-full bg-emerald-500" />
            <div className="w-8 h-2 rounded-full bg-sandstone" />
            <div className="w-8 h-2 rounded-full bg-slate/20" />
          </div>
        </div>

        {/* 27 Sliders Form ONLY */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate/15 space-y-6">
          <div className="border-b border-slate/10 pb-4">
            <h2 className="text-lg font-bold text-ink flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-sandstone" />
              <span>Competency Self-Rating Sliders</span>
            </h2>
            <p className="text-xs text-slate mt-1">Rate your current proficiency from 1 (Novice) to 5 (Expert) across 27 skills.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {Object.keys(skills).map((domain) => (
              <div key={domain} className="border border-slate/15 rounded-2xl p-6 bg-parchment/30">
                <h3 className="text-xs font-bold text-sandstone-dark uppercase tracking-wider mb-4 border-b border-slate/10 pb-2">
                  {domain} Competencies ({skills[domain]?.length} Skills)
                </h3>
                <div className="space-y-3">
                  {skills[domain]?.map((skill) => (
                    <div key={skill.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate/10">
                      <div className="sm:w-1/2">
                        <div className="text-xs font-bold text-ink">{skill.name}</div>
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
                          className="w-36 accent-sandstone cursor-pointer"
                        />
                        <span className="w-14 text-center text-xs font-bold py-1.5 px-2 rounded-lg bg-sandstone/10 text-sandstone">
                          {ratings[skill.id] || 3} / 5
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 bg-sandstone hover:bg-sandstone-dark text-white rounded-xl font-bold text-sm transition shadow-md flex items-center space-x-2"
              >
                <span>Save & Proceed to Diagnostic Quiz</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
