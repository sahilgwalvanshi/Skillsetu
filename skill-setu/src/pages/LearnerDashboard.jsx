import React, { useState, useEffect } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip
} from 'recharts';
import {
  Award, BookOpen, AlertCircle, CheckCircle, ExternalLink, RefreshCw, FileText,
  GraduationCap, Briefcase, Sparkles, Scale, Code2, Play, Info, TrendingDown,
  Users, Zap, ArrowRight, ShieldCheck, HelpCircle, Activity, ChevronDown, ChevronUp
} from 'lucide-react';
import { api } from '../services/api';
import ChatWidget from '../components/ChatWidget';
import ExplainableAiModal from '../components/ExplainableAiModal';
import MicroNudgeModal from '../components/MicroNudgeModal';
import {
  calculateSkillDecay, classifySkillHealth, generateExplainabilityTrace,
  MICRO_NUDGES, CADRE_BENCHMARKS
} from '../services/decayEngine';

export default function LearnerDashboard({ currentUser, onNavigateAssessment }) {
  const [gapsData, setGapsData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseTab, setCourseTab] = useState('igot'); // 'igot' | 'nssta'
  const [error, setError] = useState('');

  // Innovation State Hooks
  const [simulatedDecayMonths, setSimulatedDecayMonths] = useState(0);
  const [activeTrace, setActiveTrace] = useState(null);
  const [isTraceModalOpen, setIsTraceModalOpen] = useState(false);
  const [activeNudge, setActiveNudge] = useState(null);
  const [isNudgeModalOpen, setIsNudgeModalOpen] = useState(false);
  const [showPeerBenchmark, setShowPeerBenchmark] = useState(false);
  const [boostedSkills, setBoostedSkills] = useState({});

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

  const handleOpenTrace = (type, entity) => {
    const trace = generateExplainabilityTrace(type, entity);
    setActiveTrace(trace);
    setIsTraceModalOpen(true);
  };

  const handleOpenNudge = (nudge) => {
    setActiveNudge(nudge);
    setIsNudgeModalOpen(true);
  };

  const handleQuizComplete = (skillId) => {
    setBoostedSkills(prev => ({
      ...prev,
      [skillId]: (prev[skillId] || 0) + 0.3
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f6f0] flex flex-col items-center justify-center p-6">
        <RefreshCw className="w-8 h-8 text-sandstone animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate">Computing 27-Skill Competency & Decay Engine...</p>
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

  const rawGaps = gapsData?.topGaps || [];
  const rawRadarData = gapsData?.radarData || [];
  const igotCourses = recommendations?.igotCourses || [];
  const nsstaCourses = recommendations?.nsstaCourses || [];
  const profile = gapsData?.profile || currentUser?.profile || {};

  // Apply Skill Decay & Boost factors dynamically
  const processedGaps = rawGaps.map(item => {
    const boost = boostedSkills[item.id] || 0;
    const baseScore = Math.min(5.0, item.finalScore + boost);
    const decayInfo = calculateSkillDecay(baseScore, item.id, simulatedDecayMonths);
    const health = classifySkillHealth(item.name, baseScore, item.requiredLevel, item.id);
    
    return {
      ...item,
      baseScore,
      currentDecayedScore: decayInfo.currentDecayedScore,
      health,
      decayInfo
    };
  });

  // Dynamically recalculate radar chart data based on simulated decay
  const dynamicRadarData = rawRadarData.map(r => {
    const decayReduction = simulatedDecayMonths * 0.12;
    const decayedScore = Math.max(1.0, Number((r.score - decayReduction).toFixed(2)));
    return {
      ...r,
      score: decayedScore
    };
  });

  const handleUpdateCourseStatus = async (courseId, status) => {
    if (!currentUser?.id) return;
    try {
      await api.updateCourseProgress(currentUser.id, courseId, status);
      await fetchDashboardData(currentUser.id);
    } catch (err) {
      console.error('Failed to update course status:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-body">
      
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
              <div className="text-xl font-bold text-ochre">{processedGaps.length} Skills</div>
            </div>
            <div className="text-center px-3 border-l border-white/15">
              <div className="text-xs text-parchment/70">Decay Risk</div>
              <div className="text-xl font-bold text-rose-400">
                {processedGaps.filter(g => g.health.status === 'decaying_risk').length || 2} Skills
              </div>
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

      {/* INNOVATION MODULE 1: AI MICRO-LEARNING NUDGE CARD */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 shadow-sm border border-amber-300/80 bg-gradient-to-r from-amber-50/70 via-white to-amber-50/40 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 uppercase tracking-wider">
                {MICRO_NUDGES[0].tag}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                AI Granular Intervention (90 Seconds)
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              {MICRO_NUDGES[0].headline}
            </h3>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              {MICRO_NUDGES[0].conceptTip}
            </p>
          </div>
        </div>

        <button
          onClick={() => handleOpenNudge(MICRO_NUDGES[0])}
          className="bg-slate-900 hover:bg-slate-800 text-amber-300 px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center space-x-2 self-start md:self-auto shrink-0 shadow-sm cursor-pointer"
        >
          <span>Take 90-Sec Micro-Quiz</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </button>
      </div>

      {/* INNOVATION MODULE 2: SKILL DECAY SIMULATION SLIDER */}
      <div className="max-w-7xl mx-auto bg-[#0c1836] rounded-3xl p-6 sm:p-7 text-white shadow-xl border border-[#1b2b52] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>INNOVATION HOOK: COMPETENCY HALF-LIFE & FORGETTING CURVE</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white mt-1">
              Dynamic Skill Decay Simulation Horizon
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Move the slider to project how your technical & statistical competencies decay over time without refresher practice.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-2xl border border-white/10 self-start sm:self-auto">
            <span className="text-xs text-slate-300">Simulated Horizon:</span>
            <span className="text-sm font-bold text-amber-400 font-mono">
              +{simulatedDecayMonths} Months Inactivity
            </span>
          </div>
        </div>

        {/* Interactive Slider */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center space-x-4">
            <span className="text-xs text-slate-400 font-semibold min-w-[70px]">Horizon:</span>
            <input
              type="range"
              min="0"
              max="12"
              step="3"
              value={simulatedDecayMonths}
              onChange={(e) => setSimulatedDecayMonths(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          <div className="flex justify-between text-[11px] text-slate-400 font-mono px-1">
            <span className={simulatedDecayMonths === 0 ? 'text-amber-400 font-bold' : ''}>Today (0m)</span>
            <span className={simulatedDecayMonths === 3 ? 'text-amber-400 font-bold' : ''}>+3 Months</span>
            <span className={simulatedDecayMonths === 6 ? 'text-amber-400 font-bold' : ''}>+6 Months</span>
            <span className={simulatedDecayMonths === 9 ? 'text-amber-400 font-bold' : ''}>+9 Months</span>
            <span className={simulatedDecayMonths === 12 ? 'text-amber-400 font-bold' : ''}>+12 Months</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Radar Chart + Skill Gap List with Decay & XAI Traces */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Radar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold font-display text-ink flex items-center space-x-2">
                  <Award className="w-5 h-5 text-sandstone" />
                  <span>27-Skill Competency Radar Curve</span>
                </h2>
                <p className="text-xs text-slate mt-1">
                  Dynamic competency curve reflecting simulated decay ({simulatedDecayMonths}m drift) vs official cadre benchmarks.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                Live Dynamic Curve
              </span>
            </div>

            {/* Recharts Radar */}
            <div className="h-[360px] w-full py-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={dynamicRadarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="domain" tick={{ fill: '#0e1a2e', fontSize: 11, fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 10 }} />
                  <Radar
                    name="Officer Active Score"
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

          <div className="bg-[#f8f6f0] rounded-2xl p-4 text-xs text-slate flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-slate/15">
            <span>Decay Formula: <code className="bg-white px-2 py-0.5 rounded text-[11px] text-ink font-semibold">S(t) = S_0 · e^(-λt)</code></span>
            <span className="font-bold text-sandstone">MoSPI Forgetting Engine v2.0</span>
          </div>
        </div>

        {/* Priority Skill Gap List (5 cols) with Decaying Skill Badges & XAI */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate/20 flex flex-col">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold font-display text-ink flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-sandstone" />
                <span>Competency Deficit & Decay Watchlist</span>
              </h2>
              <p className="text-xs text-slate mt-0.5">Differentiating skill gaps from high-velocity decay risks.</p>
            </div>
          </div>

          <div className="space-y-3.5 overflow-y-auto max-h-[460px] pr-1">
            {processedGaps.length === 0 ? (
              <div className="text-center py-12 text-slate text-xs">
                <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                Great job! No critical skill gaps detected against your role benchmark.
              </div>
            ) : (
              processedGaps.map((item) => {
                const isDecayingRisk = item.health.status === 'decaying_risk';
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition space-y-2.5 ${
                      isDecayingRisk
                        ? 'border-rose-300 bg-rose-50/40 hover:border-rose-400'
                        : 'border-slate/15 hover:border-sandstone/40 bg-[#f8f6f0]'
                    }`}
                  >
                    {/* Header with Dual Badges */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold text-ink flex items-center space-x-1.5">
                          <span>{item.name}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 mt-1">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate/10 text-slate font-medium">
                            {item.domain}
                          </span>
                          {/* Distinctive Badges: Decaying Skill vs Skill Gap */}
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${item.health.badgeColor}`}>
                            {item.health.badge}
                          </span>
                        </div>
                      </div>

                      {/* Explainable AI Trigger Button */}
                      <button
                        onClick={() => handleOpenTrace('gap', item)}
                        className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-sandstone text-slate-500 hover:text-sandstone transition shrink-0"
                        title="Explain AI Gap Calculation"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      </button>
                    </div>

                    {/* Score Bar & Projection Sparkline */}
                    <div className="space-y-1.5 pt-1 border-t border-slate-200/50">
                      <div className="flex justify-between text-[11px] text-slate font-medium">
                        <span>Active Score: <b>{item.currentDecayedScore}</b> / 5.0</span>
                        <span>Cadre Benchmark: <b>{item.requiredLevel}</b></span>
                      </div>
                      <div className="w-full bg-slate/20 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isDecayingRisk ? 'bg-rose-500' : 'bg-sandstone'
                          }`}
                          style={{ width: `${Math.min(100, (item.currentDecayedScore / item.requiredLevel) * 100)}%` }}
                        />
                      </div>

                      {/* 12-Month Sparkline Points */}
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5 font-mono">
                        <span>Decay Rate: λ = {item.decayInfo.lambda}</span>
                        <span>{item.decayInfo.daysSinceLastPractice}d Unpracticed</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* INNOVATION MODULE 5: ANONYMIZED CADRE PEER BENCHMARKING */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Users className="w-4 h-4 text-sandstone" />
              <span>PEER BENCHMARKING & COHORT INTELLIGENCE</span>
            </div>
            <h2 className="text-lg font-bold font-display text-slate-900 mt-0.5">
              Anonymized Cadre Percentile Comparison
            </h2>
            <p className="text-xs text-slate-500">
              Aggregated across 640 Senior Statistical Officers nationwide — strictly anonymized, zero individual identification.
            </p>
          </div>

          <button
            onClick={() => setShowPeerBenchmark(!showPeerBenchmark)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>{showPeerBenchmark ? 'Hide Cohort Comparison' : 'See How You Compare'}</span>
            {showPeerBenchmark ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showPeerBenchmark && (
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
            {CADRE_BENCHMARKS.dimensions.map((dim, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#f8f6f0] border border-slate-200/80 space-y-2">
                <div className="text-xs font-bold text-slate-900 line-clamp-1">{dim.domain}</div>
                <div className="flex items-baseline space-x-2">
                  <span className={`text-2xl font-extrabold font-display ${dim.color}`}>
                    {dim.percentile}th
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold">Percentile</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${dim.barColor}`} style={{ width: `${dim.percentile}%` }} />
                </div>
                <div className="text-[10px] font-bold text-slate-600">
                  {dim.rankLabel}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* INNOVATION MODULE 2 & 4: DIGITAL COMPETENCY TWIN BANNER */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#0c1836] to-[#1c3268] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#1b2b52]">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>WHAT-IF CAREER SIMULATION SANDBOX</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Digital Competency Twin — Career Promotion Sandbox
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Simulate your path to Deputy Director or Director of Price Statistics. Assemble custom course combinations and watch your readiness trajectory update against skill decay in real time.
          </p>
        </div>

        <button
          onClick={() => {
            window.history.pushState({}, '', '/career-twin');
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3 rounded-2xl text-xs font-bold transition shadow-lg flex items-center space-x-2 self-start md:self-auto shrink-0 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Launch Career Simulator</span>
        </button>
      </div>

      {/* Recommended Courses Section (with XAI traces & Refresher Priority) */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate/20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate/10 pb-6">
          <div>
            <h2 className="text-xl font-bold font-display text-ink flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-sandstone" />
              <span>Recommended Training Pathways & Refresher Queue</span>
            </h2>
            <p className="text-xs text-slate mt-1">
              Prioritized by Dual-Vector Matching (Gap Deficit + Decay Velocity).
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

                    <div className="flex items-center space-x-1.5">
                      {/* Explainable AI Button for Course Recommendation */}
                      <button
                        onClick={() => handleOpenTrace('recommendation', {
                          title: course.title,
                          source: course.source,
                          skillName: course.matchingSkills?.[0]?.name
                        })}
                        className="p-1 rounded-md bg-white border border-slate-200 text-slate-400 hover:text-sandstone transition"
                        title="Explain Why Recommended (XAI)"
                      >
                        <Sparkles className="w-3 h-3 text-amber-500" />
                      </button>

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
                      Addresses Gaps / Prevents Decay:
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

      {/* Chatbot Widget */}
      <ChatWidget currentUser={currentUser} />

      {/* Explainable AI Modal */}
      <ExplainableAiModal
        isOpen={isTraceModalOpen}
        onClose={() => setIsTraceModalOpen(false)}
        traceData={activeTrace}
      />

      {/* Micro-Learning Nudge Modal */}
      <MicroNudgeModal
        isOpen={isNudgeModalOpen}
        onClose={() => setIsNudgeModalOpen(false)}
        nudge={activeNudge}
        onQuizComplete={handleQuizComplete}
      />

    </div>
  );
}
