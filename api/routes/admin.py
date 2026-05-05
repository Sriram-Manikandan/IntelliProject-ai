# api/routes/admin.py
# ─────────────────────────────────────────────
# PURPOSE: HTTP routes for the Admin dashboard to fetch system stats.
# ─────────────────────────────────────────────

import logging
from fastapi import APIRouter, HTTPException
from core.supabase_client import supabase_client

logger = logging.getLogger(__name__)

router = APIRouter()

@router.get(
    "/admin/stats",
    summary="Fetch system statistics for the admin dashboard",
    tags=["Admin"],
)
async def get_admin_stats(user_id: str):
    """
    GET /api/v1/admin/stats?user_id={user_id}
    Validates if the user is an admin, then returns global stats.
    NOTE: user_id is passed as query param for simplicity, but in production
    you should use proper Bearer token verification.
    """
    try:
        # 1. Verify user is an admin
        role_res = supabase_client.table("user_roles").select("role").eq("user_id", user_id).execute()
        if not role_res.data or role_res.data[0].get("role") != "admin":
            raise HTTPException(status_code=403, detail="Forbidden. Admin access required.")

        # 2. Fetch stats (total users, total generated projects, logs)
        # Using service role allows us to bypass RLS to count all projects
        projects_res = supabase_client.table("saved_projects").select("id", count="exact").execute()
        
        # We can also fetch the latest logs
        logs_res = supabase_client.table("system_logs").select("*").order("created_at", desc=True).limit(10).execute()

        # Count total users (via a direct query if possible, or proxy via another table. 
        # Supabase client doesn't let us query auth.users directly without RPC, so we mock or use user_roles count)
        users_res = supabase_client.table("user_roles").select("user_id", count="exact").execute()

        return {
            "total_saved_projects": projects_res.count if hasattr(projects_res, 'count') else len(projects_res.data),
            "total_users": users_res.count if hasattr(users_res, 'count') else len(users_res.data),
            "recent_logs": logs_res.data
        }

    except HTTPException:
        raise
    except Exception as exc:
        logger.exception("Error fetching admin stats")
        raise HTTPException(status_code=500, detail="Failed to fetch stats.") from exc
