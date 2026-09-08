import React, { useState } from 'react';
import { FileText, ChevronRight, GraduationCap } from 'lucide-react';
import { api } from '../services/api';

export default function OnboardingProfile({ currentUser, onNext }) {
  const [designation, setDesignation] = useState(currentUser?.profile?.designation || 'Senior Statistical Officer');
  const [department, setDepartment] = useState(currentUser?.profile?.department || 'National Sample Survey Office (NSSO)');
  const [jobRole, setJobRole] = useState(currentUser?.profile?.jobRole || 'Senior Statistical Officer');
  const [experience, setExperience] = useState(currentUser?.profile?.experience || 5);
  const [education, setEducation] = useState(currentUser?.profile?.education || "M.Sc Statistics (Indian Statistical Institute)");
  const [pastTrainings, setPastTrainings] = useState(currentUser?.profile?.pastTrainings || 'NSSTA Survey Sampling, iGOT Python for Data Analytics');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.saveProfile({
        userId: currentUser.id,
        designation,
        department,
        jobRole,
        experience: Number(experience),
        education,
        pastTrainings
      });
      onNext();
    } catch (err) {
      alert('Failed to save profile details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-parchment py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Onboarding Step Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate/15 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-sandstone uppercase tracking-wider">Step 1 of 3</span>
            <h1 className="text-xl font-display font-bold text-ink">Official Competency Base Profile</h1>
          </div>
          <div className="flex space-x-1.5">
            <div className="w-8 h-2 rounded-full bg-sandstone" />
            <div className="w-8 h-2 rounded-full bg-slate/20" />
            <div className="w-8 h-2 rounded-full bg-slate/20" />
          </div>
        </div>

        {/* Profile Form ONLY */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate/15 space-y-6">
          <div className="border-b border-slate/10 pb-4">
            <h2 className="text-lg font-bold text-ink flex items-center space-x-2">
              <FileText className="w-5 h-5 text-sandstone" />
              <span>MoSPI Officer Base Profile Setup</span>
            </h2>
            <p className="text-xs text-slate mt-1">
              Enter your official designation, department, education, years of experience, and past training records. This becomes your baseline Competency Profile.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate mb-1">Official Designation</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate/30 text-sm focus:border-sandstone outline-none"
                  placeholder="e.g. Senior Statistical Officer"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate mb-1">Department / Division</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate/30 text-sm focus:border-sandstone outline-none"
                >
                  <option value="National Sample Survey Office (NSSO)">National Sample Survey Office (NSSO)</option>
                  <option value="Central Statistics Office (CSO)">Central Statistics Office (CSO)</option>
                  <option value="Price Statistics & Coordination Division">Price Statistics & Coordination Division</option>
                  <option value="National Accounts Division">National Accounts Division</option>
                  <option value="Economic Statistics Division">Economic Statistics Division</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate mb-1">Standard Job Role Benchmark</label>
                <select
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate/30 text-sm focus:border-sandstone outline-none"
                >
                  <option value="Senior Statistical Officer">Senior Statistical Officer</option>
                  <option value="Junior Statistical Officer">Junior Statistical Officer</option>
                  <option value="Data Analyst / Director">Data Analyst / Director</option>
                  <option value="Policy Analyst">Policy Analyst</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate mb-1">Years of Service Experience</label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate/30 text-sm focus:border-sandstone outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate mb-1">Educational Qualification</label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="e.g. M.Sc Statistics (ISI Kolkata) / M.A Economics"
                className="w-full px-4 py-3 rounded-xl border border-slate/30 text-sm focus:border-sandstone outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate mb-1">Past Training Programs Attended (iGOT / NSSTA)</label>
              <textarea
                rows={3}
                value={pastTrainings}
                onChange={(e) => setPastTrainings(e.target.value)}
                placeholder="List any past iGOT courses or NSSTA training programs completed..."
                className="w-full px-4 py-3 rounded-xl border border-slate/30 text-sm focus:border-sandstone outline-none"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="btn-liquid-glass px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-md flex items-center space-x-2"
              >
                <span>Save Profile & Proceed to Self-Assessment</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
