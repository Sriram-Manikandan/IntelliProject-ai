// frontend/src/services/api.js
// ─────────────────────────────────────────────
// Centralized API client for all backend communication
// Supports Render deployment and JWT authentication
// ─────────────────────────────────────────────

// Automatically use the configured backend URL on Render, or default to localhost in dev
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

/**
 * Universal request wrapper that automatically attaches the JWT auth token
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody.detail || errorBody.message || `Request failed (${response.status})`;
    const error = new Error(message);
    error.status = response.status;
    error.data = errorBody;
    throw error;
  }

  return response.json();
}

// ── Auth Endpoints ───────────────────────────
export async function loginApi({ email, password }) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function signupApi({ email, password, full_name }) {
  return apiRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, full_name }),
  });
}

export async function getMeApi() {
  return apiRequest('/auth/me');
}

export async function updateProfileApi(data) {
  return apiRequest('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function forgotPasswordApi(email) {
  return apiRequest('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function resetPasswordApi(token, new_password) {
  return apiRequest('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, new_password }),
  });
}

// ── Saved Projects Endpoints (Neon DB) ───────
export async function getSavedProjectsApi(userId) {
  const query = userId ? `?user_id=${encodeURIComponent(userId)}` : '';
  return apiRequest(`/projects${query}`);
}

export async function saveProjectApi(userId, projectData) {
  return apiRequest('/projects', {
    method: 'POST',
    body: JSON.stringify({ user_id: userId, project_data: projectData }),
  });
}

export async function deleteProjectApi(userId, projectId) {
  const query = userId ? `?user_id=${encodeURIComponent(userId)}` : '';
  return apiRequest(`/projects/${encodeURIComponent(projectId)}${query}`, {
    method: 'DELETE',
  });
}

// ── Project Recommendations & AI Chat ───────
export async function generateProjects({ skills, domain, difficulty, time_hours }) {
  return apiRequest('/generate', {
    method: 'POST',
    body: JSON.stringify({ skills, domain, difficulty, time_hours }),
  });
}

export async function chatWithRecruit(messages) {
  return apiRequest('/chat', {
    method: 'POST',
    body: JSON.stringify({ messages }),
  });
}

// ── Admin Endpoints ──────────────────────────
export async function getAdminStats(userId) {
  const query = userId ? `?user_id=${encodeURIComponent(userId)}` : '';
  return apiRequest(`/admin/stats${query}`);
}

export async function logSystemEventApi(eventType, details = {}, userId = null) {
  return apiRequest('/admin/logs', {
    method: 'POST',
    body: JSON.stringify({ event_type: eventType, details, user_id: userId }),
  }).catch((err) => console.warn('Logging error:', err));
}
