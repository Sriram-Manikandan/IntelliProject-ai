# services/recommendation_service.py
# ─────────────────────────────────────────────
# PURPOSE: The main orchestrator for generating project recommendations.
#          This is the only file the API route talks to.
#
# What this file does (and ONLY this):
#   1. Converts time_hours → human-readable string (via time_utils)
#   2. Builds the AI prompt (via prompt_builder)
#   3. Calls the Groq LLM (via groq_client) — falls back to mock data on failure
#   4. Validates raw dicts into Pydantic models
#   5. Returns a structured ProjectResponse
#
# What this file does NOT do:
#   - It does not know about HTTP or FastAPI (that's api/routes/)
#   - It does not contain prompt text (that's utils/prompt_builder.py)
#   - It does not contain the Groq API call (that's utils/groq_client.py)
#   - It does not touch the database (that's services/project_repository.py)
# ─────────────────────────────────────────────

import logging

from models.schemas import ProjectRequest, ProjectIdea, ProjectResponse
from utils.time_utils import hours_to_human
from utils.prompt_builder import build_prompt
from utils.groq_client import call_groq
from utils.fallback_data import build_fallback

logger = logging.getLogger(__name__)


async def generate_projects(req: ProjectRequest) -> ProjectResponse:
    """
    Generate 3 tailored project recommendations for a given student profile.

    Flow:
        ProjectRequest → build prompt → call Groq LLM
            ↓ (on LLM failure)
        Fall back to safe mock data
            ↓
        Validate each raw dict → ProjectIdea model
            ↓
        Return ProjectResponse

    Args:
        req: Validated ProjectRequest containing skills, domain,
             difficulty, and time_hours.

    Returns:
        ProjectResponse with status, input_summary, and 3 recommendations.
    """
    # Step 1: Convert raw hours into a readable string for the prompt and response
    time_display = hours_to_human(req.time_hours)
    logger.info(
        "Generating projects | skills=%s | domain=%s | difficulty=%s | time=%s",
        req.skills, req.domain, req.difficulty, time_display,
    )

    # Step 2: Build the prompt
    prompt = build_prompt(req, time_display)

    # Step 3: Call the LLM — use fallback data if anything goes wrong
    try:
        raw_ideas = await call_groq(prompt)
        logger.info("LLM returned %d raw ideas", len(raw_ideas))
    except Exception as exc:
        logger.warning("LLM call failed — using fallback mock data. Reason: %s", exc)
        raw_ideas = build_fallback(req, time_display)

    # Step 4: Validate and cast each raw dict into the Pydantic ProjectIdea model
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
                prerequisites=raw.get("prerequisites", {"Tools": ["AntiGravity IDE"]}),
                warnings=raw.get("warnings", ["No specific warnings provided."]),
                boundaries=raw.get("boundaries", ["No specific boundaries set."]),
                feasibility_analysis=raw.get("feasibility_analysis", "Not analyzed."),
                resume_score=int(raw.get("resume_score", 75)),
                innovation_score=int(raw.get("innovation_score", 75)),
            )
        )

    # Step 5: Return the final structured response
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