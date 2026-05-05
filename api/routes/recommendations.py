# api/routes/recommendations.py
# ─────────────────────────────────────────────
# PURPOSE: HTTP route handler for the project generation feature.
#          This file's ONLY job is to:
#            1. Receive the incoming POST request
#            2. Pass the validated payload to the recommendation service
#            3. Return the response (or raise an HTTP error on failure)
#
# Business logic lives in: services/recommendation_service.py
# Data shapes live in:     models/schemas.py
# ─────────────────────────────────────────────

import logging
from fastapi import APIRouter, HTTPException

from models.schemas import ProjectRequest, ProjectResponse
from services.recommendation_service import generate_projects

logger = logging.getLogger(__name__)

# This router is assembled into the main app via api/router.py
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
    POST /api/v1/generate

    Receives a ProjectRequest, delegates to the recommendation service,
    and returns a ProjectResponse containing 3 project ideas.

    FastAPI automatically validates the request body against ProjectRequest
    and returns a 422 Unprocessable Entity if validation fails.
    """
    logger.info(
        "POST /generate | skills=%s | domain=%s | difficulty=%s | time_hours=%s",
        payload.skills, payload.domain, payload.difficulty, payload.time_hours,
    )

    try:
        result = await generate_projects(payload)
        logger.info("Successfully generated %d recommendations", len(result.recommendations))
        return result

    except ValueError as exc:
        # Raised by the service layer for known validation issues
        logger.warning("Validation error in recommendation generation: %s", exc)
        raise HTTPException(status_code=422, detail=str(exc)) from exc

    except Exception as exc:
        # Catch-all for unexpected failures
        logger.exception("Unexpected error during project generation")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred while generating recommendations.",
        ) from exc
