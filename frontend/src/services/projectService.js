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
  const { data, error } = await supabase
    .from('saved_projects')
    .insert({
      user_id: userId,
      project_data: projectData,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
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
export async function deleteProject(userId, projectId) {
  const { error } = await supabase
    .from('saved_projects')
    .delete()
    .match({ id: projectId, user_id: userId });

  if (error) {
    console.error('Supabase Delete Error:', error);
    throw error;
  }
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
    .select('id, project_data')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Map the data to include the record ID inside the project object for easier access
  return data.map(row => ({
    ...row.project_data,
    id: row.id
  }));
}
