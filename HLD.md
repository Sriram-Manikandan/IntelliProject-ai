# 🏗️ High Level Design (HLD)
## IntelliProject – AI-Powered Academic Project Recommendation Engine
**Version:** 2.0.0 | **Date:** October 2026

---

## 1. System Overview

IntelliProject is a two-tier web application consisting of a **React SPA frontend** and an **async FastAPI backend**, communicating over a RESTful JSON API. The backend integrates with two external services: **Groq** (LLM inference) and **Neon DB** (serverless PostgreSQL). Both tiers are independently deployed on Render.com.

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER (Browser)                           │
│                  React 19 + Vite SPA                            │
│             (Render.com – Static Site)                          │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS / REST (JSON)
                           │ Bearer JWT in Authorization header
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   FastAPI Backend (Python 3.11)                  │
│              (Render.com – Web Service / Uvicorn)                │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │  /auth   │  │ /generate│  │/projects │  │ /admin       │   │
│  │  routes  │  │  routes  │  │  routes  │  │  routes      │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬───────┘   │
│       │              │              │                │           │
│       └──────────────┴──────────────┴────────────────┘          │
│                              │                                  │
│                    ┌─────────▼──────────┐                       │
│                    │  Core Layer        │                       │
│                    │  (Config, DB,      │                       │
│                    │   Security)        │                       │
│                    └─────────┬──────────┘                       │
└──────────────────────────────┼──────────────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               │                               │
               ▼                               ▼
┌──────────────────────────┐    ┌──────────────────────────────┐
│   Neon DB (PostgreSQL)   │    │      Groq API                │
│   (Serverless, Cloud)    │    │  llama-3.3-70b-versatile     │
│                          │    │  (External LLM Inference)    │
│  - users                 │    │                              │
│  - saved_projects        │    │  Retry: 3 attempts           │
│  - system_logs           │    │  Fallback: mock data         │
└──────────────────────────┘    └──────────────────────────────┘
```

---

## 2. Frontend Architecture

The frontend is a **React 19 Single Page Application** bundled with Vite 6 and styled with Tailwind CSS v3.

### 2.1 Page Routes

| Route | Component | Auth Required | Description |
|-------|-----------|:-------------:|-------------|
| `/` | `Home.jsx` | No | Landing page with all marketing sections |
| `/login` | `Login.jsx` | No | Email + password login form |
| `/signup` | `Signup.jsx` | No | Registration form |
| `/forgot-password` | `ForgotPassword.jsx` | No | Request reset token |
| `/reset-password` | `ResetPassword.jsx` | No | Submit new password with token |
| `/generate` | `Generate.jsx` | **Yes** | Project generation form + results |
| `/dashboard` | `Dashboard.jsx` | **Yes** | User's saved projects |
| `/admin` | `AdminDashboard.jsx` | **Yes (Admin)** | Admin stats + logs |
| `/privacy` | `PrivacyPolicy.jsx` | No | Legal page |
| `/terms` | `TermsOfService.jsx` | No | Legal page |

### 2.2 State Management

| Concern | Mechanism |
|---------|-----------|
| Auth state (user, token) | `AuthContext` (React Context API) |
| Theme (dark/light) | `ThemeContext` (React Context API) |
| Server state (API calls) | Local `useState` + `useEffect` per component |

### 2.3 Key Frontend Components

```
src/
├── App.jsx                    # BrowserRouter + route definitions
├── context/
│   ├── AuthContext.jsx         # JWT storage, login/logout, user state
│   └── ThemeContext.jsx        # Dark/light toggle
├── components/
│   ├── ProtectedRoute.jsx      # Guards /generate, /dashboard, /admin
│   ├── layout/
│   │   ├── Chatbot.jsx         # "Recruit" floating AI chatbot
│   │   ├── CookieBanner.jsx    # GDPR cookie consent
│   │   └── ScrollToHash.jsx    # Smooth anchor scroll on home page
│   └── [Hero, FAQ, HowItWorks, Testimonials, etc.]
├── pages/
│   ├── Dashboard.jsx           # Saved projects + scoring metrics (Recharts)
│   └── AdminDashboard.jsx      # System stats + event log viewer
└── services/
    ├── api.js                  # Axios/fetch wrapper; injects JWT header
    └── projectService.js       # Project CRUD calls
```

---

## 3. Backend Architecture

The backend follows a strict **layered architecture** with clear separation of concerns.

### 3.1 Layer Responsibilities

```
HTTP Request
     │
     ▼
┌─────────────────────────────────┐
│   API Layer  (api/routes/)      │  ← HTTP only: receive, validate, respond
│   auth.py, recommendations.py  │
│   projects.py, admin.py         │
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│   Service Layer (services/)     │  ← Business logic, orchestration
│   recommendation_service.py     │
└────────────────┬────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
┌───────────────┐  ┌──────────────────────────────┐
│ Models Layer  │  │   Utils Layer (utils/)        │
│ (models/)     │  │   groq_client.py              │
│ schemas.py    │  │   prompt_builder.py           │
│ db_models.py  │  │   fallback_data.py            │
└───────────────┘  │   chat_handler.py             │
                   │   time_utils.py               │
                   └──────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│   Core Layer  (core/)           │  ← Infrastructure concerns
│   config.py, database.py,       │
│   security.py, supabase_client  │
└─────────────────────────────────┘
```

### 3.2 Application Startup Flow

```
Uvicorn starts
    → create_app() in main.py
        → CORSMiddleware registered (allowed_origins from .env)
        → All routers mounted under /api/v1
        → lifespan() context manager fires
            → init_db() creates all SQLAlchemy tables on Neon DB if missing
    → App ready to accept requests on :8000
```

### 3.3 AI Generation Request Flow

```
POST /api/v1/generate
    │
    ▼ FastAPI validates request body → ProjectRequest (Pydantic)
    │
    ▼ recommendations.py route → calls generate_projects(req)
    │
    ▼ recommendation_service.py
        1. hours_to_human(time_hours)  → "2 weeks 3 days"
        2. build_prompt(req, time_display) → full LLM prompt string
        3. call_groq(prompt) [async, up to 3 retries]
              │
              ├─ SUCCESS → parse JSON → list of 3 raw dicts
              └─ FAILURE → build_fallback(req, time_display) → mock dicts
        4. Validate each raw dict → ProjectIdea (Pydantic)
        5. Return ProjectResponse
    │
    ▼ HTTP 200 JSON response to frontend
```

---

## 4. Database Design (High Level)

Three tables managed via SQLAlchemy ORM and mirrored in Neon DB (PostgreSQL):

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `users` | User accounts | `id` (UUID), `email`, `hashed_password`, `role`, timestamps |
| `saved_projects` | Persisted project ideas | `id` (UUID), `user_id` (FK), `project_data` (JSONB) |
| `system_logs` | Audit & security events | `id` (UUID), `event_type`, `user_id`, `ip_address`, `details` (JSONB) |

**Relationships:**
- `users` → `saved_projects`: One-to-many (cascade delete)
- `system_logs` is standalone (soft reference to `user_id` as string)

---

## 5. Authentication & Security Design

```
Signup/Login
    │
    ▼ Password → bcrypt hash (stored in DB)
    ▼ JWT created: { sub: user_id, email, role, exp: now + 7days }
    ▼ JWT signed with JWT_SECRET (HS256)
    │
Every protected request:
    ▼ HTTPBearer extracts token from Authorization header
    ▼ decode_access_token() validates signature + expiry
    ▼ User fetched from DB by sub (user_id)
    ▼ Request proceeds / 401 raised
    │
Admin endpoints:
    ▼ get_current_admin() wraps get_current_user()
    ▼ Checks user.role == "admin" → 403 if not
```

---

## 6. Deployment Architecture

```
                        GitHub Repository
                               │
                   ┌───────────┴───────────┐
                   │                       │
                   ▼                       ▼
          Render Web Service       Render Static Site
          (intelliproject-          (intelliproject-
               backend)                 frontend)
          Python 3.11 / Uvicorn     React / Vite build
          :$PORT (Render-assigned)   CDN-served dist/
                   │
                   ├── ENV: DATABASE_URL  ───► Neon DB (Cloud Postgres)
                   ├── ENV: GROQ_API_KEY  ───► Groq Cloud (LLM API)
                   └── ENV: JWT_SECRET    ───► Auto-generated by Render
```

---

## 7. Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **FastAPI over Flask/Django** | Native async support; automatic OpenAPI docs; Pydantic validation out-of-the-box |
| **Groq over OpenAI** | Significantly lower inference latency; generous free tier; same quality for structured JSON output |
| **Neon DB over SQLite/Supabase** | Serverless Postgres with auto-suspend; free tier; connection pooling compatible with Render |
| **JWT over sessions** | Stateless; works across separate Render services without shared session store |
| **Tenacity retry on Groq** | LLM APIs can have transient failures; 3 retries with exponential backoff prevent unnecessary fallbacks |
| **Pydantic v2 schemas** | Strict request validation at the boundary; clear contract between route and service layers |
| **Fallback mock data** | Guarantees the product always works; avoids dead-end UX on Groq outages |
| **React Context for auth** | Lightweight; avoids Redux overhead for a two-context state model |
