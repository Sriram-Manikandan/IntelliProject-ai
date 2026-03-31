# app/services/recommendation_service.py
# ─────────────────────────────────────────────
# Business logic layer – integrated with Groq (llama-3.3-70b-versatile).
# Swap generate_projects() prompt to customise output style.
# ─────────────────────────────────────────────
 
import os
import json
import re
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

from models.schemas import ProjectRequest, ProjectIdea, ProjectResponse
 
 
# ── Time Utility ─────────────────────────────
 
def hours_to_human(hours: int) -> str:
    """
    Convert raw hours into a human-readable string.
 
    Examples:
        5   → "5 hours"
        25  → "1 day 1 hour"
        60  → "2 days 12 hours"
        200 → "1 week 1 day 8 hours"
    """
    if hours <= 0:
        return "0 hours"
 
    weeks, remainder = divmod(hours, 7 * 24)   # 1 week = 168 hours
    days, hrs = divmod(remainder, 24)
 
    parts = []
    if weeks:
        parts.append(f"{weeks} week{'s' if weeks > 1 else ''}")
    if days:
        parts.append(f"{days} day{'s' if days > 1 else ''}")
    if hrs:
        parts.append(f"{hrs} hour{'s' if hrs > 1 else ''}")
 
    return " ".join(parts) if parts else "0 hours"
 
 
# ── Difficulty Score ──────────────────────────
 
def _difficulty_weight(difficulty: str) -> int:
    return {"beginner": 0, "intermediate": 10, "advanced": 20}.get(
        difficulty.lower(), 10
    )
 
 
# ── Prompt Builder ────────────────────────────
 
def _build_prompt(req: ProjectRequest, time_display: str) -> str:
    return f"""You are an expert software engineering mentor specialising in academic project design.
Your task is to generate exactly 3 highly specific, creative, and technically rich project ideas.
 
## Student Profile
- Skills: {req.skills}
- Domain: {req.domain}
- Difficulty: {req.difficulty}
- Available Time: {time_display} (raw: {req.time_hours} hours)
 
## Critical Rules
1. Every idea MUST be a direct, non-trivial intersection of the student's EXACT skills and the domain.
   Do NOT suggest generic ideas like "AI chatbot" or "dashboard app" unless there is a highly specific, novel angle.
2. Each idea must be DISTINCT in nature:
   - Idea 1: Data / ML heavy
   - Idea 2: API / Integration heavy
   - Idea 3: Product / UX heavy
3. The tech stack must reference the student's actual skills ({req.skills}) — do not suggest unrelated technologies.
4. The implementation roadmap MUST be broken down using the available time: {time_display}.
   Use the format "Days 1-3:", "Week 1:", etc. Be realistic about what is achievable.
5. Scores must be honest integers (0–100). Do not give everything 95+.
6. Never repeat ideas across the 3 results. Each must solve a different problem.
 
## Output Format
Respond ONLY with a valid JSON array. No explanation, no markdown, no backticks.
The array must contain exactly 3 objects, each with this exact structure:
 
[
  {{
    "title": "...",
    "problem_statement": "...",
    "tech_stack": ["...", "..."],
    "architecture": "...",
    "implementation_roadmap": ["...", "..."],
    "challenges": ["...", "..."],
    "resume_score": 0,
    "innovation_score": 0
  }}
]
 
Respond with the JSON array only. Absolutely nothing else."""
 
 
# ── LLM Caller ────────────────────────────────
 
async def _call_groq(prompt: str) -> list[dict]:
    """
    Call Groq (llama-3.3-70b-versatile) and return a parsed list of project idea dicts.
    Raises ValueError if the response cannot be parsed.
    """
    client = Groq(api_key=os.environ["GROQ_API_KEY"])
 
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are a precise JSON generator. You only output valid JSON arrays. No markdown, no explanation, no backticks. Just raw JSON."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.7,      # balanced creativity vs consistency
        max_tokens=4096,
    )
 
    raw_text = completion.choices[0].message.content.strip()
 
    # Strip accidental markdown fences if model adds them
    raw_text = re.sub(r"^```(?:json)?", "", raw_text).strip()
    raw_text = re.sub(r"```$", "", raw_text).strip()
 
    try:
        parsed = json.loads(raw_text)
    except json.JSONDecodeError as e:
        raise ValueError(f"Groq returned invalid JSON: {e}\n\nRaw output:\n{raw_text}")
 
    if not isinstance(parsed, list) or len(parsed) != 3:
        raise ValueError(f"Expected a JSON array of 3 items, got: {type(parsed)}")
 
    return parsed
 
 
# ── Fallback (mock) ───────────────────────────
 
def _build_fallback(req: ProjectRequest, time_display: str) -> list[dict]:
    """
    Returns safe mock data when the LLM call fails.
    Keeps the app functional during outages or missing API keys.
    """
    dw = _difficulty_weight(req.difficulty)
    domain = req.domain
    skills = req.skills
 
    return [
        {
            "title": f"AI-Powered {domain} Diagnostic Assistant",
            "problem_statement": (
                f"Professionals in {domain} spend significant time on repetitive analysis. "
                f"This project uses {skills} to automate early-stage triage."
            ),
            "tech_stack": ["Python 3.11", "FastAPI", "scikit-learn", "PostgreSQL", "React"],
            "architecture": (
                "Three microservices: Data Ingestion, ML Inference (REST), and Reporting. "
                "A React SPA consumes the public gateway."
            ),
            "implementation_roadmap": [
                f"Phase 1 ({time_display} split): Requirements and dataset sourcing",
                "Phase 2: Model training and FastAPI integration",
                "Phase 3: Frontend, Docker packaging, and documentation",
            ],
            "challenges": [
                "Sourcing labelled data",
                "Model explainability",
                "Data privacy compliance",
            ],
            "resume_score": min(88 + dw, 100),
            "innovation_score": min(82 + dw, 100),
        },
        {
            "title": f"Real-Time {domain} Analytics Platform",
            "problem_statement": (
                f"Organisations in {domain} lack real-time dashboards combining trend analysis "
                f"with forecasting. Built using {skills}."
            ),
            "tech_stack": ["Python 3.11", "Apache Kafka", "InfluxDB", "Grafana", "FastAPI"],
            "architecture": (
                "Event-driven pipeline: Kafka → Spark Streaming → InfluxDB → Grafana. "
                "FastAPI exposes query endpoints."
            ),
            "implementation_roadmap": [
                "Phase 1: Kafka and InfluxDB local setup",
                "Phase 2: Streaming job and forecasting model",
                "Phase 3: Grafana dashboards and load testing",
            ],
            "challenges": [
                "Consumer lag under high throughput",
                "Windowing strategy for forecasts",
                "Operational Kafka complexity",
            ],
            "resume_score": min(84 + dw, 100),
            "innovation_score": min(79 + dw, 100),
        },
        {
            "title": f"Smart {domain} Recommendation Engine",
            "problem_statement": (
                f"Users on {domain} platforms receive generic content. "
                f"Using {skills}, this engine delivers personalised recommendations."
            ),
            "tech_stack": ["Python 3.11", "FastAPI", "Redis", "MongoDB", "Sentence-Transformers"],
            "architecture": (
                "Hybrid recommender: content-based (embeddings) + collaborative filtering. "
                "Celery handles async retraining. Redis caches hot lists."
            ),
            "implementation_roadmap": [
                "Phase 1: Data modelling and MongoDB schema",
                "Phase 2: Embedding pipeline and collaborative filter",
                "Phase 3: API, caching, and A/B testing framework",
            ],
            "challenges": [
                "Cold-start problem",
                "Keeping embeddings in sync",
                "Offline evaluation metrics",
            ],
            "resume_score": min(80 + dw, 100),
            "innovation_score": min(85 + dw, 100),
        },
    ]
 
 
# ── Main Entry Point ──────────────────────────
 
async def generate_projects(req: ProjectRequest) -> ProjectResponse:
    """
    Generate 3 tailored project recommendations using Groq.
    Falls back to mock data if the LLM call fails.
    """
 
    # Convert hours → human-readable display
    time_display = hours_to_human(req.time_hours)
 
    prompt = _build_prompt(req, time_display)
 
    try:
        raw_ideas = await _call_groq(prompt)
    except Exception as e:
        print(f"[IntelliProject] LLM call failed, using fallback. Reason: {e}")
        raw_ideas = _build_fallback(req, time_display)
 
    # Validate and cast each idea into the Pydantic model
    ideas = []
    for raw in raw_ideas:
        ideas.append(
            ProjectIdea(
                title=raw["title"],
                problem_statement=raw["problem_statement"],
                tech_stack=raw["tech_stack"],
                architecture=raw["architecture"],
                implementation_roadmap=raw["implementation_roadmap"],
                challenges=raw["challenges"],
                resume_score=int(raw.get("resume_score", 75)),
                innovation_score=int(raw.get("innovation_score", 75)),
            )
        )
 
    return ProjectResponse(
        status="success",
        input_summary={
            "skills": req.skills,
            "domain": req.domain,
            "difficulty": req.difficulty,
            "time_hours": req.time_hours,
            "time_display": time_display,
        },
        recommendations=ideas,
    )