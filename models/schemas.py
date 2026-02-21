# app/models/schemas.py
# ─────────────────────────────────────────────
# Pydantic models for request validation and
# structured response serialisation
# ─────────────────────────────────────────────

from pydantic import BaseModel, Field
from typing import List


# ── Request ──────────────────────────────────

class ProjectRequest(BaseModel):
    """Payload sent by the client to /generate."""

    skills: str = Field(
        ...,
        min_length=2,
        example="Python, Machine Learning, REST APIs",
        description="Comma-separated list of the student's skills",
    )
    domain: str = Field(
        ...,
        min_length=2,
        example="Healthcare",
        description="Target domain / industry for the project",
    )
    difficulty: str = Field(
        ...,
        example="Intermediate",
        description="Beginner | Intermediate | Advanced",
    )
    time_weeks: str = Field(
        ...,
        example="8",
        description="Available time budget in weeks",
    )


# ── Sub-models ───────────────────────────────

class ProjectIdea(BaseModel):
    """A single AI-generated project recommendation."""

    title: str
    problem_statement: str
    tech_stack: List[str]
    architecture: str
    implementation_roadmap: List[str]
    challenges: List[str]
    resume_score: int = Field(..., ge=0, le=100, description="Resume impact score (0-100)")
    innovation_score: int = Field(..., ge=0, le=100, description="Innovation score (0-100)")


# ── Response ─────────────────────────────────

class ProjectResponse(BaseModel):
    """Top-level response returned from /generate."""

    status: str = "success"
    input_summary: dict          # Echo of the original request for UX convenience
    recommendations: List[ProjectIdea]
