# api/routes/admin.py
# ─────────────────────────────────────────────
# Admin dashboard statistics and logging endpoints backed by Neon DB.
# ─────────────────────────────────────────────

import logging
from typing import Optional, Any, Dict
from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from sqlalchemy.orm import Session

from core.database import get_db
from models.db_models import User, SavedProject, SystemLog

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/admin", tags=["Admin"])


class LogEventRequest(BaseModel):
    event_type: str
    user_id: Optional[str] = None
    details: Optional[Dict[str, Any]] = None


@router.get(
    "/stats",
    summary="Fetch system statistics for the admin dashboard",
)
async def get_admin_stats(
    user_id: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    """
    GET /api/v1/admin/stats?user_id={user_id}
    Validates if the user exists and has admin privileges, then returns Neon DB statistics.
    """
    try:
        # Check admin role if user_id is provided
        if user_id:
            user = db.query(User).filter(User.id == user_id).first()
            if not user or user.role != "admin":
                # If there are no users or this is the only user, allow access
                total_users = db.query(User).count()
                if total_users > 0 and (not user or user.role != "admin"):
                    raise HTTPException(
                        status_code=status.HTTP_403_FORBIDDEN,
                        detail="Forbidden. Admin access required.",
                    )

        total_saved_projects = db.query(SavedProject).count()
        total_users = db.query(User).count()
        logs_query = db.query(SystemLog).order_by(SystemLog.created_at.desc()).limit(15).all()

        formatted_logs = [
            {
                "id": log.id,
                "created_at": log.created_at.isoformat() if log.created_at else None,
                "event_type": log.event_type,
                "user_id": log.user_id,
                "ip_address": log.ip_address,
                "details": log.details or {},
            }
            for log in logs_query
        ]

        return {
            "total_saved_projects": total_saved_projects,
            "total_users": total_users,
            "recent_logs": formatted_logs,
        }

    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("Error fetching admin stats from Neon DB")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch stats from Neon DB.",
        ) from exc


@router.post(
    "/logs",
    summary="Log a security threat or system event to Neon DB",
)
async def record_system_log(
    payload: LogEventRequest,
    request: Request,
    db: Session = Depends(get_db),
):
    """
    POST /api/v1/admin/logs
    Records an audit or threat event to Neon DB.
    """
    client_ip = request.client.host if request.client else "unknown"
    log = SystemLog(
        event_type=payload.event_type,
        user_id=payload.user_id,
        ip_address=client_ip,
        details=payload.details or {},
    )
    db.add(log)
    db.commit()
    db.refresh(log)
    return {"status": "recorded", "id": log.id}
