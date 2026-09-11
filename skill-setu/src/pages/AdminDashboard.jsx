import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts';
import {
  ShieldCheck, Users, TrendingUp, AlertTriangle, Building2, RefreshCw, Award,
  Sparkles, LineChart as LineChartIcon, ArrowUpRight, Zap, Target, Activity, CheckCircle2, ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import { ADMIN_ANOMALY_FLAG } from '../services/decayEngine';

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dismissAnomaly, setDismissAnomaly] = useState(false);
  const [scheduledCohorts, setScheduledCohorts] = useState({});

  useEffect(() => {
    fetchAdminOverview();
  }, []);

  const fetchAdminOverview = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getAdminOverview();
      setAdminData(data);
    } catch (err) {
      console.error('Admin dashboard error:', err);
      setError('Failed to load admin overview stats.');
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleCohort = (skillKey) => {
    setScheduledCohorts(prev => ({
      ...prev,
      [skillKey]: true
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment flex flex-col items-center justify-center p-6 font-body">
        <RefreshCw className="w-8 h-8 text-sandstone animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate">Aggregating Organizational Competency & Decay Intelligence...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-parchment p-8 flex justify-center font-body">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-200 text-center max-w-md">
          <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <h3 className="font-bold text-ink mb-2">{error}</h3>
          <button
            onClick={fetchAdminOverview}
            className="px-4 py-2 bg-sandstone text-white text-xs font-semibold rounded-xl"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const { summaryStats, departmentSummaries, topOrgGaps, emergingSkills, predictiveAnalytics } = adminData || {};

  return (
    <div className="min-h-screen bg-parchment py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-body">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-sandstone uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>MoSPI Training & Capacity Building Headquarters</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-ink">
            Organizational Skill Intelligence Dashboard
          </h1>
          <p className="text-xs text-slate mt-1">
            Real-time workforce competency monitoring, half-life decay forecasting, and AI anomaly detection across CSO, NSSO, and Price Statistics divisions.
          </p>
        </div>

        <button
          onClick={fetchAdminOverview}
          className="px-4 py-2 bg-parchment hover:bg-slate/10 text-ink text-xs font-semibold rounded-xl border border-slate/20 flex items-center space-x-2 self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Analytics</span>
        </button>
      </div>

      {/* INNOVATION MODULE 7: AI ANOMALY DETECTION CALLOUT CARD */}
      {!dismissAnomaly && (
        <div className="max-w-7xl mx-auto bg-amber-500/10 border-2 border-amber-500/30 rounded-3xl p-6 shadow-sm relative overflow-hidden space-y-3">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <AlertTriangle className="w-5 h-5 fill-current" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-900 border border-amber-500/30 uppercase tracking-wider">
                    {ADMIN_ANOMALY_FLAG.zScore}
                  </span>
                  <span className="text-xs font-bold text-amber-900">
                    AI Statistical Anomaly Flag: {ADMIN_ANOMALY_FLAG.type}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {ADMIN_ANOMALY_FLAG.title}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed max-w-4xl">
                  {ADMIN_ANOMALY_FLAG.description}
                </p>
                <div className="p-3 rounded-xl bg-white/80 border border-amber-200 text-xs text-slate-800 space-y-1 mt-2">
                  <div>
                    <span className="font-bold text-amber-900">Root-Cause Hypothesis: </span>
                    {ADMIN_ANOMALY_FLAG.rootCauseHypothesis}
                  </div>
                  <div>
                    <span className="font-bold text-emerald-800">Prescribed Intervention: </span>
                    {ADMIN_ANOMALY_FLAG.recommendedAction}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 self-start md:self-auto shrink-0">
              <button
                onClick={() => setDismissAnomaly(true)}
                className="px-4 py-2 bg-white border border-slate-200 text-xs font-bold rounded-xl hover:bg-slate-50 transition"
              >
                Acknowledge Flag
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INNOVATION MODULE 1 (ADMIN): ORG-WIDE AT-RISK DECAYING COMPETENCIES */}
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate uppercase tracking-wider flex items-center space-x-2">
            <Activity className="w-4 h-4 text-rose-600" />
            <span>Org-Wide Competency Half-Life & At-Risk Decaying Skills</span>
          </h2>
          <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold border border-rose-200">
            Predictive Forgetting Model
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Decay Card 1: GIS */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate/15 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 font-bold text-[10px] uppercase">
                Half-Life: 5.2 Months
              </span>
              <span className="text-slate-500 font-semibold text-[11px]">NSSO Field Cadre</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              Geospatial Data & GIS Mapping
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              GIS proficiency is projected to drop below operational standard for <b>42% of Survey Division officers</b> within 4 months due to field non-use.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">λ = 0.099</span>
              {scheduledCohorts['gis'] ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Cohort Scheduled</span>
                </span>
              ) : (
                <button
                  onClick={() => handleScheduleCohort('gis')}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition"
                >
                  Schedule Refresher Cohort
                </button>
              )}
            </div>
          </div>

          {/* Decay Card 2: Python */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate/15 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 font-bold text-[10px] uppercase">
                Half-Life: 6.0 Months
              </span>
              <span className="text-slate-500 font-semibold text-[11px]">CSO & NSSO Data Labs</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              Python for Survey Microdata Wrangling
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pandas aggregation & GREG multiplier scripts at risk of 28% competency drift across <b>38 junior officers</b> unless reinforced by Q3.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">λ = 0.115</span>
              {scheduledCohorts['python'] ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Cohort Scheduled</span>
                </span>
              ) : (
                <button
                  onClick={() => handleScheduleCohort('python')}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition"
                >
                  Schedule Refresher Cohort
                </button>
              )}
            </div>
          </div>

          {/* Decay Card 3: DPDP Act */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate/15 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[10px] uppercase">
                Half-Life: 12.0 Months
              </span>
              <span className="text-slate-500 font-semibold text-[11px]">Dissemination Division</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              Data Privacy & DPDP Act 2023 Compliance
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              k-Anonymity compliance certification mandates periodic re-validation every 180 days to maintain lawful open government release status.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">λ = 0.058</span>
              {scheduledCohorts['dpdp'] ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Cohort Scheduled</span>
                </span>
              ) : (
                <button
                  onClick={() => handleScheduleCohort('dpdp')}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition"
                >
                  Schedule Refresher Cohort
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 1. WORKFORCE COMPETENCIES OVERVIEW & 2. TRAINING EFFECTIVENESS */}
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate uppercase tracking-wider flex items-center space-x-2">
            <Users className="w-4 h-4 text-sandstone" />
            <span>1. Workforce Competencies Overview & 2. Training Effectiveness</span>
          </h2>
          <span className="px-2.5 py-0.5 rounded-full bg-sandstone/10 text-sandstone text-[10px] font-bold">
            Real-Time Aggregation
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Total Officers */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate/15 space-y-2">
            <div className="flex items-center justify-between text-slate text-xs font-medium">
              <span>Total Statistical Officers</span>
              <Users className="w-4 h-4 text-sandstone" />
            </div>
            <div className="text-3xl font-bold font-display text-ink">
              {summaryStats?.totalOfficers || 6}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
              <span>✓ 100% Onboarded & Profiled</span>
            </div>
          </div>

          {/* Card 2: Average Competency Score */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate/15 space-y-2">
            <div className="flex items-center justify-between text-slate text-xs font-medium">
              <span>Ministry Avg Competency Score</span>
              <Award className="w-4 h-4 text-sandstone" />
            </div>
            <div className="text-3xl font-bold font-display text-ink">
              {summaryStats?.avgScore || '3.20'} <span className="text-sm text-slate font-normal">/ 5.0</span>
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+0.45 Avg Score Growth</span>
            </div>
          </div>

          {/* Card 3: Pre vs Post Training Score */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate/15 space-y-2">
            <div className="flex items-center justify-between text-slate text-xs font-medium">
              <span>Training Impact & Growth</span>
              <TrendingUp className="w-4 h-4 text-sandstone" />
            </div>
            <div className="text-3xl font-bold font-display text-ink">
              {summaryStats?.prePostScoreComparison?.postTraining || '3.65'}
            </div>
            <div className="text-[11px] text-slate">
              Baseline: <span className="font-semibold">{summaryStats?.prePostScoreComparison?.preTraining || '2.80'}</span> • Growth: <span className="font-bold text-emerald-600">+{summaryStats?.prePostScoreComparison?.growth || '0.85'}</span>
            </div>
          </div>

          {/* Card 4: iGOT Completion Rate */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate/15 space-y-2">
            <div className="flex items-center justify-between text-slate text-xs font-medium">
              <span>Accredited Completion Rate</span>
              <ShieldCheck className="w-4 h-4 text-sandstone" />
            </div>
            <div className="text-3xl font-bold font-display text-ink">
              {summaryStats?.completionRate || '78%'}
            </div>
            <div className="text-[11px] text-blue-600 font-semibold">
              Verified via iGOT & TPAC
            </div>
          </div>
        </div>
      </div>

      {/* 3. COMPETENCY DISTRIBUTION & GAP BREAKDOWN */}
      <div className="max-w-7xl mx-auto space-y-3">
        <h2 className="text-sm font-bold text-slate uppercase tracking-wider flex items-center space-x-2">
          <Building2 className="w-4 h-4 text-sandstone" />
          <span>3. Competency Distribution Across MoSPI Divisions</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Department Bar Chart (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate/15 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-ink text-base">
                  Average Competency Score by Department
                </h3>
                <p className="text-xs text-slate mt-0.5">
                  Benchmark requirement: 3.50 across all divisions.
                </p>
              </div>
            </div>

            <div className="h-[280px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentSummaries} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="department" tick={{ fontSize: 10, fontWeight: 'bold' }} interval={0} angle={-15} textAnchor="end" />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0e1a2e', borderRadius: '10px', color: '#fff', fontSize: '12px' }} />
                  <Bar dataKey="avgScore" fill="#b5502e" radius={[6, 6, 0, 0]} name="Avg Officer Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top 5 Ministry Skill Gaps (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate/15 space-y-4">
            <div>
              <h3 className="font-bold text-ink text-base flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Top 5 Ministry-Wide Skill Gaps</span>
              </h3>
              <p className="text-xs text-slate mt-0.5">Critical gaps across all divisions.</p>
            </div>

            <div className="space-y-3">
              {topOrgGaps?.map((gap, idx) => (
                <div key={idx} className="p-3 bg-[#f8f6f0] rounded-xl border border-slate/10 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-ink">{gap.name}</span>
                    <span className="font-bold text-sandstone">Gap: +{gap.avgGap}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate">
                    <span>{gap.domain}</span>
                    <span>{gap.affectedOfficers} Officers Affected</span>
                  </div>
                  <div className="w-full bg-slate/20 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-sandstone h-full rounded-full" style={{ width: `${(gap.avgGap / 2.5) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. PREDICTIVE ANALYTICS FOR FUTURE CAPACITY-BUILDING NEEDS */}
      <div className="max-w-7xl mx-auto space-y-4">
        <h2 className="text-sm font-bold text-slate uppercase tracking-wider flex items-center space-x-2">
          <LineChartIcon className="w-4 h-4 text-sandstone" />
          <span>5. Predictive Analytics & 12-Month Capacity Projection</span>
        </h2>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate/15 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate/10 pb-4">
            <div>
              <h3 className="text-lg font-bold font-display text-ink flex items-center space-x-2">
                <Target className="w-5 h-5 text-sandstone" />
                <span>12-Month Skill Deficit Projection Model</span>
              </h3>
              <p className="text-xs text-slate mt-1">
                Forecasted trajectory comparing unmitigated tech drift against structured NSSTA TPAC & iGOT training mitigation.
              </p>
            </div>
            <div className="flex items-center space-x-4 text-xs font-semibold">
              <span className="flex items-center space-x-1 text-red-600">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                <span>Unmitigated Drift</span>
              </span>
              <span className="flex items-center space-x-1 text-emerald-600">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span>TPAC Mitigation</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Predictive Line Chart (8 cols) */}
            <div className="lg:col-span-8 h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={predictiveAnalytics?.forecastTimeline}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="period" tick={{ fontSize: 11, fontWeight: 'bold' }} />
                  <YAxis domain={[0, 2.5]} tick={{ fontSize: 11 }} label={{ value: 'Avg Skill Gap (Deficit)', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#64748b' } }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0e1a2e', borderRadius: '10px', color: '#fff', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="unmitigatedGap" name="Unmitigated Gap Drift" stroke="#ef4444" strokeWidth={3} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="withTrainingGap" name="With TPAC Training Plan" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Predictive AI Insights Card (4 cols) */}
            <div className="lg:col-span-4 bg-[#f8f6f0] rounded-2xl p-6 border border-slate/15 space-y-4">
              <div className="font-bold text-ink text-sm flex items-center space-x-2 border-b border-slate/15 pb-2">
                <Sparkles className="w-4 h-4 text-sandstone" />
                <span>Predictive Projection Model</span>
              </div>
              <div className="text-[11px] bg-white p-2.5 rounded-xl border border-slate/15 text-ink space-y-1">
                <div className="font-bold text-slate uppercase text-[10px]">Formula Model Parameters:</div>
                <div className="text-slate font-mono">Unmitigated Drift: G_0 * (1 + 0.10 * t)</div>
                <div className="text-slate font-mono">TPAC Mitigation: max(0.15, G_0 * (1 - 0.20 * t))</div>
              </div>
              <ul className="space-y-2 text-xs text-slate">
                {predictiveAnalytics?.insights?.map((insight, idx) => (
                  <li key={idx} className="flex items-start space-x-2 leading-relaxed">
                    <span className="text-sandstone font-bold text-sm">▸</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-slate/15 text-[11px] font-bold text-sandstone-dark">
                Recommended Action: Schedule 3 NSSTA TPAC Residential Batches by Q3.
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
