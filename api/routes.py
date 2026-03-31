# app/api/routes.py
# ─────────────────────────────────────────────
# Route definitions for the IntelliProject API
# ─────────────────────────────────────────────

import logging
from fastapi import APIRouter, HTTPException
from models.schemas import ProjectRequest, ProjectResponse
from services.recommendation_service import generate_projects

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post(
    "/generate",
    response_model=ProjectResponse,
    summary="Generate AI-powered project recommendations",
    description=(
        "Accepts a student profile (skills, domain, difficulty, time) and returns "
        "three tailored academic project ideas with full implementation detail."
    ),
    tags=["Recommendations"],
)
async def generate_project_recommendations(payload: ProjectRequest) -> ProjectResponse:
    """
    POST /generate

    - Validates the incoming request via Pydantic
    - Delegates to the recommendation service
    - Returns a structured ProjectResponse
    """
    logger.info(
        "Generate request: skills=%s, domain=%s, difficulty=%s, time_hours=%s",
        payload.skills, payload.domain, payload.difficulty, payload.time_hours,
    )
    try:
        result = await generate_projects(payload)
        logger.info("Successfully generated %d recommendations", len(result.recommendations))
        return result

    except ValueError as exc:
        logger.warning("Validation error: %s", exc)
        raise HTTPException(status_code=422, detail=str(exc)) from exc

    except Exception as exc:
        logger.exception("Unexpected error during project generation")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred while generating recommendations.",
        ) from exc
