# app/services/database_service.py
# ─────────────────────────────────────────────
# Service to interact with Supabase database tables
# ─────────────────────────────────────────────

import logging
from typing import List, Dict, Any, Optional
from core.supabase_client import supabase_client
from models.schemas import ProjectResponse

logger = logging.getLogger(__name__)

async def save_project(user_id: str, project_data: ProjectResponse) -> Dict[str, Any]:
    """
    Saves a generated project recommendation set to the Supabase 'projects' table.
    """
    try:
        # Prepare the data for insertion
        payload = {
            "user_id": user_id,
            "recommendations": [rec.model_dump() for rec in project_data.recommendations],
            "metadata": {
                "skills": project_data.recommendations[0].skills if project_data.recommendations else "",
                "domain": project_data.recommendations[0].domain if project_data.recommendations else "",
            }
        }
        
        result = supabase_client.table("saved_projects").insert(payload).execute()
        return result.data[0] if result.data else {}
        
    except Exception as e:
        logger.error(f"Error saving project to database: {e}")
        raise

async def get_user_projects(user_id: str) -> List[Dict[str, Any]]:
    """
    Retrieves all saved projects for a specific user.
    """
    try:
        result = supabase_client.table("saved_projects").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
        return result.data
    except Exception as e:
        logger.error(f"Error fetching projects for user {user_id}: {e}")
        return []
