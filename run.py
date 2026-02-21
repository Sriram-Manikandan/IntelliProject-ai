"""
run.py – convenience entry point
Usage:  python run.py
"""

import uvicorn
from core.config import settings

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,      # Hot-reload in dev mode
        log_level="info",
    )
