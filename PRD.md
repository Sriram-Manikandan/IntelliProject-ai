# 📋 Product Requirements Document (PRD)
## IntelliProject – AI-Powered Academic Project Recommendation Engine
**Version:** 2.0.0 | **Date:** October 2026 | **Status:** Active

---

## 1. Overview

### 1.1 Product Summary
IntelliProject is a full-stack, AI-powered web application that generates personalized academic project recommendations for students and software engineers. Given a user's skills, target domain, difficulty preference, and available time budget, the system leverages a large language model (LLM) to produce three detailed, tailored project ideas — each with a full implementation roadmap, tech stack, architecture overview, challenges, and scoring metrics.

### 1.2 Problem Statement
Students and early-career engineers often struggle to identify meaningful, resume-worthy projects that align with their specific skill set and available time. Generic "project idea" lists found online are not tailored and fail to bridge the gap between a student's existing capabilities and real-world, domain-specific needs.

### 1.3 Goals
- Provide **highly personalized, non-generic** project recommendations driven by an LLM.
- Enable users to **save, revisit, and manage** their generated project ideas.
- Deliver a **premium, startup-grade** user experience with a dark-themed, modern UI.
- Support **role-based access** with admin observability over platform usage.
- Be **production-deployable** with zero-config infrastructure (Render + Neon DB).

### 1.4 Non-Goals (Out of Scope for v2.0)
- Direct LMS or university system integrations.
- Collaborative/team project planning features.
- Real-time progress tracking or task management boards.
- Mobile-native (iOS/Android) applications.
- Payment or subscription tiers.

---

## 2. Target Users

| Persona | Description | Primary Goal |
|---------|-------------|--------------|
| **Student** | Undergraduate/graduate CS or engineering student | Get a relevant, feasible project idea for their portfolio or course |
| **Early Engineer** | Junior developer (0–2 years experience) | Find a meaningful side project to upskill and strengthen their resume |
| **Admin** | Platform maintainer / the first registered user | Monitor platform usage, user counts, and system event logs |

---

## 3. Features & Requirements

### 3.1 Core Feature: AI Project Generation

**Priority: P0 – Critical**

| ID | Requirement |
|----|-------------|
| F-01 | User must be able to submit a project generation form with: skills (text), domain (text), difficulty (Beginner/Intermediate/Advanced), and time budget (weeks/days/hours picker). |
| F-02 | The system must return exactly **3 distinct project recommendations** per request. |
| F-03 | Each recommendation must include: title, problem statement, tech stack, architecture, implementation roadmap, challenges, prerequisites (categorized), warnings, scope boundaries, feasibility analysis, resume score (0–100), and innovation score (0–100). |
| F-04 | Each of the 3 ideas must be categorically distinct: (1) Data/ML-heavy, (2) API/Integration-heavy, (3) Product/UX-heavy. |
| F-05 | The roadmap must be time-boxed and strictly chronological, matching the user's submitted time budget. |
| F-06 | If the Groq API is unavailable, the system must **gracefully fall back** to curated mock data without surfacing an error to the user. |
| F-07 | Generation must be accessible only to **authenticated users** (protected route). |

### 3.2 Feature: User Authentication

**Priority: P0 – Critical**

| ID | Requirement |
|----|-------------|
| A-01 | Users must be able to **sign up** with email, password (min 6 chars), and optional full name. |
| A-02 | Users must be able to **log in** with email and password and receive a JWT Bearer token (7-day expiry). |
| A-03 | The system must support **forgot password** (generates a reset token) and **reset password** (validates token, updates hash). |
| A-04 | Users must be able to **update their profile** (full name and/or password change). |
| A-05 | The **first registered user** on a fresh database is automatically assigned the `admin` role. |
| A-06 | Passwords must be stored as **bcrypt hashes** — never plaintext. |
| A-07 | All authenticated routes must validate the Bearer token on every request. |

### 3.3 Feature: Saved Projects

**Priority: P1 – High**

| ID | Requirement |
|----|-------------|
| S-01 | Authenticated users must be able to **save** a generated project idea to their account. |
| S-02 | Users must be able to **view all their saved projects** on a personal dashboard. |
| S-03 | Users must be able to **delete** any of their saved projects. |
| S-04 | Saved projects must persist in **Neon DB (PostgreSQL)** via the `saved_projects` table. |
| S-05 | Projects must be displayed ordered by **most recently saved** first. |

### 3.4 Feature: Admin Dashboard

**Priority: P1 – High**

| ID | Requirement |
|----|-------------|
| AD-01 | Admin users must have access to a protected `/admin` dashboard. |
| AD-02 | Dashboard must display: total registered users, total saved projects, and recent system event logs (last 15). |
| AD-03 | The system must **log security events** (user signup, failed logins, etc.) to the `system_logs` table. |
| AD-04 | Non-admin users attempting to access admin routes must receive a **403 Forbidden** response. |

### 3.5 Feature: "Recruit" AI Chatbot

**Priority: P2 – Medium**

| ID | Requirement |
|----|-------------|
| C-01 | A floating chatbot ("Recruit") must be available site-wide to help users brainstorm and refine project ideas. |
| C-02 | The chatbot must maintain a **system persona**: concise, highly technical, and grounded in software engineering best practices. |
| C-03 | The chatbot must be powered by the **Groq API** (llama-3.3-70b-versatile). |

### 3.6 Feature: UI / UX

**Priority: P1 – High**

| ID | Requirement |
|----|-------------|
| U-01 | The app must support a **dark-themed "Nexus" design** with glassmorphism, gradients, and micro-animations. |
| U-02 | The landing page must include: Hero, How It Works, About, Sample Showcase, Testimonials, FAQ, and Call-to-Action sections. |
| U-03 | All navigation must use **smooth-scroll anchor links** on the home page, and **React Router** for page-to-page navigation. |
| U-04 | A **cookie consent banner** must be displayed to new visitors. |
| U-05 | The app must have a **theme toggle** (dark/light mode). |
| U-06 | The UI must be **responsive** across desktop, tablet, and mobile viewports. |

---

## 4. API Surface (External Contract)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/v1/generate` | JWT | Generate 3 project recommendations |
| `POST` | `/api/v1/auth/signup` | None | Register a new user |
| `POST` | `/api/v1/auth/login` | None | Login and receive JWT token |
| `GET` | `/api/v1/auth/me` | JWT | Get current user profile |
| `PUT` | `/api/v1/auth/profile` | JWT | Update name / password |
| `POST` | `/api/v1/auth/forgot-password` | None | Request password reset token |
| `POST` | `/api/v1/auth/reset-password` | None | Reset password with token |
| `GET` | `/api/v1/projects` | JWT | List user's saved projects |
| `POST` | `/api/v1/projects` | JWT | Save a project |
| `DELETE` | `/api/v1/projects/{id}` | JWT | Delete a saved project |
| `GET` | `/api/v1/admin/stats` | Admin | Get platform-wide stats |
| `POST` | `/api/v1/admin/logs` | None | Record a system event |
| `GET` | `/health` | None | Service health check |

---

## 5. Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| **Performance** | AI generation response must complete within 15s under normal conditions |
| **Reliability** | Groq outages must be handled transparently via fallback data |
| **Security** | Passwords bcrypt-hashed; JWT HS256 signed; CORS restricted to known origins |
| **Scalability** | Connection pool: 10 base + 20 overflow; connections recycled every 5 minutes |
| **Availability** | Deployed on Render free tier with `autoDeploy: true` on every Git push |
| **Observability** | Audit events logged to `system_logs` table for admin visibility |
| **SEO** | Each page must have unique title tags and meta descriptions |

---

## 6. Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Backend Framework | FastAPI (Python 3.11+) |
| AI Provider | Groq API — llama-3.3-70b-versatile |
| Database | Neon DB (Serverless PostgreSQL) |
| ORM | SQLAlchemy 2.0 |
| Auth | PyJWT (HS256) + bcrypt |
| Frontend | React 19 + Vite 6 |
| Styling | Tailwind CSS v3 |
| Icons | Lucide React |
| Charts | Recharts |
| Deployment | Render.com (Backend: Web Service, Frontend: Static Site) |

---

## 7. Constraints & Dependencies

- **Groq API Key** is required for live AI generation; absence triggers fallback mode.
- **DATABASE_URL** (Neon PostgreSQL connection string) is required for all persistence features.
- **JWT_SECRET** must be set in production; Render auto-generates this value.
- Node.js 18+ and Python 3.11+ are required in the development environment.
- The frontend `VITE_API_BASE_URL` environment variable must point to the deployed backend URL.

---

## 8. Success Metrics

| Metric | Target |
|--------|--------|
| Project generation latency (P95) | < 15 seconds |
| Fallback trigger rate | < 5% of requests |
| User signup to first generation conversion | > 70% |
| Saved project actions per active session | >= 1 |
| Admin log coverage (all auth events captured) | 100% |
