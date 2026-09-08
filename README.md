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

## 📜 License & Acknowledgements

Built for **Smart India Hackathon (SIH)** • Problem Statement 26101  
Ministry of Statistics and Programme Implementation (MoSPI), Government of India.
