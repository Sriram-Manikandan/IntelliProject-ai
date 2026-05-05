# api/routes/chat.py
# ─────────────────────────────────────────────
# PURPOSE: HTTP route for the Recruit chatbot.
# ─────────────────────────────────────────────

import logging
from typing import List, Dict
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils.chat_handler import call_recruit_chat

logger = logging.getLogger(__name__)

router = APIRouter()

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

@router.post(
    "/chat",
    summary="Chat with Recruit AI",
    tags=["Chat"],
)
async def recruit_chat(payload: ChatRequest):
    """
    POST /api/v1/chat
    Receives a message history and returns the next response from Recruit.
    """
    try:
        # Convert Pydantic models to dicts for Groq
        message_dicts = [{"role": msg.role, "content": msg.content} for msg in payload.messages]
        reply = await call_recruit_chat(message_dicts)
        return {"reply": reply}
    except Exception as exc:
        logger.exception("Error calling Recruit chatbot")
        raise HTTPException(status_code=500, detail="Failed to get chat response.") from exc
