import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  Sparkles, Target, Briefcase, GraduationCap, CheckCircle2, ArrowRight, RotateCcw, AlertTriangle, ShieldCheck, Building2, TrendingUp, Info
} from 'lucide-react';
import { TARGET_ROLES, SIMULATION_COURSES } from '../services/decayEngine';

export default function CareerTwin({ currentUser }) {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const [selectedCourseIds, setSelectedCourseIds] = useState(['c-python', 'c-econometrics']);
  const [isSaved, setIsSaved] = useState(false);

  const currentRole = TARGET_ROLES[selectedRoleIndex];

  const handleToggleCourse = (courseId) => {
    setSelectedCourseIds(prev => 
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
    setIsSaved(false);
  };

  const handleReset = () => {
    setSelectedCourseIds(['c-python', 'c-econometrics']);
    setIsSaved(false);
  };

  // Calculate dynamic readiness trajectory
  const selectedCourses = SIMULATION_COURSES.filter(c => selectedCourseIds.includes(c.id));
  const baseMatch = currentRole.currentMatch; // e.g. 44%
  const totalBoost = selectedCourses.reduce((acc, c) => acc + c.readinessBoost, 0);
  const finalMatch = Math.min(98, baseMatch + totalBoost);

  // Generate timeline trajectory data points
  // Month 0 (Current) -> Month 2 -> Month 5 -> Month 8 -> Month 12
  let accumulatedBoost = 0;
  const trajectoryData = [
    { month: 'Current (M0)', readiness: baseMatch, benchmark: 85, note: 'Baseline match' }
  ];

  selectedCourses.forEach((c, idx) => {
    accumulatedBoost += c.readinessBoost;
    const monthNum = (idx + 1) * 3;
    trajectoryData.push({
      month: `Month ${monthNum}`,
      readiness: Math.min(98, baseMatch + accumulatedBoost),
      benchmark: 85,
      note: `After ${c.title.split(':')[0]}`
    });
  });

  // If few courses, extend to Month 12 with decay note
  if (trajectoryData.length < 5) {
    const lastReadiness = trajectoryData[trajectoryData.length - 1].readiness;
    const decayedReadiness = Math.max(baseMatch, lastReadiness - 6);
    trajectoryData.push({
      month: 'Month 12',
      readiness: decayedReadiness,
      benchmark: 85,
      note: 'Decay without refreshers'
    });
  }

  return (
    <div className="min-h-screen bg-[#f8f6f0] py-8 px-4 sm:px-6 lg:px-10 font-body text-slate-800 space-y-8">
      
      {/* 1. Header Banner */}
      <div className="max-w-7xl mx-auto bg-[#0c1836] rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-[#1b2b52] text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>DIGITAL COMPETENCY TWIN • WHAT-IF CAREER ENGINE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
              Career Readiness Simulation Sandbox
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl pt-1">
              Select an aspirational MoSPI senior role and simulate how custom combinations of iGOT micro-courses, NSSTA residential masterclasses, and skill decay interact over a 12-month horizon.
            </p>
          </div>

          <div className="bg-[#14234b]/80 border border-white/10 rounded-2xl p-4 text-center min-w-[140px] backdrop-blur-sm self-start md:self-auto">
            <div className="text-3xl font-extrabold font-display text-amber-400">
              {finalMatch}%
            </div>
            <div className="text-[10px] font-bold text-slate-300 tracking-wider uppercase mt-0.5">
              Simulated Readiness
            </div>
            <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
              finalMatch >= 85 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
            }`}>
              {finalMatch >= 85 ? 'Role Benchmark Met' : 'Gap Remaining'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Step 1: Target Role Selector */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-sandstone" />
            <h2 className="text-base font-bold font-display text-slate-900">
              Step 1: Choose Target Promotion Role
            </h2>
          </div>
          <span className="text-xs text-slate-500">Benchmark threshold: 85% score match</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TARGET_ROLES.map((r, idx) => (
            <button
              key={r.id}
              onClick={() => { setSelectedRoleIndex(idx); setIsSaved(false); }}
              className={`p-5 rounded-2xl border text-left transition relative flex flex-col justify-between space-y-3 ${
                selectedRoleIndex === idx
                  ? 'border-sandstone bg-sandstone/5 ring-2 ring-sandstone/20 shadow-sm'
                  : 'border-slate-200 bg-[#f8f6f0]/40 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {r.department}
                </div>
                <h3 className="font-bold text-slate-900 text-sm mt-1 leading-snug">
                  {r.title}
                </h3>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 text-xs">
                <span className="text-slate-600">Current Match:</span>
                <span className="font-bold text-slate-900">{r.currentMatch}%</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Main Simulator Split View */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Learning Pathway Builder (Checkboxes) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold font-display text-slate-900 flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-sandstone" />
                <span>Step 2: Assemble Learning Pathway</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Toggle courses to watch the projection curve redraw.</p>
            </div>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              title="Reset selections"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {SIMULATION_COURSES.map((course) => {
              const isChecked = selectedCourseIds.includes(course.id);
              return (
                <div
                  key={course.id}
                  onClick={() => handleToggleCourse(course.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-start space-x-3 ${
                    isChecked
                      ? 'border-sandstone bg-sandstone/5 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}} // handled by parent div
                    className="mt-1 h-4 w-4 rounded text-sandstone focus:ring-sandstone cursor-pointer"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                        {course.provider}
                      </span>
                      <span className="text-xs font-bold text-emerald-600">
                        +{course.readinessBoost}% Readiness
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 text-xs">
                      {course.title}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Duration: {course.durationWeeks} Weeks • Targets {course.boostSkills.join(', ')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Decaying Skill Warning along trajectory */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1.5 text-xs text-rose-900">
            <div className="font-bold flex items-center space-x-1.5 text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Competency Decay Simulation Warning</span>
            </div>
            <p className="text-[11px] leading-relaxed text-rose-800/90">
              During this 12-month trajectory, your <b>SQL & GIS</b> proficiencies will experience up to <b>14% decay</b> if unpracticed. The engine integrates automatic micro-nudges to prevent regression.
            </p>
          </div>

          {/* Action: Save Plan to eHRMS */}
          <button
            onClick={() => setIsSaved(true)}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center space-x-2"
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Simulated Pathway Synced with eHRMS APAR!</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Save Pathway to eHRMS SPARROW APAR Plan</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Projected Trajectory Chart & Required Competency Gap Matrix */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Projected Trajectory Line Chart */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold font-display text-slate-900 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-sandstone" />
                  <span>Projected Readiness Trajectory (12 Months)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Real-time projection modeling course gains vs background skill decay.</p>
              </div>
              <span className="text-[11px] font-bold text-slate-600 font-mono bg-slate-100 px-2.5 py-1 rounded-lg">
                Threshold: 85%
              </span>
            </div>

            <div className="h-[280px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trajectoryData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis domain={[30, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0c1836', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Line
                    type="monotone"
                    dataKey="readiness"
                    name="Simulated Officer Readiness (%)"
                    stroke="#b5502e"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#b5502e' }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="benchmark"
                    name="Official Cadre Benchmark (85%)"
                    stroke="#10b981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
              <div className="p-2 rounded-xl bg-slate-50">
                <div className="text-[10px] text-slate-500">Baseline</div>
                <div className="font-bold text-slate-800 text-sm">{baseMatch}%</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50">
                <div className="text-[10px] text-slate-500">Active Courses</div>
                <div className="font-bold text-sandstone text-sm">{selectedCourses.length} Selected</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50">
                <div className="text-[10px] text-slate-500">Peak Readiness</div>
                <div className="font-bold text-emerald-600 text-sm">{finalMatch}%</div>
              </div>
            </div>
          </div>

          {/* Target Role Core Skill Gap Matrix */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold font-display text-slate-900 flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-sandstone" />
              <span>Required Competency Deficit for {currentRole.title}</span>
            </h3>

            <div className="space-y-3">
              {currentRole.requiredSkills.map((sk, idx) => {
                const deficit = Number((sk.required - sk.current).toFixed(1));
                const pct = Math.min(100, Math.round((sk.current / sk.required) * 100));
                return (
                  <div key={idx} className="p-3 rounded-2xl bg-[#f8f6f0] border border-slate-200/70 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{sk.name}</span>
                      <span className="font-bold text-sandstone">Deficit: +{deficit}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Current: <b>{sk.current}</b> / 5.0</span>
                      <span>Target: <b>{sk.required}</b></span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-sandstone h-full rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
