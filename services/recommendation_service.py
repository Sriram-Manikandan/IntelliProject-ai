# app/services/recommendation_service.py
# ─────────────────────────────────────────────
# Business logic layer – currently returns rich
# mock data. Swap generate_projects() for a real
# LLM call (OpenAI / Anthropic) without touching
# the route layer.
# ─────────────────────────────────────────────

from models.schemas import ProjectRequest, ProjectIdea, ProjectResponse


def _difficulty_weight(difficulty: str) -> int:
    """Map difficulty label to a base score modifier."""
    return {"beginner": 0, "intermediate": 10, "advanced": 20}.get(
        difficulty.lower(), 10
    )


def generate_projects(req: ProjectRequest) -> ProjectResponse:
    """
    Build three tailored mock project recommendations.

    Each idea references the user's skills, domain, and time budget so the
    response feels personalised even before a real LLM is wired in.
    """

    dw = _difficulty_weight(req.difficulty)
    weeks = req.time_weeks
    domain = req.domain
    skills = req.skills

    # ── Idea 1 ────────────────────────────────
    idea_1 = ProjectIdea(
        title=f"AI-Powered {domain} Diagnostic Assistant",
        problem_statement=(
            f"Professionals in the {domain} sector spend significant time on repetitive "
            f"analysis tasks. This project builds an intelligent assistant that leverages "
            f"the student's expertise in {skills} to automate early-stage diagnosis and "
            f"triage, reducing workload by an estimated 40 %."
        ),
        tech_stack=[
            "Python 3.11",
            "FastAPI",
            "scikit-learn / PyTorch",
            "PostgreSQL",
            "Docker",
            "React (dashboard)",
        ],
        architecture=(
            "Microservices design with three core services: (1) Data Ingestion Service "
            "that normalises incoming records; (2) ML Inference Service exposing a REST "
            "API backed by a trained classifier; (3) Reporting Service that persists "
            "results and sends notifications. A React SPA consumes the public gateway."
        ),
        implementation_roadmap=[
            f"Week 1–2 : Requirements gathering, dataset sourcing, and repo setup",
            f"Week 3–4 : Data preprocessing pipeline and exploratory data analysis",
            f"Week 5–{int(weeks)//2} : Model training, evaluation, and FastAPI integration",
            f"Week {int(weeks)//2 + 1}–{int(weeks)-1} : Frontend dashboard and Docker packaging",
            f"Week {weeks} : Testing, documentation, and demo preparation",
        ],
        challenges=[
            "Sourcing a sufficiently large, labelled dataset",
            "Ensuring model explainability for non-technical stakeholders",
            "Handling class imbalance in medical/operational data",
            "GDPR / data-privacy compliance if real patient data is used",
        ],
        resume_score=min(88 + dw, 100),
        innovation_score=min(82 + dw, 100),
    )

    # ── Idea 2 ────────────────────────────────
    idea_2 = ProjectIdea(
        title=f"Real-Time {domain} Analytics & Forecasting Platform",
        problem_statement=(
            f"Organisations in {domain} lack affordable, real-time dashboards that "
            f"combine historical trend analysis with short-term forecasting. This platform "
            f"ingests streaming data and delivers actionable insights through an "
            f"interactive web interface built with {skills}."
        ),
        tech_stack=[
            "Python 3.11",
            "Apache Kafka",
            "Apache Spark / Flink",
            "InfluxDB",
            "Grafana",
            "FastAPI",
            "Kubernetes (optional)",
        ],
        architecture=(
            "Event-driven pipeline: producers publish domain events to Kafka topics; "
            "a Spark Structured Streaming job performs windowed aggregations and "
            "ARIMA/Prophet forecasting; results are written to InfluxDB and visualised "
            "in Grafana. A FastAPI layer exposes query endpoints for custom clients."
        ),
        implementation_roadmap=[
            "Week 1–2 : Architecture design and local Kafka + InfluxDB setup",
            "Week 3–4 : Data producer simulation and Spark streaming job",
            f"Week 5–{int(weeks)//2} : Forecasting model integration",
            f"Week {int(weeks)//2 + 1}–{int(weeks)-1} : Grafana dashboards and FastAPI query layer",
            f"Week {weeks} : Load testing and final documentation",
        ],
        challenges=[
            "Managing consumer lag under high-throughput scenarios",
            "Choosing the right windowing strategy for accurate forecasts",
            "Operational complexity of running Kafka locally during development",
            "Visualising confidence intervals intuitively in Grafana",
        ],
        resume_score=min(84 + dw, 100),
        innovation_score=min(79 + dw, 100),
    )

    # ── Idea 3 ────────────────────────────────
    idea_3 = ProjectIdea(
        title=f"Smart {domain} Recommendation & Personalisation Engine",
        problem_statement=(
            f"Users interacting with {domain} platforms receive generic, one-size-fits-all "
            f"content. By applying collaborative filtering and NLP skills from {skills}, "
            f"this engine delivers personalised recommendations that improve engagement "
            f"metrics by up to 35 %."
        ),
        tech_stack=[
            "Python 3.11",
            "FastAPI",
            "Redis (caching)",
            "MongoDB",
            "Sentence-Transformers",
            "Celery + RabbitMQ",
            "React / Next.js",
        ],
        architecture=(
            "Hybrid recommender combining content-based filtering (Sentence-Transformers "
            "embeddings stored in a vector index) with collaborative filtering (matrix "
            "factorisation via Implicit library). Celery workers handle async model "
            "retraining. Redis caches hot recommendation lists. FastAPI serves results "
            "with sub-50 ms P99 latency."
        ),
        implementation_roadmap=[
            "Week 1–2 : User & item data modelling, MongoDB schema design",
            "Week 3–4 : Content-based module with embedding pipeline",
            f"Week 5–{int(weeks)//2} : Collaborative filtering and hybrid merge logic",
            f"Week {int(weeks)//2 + 1}–{int(weeks)-1} : API, caching layer, and frontend integration",
            f"Week {weeks} : A/B testing framework and performance benchmarking",
        ],
        challenges=[
            "Cold-start problem for new users / items",
            "Keeping embeddings in sync after catalogue updates",
            "Balancing exploration vs. exploitation in recommendations",
            "Designing meaningful offline evaluation metrics (precision@k, NDCG)",
        ],
        resume_score=min(80 + dw, 100),
        innovation_score=min(85 + dw, 100),
    )

    return ProjectResponse(
        status="success",
        input_summary={
            "skills": req.skills,
            "domain": req.domain,
            "difficulty": req.difficulty,
            "time_weeks": req.time_weeks,
        },
        recommendations=[idea_1, idea_2, idea_3],
    )
