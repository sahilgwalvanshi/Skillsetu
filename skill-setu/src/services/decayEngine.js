/**
 * Skill Setu — Innovation & AI Reasoning Engine
 * Provides deterministic simulation models for:
 * 1. Competency Half-Life & Skill Decay (Ebbinghaus Forgetting Curve)
 * 2. Explainable AI (XAI) Mathematical Decision Traces
 * 3. Digital Competency Twin Career Simulator
 * 4. Micro-Learning Nudges & Rapid-Fire Concept Challenges
 * 5. Anonymized Cadre Peer Benchmarks
 * 6. Admin Cadre Anomaly Detection Flags
 */

// Skill decay parameters by domain & type
export const SKILL_DECAY_PROFILES = {
  'stat-1': { halfLifeMonths: 14, lambda: 0.049, daysSinceLastPractice: 210, difficulty: 'Core' },
  'stat-2': { halfLifeMonths: 9, lambda: 0.077, daysSinceLastPractice: 320, difficulty: 'High' },
  'stat-3': { halfLifeMonths: 18, lambda: 0.038, daysSinceLastPractice: 90, difficulty: 'Core' },
  'tech-1': { halfLifeMonths: 6, lambda: 0.115, daysSinceLastPractice: 240, difficulty: 'High-Decay' },
  'tech-2': { halfLifeMonths: 8, lambda: 0.086, daysSinceLastPractice: 180, difficulty: 'High-Decay' },
  'tech-5': { halfLifeMonths: 7, lambda: 0.099, daysSinceLastPractice: 270, difficulty: 'High-Decay' },
  'gov-1': { halfLifeMonths: 12, lambda: 0.058, daysSinceLastPractice: 340, difficulty: 'Regulatory' },
  'gov-2': { halfLifeMonths: 16, lambda: 0.043, daysSinceLastPractice: 120, difficulty: 'Standard' },
  'beh-1': { halfLifeMonths: 24, lambda: 0.028, daysSinceLastPractice: 60, difficulty: 'Durable' },
  'beh-2': { halfLifeMonths: 20, lambda: 0.035, daysSinceLastPractice: 75, difficulty: 'Durable' }
};

/**
 * Calculates current decayed score and future projection curve
 * Formula: S(t) = max(1.0, S_0 * e^(-lambda * (months)))
 */
export function calculateSkillDecay(initialScore, skillId, simulatedAdditionalMonths = 0) {
  const profile = SKILL_DECAY_PROFILES[skillId] || {
    halfLifeMonths: 12,
    lambda: 0.058,
    daysSinceLastPractice: 180,
    difficulty: 'Standard'
  };

  const elapsedMonths = (profile.daysSinceLastPractice / 30) + simulatedAdditionalMonths;
  const currentDecayedScore = Math.max(1.0, Number((initialScore * Math.exp(-profile.lambda * elapsedMonths)).toFixed(2)));

  // Generate 12-month projection curve points: [Now, +3mo, +6mo, +9mo, +12mo]
  const projection = [0, 3, 6, 9, 12].map((m) => {
    const futureMonths = (profile.daysSinceLastPractice / 30) + m;
    const projectedScore = Math.max(1.0, Number((initialScore * Math.exp(-profile.lambda * futureMonths)).toFixed(2)));
    return {
      monthLabel: m === 0 ? 'Now' : `+${m}m`,
      score: projectedScore,
      month: m
    };
  });

  const percentageLost = Math.max(0, Math.round(((initialScore - currentDecayedScore) / initialScore) * 100));

  return {
    initialScore,
    currentDecayedScore,
    daysSinceLastPractice: profile.daysSinceLastPractice,
    halfLifeMonths: profile.halfLifeMonths,
    lambda: profile.lambda,
    percentageLost,
    projection
  };
}

/**
 * Classifies skills into:
 * - 'decaying_risk': currently above/near benchmark, but decaying rapidly (>15% lost or half-life < 8mo)
 * - 'critical_gap': already below benchmark
 * - 'stable': safe from decay and meets benchmark
 */
export function classifySkillHealth(skillName, score, benchmark, skillId) {
  const decay = calculateSkillDecay(score, skillId, 0);
  const gap = Number((benchmark - decay.currentDecayedScore).toFixed(2));

  if (gap > 0.5) {
    return {
      status: 'critical_gap',
      badge: 'Skill Gap',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      gap,
      decay
    };
  }

  if (decay.percentageLost >= 12 || decay.daysSinceLastPractice >= 180) {
    return {
      status: 'decaying_risk',
      badge: 'Decaying Skill (At Risk)',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse',
      gap,
      decay
    };
  }

  return {
    status: 'stable',
    badge: 'Proficient & Retained',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    gap: 0,
    decay
  };
}

/**
 * Generates an Explainable AI (XAI) transparent mathematical trace
 */
export function generateExplainabilityTrace(type, entity) {
  if (type === 'gap') {
    const { name, finalScore, requiredLevel, selfRating, quizScore, experienceYears } = entity;
    return {
      title: `Explainable AI Audit Trace: ${name}`,
      verdict: `Computed Deficit: +${Number((requiredLevel - finalScore).toFixed(2))} against Cadre Benchmark`,
      parameters: [
        { name: 'Self-Reported Rating', value: `${selfRating || 3.0} / 5.0`, weight: '20%', contribution: `${((selfRating || 3.0) * 0.2).toFixed(2)}` },
        { name: 'Verified Diagnostic MCQ Score', value: `${quizScore || 2.4} / 5.0`, weight: '35%', contribution: `${((quizScore || 2.4) * 0.35).toFixed(2)}` },
        { name: 'Service Cadre Experience', value: `${experienceYears || 8} Yrs (Calibrated: 3.5)`, weight: '20%', contribution: '0.70' },
        { name: 'Training History & Recency', value: '14 Months Since Refresh', weight: '15%', contribution: '0.35' },
        { name: 'Official Output Audit Score', value: 'NSS Sample Reports Validation', weight: '10%', contribution: '0.30' }
      ],
      decayFactorApplied: 'λ = 0.086 (8-month dormancy factor applied: -0.32 penalty)',
      nitiAayogCompliance: 'Trace adheres to NITI Aayog Responsible AI Transparency Principles (Section 4.2).'
    };
  }

  if (type === 'recommendation') {
    const { title, source, skillName } = entity;
    return {
      title: `Why was "${title}" recommended?`,
      verdict: `Ranked #1 Priority via Dual-Vector Matching (Gap Deficit + Decay Velocity)`,
      parameters: [
        { name: 'Primary Target Skill', value: skillName || 'Python & Survey Wrangling', weight: 'High Priority', contribution: 'Top 1 Deficit' },
        { name: 'Decay Acceleration Alert', value: 'Skill Half-Life: 6 Months (Unused 240 days)', weight: 'Urgency Multiplier', contribution: '1.45x' },
        { name: 'Accredited MoSPI Provider', value: source === 'nssta' ? 'NSSTA Greater Noida (In-Person)' : 'iGOT Karmayogi (Micro-Module)', weight: 'Institutional', contribution: 'Accredited' },
        { name: 'Promotion Alignment', value: 'Required for Senior Statistical Officer (SSO)', weight: 'Career APAR', contribution: '+0.45 APAR Credit' }
      ],
      decayFactorApplied: 'Intervention scheduled before competency drops beneath minimum operating threshold (3.0).',
      nitiAayogCompliance: 'Algorithmic ranking audit certified transparent and non-discriminatory.'
    };
  }

  return {
    title: 'Explainable AI Decision Trace',
    verdict: 'Deterministic multi-factor algorithmic outcome.',
    parameters: [],
    decayFactorApplied: 'Standard decay profile.',
    nitiAayogCompliance: 'Transparent Gov-AI Framework.'
  };
}

/**
 * Career Simulation Sandbox Models
 */
export const TARGET_ROLES = [
  {
    id: 'deputy-dir-na',
    title: 'Deputy Director, National Accounts Division',
    department: 'National Accounts Division (CSO)',
    currentMatch: 44,
    requiredSkills: [
      { name: 'Index Number Compilation (CPI/WPI)', required: 4.5, current: 3.2 },
      { name: 'Econometric & Predictive Modeling', required: 4.2, current: 2.8 },
      { name: 'Strategic Policy Brief Drafting', required: 4.5, current: 3.5 },
      { name: 'SQL & Database Management', required: 4.0, current: 2.9 }
    ]
  },
  {
    id: 'director-price',
    title: 'Director, Price Statistics & Coordination',
    department: 'Price Statistics Division',
    currentMatch: 52,
    requiredSkills: [
      { name: 'Index Number Compilation (CPI/WPI)', required: 4.8, current: 3.2 },
      { name: 'Python & R Statistical Computing', required: 4.2, current: 2.4 },
      { name: 'Data Privacy & DPDP Act Compliance', required: 4.0, current: 2.7 },
      { name: 'Inter-Departmental Leadership', required: 4.5, current: 3.6 }
    ]
  },
  {
    id: 'joint-dir-nsso',
    title: 'Joint Director, Survey Design & Field Operations',
    department: 'National Sample Survey Office (NSSO)',
    currentMatch: 48,
    requiredSkills: [
      { name: 'Survey Design & Sampling Methods', required: 4.8, current: 3.5 },
      { name: 'Geospatial Data & GIS Mapping', required: 4.4, current: 2.3 },
      { name: 'Python for Survey Microdata Wrangling', required: 4.2, current: 2.4 },
      { name: 'Public Sector Team Leadership', required: 4.5, current: 3.4 }
    ]
  }
];

export const SIMULATION_COURSES = [
  {
    id: 'c-python',
    title: 'iGOT: Python for Survey Microdata Wrangling',
    provider: 'iGOT Karmayogi',
    durationWeeks: 4,
    boostSkills: ['Python & R Statistical Computing', 'Python for Survey Microdata Wrangling'],
    readinessBoost: 14,
    refreshDecay: true
  },
  {
    id: 'c-econometrics',
    title: 'NSSTA TPAC: Advanced Econometrics Masterclass',
    provider: 'NSSTA Greater Noida',
    durationWeeks: 6,
    boostSkills: ['Econometric & Predictive Modeling', 'Index Number Compilation (CPI/WPI)'],
    readinessBoost: 18,
    refreshDecay: true
  },
  {
    id: 'c-dpdp',
    title: 'iGOT: DPDP Act 2023 & Microdata Anonymization',
    provider: 'iGOT Karmayogi',
    durationWeeks: 3,
    boostSkills: ['Data Privacy & DPDP Act Compliance'],
    readinessBoost: 11,
    refreshDecay: false
  },
  {
    id: 'c-gis',
    title: 'NSSTA TPAC: Geospatial Remote Sensing for NSSO',
    provider: 'NSSTA Greater Noida',
    durationWeeks: 5,
    boostSkills: ['Geospatial Data & GIS Mapping'],
    readinessBoost: 16,
    refreshDecay: true
  },
  {
    id: 'c-leadership',
    title: 'NSSTA TPAC: Executive Policy Drafting & APAR Alignment',
    provider: 'NSSTA Leadership Wing',
    durationWeeks: 4,
    boostSkills: ['Strategic Policy Brief Drafting', 'Inter-Departmental Leadership'],
    readinessBoost: 13,
    refreshDecay: false
  }
];

/**
 * Micro-Learning Nudges Database
 */
export const MICRO_NUDGES = [
  {
    id: 'nudge-sql-join',
    skillId: 'tech-2',
    skillName: 'SQL & Database Management',
    tag: 'Dormancy Alert (180 Days Unused)',
    headline: 'Quick Refresher: Resolving Multi-Table Survey Joins in SQLite',
    conceptTip: 'In official survey microdata, always use LEFT JOIN with composite keys (FSU_ID + SSU_ID) to prevent dropping valid non-responding households.',
    quizQuestions: [
      {
        question: 'Which join type preserves all Primary Sample Units (PSUs) even if household sub-blocks have zero interview returns?',
        options: ['INNER JOIN', 'LEFT OUTER JOIN', 'CROSS JOIN', 'FULL OUTER JOIN'],
        correctIndex: 1,
        explanation: 'LEFT OUTER JOIN retains all master frame records from the left table while bringing matching records where available.'
      },
      {
        question: 'When grouping price statistics by State and Commodity, which clause filters aggregated indices exceeding baseline bounds?',
        options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'],
        correctIndex: 1,
        explanation: 'HAVING filters aggregated grouped results (e.g. HAVING AVG(price) > 100), whereas WHERE filters row-level records before grouping.'
      }
    ]
  },
  {
    id: 'nudge-greg-weights',
    skillId: 'stat-1',
    skillName: 'Survey Design & Sampling Methods',
    tag: 'High Velocity Decay Risk',
    headline: 'GREG Multiplier Calibration in Stratified Sampling',
    conceptTip: 'Generalized Regression (GREG) weighting calibrates sample inclusion probabilities against known Census administrative totals to minimize non-sampling drift.',
    quizQuestions: [
      {
        question: 'What is the primary purpose of applying GREG multipliers to NSS household survey returns?',
        options: [
          'To discard outlier responses automatically',
          'To align sample weighted totals with auxiliary Census benchmarks',
          'To encrypt personal identifiers',
          'To compress the microdata file size'
        ],
        correctIndex: 1,
        explanation: 'GREG estimators use known auxiliary demographic totals (Census) to calibrate sample weights and reduce variance.'
      }
    ]
  }
];

/**
 * Anonymized Cadre Cohort Percentiles
 */
export const CADRE_BENCHMARKS = {
  overallPercentile: 78,
  cadreName: 'Senior Statistical Officers (SSO) — MoSPI National Cadre',
  cohortSize: 640,
  dimensions: [
    { domain: 'Statistical Methodology & Sampling', percentile: 84, rankLabel: 'Top 16% in Cadre', color: 'text-emerald-600', barColor: 'bg-emerald-500' },
    { domain: 'Technical & Python Computing', percentile: 62, rankLabel: 'Top 38% in Cadre', color: 'text-blue-600', barColor: 'bg-blue-500' },
    { domain: 'Digital Governance & DPDP Act', percentile: 48, rankLabel: 'Average (Lower 52%)', color: 'text-amber-600', barColor: 'bg-amber-500' },
    { domain: 'Behavioural & Policy Leadership', percentile: 88, rankLabel: 'Top 12% in Cadre', color: 'text-purple-600', barColor: 'bg-purple-500' }
  ]
};

/**
 * Admin Org-Wide AI Anomaly Flag
 */
export const ADMIN_ANOMALY_FLAG = {
  id: 'anomaly-price-stats-2026',
  type: 'Curriculum Divergence & Assessment Inverse Drift',
  severity: 'High Priority Investigation',
  zScore: '+2.84 Sigma Anomaly',
  title: 'Unusual Divergence: Rising Course Certifications vs. Falling Practical Scores',
  division: 'Price Statistics & Coordination Division (CPI/WPI)',
  affectedOfficers: 42,
  description: 'Officers in Price Statistics Division completed 84 iGOT generic data courses (+32% YoY), yet post-training diagnostic quiz scores on Index Laspeyres Compilation declined by 11.4%.',
  rootCauseHypothesis: 'Generic e-learning courses lack MoSPI-specific commodity basket aggregation rules, leading to superficial certificate acquisition without practical competence.',
  recommendedAction: 'Mandate NSSTA TPAC residential masterclass on CPI compilation to replace generic external modules.'
};
