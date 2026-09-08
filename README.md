# 🇮🇳 Skill Setu — AI-Enabled Skill Intelligence & Learning Platform

> **SIH Problem Statement 26101** | Ministry of Statistics and Programme Implementation (MoSPI)  
> *Transitioning Government Training from Generic Rule-Based Models to Role-Based Competency Building (Mission Karmayogi Bharat Paradigm).*

---

## 🌟 Overview

**Skill Setu** is an AI-powered skill intelligence, diagnostic assessment, and learning management platform designed specifically for officers in India's **Official Statistical System** (CSO, NSSO, Price Statistics, and National Accounts). 

Built in alignment with **Mission Karmayogi Bharat**, Skill Setu profiles every statistical officer against **27 core competencies** across 4 domains, calculates zero-bias composite scores, generates AI diagnostic quizzes from official manuals, and automatically routes officers to targeted courses on **iGOT Karmayogi** and **NSSTA Greater Noida**.

---

## ✨ Key Features

### 1. 🎯 27-Competency Multi-Factor Profiling
- Profiles officers across 4 domains: **Statistical**, **Technical**, **Digital Governance**, and **Behavioural & Leadership**.
- Calculates a zero-bias composite competency score using a weighted multi-factor formula:
  $$\text{Score} = (0.20 \times \text{Self Rating}) + (0.35 \times \text{AI Diagnostic Quiz}) + (0.20 \times \text{Experience}) + (0.25 \times \text{Past Output})$$

### 2. 🤖 AI-Powered Diagnostic Quiz Generator (Groq LLM)
- Integrated with **Groq Cloud API** (`llama-3.3-70b-versatile`).
- Generates manual-specific, high-quality multiple choice questions directly from uploaded official survey manuals (e.g. *NSS 78th Round Manual*, *National Accounts Compilation Guidelines*).

### 3. 🎓 Targeted iGOT & NSSTA Course Routing
- Automatically maps top priority skill gaps to over **6,700+ curated iGOT Karmayogi micro-courses** and **NSSTA Greater Noida residential masterclasses**.
- Live course progress tracking (`/api/courses/progress`) with dynamic real-time score recalculation.

### 4. 💬 Floating AI Learner Support Chatbot
- Circular floating chatbot accessible from any dashboard page.
- Injects officer designation, department, top 5 skill gaps, and course recommendations into system context for personalized assistance.

### 5. 📊 5-Section Admin Intelligence Dashboard (`/admin`)
1. **Workforce Competencies Overview**: Live metric counters for total officers, average competency score, and overall growth (+0.45 Avg Score Growth).
2. **Training Effectiveness & Impact**: Pre vs. Post-training score comparisons and completion rates.
3. **Competency Distribution**: Domain breakdown and gap radar distribution.
4. **Emerging Skill Requirements**: Driven by official mandates (*DPDP Compliance Directive 2024*, *NSSO Geo-Tagging Policy*).
5. **Predictive Analytics**: 12-Month Skill Deficit Projection Model:
   $$G_{\text{unmitigated}}(t) = G_0 \times \left(1 + 0.10 \times \frac{t}{3}\right) \quad \text{vs} \quad G_{\text{mitigated}}(t) = \max\left(0.15, G_0 \times \left(1 - 0.20 \times \frac{t}{3}\right)\right)$$

### 6. 🌐 Official Mission Karmayogi Ecosystem Hubs
- Interactive 6-hub suite representing e-learning, institutional workshops, peer networking, policy repositories, and automatic credit synchronization with **eHRMS** and **SPARROW APAR**.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 8, Tailwind CSS v4, Lucide React Icons.
- **Backend**: Node.js, Express.js, Prisma ORM, SQLite Database.
- **AI Infrastructure**: Groq Cloud SDK (`llama-3.3-70b-versatile`).
- **Authentication**: JWT-based secure authentication.

---

## 📁 Repository Structure

```
skill-setu/
├── backend/                        # Node.js + Express API Backend
│   ├── prisma/                     # Database Schema & SQLite file (dev.db)
│   │   ├── schema.prisma
│   │   └── dev.db
│   ├── routes/                     # Express API Route Handlers
│   │   ├── admin.js                 # Admin Dashboard & Predictive Model
│   │   ├── auth.js                  # Authentication & Profile Management
│   │   ├── chatbot.js               # AI Learner Support Chatbot Endpoint
│   │   ├── courses.js               # Live Course Tracker Endpoint
│   │   └── quiz.js                  # Groq AI Quiz Generator Route
│   ├── services/
│   │   └── groqClient.js            # Groq API Client & Fallback Engine
│   ├── package.json
│   └── server.js                    # Express Application Entry Point
│
├── skill-setu/                     # React + Vite Frontend Application
│   ├── public/                     # Static Assets & Logos
│   │   └── images/                  # Official Logos & Banners
│   ├── src/
│   │   ├── components/              # Reusable UI Components
│   │   ├── pages/                   # Application Pages
│   │   └── services/                # API Client
│   └── package.json
└── README.md
```

---

## ⚡ Quick Start Guide (Local Setup)

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Groq API Key**: Get a free key at [console.groq.com](https://console.groq.com)

---

### Step 1: Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/skill-setu.git
cd skill-setu
```

---

### Step 2: Set Up Backend
```bash
cd backend
npm install

# Initialize Database Schema
npx prisma db push

# Create .env File
echo PORT=5000 >> .env
echo JWT_SECRET=skill_setu_secret_key_2026 >> .env
echo GROQ_API_KEY=your_groq_api_key_here >> .env

# Start Backend Server
npm start
```
*Backend will run on `http://localhost:5000`*

---

### Step 3: Set Up Frontend
Open a new terminal window:
```bash
cd skill-setu/skill-setu
npm install

# Start Frontend Dev Server
npm run dev
```
*Frontend will run on `http://localhost:5173`*

---

## 🚀 Deployment Guide

### Deploying to Vercel & Render (Free Tier)

1. **Deploy Backend to Render**:
   - Create a Web Service on [render.com](https://render.com) pointing to the `backend` directory.
   - Build Command: `npm install && npx prisma db push`
   - Start Command: `npm start`
   - Add Environment Variables: `GROQ_API_KEY`, `JWT_SECRET`, `PORT=5000`.

2. **Deploy Frontend to Vercel**:
   - Create a project on [vercel.com](https://vercel.com) pointing to `skill-setu`.
   - Framework: `Vite`
   - Add Environment Variable: `VITE_API_URL=https://YOUR-RENDER-BACKEND-URL/api`

---

## 📜 License & Acknowledgements

Built for **Smart India Hackathon (SIH)** • Problem Statement 26101  
Ministry of Statistics and Programme Implementation (MoSPI), Government of India.
