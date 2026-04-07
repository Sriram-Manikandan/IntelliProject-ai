# app/models/schemas.py
# ─────────────────────────────────────────────
# Pydantic models for request validation and
# structured response serialisation
# ─────────────────────────────────────────────

from pydantic import BaseModel, Field, field_validator
from typing import List, Literal


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
    difficulty: Literal["Beginner", "Intermediate", "Advanced"] = Field(
        ...,
        example="Intermediate",
        description="Beginner | Intermediate | Advanced",
    )
    time_hours: int = Field(
        ...,
        ge=1,
        le=2080,
        example=40,
        description="Available working hours (1h min – 52 weeks / 2080h max)",
    )

    @field_validator("skills", "domain", mode="before")
    @classmethod
    def strip_whitespace(cls, v: str) -> str:
        """Strip surrounding whitespace so '  ' cannot bypass min_length=2."""
        if isinstance(v, str):
            return v.strip()
        return v


# ── Sub-models ───────────────────────────────

class ProjectIdea(BaseModel):
    """A single AI-generated project recommendation."""

    title: str
    problem_statement: str
    tech_stack: List[str]
    architecture: str
    implementation_roadmap: List[str]
    challenges: List[str]
    prerequisites: dict[str, List[str]] = Field(..., description="Mapping of categories to lists of recommended free/open-source tools (e.g. {'Frontend': ['React', 'Vue'], 'AI Assistance': ['AntiGravity IDE', 'Cursor']})")
    resume_score: int = Field(..., ge=0, le=100, description="Resume impact score (0-100)")
    innovation_score: int = Field(..., ge=0, le=100, description="Innovation score (0-100)")


# ── Response ─────────────────────────────────

class ProjectResponse(BaseModel):
    """Top-level response returned from /generate."""

    status: str = "success"
    input_summary: dict          # Echo of the original request for UX convenience
    recommendations: List[ProjectIdea]
