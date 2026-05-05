const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

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

export async function chatWithRecruit(messages) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || 'Failed to communicate with Recruit.');
  }

  return res.json();
}

export async function getAdminStats(userId) {
  const res = await fetch(`${API_BASE}/admin/stats?user_id=${userId}`);
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || 'Failed to fetch admin stats.');
  }

  return res.json();
}
