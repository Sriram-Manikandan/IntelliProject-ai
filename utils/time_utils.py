# utils/time_utils.py
# ─────────────────────────────────────────────
# PURPOSE: Converts a raw integer of working hours into a
#          human-readable string like "2 weeks 3 days 4 hours".
#
# Used by: recommendation_service.py (to display time in the prompt
#          and in the API response summary)
#
# Working-hour conventions used here:
#   1 working day  = 8 hours
#   1 working week = 40 hours  (5 days × 8 hours)
# ─────────────────────────────────────────────


def hours_to_human(hours: int) -> str:
    """
    Convert an integer number of working hours into a readable string.

    Examples:
        5   → "5 hours"
        8   → "1 day"
        40  → "1 week"
        52  → "1 week 1 day 4 hours"
        80  → "2 weeks"
    """
    if hours <= 0:
        return "0 hours"

    weeks, remainder = divmod(hours, 40)   # 1 working week = 40 hours
    days, hrs = divmod(remainder, 8)       # 1 working day  = 8 hours

    parts = []
    if weeks:
        parts.append(f"{weeks} week{'s' if weeks > 1 else ''}")
    if days:
        parts.append(f"{days} day{'s' if days > 1 else ''}")
    if hrs:
        parts.append(f"{hrs} hour{'s' if hrs > 1 else ''}")

    return " ".join(parts) if parts else "0 hours"
