# core/config.py
# ─────────────────────────────────────────────
# Centralised configuration loaded from .env
# Supports Neon DB (PostgreSQL) and Render deployment
# ─────────────────────────────────────────────

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    APP_NAME: str = "IntelliProject"
    APP_VERSION: str = "2.0.0"
    DEBUG: bool = True

    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # Comma-separated list of origins or wildcard
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://localhost:5173,https://*.onrender.com,*"

    # Neon PostgreSQL configuration
    DATABASE_URL: str = ""

    # JWT Authentication configuration
    JWT_SECRET: str = "intelliproject-secure-jwt-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # Groq AI
    GROQ_API_KEY: str = ""

    @property
    def origins_list(self) -> List[str]:
        if not self.ALLOWED_ORIGINS:
            return ["*"]
        origins = [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]
        return origins if origins else ["*"]

    class Config:
        env_file = ".env"
        extra = "ignore"


# Singleton instance – import this everywhere
settings = Settings()
