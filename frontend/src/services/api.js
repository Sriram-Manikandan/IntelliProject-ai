const API_BASE = 'http://localhost:8000/api/v1';

export async function generateProjects({ skills, domain, difficulty, time_hours }) {
  const res = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ skills, domain, difficulty, time_hours }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || 'Failed to generate projects. Please try again.');
  }

  return res.json();
}
