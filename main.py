# app/main.py
# ─────────────────────────────────────────────
# Application factory – creates and configures
# the FastAPI instance with middleware and routes
# ─────────────────────────────────────────────

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from core.config import settings
from api.routes import router


def create_app() -> FastAPI:
    """Initialise and return the configured FastAPI application."""

    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        description=(
            "🎓 **IntelliProject** – An AI-powered engine that generates personalised "
            "academic project recommendations based on a student's skills, target domain, "
            "difficulty preference, and available time."
        ),
        docs_url="/docs",        # Swagger UI
        redoc_url="/redoc",      # ReDoc UI
        debug=settings.DEBUG,
    )

    # ── CORS ──────────────────────────────────
    # Allow the front-end dev server (React / Vite / Next.js) to call the API
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.origins_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ── Routes ────────────────────────────────
    app.include_router(router, prefix="/api/v1")

    # ── Health-check ──────────────────────────
    @app.get("/health", tags=["System"], summary="Health check")
    async def health() -> JSONResponse:
        return JSONResponse({"status": "ok", "app": settings.APP_NAME, "version": settings.APP_VERSION})

    return app


# Instantiate the app so uvicorn can import it as "app.main:app"
app = create_app()
