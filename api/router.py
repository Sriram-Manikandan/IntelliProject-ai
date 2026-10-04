# api/router.py
# ─────────────────────────────────────────────
# Central router assembly for all API features.
# ─────────────────────────────────────────────

from fastapi import APIRouter
from api.routes import recommendations, chat, admin, auth, projects

# Parent router mounted under /api/v1
main_router = APIRouter()

# Register feature routers
main_router.include_router(auth.router)
main_router.include_router(projects.router)
main_router.include_router(recommendations.router)
main_router.include_router(chat.router)
main_router.include_router(admin.router)
