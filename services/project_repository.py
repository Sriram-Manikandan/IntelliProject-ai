# services/project_repository.py
# ─────────────────────────────────────────────
# PURPOSE: The database layer for saved projects.
#          This is the ONLY file that reads/writes the
#          'saved_projects' table in Supabase.
#
# Think of this as the "librarian" — it only stores and
# retrieves data. It does not contain any business logic.
#
# Functions:
#   save_project(user_id, project)   → insert a project for a user
#   get_user_projects(user_id)       → fetch all saved projects for a user
#   delete_project(user_id, title)   → remove a specific saved project
#
# Used by: api/routes/projects.py
# ─────────────────────────────────────────────

import logging
from typing import List, Dict, Any

from core.supabase_client import supabase_client

logger = logging.getLogger(__name__)


async def save_project(user_id: str, project_data: dict) -> Dict[str, Any]:
    """
    Insert a single project card into the 'saved_projects' table.

    Args:
        user_id:      The Supabase auth user ID of the owner.
        project_data: A dict matching the ProjectIdea schema
                      (title, problem_statement, tech_stack, etc.)

    Returns:
        The newly created row as a dict, or {} on failure.
    """
    try:
        payload = {
            "user_id": user_id,
            "project_data": project_data,  # Stored as JSONB in Supabase
        }
        result = supabase_client.table("saved_projects").insert(payload).execute()
        logger.info("Saved project '%s' for user %s", project_data.get("title"), user_id)
        return result.data[0] if result.data else {}
    except Exception as exc:
        logger.error("Error saving project for user %s: %s", user_id, exc)
        raise


async def get_user_projects(user_id: str) -> List[Dict[str, Any]]:
    """
    Retrieve all projects saved by a specific user, newest first.

    Args:
        user_id: The Supabase auth user ID.

    Returns:
        A list of project_data dicts. Returns [] on failure.
    """
    try:
        result = (
            supabase_client
            .table("saved_projects")
            .select("project_data")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .execute()
        )
        logger.info("Fetched %d saved projects for user %s", len(result.data), user_id)
        return [row["project_data"] for row in result.data]
    except Exception as exc:
        logger.error("Error fetching projects for user %s: %s", user_id, exc)
        return []


async def delete_project(user_id: str, project_title: str) -> bool:
    """
    Delete a saved project by matching user_id and the project title
    stored inside the JSONB 'project_data' column.

    Args:
        user_id:       The Supabase auth user ID.
        project_title: The exact title string of the project to remove.

    Returns:
        True if deletion succeeded, False otherwise.
    """
    try:
        result = (
            supabase_client
            .table("saved_projects")
            .delete()
            .eq("user_id", user_id)
            .eq("project_data->>title", project_title)  # JSONB text extraction
            .execute()
        )
        logger.info("Deleted project '%s' for user %s", project_title, user_id)
        return True
    except Exception as exc:
        logger.error("Error deleting project '%s' for user %s: %s", project_title, user_id, exc)
        return False
