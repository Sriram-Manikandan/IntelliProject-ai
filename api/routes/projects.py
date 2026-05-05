# api/routes/projects.py
# ─────────────────────────────────────────────
# PURPOSE: HTTP route handlers for saving and retrieving user projects.
#          This file's ONLY job is to:
#            1. Receive the incoming HTTP request
#            2. Delegate to the project_repository (database layer)
#            3. Return the response or raise an HTTP error
#
# Database logic lives in: services/project_repository.py
# Data shapes live in:     models/schemas.py
# ─────────────────────────────────────────────

import logging
from typing import List, Dict, Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.project_repository import save_project, get_user_projects, delete_project

logger = logging.getLogger(__name__)

router = APIRouter()


# ── Request body shapes used only by these routes ────────────────────

class SaveProjectPayload(BaseModel):
    """Body for POST /projects/save"""
    user_id: str
    project_data: dict  # A serialised ProjectIdea dict


class DeleteProjectPayload(BaseModel):
    """Body for DELETE /projects/delete"""
    user_id: str
    project_title: str


# ── Route Handlers ────────────────────────────────────────────────────

@router.post(
    "/projects/save",
    summary="Save a project blueprint for a user",
    tags=["Projects"],
)
async def save_user_project(payload: SaveProjectPayload) -> Dict[str, Any]:
    """
    POST /api/v1/projects/save

    Inserts a project card into the saved_projects table in Supabase
    for the given user_id.
    """
    try:
        result = await save_project(payload.user_id, payload.project_data)
        return {"status": "saved", "data": result}
    except Exception as exc:
        logger.exception("Failed to save project for user %s", payload.user_id)
        raise HTTPException(status_code=500, detail="Failed to save project.") from exc


@router.get(
    "/projects/{user_id}",
    summary="Get all saved projects for a user",
    tags=["Projects"],
)
async def get_projects(user_id: str) -> Dict[str, Any]:
    """
    GET /api/v1/projects/{user_id}

    Returns all project cards saved by the given user, newest first.
    """
    try:
        projects = await get_user_projects(user_id)
        return {"status": "ok", "count": len(projects), "projects": projects}
    except Exception as exc:
        logger.exception("Failed to fetch projects for user %s", user_id)
        raise HTTPException(status_code=500, detail="Failed to fetch projects.") from exc


@router.delete(
    "/projects/delete",
    summary="Delete a saved project for a user",
    tags=["Projects"],
)
async def delete_user_project(payload: DeleteProjectPayload) -> Dict[str, Any]:
    """
    DELETE /api/v1/projects/delete

    Removes a saved project matching user_id + project_title from Supabase.
    """
    try:
        success = await delete_project(payload.user_id, payload.project_title)
        if not success:
            raise HTTPException(status_code=404, detail="Project not found.")
        return {"status": "deleted"}
    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("Failed to delete project for user %s", payload.user_id)
        raise HTTPException(status_code=500, detail="Failed to delete project.") from exc
