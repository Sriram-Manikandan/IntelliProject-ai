# utils/chat_handler.py
# ─────────────────────────────────────────────
# PURPOSE: Connects to Groq to power the "Recruit" chatbot.
#          Maintains the Recruit persona and answers questions based
#          on the user's project context.
# ─────────────────────────────────────────────

import os
from typing import List, Dict
from groq import Groq
from tenacity import retry, stop_after_attempt, wait_exponential
from dotenv import load_dotenv

load_dotenv()

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10),
    reraise=True
)
async def call_recruit_chat(messages: List[Dict[str, str]]) -> str:
    """
    Send a conversation history to Groq for the Recruit chatbot.
    """
    client = Groq(api_key=os.environ["GROQ_API_KEY"])

    system_prompt = {
        "role": "system",
        "content": (
            "You are Recruit, an expert AI assistant embedded within IntelliProject. "
            "You help users (usually students or software engineers) brainstorm, plan, "
            "and refine their project ideas. You are concise, highly technical, and practical. "
            "Never give generic startup advice; stick to grounded software engineering practices. "
            "If the user asks about their saved projects, assume they have provided the context in their previous messages."
        ),
    }

    # Prepend the system prompt to the message history
    full_messages = [system_prompt] + messages

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=full_messages,
        temperature=0.7,
        max_tokens=1024,
    )

    return completion.choices[0].message.content.strip()
