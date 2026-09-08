import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Skill Setu database...');

  // Clean existing data
  await prisma.generatedQuiz.deleteMany({});
  await prisma.roleRequirement.deleteMany({});
  await prisma.courseProgress.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.quizResult.deleteMany({});
  await prisma.selfAssessment.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.skill.deleteMany({});

  // 1. Seed 27 Skills across 4 Domains
  const skillDefinitions = [
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

  const createdSkills = [];
  for (const s of skillDefinitions) {
    const created = await prisma.skill.create({ data: s });
    createdSkills.push(created);
  }
  console.log(`Created ${createdSkills.length} skills.`);

  // 2. Role Requirements Setup (Benchmark Levels out of 5.0)
  const roles = [
    'Senior Statistical Officer',
    'Junior Statistical Officer',
    'Data Analyst / Director',
    'Policy Analyst'
  ];

  const roleReqData = [];
  for (const role of roles) {
    for (const skill of createdSkills) {
      let reqLevel = 3.5;
      if (role === 'Senior Statistical Officer') {
        if (skill.domain === 'Statistical') reqLevel = 4.5;
        else if (skill.domain === 'Technical') reqLevel = 4.0;
        else reqLevel = 3.8;
      } else if (role === 'Junior Statistical Officer') {
        if (skill.domain === 'Statistical') reqLevel = 3.8;
        else if (skill.domain === 'Technical') reqLevel = 3.5;
        else reqLevel = 3.2;
      } else if (role === 'Data Analyst / Director') {
        if (skill.domain === 'Technical') reqLevel = 4.8;
        else if (skill.domain === 'Digital Governance') reqLevel = 4.2;
        else reqLevel = 4.0;
      } else {
        if (skill.domain === 'Behavioural') reqLevel = 4.6;
        else reqLevel = 3.6;
      }
      roleReqData.push({ jobRole: role, skillId: skill.id, requiredLevel: reqLevel });
    }
  }
  for (const item of roleReqData) {
    await prisma.roleRequirement.create({ data: item });
  }
  console.log('Seeded Role Requirements.');

  // 3. Seed Courses (iGOT Karmayogi & NSSTA TPAC)
  const coursesData = [
    // iGOT Karmayogi Courses
    {
      title: 'Advanced Sampling & Survey Methodology',
      description: 'Master complex sample designs, stratification, cluster sampling, and weight estimation techniques.',
      source: 'igot',
      skillTags: JSON.stringify(['stat-1', 'stat-6']),
      duration: '8 Hours (Self-paced)',
      provider: 'iGOT Karmayogi Portal',
      url: 'https://igotkarmayogi.gov.in/course/sampling-methods'
    },
    {
      title: 'Macroeconomic Time Series & Index Compilation',
      description: 'Comprehensive course on Consumer Price Index (CPI), IIP, and ARIMA seasonality adjustment.',
      source: 'igot',
      skillTags: JSON.stringify(['stat-2', 'stat-3']),
      duration: '12 Hours',
      provider: 'iGOT Karmayogi Portal',
      url: 'https://igotkarmayogi.gov.in/course/time-series'
    },
    {
      title: 'Python for Statistical Computing in Public Sector',
      description: 'Practical data science using Pandas, NumPy, and Statsmodels for government statistical officers.',
      source: 'igot',
      skillTags: JSON.stringify(['tech-1', 'tech-2', 'tech-7']),
      duration: '15 Hours',
      provider: 'iGOT Karmayogi Portal',
      url: 'https://igotkarmayogi.gov.in/course/python-statistics'
    },
    {
      title: 'Interactive Dashboards with PowerBI & Open Data',
      description: 'Build executive reporting dashboards and integrate OGD datasets for real-time visualization.',
      source: 'igot',
      skillTags: JSON.stringify(['tech-3', 'gov-2']),
      duration: '6 Hours',
      provider: 'iGOT Karmayogi Portal',
      url: 'https://igotkarmayogi.gov.in/course/powerbi-gov'
    },
    {
      title: 'Data Privacy Act (DPDP) Implementation Guide',
      description: 'Understand the legal obligations, consent framework, and data safety compliance for official surveys.',
      source: 'igot',
      skillTags: JSON.stringify(['gov-1', 'gov-4', 'gov-6']),
      duration: '5 Hours',
      provider: 'iGOT Karmayogi Portal',
      url: 'https://igotkarmayogi.gov.in/course/dpdp-compliance'
    },
    {
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
      title: 'NSSTA TPAC: Advanced Econometrics & Policy Evaluation',
      description: 'In-person residential training program at NSSTA Greater Noida on causal inference and econometrics.',
      source: 'nssta',
      skillTags: JSON.stringify(['stat-4', 'stat-7']),
      duration: '5 Days (Residential at NSSTA)',
      provider: 'National Statistical Systems Training Academy (NSSTA)',
      url: 'https://mospi.gov.in/nssta/tpac-econometrics'
    },
    {
      title: 'NSSTA TPAC: Geospatial Statistics & Remote Sensing for NSSO',
      description: 'Hands-on GIS mapping, geo-tagging survey blocks, and satellite imagery analysis for land use statistics.',
      source: 'nssta',
      skillTags: JSON.stringify(['tech-5', 'tech-4']),
      duration: '3 Days Workshop',
      provider: 'NSSTA & ISRO Collaboration',
      url: 'https://mospi.gov.in/nssta/tpac-gis'
    },
    {
      title: 'NSSTA TPAC: Official Statistics Standards & SDMX Metadata',
      description: 'Specialized program on international statistics harmonization, SDMX standard, and UN-FOS compliance.',
      source: 'nssta',
      skillTags: JSON.stringify(['stat-5', 'gov-6']),
      duration: '4 Days (Hybrid)',
      provider: 'NSSTA International Division',
      url: 'https://mospi.gov.in/nssta/tpac-sdmx'
    },
    {
      title: 'NSSTA TPAC: Big Data Analytics & Machine Learning for MoSPI',
      description: 'Intensive workshop on applying machine learning algorithms to large administrative and survey datasets.',
      source: 'nssta',
      skillTags: JSON.stringify(['tech-6', 'tech-4', 'tech-1']),
      duration: '5 Days Workshop',
      provider: 'NSSTA & IIT Delhi Faculty',
      url: 'https://mospi.gov.in/nssta/tpac-ml'
    },
    {
      title: 'NSSTA TPAC: Public Leadership & Inter-Ministerial Data Governance',
      description: 'Executive leadership retreat for Directors and Senior Statistical Officers on strategic decision making.',
      source: 'nssta',
      skillTags: JSON.stringify(['beh-3', 'beh-4', 'beh-5', 'beh-7']),
      duration: '3 Days Executive Retreat',
      provider: 'NSSTA Leadership Wing',
      url: 'https://mospi.gov.in/nssta/tpac-leadership'
    }
  ];

  for (const c of coursesData) {
    await prisma.course.create({ data: c });
  }
  console.log('Seeded iGOT & NSSTA Courses.');

  // 4. Seed Demo Users & Profiles for Admin & Learner Dashboards
  const demoUsers = [
    {
      name: 'Rajesh Sharma',
      email: 'rajesh.sharma@mospi.gov.in',
      role: 'officer',
      designation: 'Senior Statistical Officer',
      department: 'National Sample Survey Office (NSSO)',
      jobRole: 'Senior Statistical Officer',
      experience: 8,
      education: 'M.Sc Statistics (Indian Statistical Institute, Kolkata)',
      pastTrainings: 'NSSTA Multi-Stage Sampling, iGOT Python for Data Analytics'
    },
    {
      name: 'Priya Verma',
      email: 'priya.verma@mospi.gov.in',
      role: 'officer',
      designation: 'Junior Statistical Officer',
      department: 'Central Statistics Office (CSO)',
      jobRole: 'Junior Statistical Officer',
      experience: 3,
      education: 'B.Sc Mathematical Statistics (Delhi University)',
      pastTrainings: 'iGOT Data Privacy Act Compliance, SQL Database Queries'
    },
    {
      name: 'Amitabh Sen',
      email: 'amitabh.sen@mospi.gov.in',
      role: 'officer',
      designation: 'Director (Price Statistics)',
      department: 'Price Statistics & Coordination Division',
      jobRole: 'Data Analyst / Director',
      experience: 14,
      education: 'Ph.D. Econometrics (JNU New Delhi)',
      pastTrainings: 'NSSTA TPAC National Accounts Intensive, Macroeconomic Forecasting'
    },
    {
      name: 'Sunita Rao',
      email: 'sunita.rao@mospi.gov.in',
      role: 'officer',
      designation: 'Senior Statistical Officer',
      department: 'Central Statistics Office (CSO)',
      jobRole: 'Senior Statistical Officer',
      experience: 10,
      education: 'M.Sc Applied Economics & Statistics',
      pastTrainings: 'iGOT Executive Cabinet Brief Drafting, PowerBI Dashboards'
    },
    {
      name: 'Vikram Patel',
      email: 'vikram.patel@mospi.gov.in',
      role: 'officer',
      designation: 'Junior Statistical Officer',
      department: 'National Sample Survey Office (NSSO)',
      jobRole: 'Junior Statistical Officer',
      experience: 2,
      education: 'B.Tech Data Science & Engineering',
      pastTrainings: 'iGOT Python Statistical Computing'
    },
    {
      name: 'Meenakshi Sundaram',
      email: 'meenakshi.s@mospi.gov.in',
      role: 'officer',
      designation: 'Policy Analyst',
      department: 'Price Statistics & Coordination Division',
      jobRole: 'Policy Analyst',
      experience: 6,
      education: 'Master of Public Policy (MPP)',
      pastTrainings: 'NSSTA Public Sector Leadership Retreat, Evidence-Based Decision Making'
    },
    {
      name: 'Dr. Suresh Admin',
      email: 'admin@mospi.gov.in',
      role: 'admin',
      designation: 'Director General (Training)',
      department: 'NSSTA / MoSPI HQ',
      jobRole: 'Data Analyst / Director',
      experience: 20,
      education: 'Ph.D. Official Statistics & Data Science',
      pastTrainings: 'UN-FOS International Statistics Standards, MoSPI Executive Training Director'
    }
  ];

  for (const u of demoUsers) {
    const user = await prisma.user.create({
      data: {
        name: u.name,
        email: u.email,
        role: u.role,
        onboardingComplete: true,
        profile: {
          create: {
            designation: u.designation,
            department: u.department,
            jobRole: u.jobRole,
            experience: u.experience,
            education: u.education,
            pastTrainings: u.pastTrainings
          }
        }
      }
    });

    // Seed self-assessments and quiz results for officers
    if (u.role === 'officer') {
      let idx = 0;
      for (const skill of createdSkills) {
        idx++;
        // Deterministic ratings based on skill domain, index, and officer experience
        let baseRating = 3;
        if (skill.domain === 'Statistical') {
          baseRating = u.experience >= 8 ? 4 : (idx % 2 === 0 ? 3 : 2);
        } else if (skill.domain === 'Technical') {
          baseRating = u.experience > 8 ? 2 : (idx % 2 === 0 ? 4 : 3);
        } else if (skill.domain === 'Digital Governance') {
          baseRating = (idx % 3 === 0) ? 4 : 3;
        } else {
          baseRating = u.experience > 5 ? 4 : 3;
        }

        await prisma.selfAssessment.create({
          data: {
            userId: user.id,
            skillId: skill.id,
            rating: baseRating
          }
        });

        // Deterministic diagnostic score
        const diagOffset = (idx % 2 === 0) ? 0.4 : -0.3;
        const diagScore = Math.min(5, Math.max(1, Number((baseRating + diagOffset).toFixed(1))));
        await prisma.quizResult.create({
          data: {
            userId: user.id,
            skillId: skill.id,
            score: diagScore
          }
        });
      }

      // Seed 1 sample course progress for Rajesh Sharma
      if (u.name === 'Rajesh Sharma') {
        const firstCourse = await prisma.course.findFirst({ where: { source: 'igot' } });
        if (firstCourse) {
          await prisma.courseProgress.create({
            data: {
              userId: user.id,
              courseId: firstCourse.id,
              status: 'in_progress'
            }
          });
        }
      }
    }
  }

  console.log('Successfully seeded database with demo officers and scores!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
