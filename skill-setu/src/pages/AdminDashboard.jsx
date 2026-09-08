import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { ShieldCheck, Users, TrendingUp, AlertTriangle, Building2, RefreshCw, Award, Sparkles, LineChart as LineChartIcon, ArrowUpRight, Zap, Target } from 'lucide-react';
import { api } from '../services/api';

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment flex flex-col items-center justify-center p-6">
        <RefreshCw className="w-8 h-8 text-sandstone animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate">Aggregating Organizational Competency Analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-parchment p-8 flex justify-center">
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
    <div className="min-h-screen bg-parchment py-8 px-4 sm:px-6 lg:px-8 space-y-8">
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
            Comprehensive admin analytics monitoring 5 core dimensions: Workforce Competencies, Training Effectiveness, Distribution, Emerging Skills, and Predictive Capacity Planning.
          </p>
        </div>

        <button
          onClick={fetchAdminOverview}
          className="px-4 py-2 bg-parchment hover:bg-slate/10 text-ink text-xs font-semibold rounded-xl border border-slate/20 flex items-center space-x-2 self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Analytics</span>
        </button>
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
              <span>Total Officers Profiled</span>
              <Users className="w-4 h-4 text-sandstone" />
            </div>
            <div className="text-3xl font-bold font-display text-ink">{summaryStats?.totalOfficers}</div>
            <div className="text-[11px] text-slate">Across CSO, NSSO & Price Divisions</div>
          </div>

          {/* Card 2: Org Skill Index */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate/15 space-y-2">
            <div className="flex items-center justify-between text-slate text-xs font-medium">
              <span>Org Skill Index</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-bold font-display text-ink">{summaryStats?.averageSkillScore} <span className="text-xs text-slate font-normal">/ 5.0</span></div>
            <div className="text-[11px] text-emerald-600 font-semibold">{summaryStats?.trainingEffectivenessScore || '+0.45 Score Growth'}</div>
          </div>

          {/* Card 3: Training Completion Rate */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate/15 space-y-2">
            <div className="flex items-center justify-between text-slate text-xs font-medium">
              <span>Training Effectiveness</span>
              <Award className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl font-bold font-display text-ink">{summaryStats?.trainingCompletionRate}</div>
            <div className="text-[11px] text-blue-600 font-semibold">Verified via iGOT & TPAC</div>
          </div>

          {/* Card 4: Highest Gap Domain */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate/15 space-y-2">
            <div className="flex items-center justify-between text-slate text-xs font-medium">
              <span>Highest Gap Domain</span>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold font-display text-sandstone-dark">{summaryStats?.highestGapDomain}</div>
            <div className="text-[11px] text-slate">Targeted NSSTA intervention needed</div>
          </div>
        </div>
      </div>

      {/* 3. COMPETENCY DISTRIBUTION ACROSS DEPARTMENTS & DOMAINS */}
      <div className="max-w-7xl mx-auto space-y-4">
        <h2 className="text-sm font-bold text-slate uppercase tracking-wider flex items-center space-x-2">
          <Building2 className="w-4 h-4 text-sandstone" />
          <span>3. Competency Distribution (Departmental & Domain Breakdown)</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Departmental Competency Comparison Bar Chart (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate/15 space-y-4">
            <div>
              <h3 className="text-lg font-bold font-display text-ink flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-sandstone" />
                <span>Departmental Competency Averages</span>
              </h3>
              <p className="text-xs text-slate mt-1">
                Proficiency comparison across Statistical, Technical, Digital Governance, and Behavioural domains.
              </p>
            </div>

            <div className="h-[320px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={departmentSummaries?.map((d) => ({
                    name: d.department.split(' ')[0],
                    Statistical: d.scores.Statistical,
                    Technical: d.scores.Technical,
                    'Digital Gov': d.scores['Digital Governance'],
                    Behavioural: d.scores.Behavioural
                  }))}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 'bold' }} />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0e1a2e', borderRadius: '10px', color: '#fff', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="Statistical" fill="#0e1a2e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Technical" fill="#b5502e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Digital Gov" fill="#e8a33d" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Behavioural" fill="#7c8a9e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Global Organization Top Skill Gaps (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate/15 space-y-4">
            <div>
              <h3 className="text-lg font-bold font-display text-ink flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-sandstone" />
                <span>Ministry-Wide Top 5 Deficits</span>
              </h3>
              <p className="text-xs text-slate mt-1">
                Competencies with largest average score gap across all active officers.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {topOrgGaps?.map((gap, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl border border-slate/15 bg-parchment/30 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-ink">{gap.skillName}</span>
                    <span className="px-2 py-0.5 rounded bg-sandstone/15 text-sandstone font-bold text-[11px]">
                      Deficit: -{gap.avgGap}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate">
                    <span>Domain: <b>{gap.domain}</b></span>
                    <span className="text-sandstone-dark font-semibold">Priority Intervention</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Competency Distribution Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate/15 space-y-4">
          <div>
            <h3 className="text-lg font-bold font-display text-ink">
              Departmental Competency Distribution Table
            </h3>
            <p className="text-xs text-slate mt-1">
              Detailed breakdown of officer distribution and domain proficiency averages by department.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ink">
              <thead className="bg-parchment text-slate uppercase text-[10px] tracking-wider border-b border-slate/20">
                <tr>
                  <th className="p-4 rounded-l-xl">Department / Division</th>
                  <th className="p-4">Active Officers</th>
                  <th className="p-4">Statistical Avg</th>
                  <th className="p-4">Technical Avg</th>
                  <th className="p-4">Priority Training Needs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate/10">
                {departmentSummaries?.map((dept, idx) => (
                  <tr key={idx} className="hover:bg-parchment/40 transition">
                    <td className="p-4 font-bold text-ink">{dept.department}</td>
                    <td className="p-4 font-semibold text-slate">{dept.officerCount} Officers</td>
                    <td className="p-4 font-bold text-ink">{dept.scores.Statistical} / 5.0</td>
                    <td className="p-4 font-bold text-sandstone">{dept.scores.Technical} / 5.0</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {dept.weakestSkills?.map((ws, wIdx) => (
                          <span
                            key={wIdx}
                            className="px-2 py-1 rounded-md bg-sandstone/10 border border-sandstone/20 text-sandstone text-[11px] font-semibold"
                          >
                            {ws.skillName} (Gap: {ws.avgGap})
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. EMERGING SKILL REQUIREMENTS */}
      <div className="max-w-7xl mx-auto space-y-4">
        <h2 className="text-sm font-bold text-slate uppercase tracking-wider flex items-center space-x-2">
          <Zap className="w-4 h-4 text-sandstone" />
          <span>4. Emerging Skill Requirements (Policy & Technology Directives)</span>
        </h2>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate/15 space-y-6">
          <div>
            <h3 className="text-lg font-bold font-display text-ink flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-sandstone" />
              <span>National Policy-Mandated Competencies</span>
            </h3>
            <p className="text-xs text-slate mt-1">
              Emerging skill mandates identified for MoSPI workforce, with target officer counts calculated directly from SQLite competency gap records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergingSkills?.map((skill, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#f8f6f0] border border-slate/15 flex flex-col justify-between space-y-4 hover:border-sandstone transition">
                <div className="space-y-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 inline-block">
                    Policy Mandate
                  </span>
                  <h4 className="font-bold text-sm text-ink">{skill.skillName}</h4>
                  <div className="text-[11px] font-medium text-sandstone-dark bg-white px-2 py-1 rounded border border-slate/15">
                    📜 {skill.policyMandate}
                  </div>
                  <p className="text-xs text-slate">Domain: <b>{skill.domain}</b></p>
                </div>

                <div className="pt-3 border-t border-slate/15 flex items-center justify-between text-xs">
                  <span className="text-slate text-[11px]">Officers with Gap:</span>
                  <span className="font-bold text-sandstone-dark text-sm">{skill.targetOfficers} Officers</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. PREDICTIVE ANALYTICS FOR FUTURE CAPACITY-BUILDING NEEDS */}
      <div className="max-w-7xl mx-auto space-y-4">
        <h2 className="text-sm font-bold text-slate uppercase tracking-wider flex items-center space-x-2">
          <LineChartIcon className="w-4 h-4 text-sandstone" />
          <span>5. Predictive Analytics for Future Capacity-Building Needs</span>
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
                <span>Unmitigated Drift ($G_0 \times (1 + 0.10t)$)</span>
              </span>
              <span className="flex items-center space-x-1 text-emerald-600">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span>TPAC Mitigation ($G_0 \times (1 - 0.20t)$)</span>
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
