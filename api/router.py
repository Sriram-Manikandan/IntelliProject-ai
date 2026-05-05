# api/router.py
# ─────────────────────────────────────────────
# PURPOSE: The single assembly point for ALL API routes.
#          main.py imports only this file — it never needs to know
#          about individual route modules.
#
# To add a new feature with its own routes:
#   1. Create api/routes/your_feature.py
#   2. Add one line here: main_router.include_router(your_feature.router)
#
# Current routes mounted here:
#   POST   /api/v1/generate             → recommendations
#   POST   /api/v1/projects/save        → projects
#   GET    /api/v1/projects/{user_id}   → projects
#   DELETE /api/v1/projects/delete      → projects
# ─────────────────────────────────────────────

from fastapi import APIRouter

from api.routes import recommendations, projects, chat, admin

# The parent router that main.py mounts under the /api/v1 prefix
main_router = APIRouter()

# ── Register all feature routers here ────────────────────────────────
main_router.include_router(recommendations.router)
main_router.include_router(projects.router)
main_router.include_router(chat.router)
main_router.include_router(admin.router)
