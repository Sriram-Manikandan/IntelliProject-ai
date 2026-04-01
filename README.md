# 🎓 IntelliProject – AI-Powered Academic Project Recommendation Engine

IntelliProject is a full-stack AI-powered project recommendation system that generates structured academic project ideas based on a student’s:

- Skills
- Target domain
- Difficulty level
- Available time budget

The system is built using an asynchronous FastAPI backend and a custom dark-themed React (Vite + Tailwind CSS) frontend, following a clean, layered architecture with a clear separation of concerns.

---

## 🧠 Features

- **Personalized project recommendations** based on skills, domain, difficulty, and time budget.
- **Premium "Nexus" UI Design**, featuring a high-end, responsive, startup-ready aesthetic built from scratch with Tailwind CSS v3 & lucide-react icons.
- **Advanced Duration Picker & Inline Editing** via a custom 3-column time budget picker (Weeks/Days/Hours) and an interactive Results View.
- **Streamlined Navigation** containing a consolidated Home page, smooth scrolling anchor links, Login, and Signup functionalities.
- **Structured, production-style API responses** with strict Pydantic v2 validation.
- **Layered backend architecture** (Routes → Services → Models).
- **Interactive API documentation** (Swagger + ReDoc).
- **High-performance AI Integration** using Groq (llama-3.3-70b-versatile) with automatic retry logic via Tenacity.

---

## 🛠 Tech Stack

**Backend**
- Python 3.11+
- FastAPI (Async API)
- Pydantic v2
- Groq API (llama-3.3-70b-versatile)
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

The business logic is isolated in `recommendation_service.py`, deeply integrated with Groq for real-time recommendations alongside a robust fallback system in case of outages.

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
        ├── components/         (Hero, Navbar, AboutSection, HowItWorks, ProjectForm, ResultsView, ProjectCard, etc.)
        └── pages/              (Home, Generate, Login, Signup)
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
  "time_hours": 320
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
    "time_hours": 320
  }'
```

---

## 🤖 AI Integration (Groq)

The application is fully integrated with **Groq** (using the `llama-3.3-70b-versatile` model) to deliver lightning-fast AI recommendations.

To enable the AI capabilities, simply create an `.env` file in the root directory (using `env.example` as a template) and add your Groq API key:
```env
GROQ_API_KEY=gsk_your_api_key_here
```
_Note: If the API key is missing or the Groq service is unreachable, the system automatically uses a graceful fallback mechanism to return mock data._

---

## ✅ Requirements

- Python 3.11+
- Node.js 18+
- pip
- npm
- Groq API Key (Optional, for real LLM generation)

---

## 📌 Future Improvements

- Add OAuth / Social Login integration.
- Save user sessions or allow exporting to PDF/Markdown.
- Integrate with Figma for UI design exports.
- Deploy backend (Render / Railway).
- Deploy frontend (Vercel / Netlify).

---

## License
This project is licensed under the MIT License.