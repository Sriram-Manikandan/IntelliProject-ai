# utils/fallback_data.py
# ─────────────────────────────────────────────
# PURPOSE: Returns safe, hardcoded mock project data when the Groq
#          LLM call fails (e.g. missing API key, network error, quota
#          exceeded). This keeps the app functional during outages.
#
# Used by: recommendation_service.py
# ─────────────────────────────────────────────

from models.schemas import ProjectRequest


def _difficulty_weight(difficulty: str) -> int:
    """Small score bonus so Advanced results rank higher than Beginner."""
    return {"beginner": 0, "intermediate": 10, "advanced": 20}.get(
        difficulty.lower(), 10
    )


def build_fallback(req: ProjectRequest, time_display: str) -> list[dict]:
    """
    Return a list of 3 hardcoded project idea dicts that mirror the
    shape expected by the ProjectIdea Pydantic model.

    The content is generic but customised with the user's domain and
    skills so the response still feels relevant.

    Args:
        req:          The original ProjectRequest from the user.
        time_display: Human-readable time string (e.g. "2 weeks 3 days").

    Returns:
        A list of 3 dicts — each matching the ProjectIdea schema.
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
            "prerequisites": {
                "Frontend": ["React", "Vue"],
                "Backend": ["FastAPI", "Express"],
                "Database": ["PostgreSQL", "MongoDB"],
                "AI Assistance": ["AntiGravity IDE", "Cursor"],
                "Deployment": ["Vercel", "Render"],
            },
            "warnings": [
                "Healthcare data handling requires strict compliance (HIPAA/GDPR) which complicates architecture.",
                "Sourcing non-synthetic, high-quality medical datasets for triage is extremely difficult."
            ],
            "boundaries": [
                "Do not attempt to integrate with actual EHR systems; use standalone mock data files.",
                "Limit the ML model to binary or simple multi-class text classification; avoid complex imaging models."
            ],
            "feasibility_analysis": "This project is highly ambitious but possible as a proof-of-concept. The primary roadblock is securing labelled clinical data. If the student relies on public datasets like MIMIC-III, it is realistic, but it cannot be legally deployed to real users without intense regulatory compliance.",
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
            "prerequisites": {
                "Frontend": ["Next.js", "React"],
                "Backend": ["FastAPI", "Go"],
                "Database": ["InfluxDB", "TimescaleDB"],
                "AI Assistance": ["AntiGravity IDE", "GitHub Copilot"],
                "Deployment": ["AWS EC2 Free Tier", "GCP Compute Free"],
            },
            "warnings": [
                "Running Kafka locally can be resource-intensive and hard to configure for beginners.",
                "Streaming analytics often introduces silent data-loss bugs if watermarking isn't handled correctly."
            ],
            "boundaries": [
                "Restrict the data ingestion rate to < 100 events/sec to avoid local memory limits.",
                "Do not build a custom UI for every chart; heavily rely on Grafana for visualization."
            ],
            "feasibility_analysis": "Highly feasible and an excellent showcase of data engineering skills. The architecture uses standard industry tools. The only risk is spending too much time configuring Kafka instead of writing the actual business logic.",
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
            "prerequisites": {
                "Frontend": ["React", "Svelte"],
                "Backend": ["FastAPI", "Django"],
                "Database": ["MongoDB Atlas", "PostgreSQL"],
                "AI Assistance": ["AntiGravity IDE", "Cursor"],
                "Deployment": ["Vercel", "Fly.io"],
            },
            "warnings": [
                "Generating embeddings dynamically for every request will destroy your API latency.",
                "Collaborative filtering requires a dense user-item matrix; a sparse dataset will yield poor results."
            ],
            "boundaries": [
                "Pre-compute embeddings offline and store them; do not compute them on-the-fly.",
                "Do not implement real-time model retraining. Use daily batch jobs."
            ],
            "feasibility_analysis": "Feasible, but the success heavily depends on the chosen dataset. Using pre-trained models like Sentence-Transformers makes the content-based part easy, but the collaborative filtering part might struggle if mock user interaction data isn't realistic.",
            "resume_score": min(80 + dw, 100),
            "innovation_score": min(85 + dw, 100),
        },
    ]
