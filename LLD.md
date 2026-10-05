# 🔬 Low Level Design (LLD)
## IntelliProject – AI-Powered Academic Project Recommendation Engine
**Version:** 2.0.0 | **Date:** October 2026

---

## 1. Backend – Module-by-Module Breakdown

### 1.1 `main.py` — Application Factory

**Responsibility:** Creates and configures the FastAPI application instance.

```python
# Entry point called by Uvicorn
app = create_app()
```

| Element | Detail |
|---------|--------|
| `lifespan(app)` | AsyncContextManager; calls `init_db()` on startup to auto-create all DB tables |
| `create_app()` | Instantiates `FastAPI`, registers `CORSMiddleware`, mounts all routers at `/api/v1` |
| `/health` | GET endpoint; returns JSON `{status, app, version, database}` |
| `/` | Redirects to `/docs` (Swagger UI) |
| CORS config | Origins loaded from `settings.origins_list`; credentials enabled; all methods/headers allowed |

---

### 1.2 `core/config.py` — Settings

**Responsibility:** Centralised environment configuration via Pydantic `BaseSettings`.

| Field | Type | Default | Source |
|-------|------|---------|--------|
| `APP_NAME` | str | `"IntelliProject"` | hardcoded |
| `APP_VERSION` | str | `"2.0.0"` | hardcoded |
| `DEBUG` | bool | `True` | `.env` |
| `HOST` | str | `"0.0.0.0"` | `.env` |
| `PORT` | int | `8000` | `.env` |
| `ALLOWED_ORIGINS` | str | comma-separated list | `.env` |
| `DATABASE_URL` | str | `""` | `.env` **required** |
| `JWT_SECRET` | str | default dev key | `.env` **must change in prod** |
| `JWT_ALGORITHM` | str | `"HS256"` | `.env` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | int | `10080` (7 days) | `.env` |
| `GROQ_API_KEY` | str | `""` | `.env` |

`origins_list` property: splits `ALLOWED_ORIGINS` by comma → returns `["*"]` if empty.

---

### 1.3 `core/database.py` — Database Engine

**Responsibility:** SQLAlchemy engine creation, session factory, table initialization.

**URI Normalization Logic:**
```
"postgres://"     → "postgresql+psycopg2://"
"postgresql://"   → "postgresql+psycopg2://"   (if not already psycopg2-prefixed)
```

**Engine Configuration:**

| Parameter | Value | Reason |
|-----------|-------|--------|
| `pool_pre_ping` | `True` | Validates connection before checkout (handles Neon auto-suspend) |
| `pool_recycle` | `300` | Recycle connections every 5 min (avoids stale connections) |
| `pool_size` | `10` | Base connection pool |
| `max_overflow` | `20` | Additional burst connections |
| `sslmode` | `"require"` | Appended for non-localhost connections missing the param |

**Key Functions:**

| Function | Signature | Description |
|----------|-----------|-------------|
| `get_db()` | `Generator[Session]` | FastAPI dependency; yields DB session, closes in `finally` |
| `init_db()` | `None` | Imports `db_models` to register with `Base`, calls `Base.metadata.create_all()` |

---

### 1.4 `core/security.py` — Auth Utilities

**Responsibility:** Password hashing, JWT creation/validation, FastAPI auth dependencies.

| Function | Signature | Logic |
|----------|-----------|-------|
| `hash_password(password)` | `str → str` | `bcrypt.gensalt()` + `bcrypt.hashpw()` → UTF-8 decoded string |
| `verify_password(plain, hashed)` | `str, str → bool` | `bcrypt.checkpw()`; returns `False` on any exception |
| `create_access_token(data, expires_delta)` | `dict, Optional[timedelta] → str` | Copies `data`, adds `exp` claim, encodes with `JWT_SECRET` (HS256) |
| `decode_access_token(token)` | `str → Optional[dict]` | `jwt.decode()`; returns `None` on any `PyJWTError` |
| `get_current_user(auth, db)` | `Depends → User` | Extracts Bearer token → decodes → looks up `User` by `sub` → raises 401 if any step fails |
| `get_current_admin(current_user)` | `Depends → User` | Wraps `get_current_user`; raises 403 if `role != "admin"` |

---

### 1.5 `models/db_models.py` — SQLAlchemy ORM Models

**Table: `users`**

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | `VARCHAR(36)` | PK, default `uuid4()`, indexed |
| `email` | `VARCHAR(255)` | UNIQUE, NOT NULL, indexed |
| `hashed_password` | `VARCHAR(255)` | NOT NULL |
| `full_name` | `VARCHAR(255)` | nullable |
| `role` | `VARCHAR(50)` | default `"user"`, NOT NULL |
| `created_at` | `TIMESTAMPTZ` | server default `now()` |
| `updated_at` | `TIMESTAMPTZ` | server default `now()`, `onupdate=now()` |

**Table: `saved_projects`**

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | `VARCHAR(36)` | PK, default `uuid4()`, indexed |
| `user_id` | `VARCHAR(36)` | FK → `users.id` ON DELETE CASCADE, indexed |
| `project_data` | `JSON` | NOT NULL (stores full `ProjectIdea` dict) |
| `created_at` | `TIMESTAMPTZ` | server default `now()` |

**Table: `system_logs`**

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | `VARCHAR(36)` | PK, default `uuid4()`, indexed |
| `event_type` | `VARCHAR(100)` | NOT NULL, indexed |
| `user_id` | `VARCHAR(255)` | nullable (soft reference) |
| `ip_address` | `VARCHAR(100)` | nullable |
| `details` | `JSON` | nullable |
| `created_at` | `TIMESTAMPTZ` | server default `now()` |

---

### 1.6 `models/schemas.py` — Pydantic v2 Schemas

**`ProjectRequest`** (input to `/generate`):

| Field | Type | Validation |
|-------|------|-----------|
| `skills` | `str` | `min_length=2`; strip whitespace |
| `domain` | `str` | `min_length=2`; strip whitespace |
| `difficulty` | `Literal["Beginner","Intermediate","Advanced"]` | strict enum |
| `time_hours` | `int` | `ge=1`, `le=2080` |

**`ProjectIdea`** (one recommendation):

| Field | Type | Notes |
|-------|------|-------|
| `title` | `str` | Project name |
| `problem_statement` | `str` | The core problem being solved |
| `tech_stack` | `List[str]` | Technologies to use |
| `architecture` | `str` | Technical architecture narrative |
| `implementation_roadmap` | `List[str]` | Time-boxed chronological steps |
| `challenges` | `List[str]` | Known hard problems |
| `prerequisites` | `dict[str, List[str]]` | Category → list of tool options |
| `resume_score` | `int` | 0–100 |
| `innovation_score` | `int` | 0–100 |

**`ProjectResponse`** (API response):

```json
{
  "status": "success",
  "input_summary": { "skills": "...", "domain": "...", "difficulty": "...", "time_hours": 40, "time_display": "1 week" },
  "recommendations": [ <ProjectIdea>, <ProjectIdea>, <ProjectIdea> ]
}
```

---

### 1.7 `api/routes/recommendations.py` — Generate Endpoint

**Route:** `POST /api/v1/generate`

**Flow:**
1. FastAPI auto-validates body → `ProjectRequest`
2. Calls `await generate_projects(payload)`
3. Returns `ProjectResponse` (HTTP 200)
4. Catches `ValueError` → HTTP 422; any other exception → HTTP 500

---

### 1.8 `api/routes/auth.py` — Authentication Endpoints

| Endpoint | Method | Key Logic |
|----------|--------|-----------|
| `/auth/signup` | POST | Check duplicate email → hash password → `user_count == 0` gets `admin` role → JWT → log `user_signup` event |
| `/auth/login` | POST | Query user by email → `verify_password` → JWT; log `failed_login` on bad credentials |
| `/auth/me` | GET | `get_current_user` dependency → return `UserResponse` |
| `/auth/profile` | PUT | Optional name update + optional password change (requires old password) |
| `/auth/forgot-password` | POST | Generate short-lived JWT with `purpose: "password_reset"`; always returns generic message (prevents email enumeration) |
| `/auth/reset-password` | POST | Decode token → verify `purpose == "password_reset"` → update `hashed_password` |

---

### 1.9 `api/routes/projects.py` — Saved Projects CRUD

| Endpoint | Method | Key Logic |
|----------|--------|-----------|
| `GET /projects` | GET | Query `saved_projects` by `user_id`, ordered by `created_at DESC`; injects `row.id` into `project_data` dict |
| `POST /projects` | POST | Create `SavedProject` with `user_id` + `project_data`; returns `{id}` |
| `DELETE /projects/{id}` | DELETE | Validates ownership (`user_id` match) before deleting; 404 if not found/owned |

---

### 1.10 `api/routes/admin.py` — Admin Endpoints

| Endpoint | Method | Key Logic |
|----------|--------|-----------|
| `GET /admin/stats` | GET | Checks `user_id` query param for admin role; returns `total_users`, `total_saved_projects`, last 15 `system_logs` |
| `POST /admin/logs` | POST | Records `SystemLog` with `event_type`, `user_id`, client IP (from `request.client.host`), `details` |

---

### 1.11 `services/recommendation_service.py` — Orchestrator

```
async generate_projects(req: ProjectRequest) -> ProjectResponse

Step 1: time_display = hours_to_human(req.time_hours)
Step 2: prompt = build_prompt(req, time_display)
Step 3: try:
            raw_ideas = await call_groq(prompt)   # list of 3 raw dicts
        except Exception:
            raw_ideas = build_fallback(req, time_display)
Step 4: ideas = [ProjectIdea(**raw) for raw in raw_ideas]
Step 5: return ProjectResponse(status="success", input_summary={...}, recommendations=ideas)
```

---

### 1.12 `utils/groq_client.py` — LLM API Client

**Retry Policy:** `@retry(stop=stop_after_attempt(3), wait=wait_exponential(min=2, max=10), reraise=True)`

**Groq Call Parameters:**

| Parameter | Value |
|-----------|-------|
| Model | `llama-3.3-70b-versatile` |
| Temperature | `0.7` |
| Max tokens | `4096` |
| System prompt | "You are a precise JSON generator. Only output valid JSON arrays." |

**Post-processing:**
1. Strip leading ` ```json ` or ` ``` ` markdown fences via regex
2. `json.loads(raw_text)` → raises `ValueError` on parse failure
3. Validates `isinstance(parsed, list) and len(parsed) == 3` → raises `ValueError` otherwise

---

### 1.13 `utils/prompt_builder.py` — Prompt Engineering

**`build_prompt(req, time_display) → str`**

Constructs a multi-section prompt enforcing:
- Exactly 3 distinct project types: (1) Data/ML, (2) API/Integration, (3) Product/UX
- Tech stack must reference actual student skills
- Roadmap must be strictly chronological (no overlapping time periods)
- Beginner: standard SDLC steps; Intermediate/Advanced: deeply technical roadmap
- Prerequisites as category → `[tool1, tool2]` dict
- 2 warnings + 2 scope boundaries per project
- Honest scoring (not everything 95+)
- Output format: raw JSON array ONLY (no markdown, no explanation)

---

### 1.14 `utils/time_utils.py` — Time Conversion

**`hours_to_human(time_hours: int) → str`**

Converts raw integer hours into a natural-language string for the LLM prompt and the `input_summary` response field.

Example conversions:
- `8` → `"1 day"`
- `40` → `"1 week"`
- `320` → `"2 months"`

---

### 1.15 `utils/chat_handler.py` — Recruit Chatbot

**`async call_recruit_chat(messages: List[Dict]) → str`**

| Aspect | Detail |
|--------|--------|
| Model | `llama-3.3-70b-versatile` |
| Temperature | `0.7` |
| Max tokens | `1024` |
| Retry | Same policy as `groq_client.py` (3 attempts, exponential backoff) |
| System persona | "Recruit" — expert AI assistant; concise, highly technical, no generic startup advice |
| Input | Full conversation history as `[{role, content}]` list |
| Output | Single string reply from the LLM |

---

## 2. Frontend – Component & Service Breakdown

### 2.1 `AuthContext.jsx`

| State | Type | Description |
|-------|------|-------------|
| `user` | `object\|null` | Current user `{id, email, full_name, role}` |
| `token` | `string\|null` | JWT Bearer token (persisted to `localStorage`) |
| `loading` | `bool` | True while restoring auth state on mount |

**Methods:**
- `login(userData, tokenStr)` — Sets state + `localStorage`
- `logout()` — Clears state + `localStorage`
- On mount: reads token from `localStorage` → calls `GET /auth/me` to rehydrate user state

### 2.2 `services/api.js`

Thin wrapper around `fetch` (or Axios):
- Reads `VITE_API_BASE_URL` from Vite env
- Automatically injects `Authorization: Bearer <token>` from `localStorage`
- Exports typed functions: `generateProjects()`, `saveProject()`, `getProjects()`, `deleteProject()`, etc.

### 2.3 `pages/Dashboard.jsx`

- Fetches saved projects via `GET /api/v1/projects`
- Renders each project as an expandable card with:
  - Title, problem statement, tech stack badges
  - Resume score + innovation score as Recharts RadialBar or BarChart
  - Delete button (calls `DELETE /api/v1/projects/{id}`)

### 2.4 `pages/AdminDashboard.jsx`

- Fetches `GET /api/v1/admin/stats?user_id={currentUser.id}`
- Displays: total users, total saved projects, scrollable system log table
- Renders charts with Recharts for visual stats

### 2.5 `components/layout/Chatbot.jsx`

- Floating button (fixed bottom-right) toggles chat panel
- Maintains local `messages` array: `[{role: "user"|"assistant", content}]`
- Calls `POST /api/v1/chat` (or equivalent) passing full message history
- Streams or awaits reply and appends to messages

---

## 3. Database Schema (Detailed SQL)

```sql
-- users
CREATE TABLE IF NOT EXISTS users (
    id             VARCHAR(36)  PRIMARY KEY,
    email          VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name      VARCHAR(255),
    role           VARCHAR(50)  DEFAULT 'user' NOT NULL,
    created_at     TIMESTAMPTZ  DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at     TIMESTAMPTZ  DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE INDEX idx_users_email ON users(email);

-- saved_projects
CREATE TABLE IF NOT EXISTS saved_projects (
    id           VARCHAR(36) PRIMARY KEY,
    user_id      VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    project_data JSONB       NOT NULL,
    created_at   TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE INDEX idx_saved_projects_user_id   ON saved_projects(user_id);
CREATE INDEX idx_saved_projects_created_at ON saved_projects(created_at DESC);

-- system_logs
CREATE TABLE IF NOT EXISTS system_logs (
    id          VARCHAR(36)  PRIMARY KEY,
    event_type  VARCHAR(100) NOT NULL,
    user_id     VARCHAR(255),
    ip_address  VARCHAR(100),
    details     JSONB,
    created_at  TIMESTAMPTZ  DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE INDEX idx_system_logs_created_at  ON system_logs(created_at DESC);
CREATE INDEX idx_system_logs_event_type  ON system_logs(event_type);
```

---

## 4. Environment Variables Reference

### Backend (`.env`)

| Variable | Required | Description |
|----------|:--------:|-------------|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string (`postgresql://...?sslmode=require`) |
| `GROQ_API_KEY` | Yes* | Groq API key; *system works in fallback mode without it |
| `JWT_SECRET` | Yes | HS256 signing secret; use a 256-bit random string in production |
| `JWT_ALGORITHM` | No | Defaults to `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | No | Defaults to `10080` (7 days) |
| `ALLOWED_ORIGINS` | No | Comma-separated CORS origins; defaults to `*` |
| `HOST` | No | Bind host; defaults to `0.0.0.0` |
| `PORT` | No | Bind port; defaults to `8000` |
| `DEBUG` | No | Defaults to `True`; set `False` in production |

### Frontend (`frontend/.env.local`)

| Variable | Required | Description |
|----------|:--------:|-------------|
| `VITE_API_BASE_URL` | Yes | Backend base URL, e.g. `http://localhost:8000/api/v1` |

---

## 5. API Payload Contracts (Detailed)

### `POST /api/v1/generate`

**Request:**
```json
{
  "skills": "Python, React, Machine Learning",
  "domain": "Healthcare",
  "difficulty": "Intermediate",
  "time_hours": 320
}
```

**Response (200):**
```json
{
  "status": "success",
  "input_summary": {
    "skills": "Python, React, Machine Learning",
    "domain": "Healthcare",
    "difficulty": "Intermediate",
    "time_hours": 320,
    "time_display": "2 months"
  },
  "recommendations": [
    {
      "title": "...",
      "problem_statement": "...",
      "tech_stack": ["Python", "scikit-learn", "FastAPI"],
      "architecture": "...",
      "implementation_roadmap": ["Week 1: ...", "Week 2-3: ..."],
      "challenges": ["...", "..."],
      "prerequisites": {
        "Backend": ["FastAPI", "Django REST"],
        "AI Assistance": ["AntiGravity IDE", "Cursor"]
      },
      "warnings": ["...", "..."],
      "boundaries": ["...", "..."],
      "feasibility_analysis": "...",
      "resume_score": 82,
      "innovation_score": 74
    }
  ]
}
```

**Error Responses:**

| Code | Trigger |
|------|---------|
| 422 | Pydantic validation failure (e.g. `time_hours < 1`, missing field) |
| 500 | Unexpected server error |

---

## 6. Error Handling Strategy

| Layer | Strategy |
|-------|---------|
| **Pydantic** | Auto-validates all request bodies; returns 422 with field-level errors |
| **Groq client** | Tenacity retries (3x exponential backoff); re-raises on all failures |
| **Service layer** | Catches Groq exception → swaps to `build_fallback()`; logs warning |
| **Route layer** | Catches `ValueError` → 422; catches all others → 500 |
| **Database** | `pool_pre_ping=True` handles stale connections; `init_db` logs but doesn't crash startup |
| **Auth** | Missing/invalid JWT → 401; non-admin on admin route → 403 |
| **Frontend** | API errors displayed as inline error messages; auth failures redirect to `/login` |

---

## 7. Security Measures

| Threat | Mitigation |
|--------|-----------|
| Password exposure | bcrypt hashing with auto-generated salt; never stored in plaintext |
| Token theft | Short-lived JWT (7 days); HS256 signature; invalidated on password reset |
| Email enumeration | Forgot-password always returns generic success message |
| CSRF | Stateless JWT (no cookies); CORS restricts origins |
| SQL injection | SQLAlchemy ORM with parameterized queries; no raw SQL in app code |
| Unauthorized access | `get_current_user` and `get_current_admin` dependencies on all protected routes |
| Brute force | Failed login events logged to `system_logs` (visible to admin); extensible to rate-limiting |
