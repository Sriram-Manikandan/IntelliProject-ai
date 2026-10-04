# api/routes/projects.py
# ─────────────────────────────────────────────
# Saved Projects endpoints backed by Neon DB.
# Allows users to save, list, and delete recommended projects.
# ─────────────────────────────────────────────

import logging
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from core.database import get_db
from core.security import get_current_user
from models.db_models import SavedProject, User

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/projects", tags=["Saved Projects"])


class SaveProjectRequest(BaseModel):
    user_id: Optional[str] = None
    project_data: Dict[str, Any]


@router.get("", response_model=List[Dict[str, Any]])
async def get_user_projects(
    user_id: Optional[str] = Query(None),
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Fetch all projects saved by the user, ordered by newest first.
    """
    target_user_id = (current_user.id if current_user else None) or user_id
    if not target_user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required or user_id must be provided.",
        )

    rows = (
        db.query(SavedProject)
        .filter(SavedProject.user_id == target_user_id)
        .order_by(SavedProject.created_at.desc())
        .all()
    )

    # Return array matching format expected by frontend: project_data object with id injected
    results = []
    for row in rows:
        data = dict(row.project_data) if isinstance(row.project_data, dict) else {}
        data["id"] = row.id
        results.append(data)

    return results


@router.post("", status_code=status.HTTP_201_CREATED)
async def save_project(
    payload: SaveProjectRequest,
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Save a project idea to Neon DB.
    """
    target_user_id = (current_user.id if current_user else None) or payload.user_id
    if not target_user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required or user_id must be provided.",
        )

    project = SavedProject(
        user_id=target_user_id,
        project_data=payload.project_data,
    )
    db.add(project)
    db.commit()
    db.refresh(project)

    logger.info("Saved project %s for user %s in Neon DB", project.id, target_user_id)
    return {"id": project.id}


@router.delete("/{project_id}")
async def delete_project(
    project_id: str,
    user_id: Optional[str] = Query(None),
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Delete a saved project from Neon DB.
    """
    target_user_id = (current_user.id if current_user else None) or user_id
    if not target_user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required or user_id must be provided.",
        )

    project = (
        db.query(SavedProject)
        .filter(SavedProject.id == project_id, SavedProject.user_id == target_user_id)
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found or not owned by the specified user.",
        )

    db.delete(project)
    db.commit()

    logger.info("Deleted project %s for user %s from Neon DB", project_id, target_user_id)
    return {"status": "deleted", "id": project_id}
