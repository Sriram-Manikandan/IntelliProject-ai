# core/database.py
# ─────────────────────────────────────────────
# Database engine and session factory for Neon DB (PostgreSQL).
# Handles connection pooling, connection recycling, and auto table creation.
# ─────────────────────────────────────────────

import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from core.config import settings

logger = logging.getLogger(__name__)

# Normalize PostgreSQL connection URI to explicitly use psycopg2
db_url = settings.DATABASE_URL.strip()
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql+psycopg2://", 1)
elif db_url.startswith("postgresql://") and not db_url.startswith("postgresql+"):
    db_url = db_url.replace("postgresql://", "postgresql+psycopg2://", 1)

# Configure SQLAlchemy engine with pooling suited for Neon serverless Postgres
engine = None
SessionLocal = None

if db_url:
    # Ensure SSL mode is set if not present for Neon
    connect_args = {}
    if "sslmode" not in db_url and "localhost" not in db_url:
        connect_args["sslmode"] = "require"

    engine = create_engine(
        db_url,
        pool_pre_ping=True,      # Tests connection liveness before checkout (ideal for Neon compute suspension)
        pool_recycle=300,        # Recycle connections every 5 minutes
        pool_size=10,
        max_overflow=20,
        connect_args=connect_args,
    )
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    logger.info("Configured Neon DB SQLAlchemy engine.")
else:
    logger.warning("DATABASE_URL is not set. Database features will be disabled until configured.")

Base = declarative_base()


def get_db():
    """
    FastAPI dependency that yields a SQLAlchemy database session per request
    and guarantees proper closure.
    """
    if SessionLocal is None:
        raise RuntimeError("DATABASE_URL is not set in environment or .env file.")
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """
    Creates all defined database tables on application startup if they don't already exist.
    """
    if engine is not None:
        try:
            # Import models so Base registers them
            import models.db_models  # noqa: F401
            Base.metadata.create_all(bind=engine)
            logger.info("Successfully initialized Neon DB tables.")
        except Exception as exc:
            logger.exception("Failed to initialize database tables: %s", exc)
