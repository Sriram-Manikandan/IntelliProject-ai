# utils/groq_client.py
# ─────────────────────────────────────────────
# PURPOSE: Makes the actual HTTP call to the Groq API (llama-3.3-70b),
#          strips any accidental markdown fences from the response,
#          parses the raw text as JSON, and returns a list of dicts.
#
# This is the ONLY place in the codebase that knows about Groq.
# To swap to a different LLM provider, edit only this file.
#
# Used by: recommendation_service.py
# ─────────────────────────────────────────────

import os
import json
import re

from groq import Groq
from tenacity import retry, stop_after_attempt, wait_exponential
from dotenv import load_dotenv

load_dotenv()


@retry(
    stop=stop_after_attempt(3),          # Retry up to 3 times on failure
    wait=wait_exponential(multiplier=1, min=2, max=10),  # Wait 2s → 4s → 8s between retries
    reraise=True                          # After 3 failures, re-raise the original exception
)
async def call_groq(prompt: str) -> list[dict]:
    """
    Send a prompt to Groq's llama-3.3-70b-versatile model and return
    the parsed JSON response as a Python list of dicts.

    The function:
      1. Creates a Groq client using the GROQ_API_KEY environment variable.
      2. Sends the prompt as a 'user' message with a strict JSON system instruction.
      3. Strips any accidental markdown code fences (``` / ```json) the model may add.
      4. Parses the cleaned text as JSON.
      5. Validates that the result is a list of exactly 3 items.

    Raises:
        ValueError: If the response cannot be parsed as valid JSON,
                    or if it does not contain exactly 3 items.
    """
    client = Groq(api_key=os.environ["GROQ_API_KEY"])

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a precise JSON generator. "
                    "You only output valid JSON arrays. "
                    "No markdown, no explanation, no backticks. Just raw JSON."
                ),
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        temperature=0.7,   # Balanced: creative but consistent
        max_tokens=4096,
    )

    raw_text = completion.choices[0].message.content.strip()

    # Strip accidental markdown fences if the model adds them despite instructions
    raw_text = re.sub(r"^```(?:json)?", "", raw_text).strip()
    raw_text = re.sub(r"```$", "", raw_text).strip()

    try:
        parsed = json.loads(raw_text)
    except json.JSONDecodeError as e:
        raise ValueError(
            f"Groq returned invalid JSON: {e}\n\nRaw output:\n{raw_text}"
        )

    if not isinstance(parsed, list) or len(parsed) != 3:
        raise ValueError(
            f"Expected a JSON array of exactly 3 items, got: {type(parsed)} with {len(parsed) if isinstance(parsed, list) else '?'} items"
        )

    return parsed
