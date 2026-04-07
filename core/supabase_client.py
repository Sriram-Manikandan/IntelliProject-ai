# app/core/supabase_client.py
# ─────────────────────────────────────────────
# Supabase client initialization for backend use
# ─────────────────────────────────────────────

from supabase import create_client, Client
from core.config import settings

def get_supabase() -> Client:
    """Returns a Supabase client instance."""
    if not settings.SUPABASE_URL or not settings.SUPABASE_SERVICE_ROLE_KEY:
        raise ValueError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env")
    
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)

# Singleton instance
supabase_client = get_supabase()
