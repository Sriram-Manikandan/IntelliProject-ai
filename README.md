# 🎓 IntelliProject – AI-Powered Academic Project Recommendation Engine

IntelliProject is a full-stack AI-powered project recommendation system that generates structured academic project ideas based on a student’s:

-->Skills

-->Target domain

-->Difficulty level

-->Available time budget

The system is built using a FastAPI backend and a React (Vite) frontend, following a clean layered architecture with clear separation of concerns.

---

🧠 Features

-->Personalized project recommendations
-->Structured, production-style API responses
-->Layered backend architecture (Routes → Services → Models)
-->Interactive API documentation (Swagger + ReDoc)
-->Clean React UI for submitting inputs and viewing results
-->Easily extendable to real LLM providers (OpenAI / Anthropic)

---

🛠 Tech Stack

**Backend**
-->Python 3.11+
-->FastAPI
-->Pydantic
-->Uvicorn
-->Environment-based configuration

**Frontend**
-->React (Vite)
-->JavaScript (ES6+)
-->Fetch API
-->CSS

---

🏗 Architecture Overview

1)Frontend sends a POST request to /api/v1/generate.

2)FastAPI validates input using Pydantic schemas.

3)Service layer processes logic and generates recommendations.

4)Structured JSON response is returned.

5)Frontend renders dynamic project cards.

The business logic is isolated in recommendation_service.py, making it easy to plug in a real LLM without modifying the API layer.

---

## 📁 Project Structure

```
intelliproject/
│
├── main.py                     # FastAPI app instance, middleware, route registration
├── run.py                      # Uvicorn entry point
├── requirements.txt            # Backend dependencies
├── .env.example                # Environment variable template
├── README.md
│
├── api/
│   ├── __init__.py
│   └── routes.py               # API endpoints (POST /api/v1/generate)
│
├── core/
│   ├── __init__.py
│   └── config.py               # Centralized settings management
│
├── models/
│   ├── __init__.py
│   └── schemas.py              # Pydantic request/response models
│
├── services/
│   ├── __init__.py
│   └── recommendation_service.py  # Business logic / AI engine
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── App.css
        └── index.css
```

---

## 🚀 Step-by-Step Setup & Run

### 1. Clone / download the project

```bash
# If using git
git clone <your-repo-url>
cd intelliproject
```

### 2. Create a virtual environment

```bash
python -m venv venv

# Activate (macOS / Linux)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

```bash
cp .env.example .env
# Edit .env if you want to change the port or CORS origins
```

### 5. Start the backend server

```bash
python run.py
```

Or, using uvicorn directly:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend server will be available at **http://localhost:8000**

---

### 6. Start the frontend server

in a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend server will be available at **http://localhost:5173**


---

## 📖 Interactive API Docs

| Interface | URL |
|-----------|-----|
| Swagger UI | http://localhost:8000/docs |
| ReDoc | http://localhost:8000/redoc |
| Health check | http://localhost:8000/health |

---

## 🔌 API Usage

### `POST /api/v1/generate`

**Request body**

```json
{
  "skills": "Python, Machine Learning, REST APIs",
  "domain": "Healthcare",
  "difficulty": "Intermediate",
  "time_weeks": "8"
}
```

**Example with curl**

```bash
curl -X POST http://localhost:8000/api/v1/generate \
  -H "Content-Type: application/json" \
  -d '{
    "skills": "Python, Machine Learning, REST APIs",
    "domain": "Healthcare",
    "difficulty": "Intermediate",
    "time_weeks": "8"
  }'
```

**Response (trimmed)**

```json
{
  "status": "success",
  "input_summary": { ... },
  "recommendations": [
    {
      "title": "AI-Powered Healthcare Diagnostic Assistant",
      "problem_statement": "...",
      "tech_stack": ["Python 3.11", "FastAPI", "scikit-learn", "..."],
      "architecture": "...",
      "implementation_roadmap": ["Week 1–2: ...", "..."],
      "challenges": ["...", "..."],
      "resume_score": 98,
      "innovation_score": 92
    },
    { ... },
    { ... }
  ]
}
```

---

## 🔧 Extending to a Real LLM

Open:
```Code
services/recommendation_service.py
```
Replace the body of generate_projects() with a call to your preferred LLM provider.

Example (pseudo):
```python
def generate_projects(req: ProjectRequest) -> ProjectResponse:
    prompt = build_prompt(req)          # craft your prompt
    response = call_llm(prompt)
    return parse_llm_response(raw)      # map to ProjectResponse
```

No changes needed in the route layer.

---

## ✅ Requirements

- Python 3.11+
- Node.js 18+
- pip
- npm

---

📌 Future Improvements

-->Integrate real LLM (OpenAI / Anthropic).
-->Add authentication.
-->Deploy backend (Render / Railway).
-->Deploy frontend (Vercel / Netlify).
-->Add database for saving user sessions.

---
