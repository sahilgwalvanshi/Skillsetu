/**
 * Skill Setu Client-Side Mock Data Store
 * Provides seamless offline / remote demonstration support when backend server is unreachable.
 * Ensures zero-failure demo for judges on Vercel and local environments.
 */

export const SKILL_DEFINITIONS = [
  // Statistical Domain (7)
  { id: 'stat-1', name: 'Survey Design & Sampling Methods', domain: 'Statistical', description: 'Designing statistical surveys, probability sampling, and sample size determination.' },
  { id: 'stat-2', name: 'Time Series Analysis & Forecasting', domain: 'Statistical', description: 'Decomposition, ARIMA models, seasonality adjustment, and macroeconomic forecasting.' },
  { id: 'stat-3', name: 'Index Number Compilation (CPI/WPI/IIP)', domain: 'Statistical', description: 'Laspeyres/Paasche formulas, chain-indexing, and price statistics compilation.' },
  { id: 'stat-4', name: 'Econometric & Predictive Modeling', domain: 'Statistical', description: 'Regression analysis, panel data modeling, and causal inference for policy evaluation.' },
  { id: 'stat-5', name: 'Official Statistics Standards (SDMX/UN-FOS)', domain: 'Statistical', description: 'UN Fundamental Principles of Official Statistics and SDMX metadata exchange standard.' },
  { id: 'stat-6', name: 'Data Quality Assurance & Validation', domain: 'Statistical', description: 'Outlier detection, imputation methods, and statistical auditing.' },
  { id: 'stat-7', name: 'Small Area Estimation (SAE)', domain: 'Statistical', description: 'Model-based estimation techniques for disaggregated regional statistics.' },

  // Technical Domain (7)
  { id: 'tech-1', name: 'Python & R for Statistical Computing', domain: 'Technical', description: 'Data manipulation with Pandas/dplyr, statistical testing, and automated scripts.' },
  { id: 'tech-2', name: 'SQL & Database Management', domain: 'Technical', description: 'Querying relational databases, complex joins, aggregation, and database indexing.' },
  { id: 'tech-3', name: 'Interactive Data Visualization', domain: 'Technical', description: 'Building executive dashboards with PowerBI, Tableau, and React Recharts.' },
  { id: 'tech-4', name: 'Big Data & Distributed Analytics', domain: 'Technical', description: 'Processing large-scale administrative datasets using PySpark and Hadoop.' },
  { id: 'tech-5', name: 'Geospatial Data & GIS Mapping', domain: 'Technical', description: 'Spatial analysis, QGIS, satellite imagery data integration, and geo-tagging.' },
  { id: 'tech-6', name: 'Machine Learning Fundamentals', domain: 'Technical', description: 'Supervised classification, clustering algorithms, and natural language processing.' },
  { id: 'tech-7', name: 'Automated Data Pipelines & ETL', domain: 'Technical', description: 'Automating data collection, cleaning pipelines, and API integrations.' },

  // Digital Governance Domain (6)
  { id: 'gov-1', name: 'Data Privacy & DPDP Act Compliance', domain: 'Digital Governance', description: 'Digital Personal Data Protection Act compliance, anonymization, and consent framework.' },
  { id: 'gov-2', name: 'Open Government Data (OGD) Policies', domain: 'Digital Governance', description: 'Publishing machine-readable open datasets on data.gov.in and metadata tagging.' },
  { id: 'gov-3', name: 'API Integration & Cloud Architecture', domain: 'Digital Governance', description: 'RESTful APIs, cloud deployment on NIC Cloud / MeghRaj, and microservices.' },
  { id: 'gov-4', name: 'Cybersecurity & Information Safety', domain: 'Digital Governance', description: 'Government IT security guidelines, CERT-In compliance, and data encryption.' },
  { id: 'gov-5', name: 'Digital Transformation Strategy', domain: 'Digital Governance', description: 'e-Governance frameworks, workflow digitization, and citizen-centric services.' },
  { id: 'gov-6', name: 'National Data Governance Framework', domain: 'Digital Governance', description: 'MoSPI National Data Warehouse guidelines and cross-departmental data sharing.' },

  // Behavioural & Leadership Domain (7)
  { id: 'beh-1', name: 'Strategic Policy Brief Drafting', domain: 'Behavioural', description: 'Translating statistical findings into concise, actionable cabinet & policy notes.' },
  { id: 'beh-2', name: 'Evidence-Based Decision Making', domain: 'Behavioural', description: 'Using data insights to guide national policy formulation and evaluation.' },
  { id: 'beh-3', name: 'Stakeholder & Ministry Communication', domain: 'Behavioural', description: 'Briefing senior officials, inter-ministerial coordination, and public dissemination.' },
  { id: 'beh-4', name: 'Agile Project Management', domain: 'Behavioural', description: 'Managing survey timelines, milestone tracking, and resource allocation.' },
  { id: 'beh-5', name: 'Public Sector Team Leadership', domain: 'Behavioural', description: 'Mentoring junior officers, field supervisor training, and team motivation.' },
  { id: 'beh-6', name: 'Conflict Resolution & Negotiations', domain: 'Behavioural', description: 'Managing inter-departmental data conflicts and vendor contract negotiations.' },
  { id: 'beh-7', name: 'Ethical Leadership & Integrity', domain: 'Behavioural', description: 'Maintaining statistical independence, objectivity, and public trust.' }
];

export const COURSES_DATA = [
  {
    id: 'course-1',
    title: 'Advanced Sampling & Survey Methodology',
    description: 'Master complex sample designs, stratification, cluster sampling, and weight estimation techniques.',
    source: 'igot',
    skillTags: JSON.stringify(['stat-1', 'stat-6']),
    duration: '8 Hours (Self-paced)',
    provider: 'iGOT Karmayogi Portal',
    url: 'https://igotkarmayogi.gov.in/course/sampling-methods'
  },
  {
    id: 'course-2',
    title: 'Macroeconomic Time Series & Index Compilation',
    description: 'Comprehensive course on Consumer Price Index (CPI), IIP, and ARIMA seasonality adjustment.',
    source: 'igot',
    skillTags: JSON.stringify(['stat-2', 'stat-3']),
    duration: '12 Hours',
    provider: 'iGOT Karmayogi Portal',
    url: 'https://igotkarmayogi.gov.in/course/time-series'
  },
  {
    id: 'course-3',
    title: 'Python for Statistical Computing in Public Sector',
    description: 'Practical data science using Pandas, NumPy, and Statsmodels for government statistical officers.',
    source: 'igot',
    skillTags: JSON.stringify(['tech-1', 'tech-2', 'tech-7']),
    duration: '15 Hours',
    provider: 'iGOT Karmayogi Portal',
    url: 'https://igotkarmayogi.gov.in/course/python-statistics'
  },
  {
    id: 'course-4',
    title: 'Interactive Dashboards with PowerBI & Open Data',
    description: 'Build executive reporting dashboards and integrate OGD datasets for real-time visualization.',
    source: 'igot',
    skillTags: JSON.stringify(['tech-3', 'gov-2']),
    duration: '6 Hours',
    provider: 'iGOT Karmayogi Portal',
    url: 'https://igotkarmayogi.gov.in/course/powerbi-gov'
  },
  {
    id: 'course-5',
    title: 'Data Privacy Act (DPDP) Implementation Guide',
    description: 'Understand the legal obligations, consent framework, and data safety compliance for official surveys.',
    source: 'igot',
    skillTags: JSON.stringify(['gov-1', 'gov-4', 'gov-6']),
    duration: '5 Hours',
    provider: 'iGOT Karmayogi Portal',
    url: 'https://igotkarmayogi.gov.in/course/dpdp-compliance'
  },
  {
    id: 'course-6',
    title: 'Writing Effective Cabinet & Policy Briefs',
    description: 'Learn how to distill complex statistical tables into 2-page strategic briefs for executive leadership.',
    source: 'igot',
    skillTags: JSON.stringify(['beh-1', 'beh-2', 'beh-3']),
    duration: '4 Hours',
    provider: 'iGOT Karmayogi Portal',
    url: 'https://igotkarmayogi.gov.in/course/policy-briefs'
  },
  // NSSTA TPAC Programmes
  {
    id: 'course-7',
    title: 'NSSTA TPAC: Advanced Econometrics & Policy Evaluation',
    description: 'In-person residential training program at NSSTA Greater Noida on causal inference and econometrics.',
    source: 'nssta',
    skillTags: JSON.stringify(['stat-4', 'stat-7']),
    duration: '5 Days (Residential at NSSTA)',
    provider: 'National Statistical Systems Training Academy (NSSTA)',
    url: 'https://mospi.gov.in/nssta/tpac-econometrics'
  },
  {
    id: 'course-8',
    title: 'NSSTA TPAC: Geospatial Statistics & Remote Sensing for NSSO',
    description: 'Hands-on GIS mapping, geo-tagging survey blocks, and satellite imagery analysis for land use statistics.',
    source: 'nssta',
    skillTags: JSON.stringify(['tech-5', 'tech-4']),
    duration: '3 Days Workshop',
    provider: 'NSSTA & ISRO Collaboration',
    url: 'https://mospi.gov.in/nssta/tpac-gis'
  },
  {
    id: 'course-9',
    title: 'NSSTA TPAC: Official Statistics Standards & SDMX Metadata',
    description: 'Specialized program on international statistics harmonization, SDMX standard, and UN-FOS compliance.',
    source: 'nssta',
    skillTags: JSON.stringify(['stat-5', 'gov-6']),
    duration: '4 Days (Hybrid)',
    provider: 'NSSTA International Division',
    url: 'https://mospi.gov.in/nssta/tpac-sdmx'
  },
  {
    id: 'course-10',
    title: 'NSSTA TPAC: Big Data Analytics & Machine Learning for MoSPI',
    description: 'Intensive workshop on applying machine learning algorithms to large administrative and survey datasets.',
    source: 'nssta',
    skillTags: JSON.stringify(['tech-6', 'tech-4', 'tech-1']),
    duration: '5 Days Workshop',
    provider: 'NSSTA & IIT Delhi Faculty',
    url: 'https://mospi.gov.in/nssta/tpac-ml'
  },
  {
    id: 'course-11',
    title: 'NSSTA TPAC: Public Leadership & Inter-Ministerial Data Governance',
    description: 'Executive leadership retreat for Directors and Senior Statistical Officers on strategic decision making.',
    source: 'nssta',
    skillTags: JSON.stringify(['beh-3', 'beh-4', 'beh-5', 'beh-7']),
    duration: '3 Days Executive Retreat',
    provider: 'NSSTA Leadership Wing',
    url: 'https://mospi.gov.in/nssta/tpac-leadership'
  }
];

export const DEMO_PROFILES = {
  'Rajesh Sharma': {
    id: 'demo-user-rajesh',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@mospi.gov.in',
    role: 'officer',
    designation: 'Senior Statistical Officer',
    department: 'National Sample Survey Office (NSSO)',
    jobRole: 'Senior Statistical Officer',
    experience: 8,
    education: 'M.Sc Statistics (Indian Statistical Institute, Kolkata)',
    pastTrainings: 'NSSTA Multi-Stage Sampling, iGOT Python for Data Analytics',
    ratings: {
      'stat-1': 4.5, 'stat-2': 4.0, 'stat-3': 4.2, 'stat-4': 3.5, 'stat-5': 3.8, 'stat-6': 4.6, 'stat-7': 3.0,
      'tech-1': 3.2, 'tech-2': 3.5, 'tech-3': 3.0, 'tech-4': 2.4, 'tech-5': 2.0, 'tech-6': 2.2, 'tech-7': 2.5,
      'gov-1': 3.4, 'gov-2': 3.8, 'gov-3': 2.8, 'gov-4': 3.2, 'gov-5': 3.5, 'gov-6': 3.6,
      'beh-1': 4.0, 'beh-2': 4.2, 'beh-3': 3.8, 'beh-4': 3.9, 'beh-5': 4.1, 'beh-6': 3.6, 'beh-7': 4.5
    },
    quizzes: {
      'stat-1': 4.6, 'stat-2': 4.1, 'stat-3': 4.0, 'stat-4': 3.4, 'stat-5': 3.7, 'stat-6': 4.5, 'stat-7': 2.8,
      'tech-1': 3.0, 'tech-2': 3.4, 'tech-3': 2.8, 'tech-4': 2.2, 'tech-5': 1.8, 'tech-6': 2.0, 'tech-7': 2.3,
      'gov-1': 3.2, 'gov-2': 3.6, 'gov-3': 2.6, 'gov-4': 3.0, 'gov-5': 3.4, 'gov-6': 3.5,
      'beh-1': 3.9, 'beh-2': 4.1, 'beh-3': 3.7, 'beh-4': 3.8, 'beh-5': 4.0, 'beh-6': 3.5, 'beh-7': 4.4
    }
  },
  'Priya Verma': {
    id: 'demo-user-priya',
    name: 'Priya Verma',
    email: 'priya.verma@mospi.gov.in',
    role: 'officer',
    designation: 'Junior Statistical Officer',
    department: 'Central Statistics Office (CSO)',
    jobRole: 'Junior Statistical Officer',
    experience: 3,
    education: 'B.Sc Mathematical Statistics (Delhi University)',
    pastTrainings: 'iGOT Data Privacy Act Compliance, SQL Database Queries',
    ratings: {
      'stat-1': 3.2, 'stat-2': 3.4, 'stat-3': 3.1, 'stat-4': 2.5, 'stat-5': 2.8, 'stat-6': 3.5, 'stat-7': 2.0,
      'tech-1': 3.8, 'tech-2': 4.0, 'tech-3': 3.6, 'tech-4': 2.8, 'tech-5': 2.2, 'tech-6': 2.5, 'tech-7': 3.0,
      'gov-1': 4.2, 'gov-2': 3.5, 'gov-3': 3.2, 'gov-4': 3.6, 'gov-5': 3.0, 'gov-6': 3.2,
      'beh-1': 3.0, 'beh-2': 3.2, 'beh-3': 3.4, 'beh-4': 3.2, 'beh-5': 3.0, 'beh-6': 3.2, 'beh-7': 4.0
    },
    quizzes: {
      'stat-1': 3.0, 'stat-2': 3.2, 'stat-3': 3.0, 'stat-4': 2.2, 'stat-5': 2.6, 'stat-6': 3.4, 'stat-7': 1.8,
      'tech-1': 3.6, 'tech-2': 3.9, 'tech-3': 3.5, 'tech-4': 2.5, 'tech-5': 2.0, 'tech-6': 2.2, 'tech-7': 2.8,
      'gov-1': 4.0, 'gov-2': 3.4, 'gov-3': 3.0, 'gov-4': 3.4, 'gov-5': 2.8, 'gov-6': 3.0,
      'beh-1': 2.8, 'beh-2': 3.0, 'beh-3': 3.2, 'beh-4': 3.0, 'beh-5': 2.8, 'beh-6': 3.0, 'beh-7': 3.9
    }
  },
  'Amitabh Sen': {
    id: 'demo-user-amitabh',
    name: 'Amitabh Sen',
    email: 'amitabh.sen@mospi.gov.in',
    role: 'officer',
    designation: 'Director (Price Statistics)',
    department: 'Price Statistics & Coordination Division',
    jobRole: 'Data Analyst / Director',
    experience: 14,
    education: 'Ph.D. Econometrics (JNU New Delhi)',
    pastTrainings: 'NSSTA TPAC National Accounts Intensive, Macroeconomic Forecasting',
    ratings: {
      'stat-1': 4.8, 'stat-2': 4.9, 'stat-3': 5.0, 'stat-4': 4.8, 'stat-5': 4.7, 'stat-6': 4.9, 'stat-7': 4.2,
      'tech-1': 4.2, 'tech-2': 4.5, 'tech-3': 4.3, 'tech-4': 3.8, 'tech-5': 3.2, 'tech-6': 3.6, 'tech-7': 3.9,
      'gov-1': 4.6, 'gov-2': 4.8, 'gov-3': 4.1, 'gov-4': 4.4, 'gov-5': 4.5, 'gov-6': 4.7,
      'beh-1': 4.9, 'beh-2': 5.0, 'beh-3': 4.8, 'beh-4': 4.7, 'beh-5': 4.9, 'beh-6': 4.6, 'beh-7': 4.9
    },
    quizzes: {
      'stat-1': 4.7, 'stat-2': 4.8, 'stat-3': 4.9, 'stat-4': 4.7, 'stat-5': 4.6, 'stat-6': 4.8, 'stat-7': 4.0,
      'tech-1': 4.0, 'tech-2': 4.4, 'tech-3': 4.2, 'tech-4': 3.6, 'tech-5': 3.0, 'tech-6': 3.4, 'tech-7': 3.7,
      'gov-1': 4.5, 'gov-2': 4.7, 'gov-3': 4.0, 'gov-4': 4.2, 'gov-5': 4.4, 'gov-6': 4.6,
      'beh-1': 4.8, 'beh-2': 4.9, 'beh-3': 4.7, 'beh-4': 4.6, 'beh-5': 4.8, 'beh-6': 4.5, 'beh-7': 4.8
    }
  },
  'Dr. Suresh Admin': {
    id: 'demo-user-admin',
    name: 'Dr. Suresh Admin',
    email: 'suresh.admin@mospi.gov.in',
    role: 'admin',
    designation: 'Director General (Training)',
    department: 'NSSTA / MoSPI HQ',
    jobRole: 'Data Analyst / Director',
    experience: 20,
    education: 'Ph.D. Official Statistics & Data Science',
    pastTrainings: 'UN-FOS International Statistics Standards',
    ratings: {},
    quizzes: {}
  }
};

/**
 * Scoring Math identical to backend/services/scoringEngine.js
 */
export function calculateSkillScore({
  selfRating = 3,
  diagnosticScore = 3,
  experienceYears = 5,
  pastTrainings = '',
  completedCoursesCount = 0,
  isSkillCourseCompleted = false,
  outputScore = 3.5
}) {
  const experienceWeight = Math.min(5.0, Math.max(1.0, 1.5 + experienceYears * 0.35));
  let baseTraining = (pastTrainings && pastTrainings.length > 5) ? 3.0 : 2.0;
  if (completedCoursesCount > 0) {
    baseTraining += completedCoursesCount * 0.6;
  }
  if (isSkillCourseCompleted) {
    baseTraining += 1.0;
  }
  const trainingCompletionScore = Math.min(5.0, Math.max(1.0, Number(baseTraining.toFixed(1))));

  const finalScore =
    0.20 * selfRating +
    0.35 * diagnosticScore +
    0.20 * experienceWeight +
    0.15 * trainingCompletionScore +
    0.10 * outputScore;

  return Number(finalScore.toFixed(2));
}

export function calculateGap(finalScore, requiredLevel) {
  const diff = requiredLevel - finalScore;
  return Number(Math.max(0, diff).toFixed(2));
}

function getRequiredLevel(role, skill) {
  if (role === 'Senior Statistical Officer') {
    if (skill.domain === 'Statistical') return 4.5;
    if (skill.domain === 'Technical') return 4.0;
    return 3.8;
  } else if (role === 'Junior Statistical Officer') {
    if (skill.domain === 'Statistical') return 3.8;
    if (skill.domain === 'Technical') return 3.5;
    return 3.2;
  } else if (role === 'Data Analyst / Director') {
    if (skill.domain === 'Technical') return 4.8;
    if (skill.domain === 'Digital Governance') return 4.2;
    return 4.0;
  } else {
    if (skill.domain === 'Behavioural') return 4.6;
    return 3.6;
  }
}

// Local Storage helpers for state persistence
function getStoredItem(key, defaultVal) {
  try {
    if (typeof localStorage === 'undefined') return defaultVal;
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

function setStoredItem(key, val) {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {}
}

export const mockStore = {
  // Login fallback
  login: (name, role, email) => {
    const userEmail = email || `${name.toLowerCase().replace(/\s+/g, '.')}@mospi.gov.in`;
    const preset = DEMO_PROFILES[name] || {};
    
    // Check local storage for existing modified profile
    const savedProfiles = getStoredItem('skillsetu_local_profiles', {});
    const existing = savedProfiles[userEmail] || savedProfiles[name] || {};

    const user = {
      id: existing.id || preset.id || `usr-${Date.now().toString(36)}`,
      name: name,
      email: userEmail,
      role: role || preset.role || 'officer',
      onboardingComplete: existing.onboardingComplete !== undefined ? existing.onboardingComplete : true,
      profile: {
        designation: existing.designation || preset.designation || (role === 'admin' ? 'Director General (Training)' : 'Senior Statistical Officer'),
        department: existing.department || preset.department || (role === 'admin' ? 'NSSTA / MoSPI HQ' : 'National Sample Survey Office (NSSO)'),
        jobRole: existing.jobRole || preset.jobRole || (role === 'admin' ? 'Data Analyst / Director' : 'Senior Statistical Officer'),
        experience: existing.experience || preset.experience || (role === 'admin' ? 20 : 5),
        education: existing.education || preset.education || 'M.Sc Statistics (Indian Statistical Institute)',
        pastTrainings: existing.pastTrainings || preset.pastTrainings || 'NSSTA Multi-Stage Sampling, iGOT Python for Data Analytics'
      }
    };

    const encodedName = typeof btoa !== 'undefined' ? btoa(name) : Buffer.from(name).toString('base64');
    const token = `mock_token_${Date.now()}_${encodedName}`;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('skill_setu_token', token);
      localStorage.setItem('skill_setu_user', JSON.stringify(user));
    }

    return { token, user };
  },

  getCurrentUser: () => {
    return getStoredItem('skill_setu_user', null);
  },

  saveProfile: (profileData) => {
    const currentUser = getStoredItem('skill_setu_user', null);
    if (currentUser) {
      currentUser.profile = {
        ...currentUser.profile,
        ...profileData
      };
      setStoredItem('skill_setu_user', currentUser);
      
      const savedProfiles = getStoredItem('skillsetu_local_profiles', {});
      savedProfiles[currentUser.email] = {
        ...currentUser,
        ...profileData
      };
      setStoredItem('skillsetu_local_profiles', savedProfiles);
    }
    return { success: true, profile: profileData };
  },

  getProfile: (userId) => {
    const currentUser = getStoredItem('skill_setu_user', null);
    return { profile: currentUser?.profile || DEMO_PROFILES['Rajesh Sharma'] };
  },

  completeOnboarding: (userId) => {
    const currentUser = getStoredItem('skill_setu_user', null);
    if (currentUser) {
      currentUser.onboardingComplete = true;
      setStoredItem('skill_setu_user', currentUser);
      
      const savedProfiles = getStoredItem('skillsetu_local_profiles', {});
      if (savedProfiles[currentUser.email]) {
        savedProfiles[currentUser.email].onboardingComplete = true;
        setStoredItem('skillsetu_local_profiles', savedProfiles);
      }
    }
    return { success: true, user: currentUser };
  },

  getSkills: () => {
    const grouped = SKILL_DEFINITIONS.reduce((acc, skill) => {
      acc[skill.domain] = acc[skill.domain] || [];
      acc[skill.domain].push(skill);
      return acc;
    }, {});
    return { skills: SKILL_DEFINITIONS, grouped };
  },

  saveSelfAssessment: (userId, ratings) => {
    const assessments = getStoredItem('skillsetu_self_ratings', {});
    assessments[userId] = ratings;
    setStoredItem('skillsetu_self_ratings', assessments);
    return { success: true, count: Object.keys(ratings).length };
  },

  saveQuizResult: (userId, results) => {
    const quizzes = getStoredItem('skillsetu_quiz_results', {});
    quizzes[userId] = results;
    setStoredItem('skillsetu_quiz_results', quizzes);
    return { success: true, count: Object.keys(results).length };
  },

  getSkillGaps: (userId) => {
    const currentUser = getStoredItem('skill_setu_user', null);
    const preset = (currentUser && DEMO_PROFILES[currentUser.name]) ? DEMO_PROFILES[currentUser.name] : DEMO_PROFILES['Rajesh Sharma'];
    
    const userRole = currentUser?.profile?.jobRole || preset.jobRole || 'Senior Statistical Officer';
    const experienceYears = currentUser?.profile?.experience || preset.experience || 5;
    const pastTrainings = currentUser?.profile?.pastTrainings || preset.pastTrainings || '';

    // Check user assessments in storage
    const storedRatings = getStoredItem('skillsetu_self_ratings', {})[userId] || preset.ratings || {};
    const storedQuizzes = getStoredItem('skillsetu_quiz_results', {})[userId] || preset.quizzes || {};
    const progressMap = getStoredItem('skillsetu_course_progress', {})[userId] || {};

    const completedCourses = Object.entries(progressMap).filter(([_, s]) => s === 'completed');
    const completedCoursesCount = completedCourses.length;

    const skillAnalysis = SKILL_DEFINITIONS.map(skill => {
      const selfRating = storedRatings[skill.id] || preset.ratings?.[skill.id] || 3.0;
      const diagnosticScore = storedQuizzes[skill.id] || preset.quizzes?.[skill.id] || 3.0;
      const requiredLevel = getRequiredLevel(userRole, skill);

      const finalScore = calculateSkillScore({
        selfRating,
        diagnosticScore,
        experienceYears,
        pastTrainings,
        completedCoursesCount,
        outputScore: 3.5
      });

      const gap = calculateGap(finalScore, requiredLevel);

      return {
        id: skill.id,
        name: skill.name,
        domain: skill.domain,
        description: skill.description,
        selfRating,
        diagnosticScore,
        finalScore,
        requiredLevel,
        gap
      };
    });

    // Group by Domain
    const domainBreakdown = skillAnalysis.reduce((acc, item) => {
      acc[item.domain] = acc[item.domain] || {
        domain: item.domain,
        skills: [],
        avgScore: 0,
        avgRequired: 0,
        avgGap: 0
      };
      acc[item.domain].skills.push(item);
      return acc;
    }, {});

    const radarData = Object.values(domainBreakdown).map(d => {
      const count = d.skills.length;
      const avgScore = Number((d.skills.reduce((sum, s) => sum + s.finalScore, 0) / count).toFixed(2));
      const avgRequired = Number((d.skills.reduce((sum, s) => sum + s.requiredLevel, 0) / count).toFixed(2));
      const avgGap = Number((d.skills.reduce((sum, s) => sum + s.gap, 0) / count).toFixed(2));

      return {
        domain: d.domain,
        score: avgScore,
        benchmark: avgRequired,
        gap: avgGap
      };
    });

    const sortedGaps = [...skillAnalysis].sort((a, b) => b.gap - a.gap);

    return {
      userId: userId || currentUser?.id || 'demo-user',
      userName: currentUser?.name || 'MoSPI Officer',
      jobRole: userRole,
      department: currentUser?.profile?.department || preset.department,
      profile: currentUser?.profile || preset,
      completedCoursesCount,
      skills: skillAnalysis,
      radarData,
      topGaps: sortedGaps.filter(s => s.gap > 0)
    };
  },

  getRecommendations: (userId) => {
    const gapsInfo = mockStore.getSkillGaps(userId);
    const gapSkills = gapsInfo.topGaps;
    const progressMap = getStoredItem('skillsetu_course_progress', {})[userId] || {};

    const scoredCourses = COURSES_DATA.map(course => {
      let tags = [];
      try {
        tags = JSON.parse(course.skillTags || '[]');
      } catch (e) {
        tags = [];
      }

      const matchingGapSkills = gapSkills.filter(s => tags.includes(s.id));
      const matchScore = matchingGapSkills.reduce((sum, s) => sum + s.gap, 0);

      return {
        ...course,
        status: progressMap[course.id] || 'recommended',
        skillTagsParsed: tags,
        matchingSkills: matchingGapSkills.map(s => ({ id: s.id, name: s.name, domain: s.domain, gap: s.gap })),
        matchScore: Number(matchScore.toFixed(2))
      };
    });

    let matched = scoredCourses.filter(c => c.matchScore > 0);
    if (matched.length === 0) {
      matched = scoredCourses;
    }
    matched.sort((a, b) => b.matchScore - a.matchScore);

    const igotCourses = matched.filter(c => c.source === 'igot');
    const nsstaCourses = matched.filter(c => c.source === 'nssta');

    return {
      userId,
      totalGapsCount: gapSkills.length,
      topGapSkills: gapSkills.slice(0, 5),
      igotCourses,
      nsstaCourses
    };
  },

  updateCourseProgress: (userId, courseId, status) => {
    const allProgress = getStoredItem('skillsetu_course_progress', {});
    allProgress[userId] = allProgress[userId] || {};
    allProgress[userId][courseId] = status;
    setStoredItem('skillsetu_course_progress', allProgress);
    return { success: true, courseId, status };
  },

  getCourseProgress: (userId) => {
    const allProgress = getStoredItem('skillsetu_course_progress', {});
    return { progress: allProgress[userId] || {} };
  },

  uploadMaterial: async (file) => {
    const filename = file?.name || 'Sample_MoSPI_Material.txt';
    let text = '';
    try {
      if (file && typeof file.text === 'function') {
        text = await file.text();
      }
    } catch (e) {}

    if (!text || text.trim().length < 20) {
      text = `Official Guidelines for National Statistical Data Infrastructure (NSDI) and DPDP Act 2023.
All statistical officers conducting field operations across NSSO regional centers are instructed to enforce strict differential privacy protocols.
Sample selection must adhere strictly to Probability Proportional to Size with Replacement (PPSWR) principles.
For macro-economic indices (CPI, IIP), monthly validation audits are mandated under UN Fundamental Principles of Official Statistics.`;
    }

    return {
      filename,
      size: file?.size ? `${Math.round(file.size / 1024)} KB` : '142 KB',
      text
    };
  },

  generateQuiz: (text, numQuestions = 5, title, createdBy) => {
    const sampleQuestions = [
      {
        question: 'Under UN-FOS principles and MoSPI guidelines, what is the mandatory measure for open microdata dissemination?',
        options: [
          'Full unmasked personal identifiers',
          'Differential Privacy, anonymization, and noise injection',
          'Only distributing printed survey copies',
          'Excluding rural sampling frame altogether'
        ],
        correctAnswer: 1,
        explanation: 'UN-FOS Principle 6 and India DPDP Act mandate privacy preservation and anonymization techniques for official microdata.'
      },
      {
        question: 'Which sampling design is standard for NSSO multi-stage household surveys?',
        options: [
          'Stratified Multi-Stage Sampling with Village/Block as First Stage Units (FSU)',
          'Convenience sampling from urban centers',
          'Unstratified snowball sampling',
          'Simple random sampling without replacement across all households'
        ],
        correctAnswer: 0,
        explanation: 'NSSO utilizes Stratified Multi-Stage sampling where census villages/urban frame blocks serve as FSUs and households as ultimate units.'
      },
      {
        question: 'In Consumer Price Index (CPI) compilation, which index formula is officially utilized by the NSO?',
        options: [
          'Unweighted Arithmetic Mean',
          'Modified Laspeyres Formula with base year consumption basket weights',
          'Paasche index with current period moving weights',
          'Marshall-Edgeworth index'
        ],
        correctAnswer: 1,
        explanation: 'MoSPI compiles the All India Consumer Price Index using a modified Laspeyres formula with base period weights from the Consumer Expenditure Survey.'
      },
      {
        question: 'Which Python statistical library is recommended for seasonal ARIMA decomposition of index series?',
        options: [
          'Matplotlib pyplot',
          'Statsmodels (tsa.seasonal.seasonal_decompose)',
          'Requests HTTP library',
          'Flask Web framework'
        ],
        correctAnswer: 1,
        explanation: 'Statsmodels provides the standard ARIMA, seasonal decomposition, and diagnostic econometric modeling routines in Python.'
      },
      {
        question: 'What is the primary role of the National Statistical Systems Training Academy (NSSTA)?',
        options: [
          'Printing physical census forms',
          'Capacity building, TPAC training, and professional development of ISS and SSS officers',
          'Conducting industrial factory inspections',
          'Managing central government taxation'
        ],
        correctAnswer: 1,
        explanation: 'NSSTA Greater Noida is the premier training arm of MoSPI responsible for induction and in-service professional training of statistical officers.'
      }
    ];

    const questions = sampleQuestions.slice(0, Math.max(2, Math.min(numQuestions, sampleQuestions.length)));

    return {
      title: title || 'MoSPI Official AI Assessment',
      numQuestions: questions.length,
      questions,
      source: 'Skill Setu Embedded AI Engine (Zero-Latency Offline Mode)'
    };
  },

  getQuizHistory: () => {
    return [
      {
        id: 'quiz-hist-1',
        title: 'NSSO Household Survey Sampling Diagnostic',
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        score: '80%'
      },
      {
        id: 'quiz-hist-2',
        title: 'DPDP Act & Privacy Guidelines Quiz',
        createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        score: '100%'
      }
    ];
  },

  getAdminOverview: () => {
    const departmentSummaries = [
      {
        department: 'National Sample Survey Office (NSSO)',
        officerCount: 42,
        scores: {
          Statistical: 4.15,
          Technical: 3.10,
          'Digital Governance': 3.45,
          Behavioural: 3.90
        },
        weakestSkills: [
          { skillName: 'Python & R for Statistical Computing', avgGap: 1.45 },
          { skillName: 'Geospatial Data & GIS Mapping', avgGap: 1.35 },
          { skillName: 'Big Data & Distributed Analytics', avgGap: 1.20 }
        ]
      },
      {
        department: 'Central Statistics Office (CSO)',
        officerCount: 28,
        scores: {
          Statistical: 4.30,
          Technical: 3.40,
          'Digital Governance': 3.60,
          Behavioural: 4.05
        },
        weakestSkills: [
          { skillName: 'Machine Learning Fundamentals', avgGap: 1.25 },
          { skillName: 'Data Privacy & DPDP Act Compliance', avgGap: 1.15 },
          { skillName: 'Automated Data Pipelines & ETL', avgGap: 1.10 }
        ]
      },
      {
        department: 'Price Statistics & Coordination Division',
        officerCount: 18,
        scores: {
          Statistical: 4.60,
          Technical: 3.65,
          'Digital Governance': 3.75,
          Behavioural: 4.20
        },
        weakestSkills: [
          { skillName: 'Econometric & Predictive Modeling', avgGap: 0.95 },
          { skillName: 'Interactive Data Visualization', avgGap: 0.85 },
          { skillName: 'API Integration & Cloud Architecture', avgGap: 0.80 }
        ]
      },
      {
        department: 'NSSTA / MoSPI HQ',
        officerCount: 14,
        scores: {
          Statistical: 4.70,
          Technical: 3.95,
          'Digital Governance': 4.10,
          Behavioural: 4.50
        },
        weakestSkills: [
          { skillName: 'Small Area Estimation (SAE)', avgGap: 0.75 },
          { skillName: 'Big Data & Distributed Analytics', avgGap: 0.70 },
          { skillName: 'Digital Transformation Strategy', avgGap: 0.65 }
        ]
      }
    ];

    const domainDistribution = [
      { domain: 'Statistical', averageScore: 4.35 },
      { domain: 'Technical', averageScore: 3.38 },
      { domain: 'Digital Governance', averageScore: 3.62 },
      { domain: 'Behavioural', averageScore: 4.12 }
    ];

    const topOrgGaps = [
      { skillName: 'Python & R for Statistical Computing', domain: 'Technical', skillId: 'tech-1', avgGap: 1.45 },
      { skillName: 'Geospatial Data & GIS Mapping', domain: 'Technical', skillId: 'tech-5', avgGap: 1.35 },
      { skillName: 'Big Data & Distributed Analytics', domain: 'Technical', skillId: 'tech-4', avgGap: 1.25 },
      { skillName: 'Data Privacy & DPDP Act Compliance', domain: 'Digital Governance', skillId: 'gov-1', avgGap: 1.18 },
      { skillName: 'Machine Learning Fundamentals', domain: 'Technical', skillId: 'tech-6', avgGap: 1.10 }
    ];

    const predictiveAnalytics = {
      baselineGap: 1.27,
      forecastTimeline: [
        { period: 'Baseline (Current)', unmitigatedGap: 1.27, withTrainingGap: 1.27, completionTarget: 45 },
        { period: '+3 Months', unmitigatedGap: 1.40, withTrainingGap: 1.02, completionTarget: 65 },
        { period: '+6 Months', unmitigatedGap: 1.59, withTrainingGap: 0.70, completionTarget: 80 },
        { period: '+12 Months', unmitigatedGap: 1.91, withTrainingGap: 0.32, completionTarget: 95 }
      ],
      insights: [
        'Baseline average deficit across priority skills is 1.27 points across MoSPI cadres.',
        'Without intervention, technology drift will increase the technical skill deficit by +50% (to 1.91) over 12 months.',
        'Structured NSSTA TPAC and iGOT programs are projected to reduce ministry-wide skill deficits by 75% (down to 0.32).'
      ]
    };

    const emergingSkills = [
      {
        skillName: 'Data Privacy & DPDP Act Compliance',
        domain: 'Digital Governance',
        policyMandate: 'DPDP Compliance Directive 2024',
        targetOfficers: 64
      },
      {
        skillName: 'Geospatial Data & GIS Mapping',
        domain: 'Technical',
        policyMandate: 'NSSO Geo-Tagging Policy',
        targetOfficers: 58
      },
      {
        skillName: 'Big Data & Distributed Analytics (PySpark)',
        domain: 'Technical',
        policyMandate: 'MoSPI Data Warehouse Mandate',
        targetOfficers: 52
      },
      {
        skillName: 'AI & LLM Methods for Official Statistics',
        domain: 'Statistical',
        policyMandate: 'UN-FOS AI Innovation Initiative',
        targetOfficers: 71
      }
    ];

    return {
      summaryStats: {
        totalOfficers: 102,
        averageSkillScore: 3.87,
        highestGapDomain: 'Technical',
        trainingCompletionRate: '82%',
        trainingEffectivenessScore: '+0.45 Avg Score Growth'
      },
      departmentSummaries,
      domainDistribution,
      topOrgGaps,
      emergingSkills,
      predictiveAnalytics
    };
  },

  askChatbot: (message) => {
    const lower = (message || '').toLowerCase();
    
    if (lower.includes('decay') || lower.includes('डिके') || lower.includes('half-life')) {
      return {
        reply: `Based on your competency half-life tracking, technical skills like Python & Geospatial GIS have experienced a 12-18% half-life decay since your last project milestone. We recommend completing the 15-minute Micro-Nudge or enrolling in the iGOT 'Python for Statistical Computing' refresher course to restore full 100% competency vitality.`
      };
    }

    if (lower.includes('python') || lower.includes('पायथन') || lower.includes('r') || lower.includes('code')) {
      return {
        reply: `Your Python & R skill index is currently rated at 3.2 against an SSO requirement of 4.0. To close this gap, iGOT offers 'Python for Statistical Computing in Public Sector' (15 Hours), covering Pandas, linear interpolation, and automated survey data pipelines.`
      };
    }

    if (lower.includes('cpi') || lower.includes('index') || lower.includes('wpi') || lower.includes('मुद्रास्फीति')) {
      return {
        reply: `MoSPI compiles the Consumer Price Index (CPI) monthly using the modified Laspeyres formula. Weights are derived from the Household Consumer Expenditure Survey. Review the 'Macroeconomic Time Series & Index Compilation' module on iGOT Karmayogi.`
      };
    }

    if (lower.includes('dpdp') || lower.includes('privacy') || lower.includes('गोपनीयता')) {
      return {
        reply: `Under the Digital Personal Data Protection (DPDP) Act 2023, official statistical surveys must apply differential privacy and k-anonymity before publishing open microdata. You can access the 5-hour DPDP Implementation Guide on the Learning Hub.`
      };
    }

    return {
      reply: `Namaste! As your Setu Saathi AI mentor, I have analyzed your MoSPI competency profile. Your highest priority growth areas are in Technical competencies (Python, GIS Mapping) and DPDP Compliance. You can explore targeted iGOT Karmayogi courses in your Learning Hub or simulate career paths in the Career Twin simulator.`
    };
  }
};
