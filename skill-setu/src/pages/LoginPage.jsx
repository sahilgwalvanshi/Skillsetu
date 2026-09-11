import React, { useState } from 'react';
import { User, ShieldCheck, ArrowRight, CheckCircle, FileText, Sparkles, Building2, Briefcase, Award, GraduationCap, Play } from 'lucide-react';
import { api } from '../services/api';
import { mockStore } from '../services/mockDataStore';

export default function LoginPage({ onLoginSuccess }) {
  const [selectedRole, setSelectedRole] = useState('officer');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewUser, setPreviewUser] = useState({
    name: 'Rajesh Sharma',
    role: 'officer',
    designation: 'Senior Statistical Officer',
    dept: 'National Sample Survey Office (NSSO)',
    jobRole: 'Senior Statistical Officer',
    experience: 8,
    education: 'M.Sc Statistics (Indian Statistical Institute, Kolkata)',
    pastTrainings: 'NSSTA Multi-Stage Sampling, iGOT Python for Data Analytics'
  });

  const presetUsers = [
    {
      name: 'Rajesh Sharma',
      role: 'officer',
      designation: 'Senior Statistical Officer',
      dept: 'National Sample Survey Office (NSSO)',
      jobRole: 'Senior Statistical Officer',
      experience: 8,
      education: 'M.Sc Statistics (Indian Statistical Institute, Kolkata)',
      pastTrainings: 'NSSTA Multi-Stage Sampling, iGOT Python for Data Analytics'
    },
    {
      name: 'Priya Verma',
      role: 'officer',
      designation: 'Junior Statistical Officer',
      dept: 'Central Statistics Office (CSO)',
      jobRole: 'Junior Statistical Officer',
      experience: 3,
      education: 'B.Sc Mathematical Statistics (Delhi University)',
      pastTrainings: 'iGOT Data Privacy Act Compliance, SQL Database Queries'
    },
    {
      name: 'Amitabh Sen',
      role: 'officer',
      designation: 'Director (Price Statistics)',
      dept: 'Price Statistics & Coordination Division',
      jobRole: 'Data Analyst / Director',
      experience: 14,
      education: 'Ph.D. Econometrics (JNU New Delhi)',
      pastTrainings: 'NSSTA TPAC National Accounts Intensive, Macroeconomic Forecasting'
    },
    {
      name: 'New MoSPI Officer',
      role: 'officer',
      designation: 'Statistical Officer (New Recruiter)',
      dept: 'National Sample Survey Office (NSSO)',
      jobRole: 'Junior Statistical Officer',
      experience: 1,
      education: 'B.Tech Data Science & Analytics',
      pastTrainings: 'None (First-Time Recruiter)',
      isNew: true
    },
    {
      name: 'Dr. Suresh Admin',
      role: 'admin',
      designation: 'Director General (Training)',
      dept: 'NSSTA / MoSPI HQ',
      jobRole: 'Data Analyst / Director',
      experience: 20,
      education: 'Ph.D. Official Statistics & Data Science',
      pastTrainings: 'UN-FOS International Statistics Standards'
    }
  ];

  const handleLogin = async (userObj, startOnboarding = true) => {
    setLoading(true);
    setError('');
    const loginName = userObj ? userObj.name : name;
    const loginRole = userObj ? userObj.role : selectedRole;

    try {
      const res = await api.login(loginName, loginRole);
      
      // Save full profile details to backend
      if (userObj) {
        await api.saveProfile({
          userId: res.user.id,
          designation: userObj.designation,
          department: userObj.dept,
          jobRole: userObj.jobRole,
          experience: userObj.experience,
          education: userObj.education,
          pastTrainings: userObj.pastTrainings
        });
      }

      // If user requested onboarding flow or is officer starting fresh
      if (loginRole === 'officer' && startOnboarding) {
        res.user.onboardingComplete = false;
      }

      onLoginSuccess(res.user);
    } catch (err) {
      console.warn('Backend unavailable, proceeding with client-side demo account:', err);
      const fallback = mockStore.login(loginName, loginRole);
      if (loginRole === 'officer' && startOnboarding) {
        fallback.user.onboardingComplete = false;
      }
      onLoginSuccess(fallback.user);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Login Card (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate/20 space-y-6">
          <div className="text-center space-y-3">
            <img 
              src="/images/skill-setu-logo-full.jpg" 
              alt="Skill Setu - A Bridge to iGOT Karmayogi" 
              className="h-16 w-auto object-contain mx-auto rounded-xl bg-white p-1 border border-slate/20 shadow-sm" 
            />
            <h1 className="text-2xl font-display font-bold text-ink">MoSPI Officer Portal Login</h1>
            <p className="text-xs text-slate">Skill Intelligence & Learning Management System</p>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
              {error}
            </div>
          )}

          {/* Preset Accounts List */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate uppercase tracking-wider">
              Select Demo Account to Test:
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {presetUsers.map((u) => (
                <button
                  key={u.name}
                  type="button"
                  onClick={() => setPreviewUser(u)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition text-left group ${
                    previewUser?.name === u.name
                      ? 'border-sandstone bg-sandstone/10 shadow-sm'
                      : 'border-slate/20 hover:border-sandstone hover:bg-parchment/40'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-xl ${u.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                      {u.role === 'admin' ? <ShieldCheck className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-ink group-hover:text-sandstone transition flex items-center space-x-2">
                        <span>{u.name}</span>
                        {u.isNew && (
                          <span className="px-2 py-0.5 rounded-full bg-sandstone text-white text-[10px] font-bold">
                            First Time Login
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate">
                        {u.designation} • <span className="text-ink font-semibold">{u.dept.split(' ')[0]}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-sandstone flex items-center space-x-1 group-hover:translate-x-1 transition transform">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate/20"></div>
            <span className="flex-shrink mx-4 text-xs font-medium text-slate uppercase">Or Custom Officer Registration</span>
            <div className="flex-grow border-t border-slate/20"></div>
          </div>

          {/* Custom Login Form */}
          <form onSubmit={(e) => { e.preventDefault(); if (name) handleLogin({ name, role: selectedRole, designation: 'Statistical Officer', dept: 'CSO', jobRole: 'Senior Statistical Officer', experience: 5, education: 'B.Sc Statistics', pastTrainings: 'Basic MoSPI Orientation' }, true); }} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate mb-1">Full Official Name</label>
              <input
                type="text"
                placeholder="e.g. Ramesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate/30 text-sm focus:border-sandstone outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate mb-1">Role Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('officer')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-2 transition ${
                    selectedRole === 'officer'
                      ? 'border-sandstone bg-sandstone/10 text-sandstone'
                      : 'border-slate/20 text-slate hover:bg-parchment'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Officer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-2 transition ${
                    selectedRole === 'admin'
                      ? 'border-sandstone bg-sandstone/10 text-sandstone'
                      : 'border-slate/20 text-slate hover:bg-parchment'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin / Trainer</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !name}
              className="btn-liquid-glass w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? <span>Signing in...</span> : <><span>Start Live Product Onboarding</span> <CheckCircle className="w-4 h-4" /></>}
            </button>
          </form>
        </div>

        {/* Right Officer Data Record Panel with Judge Demonstration Buttons (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate/20 space-y-6">
          <div className="border-b border-slate/10 pb-4">
            <span className="text-[10px] font-bold text-sandstone uppercase tracking-wider">JUDGE DEMONSTRATION PANEL</span>
            <h3 className="text-lg font-bold font-display text-ink flex items-center space-x-2 mt-1">
              <FileText className="w-5 h-5 text-sandstone" />
              <span>{previewUser?.name}'s Competency Base Record</span>
            </h3>
            <p className="text-xs text-slate mt-1">
              Shows how the real product collects profile fields, rates 27 skills, and executes diagnostic quizzes step-by-step.
            </p>
          </div>

          {/* Displayed Data Fields */}
          <div className="space-y-3 text-xs text-ink">
            <div className="p-3 rounded-2xl bg-[#f8f6f0] border border-slate/15 space-y-0.5">
              <div className="flex items-center space-x-2 text-slate font-medium text-[11px]">
                <Briefcase className="w-3.5 h-3.5 text-sandstone" />
                <span>Designation & Department</span>
              </div>
              <div className="font-bold text-sm text-ink pl-5">
                {previewUser.designation}
              </div>
              <div className="text-[11px] text-slate pl-5">{previewUser.dept}</div>
            </div>

            <div className="p-3 rounded-2xl bg-[#f8f6f0] border border-slate/15 space-y-0.5">
              <div className="flex items-center space-x-2 text-slate font-medium text-[11px]">
                <GraduationCap className="w-3.5 h-3.5 text-sandstone" />
                <span>Educational Qualification</span>
              </div>
              <div className="font-bold text-xs text-ink pl-5">
                {previewUser.education}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#f8f6f0] border border-slate/15 space-y-0.5">
              <div className="flex items-center space-x-2 text-slate font-medium text-[11px]">
                <Award className="w-3.5 h-3.5 text-sandstone" />
                <span>Job Role Benchmark & Experience</span>
              </div>
              <div className="font-bold text-xs text-ink pl-5 flex items-center justify-between">
                <span>{previewUser.jobRole}</span>
                <span className="text-sandstone font-bold">{previewUser.experience} Years Experience</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#f8f6f0] border border-slate/15 space-y-0.5">
              <div className="flex items-center space-x-2 text-slate font-medium text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-sandstone" />
                <span>Past Training Records</span>
              </div>
              <div className="font-bold text-xs text-ink pl-5">
                {previewUser.pastTrainings}
              </div>
            </div>
          </div>

          {/* Action Buttons for Judges */}
          <div className="pt-4 border-t border-slate/10 space-y-3">
            <label className="block text-xs font-bold text-ink uppercase tracking-wider">
              Choose How To Test This Profile:
            </label>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleLogin(previewUser, true)}
              className="btn-liquid-glass w-full py-3.5 rounded-2xl font-bold text-xs text-white shadow-md flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Run Real Product Flow (Profile → 27 Sliders → Quiz)</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleLogin(previewUser, false)}
              className="btn-liquid-glass-light w-full py-3 rounded-2xl font-semibold text-xs text-ink flex items-center justify-center space-x-2"
            >
              <ArrowRight className="w-4 h-4 text-sandstone" />
              <span>Quick Jump to Pre-Calculated Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
