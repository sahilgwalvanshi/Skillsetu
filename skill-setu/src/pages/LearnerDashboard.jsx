import React, { useState, useEffect } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip
} from 'recharts';
import { Award, BookOpen, AlertCircle, CheckCircle, ExternalLink, RefreshCw, FileText, GraduationCap, Briefcase, Sparkles, Scale } from 'lucide-react';
import { api } from '../services/api';
import ChatWidget from '../components/ChatWidget';

export default function LearnerDashboard({ currentUser, onNavigateAssessment }) {
  const [gapsData, setGapsData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseTab, setCourseTab] = useState('igot'); // 'igot' | 'nssta'
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser?.id) {
      fetchDashboardData(currentUser.id);
    }
  }, [currentUser]);

  const fetchDashboardData = async (userId) => {
    setLoading(true);
    setError('');
    try {
      const [gaps, recs] = await Promise.all([
        api.getSkillGaps(userId),
        api.getRecommendations(userId)
      ]);
      setGapsData(gaps);
      setRecommendations(recs);
    } catch (err) {
      console.error('Learner dashboard fetch error:', err);
      setError('Failed to load dashboard data. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f6f0] flex flex-col items-center justify-center p-6">
        <RefreshCw className="w-8 h-8 text-sandstone animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate">Computing 27-Skill Competency Engine...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8f6f0] p-8 flex justify-center">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-200 text-center max-w-md">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <h3 className="font-bold text-ink mb-2">{error}</h3>
          <button
            onClick={() => fetchDashboardData(currentUser.id)}
            className="px-4 py-2 bg-sandstone text-white text-xs font-semibold rounded-xl"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const topGaps = gapsData?.topGaps || [];
  const radarData = gapsData?.radarData || [];
  const igotCourses = recommendations?.igotCourses || [];
  const nsstaCourses = recommendations?.nsstaCourses || [];
  const profile = gapsData?.profile || currentUser?.profile || {};

  const handleUpdateCourseStatus = async (courseId, status) => {
    if (!currentUser?.id) return;
    try {
      await api.updateCourseProgress(currentUser.id, courseId, status);
      // Immediately refetch live gaps and recommendations from DB
      await fetchDashboardData(currentUser.id);
    } catch (err) {
      console.error('Failed to update course status:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Officer Header Card */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-ink via-ink-light to-sandstone-dark text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-10 -translate-y-10">
          <div className="text-[200px] font-bold font-display">MoSPI</div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="bg-ochre/20 text-ochre px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-ochre/30">
                Official Competency Profile
              </span>
              <span className="text-xs text-parchment/60">MoSPI ID: {gapsData?.userId?.slice(0, 8)}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-parchment">
              {gapsData?.userName || currentUser?.name}
            </h1>
            <p className="text-sm text-parchment/80">
              {profile.designation || gapsData?.jobRole} • <span className="text-ochre">{profile.department || gapsData?.department}</span>
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/15">
            <div className="text-center px-3">
              <div className="text-xs text-parchment/70">Top Gaps</div>
              <div className="text-xl font-bold text-ochre">{topGaps.length} Skills</div>
            </div>
            <div className="text-center px-3 border-l border-white/15">
              <div className="text-xs text-parchment/70">Completed</div>
              <div className="text-xl font-bold text-emerald-400">{gapsData?.completedCoursesCount || 0} Courses</div>
            </div>
            <div className="text-center px-3 border-l border-white/15">
              <div className="text-xs text-parchment/70">iGOT Matches</div>
              <div className="text-xl font-bold text-parchment">{igotCourses.length} Courses</div>
            </div>
            <div className="text-center px-3 border-l border-white/15">
              <div className="text-xs text-parchment/70">NSSTA TPAC</div>
              <div className="text-xl font-bold text-emerald-300">{nsstaCourses.length} Programs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Base Competency Profile & Score Calibration Card */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate/20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate/10 pb-4">
          <div>
            <span className="text-[10px] font-bold text-sandstone uppercase tracking-wider">OFFICER BASE DATA RECORD</span>
            <h2 className="text-lg font-bold font-display text-ink flex items-center space-x-2 mt-0.5">
              <FileText className="w-5 h-5 text-sandstone" />
              <span>Competency Profile & Combined Score Calibration Sheet</span>
            </h2>
            <p className="text-xs text-slate mt-0.5">
              Base data profile and multi-factor scoring formula combining self-ratings with diagnostic quiz scores.
            </p>
          </div>
          <button
            onClick={onNavigateAssessment}
            className="px-4 py-2 border border-slate/30 text-xs font-semibold rounded-xl hover:bg-parchment text-ink transition self-start sm:self-auto"
          >
            Update Baseline Ratings
          </button>
        </div>

        {/* 6 Profile Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-parchment/40 border border-slate/15 space-y-1">
            <div className="text-slate font-medium flex items-center space-x-1.5">
              <Briefcase className="w-4 h-4 text-sandstone" />
              <span>Designation & Role</span>
            </div>
            <div className="font-bold text-ink text-sm">{profile.designation || gapsData?.jobRole}</div>
            <div className="text-[11px] text-slate">{profile.department || gapsData?.department}</div>
          </div>

          <div className="p-4 rounded-2xl bg-parchment/40 border border-slate/15 space-y-1">
            <div className="text-slate font-medium flex items-center space-x-1.5">
              <GraduationCap className="w-4 h-4 text-sandstone" />
              <span>Educational Qualification</span>
            </div>
            <div className="font-bold text-ink text-sm">{profile.education || "M.Sc Statistics (Indian Statistical Institute)"}</div>
            <div className="text-[11px] text-slate">Academic Baseline</div>
          </div>

          <div className="p-4 rounded-2xl bg-parchment/40 border border-slate/15 space-y-1">
            <div className="text-slate font-medium flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-sandstone" />
              <span>Service Experience</span>
            </div>
            <div className="font-bold text-ink text-sm">{profile.experience || 8} Years in Service</div>
            <div className="text-[11px] text-slate">Contributes 20% to Skill Engine</div>
          </div>

          <div className="p-4 rounded-2xl bg-parchment/40 border border-slate/15 space-y-1 sm:col-span-2 lg:col-span-3">
            <div className="text-slate font-medium flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-sandstone" />
              <span>Past Training Programs Attended (iGOT / NSSTA)</span>
            </div>
            <div className="font-bold text-ink text-xs">{profile.pastTrainings || "NSSTA Survey Sampling, iGOT Python for Data Analytics, DPDP Act Compliance"}</div>
          </div>
        </div>

        {/* Formula Calibration Box */}
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-ink space-y-2">
          <div className="font-bold text-sandstone-dark flex items-center space-x-2">
            <Scale className="w-4 h-4 text-sandstone" />
            <span>Why Combine Self-Assessment (20%) + Diagnostic Test (35%)?</span>
          </div>
          <p className="text-slate leading-relaxed text-[11px]">
            To eliminate self-reported over-confidence bias, Skill Setu strictly combines an officer's <b>Self-Assessment Rating (20%)</b> with their verified <b>Diagnostic Test Score (35%)</b>, <b>Experience Weight (20%)</b>, <b>Training Record (15%)</b>, and <b>Output Score (10%)</b> to derive an honest competency gap profile.
          </p>
        </div>
      </div>

      {/* Main Grid: Radar Chart + Skill Gap List */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Radar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold font-display text-ink flex items-center space-x-2">
                  <Award className="w-5 h-5 text-sandstone" />
                  <span>27-Skill Competency Radar Chart</span>
                </h2>
                <p className="text-xs text-slate mt-1">
                  Overall proficiency vs Required benchmark across 4 official domains.
                </p>
              </div>
            </div>

            {/* Recharts Radar */}
            <div className="h-[360px] w-full py-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="domain" tick={{ fill: '#0e1a2e', fontSize: 11, fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 10 }} />
                  <Radar
                    name="Officer Combined Score"
                    dataKey="score"
                    stroke="#b5502e"
                    fill="#b5502e"
                    fillOpacity={0.45}
                  />
                  <Radar
                    name="Role Benchmark Required"
                    dataKey="benchmark"
                    stroke="#d97706"
                    fill="#d97706"
                    fillOpacity={0.2}
                    strokeDasharray="4 4"
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0e1a2e', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#f8f6f0] rounded-2xl p-4 text-xs text-slate flex items-center justify-between border border-slate/15">
            <span>Formula: <code className="bg-white px-2 py-0.5 rounded text-[11px] text-ink font-semibold">0.2*Self + 0.35*Diag + 0.2*Exp + 0.15*Train + 0.1*Output</code></span>
            <span className="font-bold text-sandstone">MoSPI Gap Engine v1.0</span>
          </div>
        </div>

        {/* Priority Skill Gap List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate/20 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold font-display text-ink flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-sandstone" />
                <span>Priority Skill Gaps ({topGaps.length})</span>
              </h2>
              <p className="text-xs text-slate mt-1">Sorted by gap severity requiring training intervention.</p>
            </div>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
            {topGaps.length === 0 ? (
              <div className="text-center py-12 text-slate text-xs">
                <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                Great job! No critical skill gaps detected against your role benchmark.
              </div>
            ) : (
              topGaps.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl border border-slate/15 hover:border-sandstone/40 bg-[#f8f6f0] transition space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold text-ink">{item.name}</div>
                      <span className="inline-block mt-0.5 text-[10px] px-2 py-0.5 rounded-full bg-slate/10 text-slate font-medium">
                        {item.domain}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sandstone/15 text-sandstone-dark border border-sandstone/20">
                      Gap: +{item.gap}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate font-medium">
                      <span>Combined Score: <b>{item.finalScore}</b> / 5.0</span>
                      <span>Benchmark: <b>{item.requiredLevel}</b></span>
                    </div>
                    <div className="w-full bg-slate/20 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-sandstone h-full rounded-full"
                        style={{ width: `${(item.finalScore / item.requiredLevel) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recommended Courses Section (iGOT Karmayogi vs NSSTA TPAC) */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate/20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate/10 pb-6">
          <div>
            <h2 className="text-xl font-bold font-display text-ink flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-sandstone" />
              <span>Recommended Training Pathways</span>
            </h2>
            <p className="text-xs text-slate mt-1">
              Rule-based matching algorithm mapping officer's skill gaps directly to official training portals.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex bg-[#f8f6f0] p-1 rounded-2xl border border-slate/15">
            <button
              onClick={() => setCourseTab('igot')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                courseTab === 'igot'
                  ? 'bg-sandstone text-white shadow-md'
                  : 'text-slate hover:text-ink'
              }`}
            >
              <span>iGOT Karmayogi ({igotCourses.length})</span>
            </button>
            <button
              onClick={() => setCourseTab('nssta')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                courseTab === 'nssta'
                  ? 'bg-sandstone text-white shadow-md'
                  : 'text-slate hover:text-ink'
              }`}
            >
              <span>NSSTA TPAC ({nsstaCourses.length})</span>
            </button>
          </div>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(courseTab === 'igot' ? igotCourses : nsstaCourses).map((course) => {
            const courseStatus = course.status || 'recommended';
            return (
              <div
                key={course.id}
                className="bg-[#f8f6f0]/60 border border-slate/15 rounded-2xl p-5 flex flex-col justify-between hover:border-sandstone hover:shadow-md transition group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`px-2.5 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] ${
                      course.source === 'igot' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {course.source === 'igot' ? 'iGOT Portal' : 'NSSTA TPAC'}
                    </span>

                    {/* Dynamic Status Badge */}
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      courseStatus === 'completed'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : courseStatus === 'in_progress'
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-slate/10 text-slate border-slate/20'
                    }`}>
                      {courseStatus === 'completed' ? '✓ Completed' : courseStatus === 'in_progress' ? 'In Progress' : 'Recommended'}
                    </span>
                  </div>

                  <h3 className="font-bold text-ink text-sm group-hover:text-sandstone transition">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate line-clamp-3">
                    {course.description}
                  </p>

                  {/* Skill Tags */}
                  <div className="pt-2">
                    <div className="text-[10px] font-bold text-slate uppercase tracking-wider mb-1.5">
                      Addresses Skill Gaps:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {course.matchingSkills?.map((s) => (
                        <span
                          key={s.id}
                          className="px-2 py-0.5 rounded-md bg-white border border-slate/20 text-[10px] font-semibold text-sandstone"
                        >
                          {s.name} (+{s.gap})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate/10 mt-4 space-y-3">
                  {/* Status Action Buttons */}
                  <div className="flex items-center justify-between gap-2">
                    {courseStatus === 'recommended' && (
                      <button
                        onClick={() => handleUpdateCourseStatus(course.id, 'in_progress')}
                        className="flex-1 py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 border border-amber-500/30 text-xs font-bold transition flex items-center justify-center space-x-1"
                      >
                        <span>Start Course</span>
                      </button>
                    )}

                    {courseStatus === 'in_progress' && (
                      <button
                        onClick={() => handleUpdateCourseStatus(course.id, 'completed')}
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 text-xs font-bold transition flex items-center justify-center space-x-1 shadow-sm"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Mark as Completed</span>
                      </button>
                    )}

                    {courseStatus === 'completed' && (
                      <button
                        onClick={() => handleUpdateCourseStatus(course.id, 'in_progress')}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition"
                      >
                        Re-take Course
                      </button>
                    )}

                    <a
                      href={course.url || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-liquid-glass px-3.5 py-2 text-white rounded-xl text-xs font-bold flex items-center space-x-1 shadow-sm transition shrink-0"
                    >
                      <span>Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Learner Support Chatbot Widget */}
      <ChatWidget currentUser={currentUser} />
    </div>
  );
}
