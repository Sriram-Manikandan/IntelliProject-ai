// frontend/src/services/projectService.js
// ─────────────────────────────────────────────
// PURPOSE: Centralised service for all project-related database operations.
// Backed by Neon DB (PostgreSQL) via the backend API.
// ─────────────────────────────────────────────

import {
  saveProjectApi,
  deleteProjectApi,
  getSavedProjectsApi,
} from './api';

/**
 * Save a project card to Neon DB for a user.
 *
 * @param {string} userId       - The authenticated user ID
 * @param {object} projectData  - The full ProjectIdea object to save
 * @returns {Promise<string>}   - The saved project ID
 */
export async function saveProject(userId, projectData) {
  const result = await saveProjectApi(userId, projectData);
  return result.id;
}

/**
 * Delete a saved project from Neon DB.
 *
 * @param {string} userId        - The authenticated user ID
 * @param {string} projectId     - The record ID to delete
 * @returns {Promise<void>}
 */
export async function deleteProject(userId, projectId) {
  await deleteProjectApi(userId, projectId);
}

/**
 * Fetch all projects saved by a user, ordered newest first.
 *
 * @param {string} userId - The user ID
 * @returns {Promise<object[]>} Array of project_data objects with id included
 */
export async function getUserProjects(userId) {
  return await getSavedProjectsApi(userId);
}
