# 🎓 IntelliProject – AI-Powered Academic Project Recommendation Engine

A clean, production-ready **FastAPI** backend that generates personalised
academic project ideas based on a student's skills, domain, difficulty, and
available time budget.

---

## 📁 Project Structure

```
intelliproject/
├── app/
│   ├── __init__.py
│   ├── main.py                  # App factory, CORS, routing
│   ├── api/
│   │   ├── __init__.py
│   │   └── routes.py            # POST /api/v1/generate
│   ├── core/
│   │   ├── __init__.py
│   │   └── config.py            # Settings loaded from .env
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py           # Pydantic request & response models
│   └── services/
│       ├── __init__.py
│       └── recommendation_service.py  # Business / AI logic
├── .env.example                 # Environment variable template
├── requirements.txt
├── run.py                       # Uvicorn entry point
└── README.md
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

### 5. Start the server

```bash
python run.py
```

Or, using uvicorn directly:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The server will be available at **http://localhost:8000**

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

Open `app/services/recommendation_service.py` and replace the body of
`generate_projects()` with a call to your preferred provider:

```python
import openai  # or anthropic

def generate_projects(req: ProjectRequest) -> ProjectResponse:
    prompt = build_prompt(req)          # craft your prompt
    raw = openai.chat.completions.create(...)
    return parse_llm_response(raw)      # map to ProjectResponse
```

No changes needed in the route layer.

---

## ✅ Requirements

- Python 3.10+
- pip
