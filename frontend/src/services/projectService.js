// frontend/src/services/projectService.js
// ─────────────────────────────────────────────
// PURPOSE: Centralised service for all project-related Supabase
//          database operations on the frontend.
//
// This is the ONLY place in the frontend that talks to the
// 'saved_projects' table. Components (like ProjectCard and Dashboard)
// call these functions instead of writing their own Supabase queries.
//
// Functions:
//   saveProject(userId, projectData)       → insert a project
//   deleteProject(userId, projectTitle)    → remove a project
//   getUserProjects(userId)                → fetch all saved projects
// ─────────────────────────────────────────────

import { supabase } from '../lib/supabaseClient';

/**
 * Save a project card to the 'saved_projects' table for a user.
 *
 * @param {string} userId       - The Supabase auth user ID
 * @param {object} projectData  - The full ProjectIdea object to save
 * @returns {Promise<void>}
 * @throws Will throw an error if the Supabase insert fails
 */
export async function saveProject(userId, projectData) {
  const { error } = await supabase
    .from('saved_projects')
    .insert({
      user_id: userId,
      project_data: projectData,
    });

  if (error) throw error;
}

/**
 * Delete a saved project from the 'saved_projects' table.
 * Matches on user_id AND the title field inside the JSONB project_data column.
 *
 * @param {string} userId        - The Supabase auth user ID
 * @param {string} projectTitle  - The exact title of the project to remove
 * @returns {Promise<void>}
 * @throws Will throw an error if the Supabase delete fails
 */
export async function deleteProject(userId, projectTitle) {
  const { error } = await supabase
    .from('saved_projects')
    .delete()
    .eq('user_id', userId)
    .eq('project_data->>title', projectTitle);  // JSONB text extraction operator

  if (error) throw error;
}

/**
 * Fetch all projects saved by a user, ordered newest first.
 *
 * @param {string} userId - The Supabase auth user ID
 * @returns {Promise<object[]>} Array of project_data objects (ProjectIdea shape)
 * @throws Will throw an error if the Supabase select fails
 */
export async function getUserProjects(userId) {
  const { data, error } = await supabase
    .from('saved_projects')
    .select('project_data')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Unwrap the JSONB column — each row has { project_data: { ... } }
  return data.map(row => row.project_data);
}
