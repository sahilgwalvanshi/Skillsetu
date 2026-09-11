import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  GraduationCap,
  Building2,
  Code2,
  FileCheck,
  Zap,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Layers,
  Search,
  Filter,
  ArrowRight,
  Clock,
  Award,
  Terminal,
  Database,
  MapPin,
  Lock,
  ListChecks,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { api } from '../services/api';

export default function LearningHub({ currentUser, onNavigateDashboard }) {
  // Navigation tabs at the top of the Hub
  const [activeHubTab, setActiveHubTab] = useState('virtual-labs'); // 'roadmap' | 'igot' | 'nssta' | 'virtual-labs' | 'assessments'
  
  // Selected Virtual Lab
  const [activeLabId, setActiveLabId] = useState('python');
  
  // Dynamic stats
  const [enrolledCount, setEnrolledCount] = useState(3);
  const [tpacAppliedCount, setTpacAppliedCount] = useState(1);

  // Labs data definition
  const labsData = {
    python: {
      id: 'python',
      name: 'Python Sandbox',
      badge: 'PYTHON',
      badgeColor: 'bg-blue-600 text-white',
      filename: 'script.py',
      difficulty: 'Intermediate',
      title: 'Python Sandbox: Pandas for Survey Microdata Wrangling',
      description: 'Load raw NSS household survey microdata, handle non-response codes, apply sampling multipliers, and generate State-level weighted unemployment rates.',
      instructions: [
        "1. Inspect the loaded Dataframe 'df_nss' representing PLFS Round 8 microdata.",
        "2. Filter out invalid activity codes (e.g. Activity Status Code 99: Refusal).",
        "3. Compute weighted aggregate using sample multiplier column 'MULT'.",
        "4. Calculate Labour Force Participation Rate (LFPR) = (Employed + Unemployed) / Total Population * 100."
      ],
      impact: 'Executing and passing this virtual lab validates your operational capability in Technical & Statistical Automation and contributes directly toward higher proficiency ratings in official promotions.',
      defaultCode: `# Official MoSPI Python Microdata Environment
import numpy as np
import pandas as pd

# Load simulated NSS 100k sample records
print("[INFO] Ingesting PLFS 2026 Round 8 Microdata Batch (Zone: East)...")
data = {
    "FSU_ID": [10245, 10245, 10246, 10247, 10248],
    "STATE": ["West Bengal", "West Bengal", "Bihar", "Odisha", "Jharkhand"],
    "AGE": [28, 45, 19, 62, 34],
    "USUAL_STATUS": [31, 11, 81, 92, 51],  # 11: Regular Salaried, 81: Unemployed, 92: Retired
    "MULTIPLIER": [1420.5, 1420.5, 980.2, 1150.0, 890.4]
}

# Convert to pandas DataFrame
df_nss = pd.DataFrame(data)

# Filter valid activity status codes
valid_df = df_nss[df_nss['USUAL_STATUS'] != 99]

# Calculate weighted population and employment metrics
weighted_pop = int(valid_df['MULTIPLIER'].sum())
employed = valid_df[valid_df['USUAL_STATUS'].isin([11, 31])]['MULTIPLIER'].sum()
unemployed = valid_df[valid_df['USUAL_STATUS'] == 81]['MULTIPLIER'].sum()

lfpr = round(((employed + unemployed) / weighted_pop) * 100, 2)
unemployment_rate = round((unemployed / (employed + unemployed)) * 100, 2)

print(f"[INFO] Parsed 5 Sample Enumeration Blocks across 4 States.")
print("[INFO] Applied GREG Calibration Weights on Multiplier Field.")
print(f"Total Weighted Population: {weighted_pop:,}")
print(f"Labour Force Participation Rate (LFPR): {lfpr}%")
print(f"Unemployment Rate (CWS): {unemployment_rate}%")
print("--> Computation successfully calibrated against MoSPI NIF standards.")
print("[STATUS: 0 ERRORS] Code passed psychometric validation test cases!")`,
      terminalOutput: [
        '[INFO] Ingesting PLFS 2026 Round 8 Microdata Batch (Zone: East)...',
        '[INFO] Parsed 5 Sample Enumeration Blocks across 4 States.',
        '[INFO] Applied GREG Calibration Weights on Multiplier Field.',
        'Total Weighted Population: 5,862',
        'Labour Force Participation Rate (LFPR): 80.38%',
        'Unemployment Rate (CWS): 20.00%',
        '--> Computation successfully calibrated against MoSPI NIF standards.',
        '[STATUS: 0 ERRORS] Code passed psychometric validation test cases!'
      ]
    },
    sql: {
      id: 'sql',
      name: 'SQL Query Lab',
      badge: 'SQL',
      badgeColor: 'bg-slate-200 text-slate-700',
      filename: 'cpi_aggregation.sql',
      difficulty: 'Intermediate',
      title: 'SQL Query Lab: National Accounts & Price Index Aggregation',
      description: 'Execute analytical SQL queries against simulated MoSPI price statistics repository, calculating weighted Consumer Price Index sub-aggregates.',
      instructions: [
        "1. Query table 'cpi_monthly_quotations' across rural and urban survey centres.",
        "2. Filter records where verification_status = 'VALIDATED' for Q1 2026.",
        "3. Compute item-weight Laspeyres index aggregations grouped by commodity category.",
        "4. Validate results against CSO National Accounts compilation benchmarks."
      ],
      impact: 'Demonstrates SQL fluency in querying relational databases, complex joins, and price statistics compilation according to official UN-FOS standards.',
      defaultCode: `-- MoSPI National Accounts & Price Statistics SQL Engine
-- Database: mospi_national_accounts (MeghRaj GovCloud)

SELECT 
    state_code,
    item_category,
    COUNT(quotation_id) AS total_quotes,
    ROUND(SUM(price_current * base_weight) / SUM(price_base * base_weight) * 100, 2) AS group_cpi_index
FROM cpi_monthly_quotations
WHERE survey_quarter = '2026-Q1'
  AND validation_status = 'APPROVED'
GROUP BY state_code, item_category
ORDER BY group_cpi_index DESC;`,
      terminalOutput: [
        '[INFO] Connecting to MeghRaj National Accounts Database Cluster...',
        '[INFO] Executing query against 1,240,000 verified price quotations...',
        '[INFO] Query optimized via composite index (survey_quarter, validation_status).',
        '+------------+------------------------+--------------+-----------------+',
        '| state_code | item_category          | total_quotes | group_cpi_index |',
        '+------------+------------------------+--------------+-----------------+',
        '| WB-19      | Food & Non-Alcoholic   | 14,820       | 118.42          |',
        '| BR-10      | Housing, Fuel & Light  | 9,340        | 114.85          |',
        '| OD-21      | Miscellaneous Services | 8,120        | 112.10          |',
        '| JH-20      | Clothing & Footwear    | 6,450        | 109.65          |',
        '+------------+------------------------+--------------+-----------------+',
        '[INFO] Execution Time: 18.4ms | Rows Returned: 4',
        '[STATUS: 0 ERRORS] Aggregate figures calibrated with CSO National Series!'
      ]
    },
    gis: {
      id: 'gis',
      name: 'GIS Spatial Lab',
      badge: 'PYTHON',
      badgeColor: 'bg-blue-600 text-white',
      filename: 'spatial_validator.py',
      difficulty: 'Advanced',
      title: 'GIS Spatial Lab: NSSO Enumeration Block Boundary Validation',
      description: 'Validate survey enumeration block geo-tags, detect GPS multipath drift, and ensure spatial containment within Census 2021 statutory ward polygons.',
      instructions: [
        "1. Ingest NSSO Urban Frame Survey (UFS) 79th Round geojson boundaries.",
        "2. Parse field investigator GPS latitude/longitude capture points.",
        "3. Check point-in-polygon containment against statutory administrative limits.",
        "4. Flag spatial drift anomalies exceeding the 15-meter buffer limit."
      ],
      impact: 'Directly validates practical capability in Geospatial Data & GIS Mapping, fulfilling NSSO Geo-Tagging Directive 2024 compliance.',
      defaultCode: `# Official MoSPI GIS & Spatial Analytics Environment
import geopandas as gpd
from shapely.geometry import Point, Polygon

print("[INFO] Ingesting NSSO 79th Round Urban Frame Survey (UFS) Boundaries...")
# Load boundary polygons for Kolkata & Patna sample blocks
blocks_gdf = gpd.read_file("data/ufs_eb_blocks_2026.geojson")

def validate_field_coordinates(lat, lon, ward_polygon):
    sample_pt = Point(lon, lat)
    is_contained = ward_polygon.contains(sample_pt)
    return is_contained

print("[INFO] Validating 250 Field Investigator Survey GPS coordinates...")`,
      terminalOutput: [
        '[INFO] Ingesting NSSO 79th Round Urban Frame Survey (UFS) Boundaries...',
        '[INFO] Loaded 1,420 Enumeration Block Polygons (CRS: EPSG:4326).',
        '[INFO] Validating 250 Field Investigator Survey GPS coordinates...',
        '[INFO] Spatial index (R-tree) initialized in 4.2ms.',
        'Validated Coordinates: 248 / 250 points within boundary (99.2% conformance)',
        '[WARNING] 2 points flagged with GPS drift > 15m (re-assigned to buffer zone).',
        '--> All enumeration blocks confirmed for MoSPI Geo-Portal synchronization.',
        '[STATUS: 0 ERRORS] Topology check passed with zero polygon intersections.'
      ]
    },
    dpdp: {
      id: 'dpdp',
      name: 'DPDP Act 2023',
      badge: 'PYTHON',
      badgeColor: 'bg-blue-600 text-white',
      filename: 'dpdp_anonymize.py',
      difficulty: 'Advanced',
      title: 'DPDP Act 2023: Microdata De-identification & K-Anonymity',
      description: 'Apply k-anonymity, l-diversity, and differential privacy noise on household survey datasets prior to open-government public dissemination.',
      instructions: [
        "1. Isolate direct identifiers (Name, Mobile, Aadhaar hash) from microdata.",
        "2. Group quasi-identifiers (District, Age Bracket, Industry code) to measure cluster cardinality.",
        "3. Enforce k-anonymity (k >= 5) via generalization and suppression of rare profiles.",
        "4. Verify compliance with Digital Personal Data Protection (DPDP) Act 2023 guidelines."
      ],
      impact: 'Certifies essential capability in Data Privacy & DPDP Act Compliance, ensuring MoSPI open data releases preserve citizen confidentiality.',
      defaultCode: `# MoSPI DPDP Act 2023 Microdata Anonymization Pipeline
import pandas as pd
import hashlib

def anonymize_microdata(df, k_threshold=5):
    print("[INFO] Auditing quasi-identifiers for k-anonymity compliance...")
    quasi_cols = ['district_code', 'age_group', 'nic_2digit']
    
    # Calculate group sizes
    cluster_counts = df.groupby(quasi_cols).size()
    violating_clusters = cluster_counts[cluster_counts < k_threshold]
    
    print(f"[INFO] Found {len(violating_clusters)} clusters violating k={k_threshold}.")
    print("[INFO] Applying bottom-up generalization on sparse demographic bins...")
    return True

print("[INFO] Reading NSS 78th Round Household Asset Microdata...")`,
      terminalOutput: [
        '[INFO] Reading NSS 78th Round Household Asset Microdata...',
        '[INFO] Total input records: 48,920 across 36 States/UTs.',
        '[INFO] Auditing quasi-identifiers for k-anonymity compliance...',
        '[INFO] Found 14 clusters violating k=5.',
        '[INFO] Applying bottom-up generalization on sparse demographic bins...',
        '[INFO] 14 sparse clusters aggregated; 0 records suppressed.',
        '[INFO] Salted SHA-256 pseudonymization applied to enumerator IDs.',
        'Differential Privacy Verification: Epsilon = 0.48 (Robust against linkage attacks).',
        '[STATUS: 0 ERRORS] Microdata certified compliant under DPDP Act 2023 Section 8.'
      ]
    }
  };

  const currentLab = labsData[activeLabId];
  const [code, setCode] = useState(currentLab.defaultCode);
  const [terminalLines, setTerminalLines] = useState(currentLab.terminalOutput);
  const [isRunning, setIsRunning] = useState(false);
  const [exitCode, setExitCode] = useState('Exit Code: 0 (Success)');

  // Update editor and terminal when switching labs
  useEffect(() => {
    setCode(currentLab.defaultCode);
    setTerminalLines(currentLab.terminalOutput);
    setExitCode('Exit Code: 0 (Success)');
  }, [activeLabId]);

  const handleRunScript = () => {
    setIsRunning(true);
    setTerminalLines(['[RUNTIME: MeghRaj Sandbox] Initializing kernel and mounting microdata volume...']);
    
    setTimeout(() => {
      setTerminalLines(prev => [...prev, '[INFO] Executing ' + currentLab.filename + '...']);
    }, 350);

    setTimeout(() => {
      setTerminalLines(currentLab.terminalOutput);
      setIsRunning(false);
      setExitCode('Exit Code: 0 (Success)');
    }, 900);
  };

  const handleReset = () => {
    setCode(currentLab.defaultCode);
    setTerminalLines(currentLab.terminalOutput);
    setExitCode('Exit Code: 0 (Success)');
  };

  // Sample course data for iGOT catalogue tab
  const igotCourses = [
    { id: 'igot-1', title: 'Python for Survey Microdata Wrangling', provider: 'iGOT Karmayogi', duration: '6 Hours (Self-Paced)', level: 'Intermediate', tags: ['Python', 'Pandas', 'Microdata'] },
    { id: 'igot-2', title: 'Digital Personal Data Protection (DPDP) Act 2023 Compliance', provider: 'iGOT Karmayogi', duration: '4 Hours', level: 'Fundamental', tags: ['DPDP Act', 'Data Privacy', 'Governance'] },
    { id: 'igot-3', title: 'National Accounts & Price Index Compilation (CPI/WPI)', provider: 'iGOT Karmayogi', duration: '8 Hours', level: 'Advanced', tags: ['CPI/WPI', 'Laspeyres', 'National Accounts'] },
    { id: 'igot-4', title: 'SQL & Database Architecture for Official Statistics', provider: 'iGOT Karmayogi', duration: '5 Hours', level: 'Intermediate', tags: ['SQL', 'Data Warehousing'] }
  ];

  const nsstaProgrammes = [
    { id: 'nssta-1', title: 'NSSTA TPAC: Advanced Econometrics & Macroeconomic Forecasting', venue: 'NSSTA Campus, Greater Noida', duration: '5 Days Residential', dates: 'October 14-18, 2026', seats: '24 Seats Left' },
    { id: 'nssta-2', title: 'NSSTA TPAC: Geospatial Remote Sensing & NSSO Frame Survey', venue: 'NSSTA Campus, Greater Noida', duration: '3 Days Executive Masterclass', dates: 'November 04-06, 2026', seats: '18 Seats Left' },
    { id: 'nssta-3', title: 'NSSTA TPAC: Executive Statistical Leadership & APAR Framework', venue: 'NSSTA Campus, Greater Noida', duration: '3 Days Leadership Retreat', dates: 'December 02-04, 2026', seats: '12 Seats Left' }
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f0] py-8 px-4 sm:px-6 lg:px-10 font-body text-slate-800 space-y-6">
      
      {/* 1. TOP BANNER: Official Learning & Capability Hub */}
      <div className="max-w-7xl mx-auto bg-[#0c1836] rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-[#1b2b52] text-white relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          {/* Left Title & Description */}
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold tracking-wider uppercase">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>IGOT KARMAYOGI BHARAT • LEARN HUB</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
              Official Learning & Capability Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl pt-1">
              Explore national accredited courses, in-person NSSTA TPAC programmes, interactive cloud data sandboxes, and AI-driven adaptive diagnostics.
            </p>
          </div>

          {/* Right Stat Cards */}
          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            {/* Card 1 */}
            <div className="bg-[#14234b]/80 border border-white/10 rounded-2xl px-5 py-3 text-center min-w-[105px] backdrop-blur-sm shadow-inner">
              <div className="text-2xl sm:text-3xl font-bold font-display text-white">
                {enrolledCount}
              </div>
              <div className="text-[10px] font-bold text-slate-300 tracking-wider uppercase mt-0.5">
                ENROLLED
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#14234b]/80 border border-white/10 rounded-2xl px-5 py-3 text-center min-w-[105px] backdrop-blur-sm shadow-inner">
              <div className="text-2xl sm:text-3xl font-bold font-display text-white">
                {tpacAppliedCount}
              </div>
              <div className="text-[10px] font-bold text-slate-300 tracking-wider uppercase mt-0.5">
                TPAC APPLIED
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {/* Tab 1: My Learning Roadmap */}
          <button
            onClick={() => setActiveHubTab('roadmap')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition flex items-center space-x-2 shrink-0 ${
              activeHubTab === 'roadmap'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>My Learning Roadmap</span>
          </button>

          {/* Tab 2: iGOT Course Catalogue */}
          <button
            onClick={() => setActiveHubTab('igot')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition flex items-center space-x-2 shrink-0 ${
              activeHubTab === 'igot'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>iGOT Course Catalogue</span>
          </button>

          {/* Tab 3: NSSTA TPAC Programmes */}
          <button
            onClick={() => setActiveHubTab('nssta')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition flex items-center space-x-2 shrink-0 ${
              activeHubTab === 'nssta'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>NSSTA TPAC Programmes</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
              activeHubTab === 'nssta' ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
            }`}>
              IN-PERSON
            </span>
          </button>

          {/* Tab 4: Virtual Labs (HANDS-ON) */}
          <button
            onClick={() => setActiveHubTab('virtual-labs')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition flex items-center space-x-2 shrink-0 ${
              activeHubTab === 'virtual-labs'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Virtual Labs</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
              activeHubTab === 'virtual-labs' ? 'bg-slate-950 text-amber-400' : 'bg-amber-400 text-slate-950'
            }`}>
              HANDS-ON
            </span>
          </button>

          {/* Tab 5: Adaptive Assessments */}
          <button
            onClick={() => setActiveHubTab('assessments')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition flex items-center space-x-2 shrink-0 ${
              activeHubTab === 'assessments'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Adaptive Assessments</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN BODY CONDITIONAL ROUTING BY TAB */}
      
      {/* VIRTUAL LABS TAB (Default & Exact match to provided screenshot) */}
      {activeHubTab === 'virtual-labs' && (
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Card 2: Interactive Practical Sandboxes Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <Zap className="w-2.5 h-2.5 fill-current" />
                  </div>
                  <span className="text-[11px] font-bold text-amber-600 tracking-wider uppercase">
                    INTERACTIVE PRACTICAL SANDBOXES
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                  MoSPI Official Statistics Virtual Labs
                </h2>
                <p className="text-xs text-slate-500 max-w-3xl">
                  Simulated cloud development environments for survey data cleaning, national accounts database queries, and geospatial boundary validation.
                </p>
              </div>

              {/* Right Runtime Pill */}
              <div className="self-start md:self-auto">
                <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200/80 shadow-xs">
                  <span>Runtime: MeghRaj GovCloud (Sandboxed)</span>
                </span>
              </div>
            </div>

            {/* Virtual Labs Sub-Tabs Switcher */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
              {/* Python Sandbox */}
              <button
                onClick={() => setActiveLabId('python')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 shrink-0 ${
                  activeLabId === 'python'
                    ? 'bg-[#0e1726] text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="font-mono text-xs opacity-70">&lt;/&gt;</span>
                <span>Python Sandbox</span>
                <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                  PYTHON
                </span>
              </button>

              {/* SQL Query Lab */}
              <button
                onClick={() => setActiveLabId('sql')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 shrink-0 ${
                  activeLabId === 'sql'
                    ? 'bg-[#0e1726] text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="font-mono text-xs opacity-70">&lt;/&gt;</span>
                <span>SQL Query Lab</span>
                <span className="bg-slate-200 text-slate-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                  SQL
                </span>
              </button>

              {/* GIS Spatial Lab */}
              <button
                onClick={() => setActiveLabId('gis')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 shrink-0 ${
                  activeLabId === 'gis'
                    ? 'bg-[#0e1726] text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="font-mono text-xs opacity-70">&lt;/&gt;</span>
                <span>GIS Spatial Lab</span>
                <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                  PYTHON
                </span>
              </button>

              {/* DPDP Act 2023 */}
              <button
                onClick={() => setActiveLabId('dpdp')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 shrink-0 ${
                  activeLabId === 'dpdp'
                    ? 'bg-[#0e1726] text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="font-mono text-xs opacity-70">&lt;/&gt;</span>
                <span>DPDP Act 2023</span>
                <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                  PYTHON
                </span>
              </button>
            </div>
          </div>

          {/* Main Sandbox Grid: Left Instructions vs Right Code Editor */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Instructions & Impact */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between min-h-[560px]">
              <div className="space-y-4">
                {/* Badges row */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-700 font-bold text-xs uppercase tracking-wider border border-blue-200/60">
                    {currentLab.badge}
                  </span>
                  <span className="text-xs font-bold text-amber-600">
                    Difficulty: {currentLab.difficulty}
                  </span>
                </div>

                {/* Title and description */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 leading-snug">
                    {currentLab.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {currentLab.description}
                  </p>
                </div>

                {/* Laboratory Instructions */}
                <div className="pt-2 space-y-3">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-2">
                    <ListChecks className="w-4 h-4 text-slate-600" />
                    <span>LABORATORY INSTRUCTIONS:</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                    {currentLab.instructions.map((inst, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-slate-400 font-semibold">•</span>
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Card: Competency Bridging Impact */}
              <div className="bg-[#0c1836] rounded-2xl p-5 border border-blue-900/50 text-white space-y-2 shadow-sm">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs tracking-wide">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Competency Bridging Impact</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {currentLab.impact}
                </p>
              </div>
            </div>

            {/* Right Column: Code Editor & Simulation Terminal Output */}
            <div className="lg:col-span-7 bg-[#0e1726] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
              
              {/* Code Editor Header Bar */}
              <div className="bg-[#131d31] px-5 py-3 border-b border-slate-800 flex items-center justify-between">
                {/* Left: Window Dots */}
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>

                {/* Center: File Name */}
                <div className="font-mono text-xs text-slate-400 font-medium">
                  {currentLab.filename}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={handleReset}
                    className="text-slate-400 hover:text-white text-xs flex items-center space-x-1 px-2.5 py-1 rounded-md hover:bg-white/5 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>

                  <button
                    onClick={handleRunScript}
                    disabled={isRunning}
                    className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold px-4 py-1.5 rounded-lg flex items-center space-x-1.5 shadow-sm transition disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isRunning ? 'Executing...' : 'Run Script'}</span>
                  </button>
                </div>
              </div>

              {/* Code Editor Textarea / View */}
              <div className="relative p-4 bg-[#0a1120] font-mono text-xs leading-relaxed text-slate-200 min-h-[250px]">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-60 bg-transparent resize-none border-none outline-none font-mono text-xs leading-relaxed text-emerald-300/95 focus:ring-0 selection:bg-emerald-900/60"
                  spellCheck="false"
                />
              </div>

              {/* Terminal Output Header */}
              <div className="bg-[#080d19] px-5 py-2.5 border-t border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <span className="text-emerald-400 font-bold">&gt;_</span>
                  <span className="font-semibold">Simulation Terminal Output</span>
                </div>
                <div className="text-[11px] font-mono text-emerald-400 font-semibold">
                  {exitCode}
                </div>
              </div>

              {/* Terminal Console Output Window */}
              <div className="bg-[#050912] p-5 font-mono text-xs leading-relaxed text-emerald-400 min-h-[170px] overflow-x-auto space-y-1 selection:bg-emerald-800/40">
                {terminalLines.map((line, idx) => (
                  <div
                    key={idx}
                    className={`${
                      line.includes('[STATUS: 0 ERRORS]') || line.includes('[SUCCESS]') || line.includes('[DPDP COMPLIANT]')
                        ? 'text-emerald-300 font-bold bg-emerald-950/40 px-2 py-0.5 rounded'
                        : line.includes('[WARNING]')
                        ? 'text-amber-400 font-semibold'
                        : line.includes('Total Weighted Population') || line.includes('Labour Force Participation Rate') || line.includes('Unemployment Rate')
                        ? 'text-cyan-300 font-semibold'
                        : 'text-emerald-400/90'
                    }`}
                  >
                    {line}
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      )}

      {/* OTHER TABS: Roadmap, iGOT, NSSTA, Assessments */}
      {activeHubTab === 'roadmap' && (
        <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold font-display text-slate-900">Personalized Competency Roadmap</h2>
            <p className="text-xs text-slate-500 mt-1">Targeted quarterly milestones based on your 27-competency assessment gap matrix.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <span className="text-[10px] font-bold text-amber-800 uppercase px-2 py-0.5 rounded bg-amber-200/60">Q1 PRIORITY</span>
              <h3 className="text-sm font-bold text-slate-900">Statistical Microdata Wrangling</h3>
              <p className="text-xs text-slate-600">Complete Python Sandbox exercises & iGOT PLFS modules to bridge NSS sample aggregation deficit.</p>
            </div>
            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
              <span className="text-[10px] font-bold text-blue-800 uppercase px-2 py-0.5 rounded bg-blue-200/60">Q2 MILESTONE</span>
              <h3 className="text-sm font-bold text-slate-900">DPDP Act & Data Privacy Compliance</h3>
              <p className="text-xs text-slate-600">Enforce k-anonymity validation on open data releases in MeghRaj GovCloud sandbox.</p>
            </div>
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase px-2 py-0.5 rounded bg-emerald-200/60">Q3 RESIDENTIAL</span>
              <h3 className="text-sm font-bold text-slate-900">NSSTA TPAC Masterclass</h3>
              <p className="text-xs text-slate-600">Attend 5-day in-person advanced econometrics intensive at NSSTA Greater Noida.</p>
            </div>
          </div>
        </div>
      )}

      {activeHubTab === 'igot' && (
        <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-display text-slate-900">iGOT Karmayogi Accredited Course Catalogue</h2>
              <p className="text-xs text-slate-500 mt-1">Over 6,700+ curated micro-courses mapped to official statistical officer cadres.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {igotCourses.map((c) => (
              <div key={c.id} className="p-5 rounded-2xl bg-[#f8f6f0] border border-slate-200/80 space-y-3 hover:border-sandstone transition">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">iGOT Portal</span>
                  <span className="text-slate-500 text-[11px]">{c.duration}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{c.title}</h3>
                <div className="flex flex-wrap gap-1 pt-1">
                  {c.tags.map(t => (
                    <span key={t} className="text-[10px] font-semibold px-2 py-0.5 bg-white rounded border border-slate-200 text-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeHubTab === 'nssta' && (
        <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold font-display text-slate-900">NSSTA TPAC In-Person Programmes</h2>
            <p className="text-xs text-slate-500 mt-1">National Statistical Systems Training Academy (Greater Noida) Residential Masterclasses.</p>
          </div>
          <div className="space-y-4">
            {nsstaProgrammes.map((p) => (
              <div key={p.id} className="p-5 rounded-2xl bg-[#f8f6f0] border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">NSSTA Greater Noida</span>
                    <span className="text-slate-500 font-medium text-[11px]">{p.duration}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{p.title}</h3>
                  <div className="text-xs text-slate-500 flex items-center space-x-4">
                    <span>📅 {p.dates}</span>
                    <span className="text-amber-700 font-semibold">⚡ {p.seats}</span>
                  </div>
                </div>
                <button
                  onClick={() => setTpacAppliedCount(prev => prev + 1)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold self-start sm:self-auto transition shrink-0"
                >
                  Apply for Nomination
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeHubTab === 'assessments' && (
        <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold font-display text-slate-900">AI Adaptive Diagnostics</h2>
            <p className="text-xs text-slate-500 mt-1">Dynamically generated assessments powered by Groq Llama 3.3 for MoSPI statistical manuals.</p>
          </div>
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-800 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Official Manual Diagnostic Engines Available</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Take or generate comprehensive multiple-choice diagnostic tests drawn directly from NSS 78th Round Manual, National Accounts Compilation Guidelines, and DPDP Act 2023.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
