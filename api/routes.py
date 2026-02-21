# app/api/routes.py
# ─────────────────────────────────────────────
# Route definitions for the IntelliProject API
# ─────────────────────────────────────────────

from fastapi import APIRouter, HTTPException
from models.schemas import ProjectRequest, ProjectResponse
from services.recommendation_service import generate_projects

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
    try:
        result = generate_projects(payload)
        return result

    except ValueError as exc:
        # Surface validation errors from the service layer
        raise HTTPException(status_code=422, detail=str(exc)) from exc

    except Exception as exc:
        # Catch-all – log in production, return a clean 500
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred while generating recommendations.",
        ) from exc
