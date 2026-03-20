# 🎓 IntelliProject – AI-Powered Academic Project Recommendation Engine

IntelliProject is a full-stack AI-powered project recommendation system that generates structured academic project ideas based on a student’s:

- Skills
- Target domain
- Difficulty level
- Available time budget

The system is built using an asynchronous FastAPI backend and a custom dark-themed React (Vite + Tailwind CSS) frontend, following a clean, layered architecture with a clear separation of concerns.

---

## 🧠 Features

- **Personalized project recommendations**
- **Modern, responsive UI** (built from scratch with Tailwind CSS v3 & lucide-react icons)
- **Structured, production-style API responses** with strict Pydantic v2 validation
- **Layered backend architecture** (Routes → Services → Models)
- **Interactive API documentation** (Swagger + ReDoc)
- **Async-first service layer**, ready for integration with real LLM providers (OpenAI / Anthropic)

---

## 🛠 Tech Stack

**Backend**
- Python 3.11+
- FastAPI (Async API)
- Pydantic v2
- Uvicorn
- Environment-based configuration

**Frontend**
- React (Vite)
- Tailwind CSS v3
- React Router DOM
- Lucide React (Icons)

---

## 🏗 Architecture Overview

1. Frontend sends a `POST` request to `/api/v1/generate`.
2. FastAPI validates input via strict Pydantic models.
3. Service layer asynchronously processes logic and generates recommendations.
4. Structured JSON response is returned.
5. Frontend renders dynamic, expandable project cards with inline scoring metrics.

The business logic is isolated in `recommendation_service.py`, making it incredibly easy to plug in a real LLM without modifying the API layer.

---

## 📁 Project Structure

```text
IntelliProject/
│
├── start.sh                    # Unified startup script (macOS/Linux)
├── start.bat                   # Unified startup script (Windows Cmd)
├── start.ps1                   # Unified startup script (Windows PowerShell)
│
├── main.py                     # FastAPI app instance, middleware, route registration
├── run.py                      # Uvicorn entry point
├── requirements.txt            # Backend dependencies
├── env.example                 # Environment variable template
├── README.md
│
├── api/
│   └── routes.py               # API endpoints (POST /api/v1/generate)
│
├── core/
│   └── config.py               # Centralized settings management
│
├── models/
│   └── schemas.py              # Pydantic request/response models
│
├── services/
│   └── recommendation_service.py  # Business logic / AI engine
│
└── frontend/                   # React SPA
    ├── package.json
    ├── tailwind.config.js
    ├── index.html
    └── src/
        ├── App.jsx             (React Router config)
        ├── index.css           (Tailwind directives)
        ├── components/         (Hero, Navbar, Features, HowItWorks, SampleShowcase, Testimonials, FAQ, CallToAction, Footer, etc.)
        └── pages/              (Home, About, Login, Signup)
```

---

## 🚀 Setup & Run

### Step 1: Clone / Download the Project

```bash
git clone <your-repo-url>
cd intelliproject
```

### ⚡ Quick Start (Recommended)

Start both the backend and frontend simultaneously with a **single command**:

#### macOS / Linux
```bash
chmod +x start.sh
./start.sh
```

#### Windows (Command Prompt)
```cmd
start.bat
```

#### Windows (PowerShell)
```powershell
.\start.ps1
```

**Both servers will start automatically:**
- **Backend**: http://localhost:8000
- **Frontend**: http://localhost:5173

*(To stop the servers, just close the terminal or press `Ctrl+C`)*

---

### Manual Setup (Optional)

If you prefer to run the servers in separate terminal tabs manually:

#### Terminal 1 - Backend
```bash
python -m venv venv
source venv/bin/activate       # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```

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
  "skills": "Python, React, Machine Learning",
  "domain": "Healthcare",
  "difficulty": "Intermediate",
  "time_weeks": 8
}
```

**Example with curl**

```bash
curl -s -X POST http://localhost:8000/api/v1/generate \
  -H "Content-Type: application/json" \
  -d '{
    "skills": "Python, React, Machine Learning",
    "domain": "Healthcare",
    "difficulty": "Intermediate",
    "time_weeks": 8
  }'
```

---

## 🔧 Extending to a Real LLM

Open `services/recommendation_service.py` and replace the body of `generate_projects()` with a call to your preferred LLM provider.

Example (pseudo):
```python
async def generate_projects(req: ProjectRequest) -> ProjectResponse:
    prompt = build_prompt(req)          # craft your prompt
    response = await call_llm(prompt)
    return parse_llm_response(raw)      # map to ProjectResponse
```
_(No changes needed in the route layer!)_

---

## ✅ Requirements

- Python 3.11+
- Node.js 18+
- pip
- npm

---

## 📌 Future Improvements

- Integrate real LLM (OpenAI / Anthropic).
- Integrate with Figma.
- Deploy backend (Render / Railway).
- Deploy frontend (Vercel / Netlify).
- Add database for saving user sessions.

---

## License
This project is licensed under the MIT License.