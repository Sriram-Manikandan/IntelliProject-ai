# utils/prompt_builder.py
# ─────────────────────────────────────────────
# PURPOSE: Builds the exact prompt string that is sent to the Groq
#          LLM. All prompt engineering lives here — if you want to
#          change what the AI produces, this is the ONLY file to edit.
#
# Used by: recommendation_service.py
# ─────────────────────────────────────────────

from models.schemas import ProjectRequest


def _difficulty_weight(difficulty: str) -> int:
    """
    Returns a small integer bonus applied to fallback mock scores
    so that Advanced projects score higher than Beginner ones.
    """
    return {"beginner": 0, "intermediate": 10, "advanced": 20}.get(
        difficulty.lower(), 10
    )


def build_prompt(req: ProjectRequest, time_display: str) -> str:
    """
    Construct the full user-facing prompt for the LLM.

    Args:
        req:          The validated incoming ProjectRequest (skills,
                      domain, difficulty, time_hours).
        time_display: A human-readable version of time_hours produced
                      by hours_to_human() — e.g. "2 weeks 3 days".

    Returns:
        A multi-line string ready to be sent as the 'user' message
        in the Groq chat completion call.
    """
    # Pick a roadmap instruction that matches the difficulty level.
    # Beginner → standard SDLC steps.
    # Intermediate/Advanced → skip generic steps, focus on hard parts.
    if req.difficulty.lower() == "beginner":
        roadmap_rule = (
            f"The implementation roadmap MUST be broken down using the available time: "
            f"{time_display}. Use standard SDLC steps (Setup, Backend, Frontend, Testing)."
        )
    else:
        roadmap_rule = (
            f"The implementation roadmap MUST be broken down using the available time: "
            f"{time_display}. SKIP generic software steps (like 'setup database', 'build UI'). "
            f"Create a deeply technical roadmap focusing directly on the core problem, "
            f"algorithms, and complex integrations that make this idea difficult."
        )

    return f"""You are an expert software engineering mentor specialising in academic project design.
Your task is to generate exactly 3 highly specific, creative, and technically rich project ideas.
 
## Student Profile
- Skills: {req.skills}
- Domain: {req.domain}
- Difficulty: {req.difficulty}
- Available Time: {time_display} (raw: {req.time_hours} hours)
 
## Critical Rules
1. Every idea MUST be a direct, non-trivial intersection of the student's EXACT skills and the domain.
   Do NOT suggest generic ideas like "AI chatbot" or "dashboard app" unless there is a highly specific, novel angle.
2. Each idea must be DISTINCT in nature:
   - Idea 1: Data / ML heavy
   - Idea 2: API / Integration heavy
   - Idea 3: Product / UX heavy
3. The tech stack must reference the student's actual skills ({req.skills}) — do not suggest unrelated technologies.
4. {roadmap_rule}
   - Maintain STRICT chronological order (e.g. Day 1, Day 2-3, Day 4-5).
   - NEVER overlap timeframes or reset the units (e.g. do not put "Week 1" after "Days 1-3").
   - Pick one granularity (Days OR Weeks) depending on {time_display} and stick to it for the entire roadmap list.
5. In the "architecture" section, DO NOT give generic client/server descriptions. Focus heavily on the CRUX of the problem: explain the advanced data pipelines, critical algorithms, or tricky infrastructure integrations.
6. Provide "prerequisites", a key-value dictionary where the key is the category (e.g., 'Frontend', 'Backend', 'Database', 'Deployment', 'AI Assistance') and the value is a LIST of 2-3 highly recommended free/open-source tool options (e.g., 'Frontend': ['React', 'Vue'], 'AI Assistance': ['AntiGravity IDE', 'Cursor']). You MUST provide multiple options per category.
7. Provide exactly 2 "warnings" about common pitfalls for this specific project.
8. Provide exactly 2 "boundaries" to prevent scope creep.
9. Provide a "feasibility_analysis" paragraph analyzing if this project is actually real-life based and possible to complete within {time_display}. Be highly critical and honest.
10. Scores must be honest integers (0–100). Do not give everything 95+.
11. Never repeat ideas across the 3 results. Each must solve a different problem.
 
## Output Format
Respond ONLY with a valid JSON array. No explanation, no markdown, no backticks.
The array must contain exactly 3 objects, each with this exact structure:
 
[
  {{
    "title": "...",
    "problem_statement": "...",
    "tech_stack": ["...", "..."],
    "architecture": "...",
    "implementation_roadmap": ["...", "..."],
    "challenges": ["...", "..."],
    "prerequisites": {{"Frontend": ["React", "Vue"], "AI Assistance": ["AntiGravity IDE", "Cursor"]}},
    "warnings": ["...", "..."],
    "boundaries": ["...", "..."],
    "feasibility_analysis": "...",
    "resume_score": 0,
    "innovation_score": 0
  }}
]
 
Respond with the JSON array only. Absolutely nothing else."""
