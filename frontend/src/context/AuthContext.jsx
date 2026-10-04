// frontend/src/context/AuthContext.jsx
// ─────────────────────────────────────────────
// Authentication Context backed by JWT and Neon DB.
// Completely replaces Supabase Auth.
// ─────────────────────────────────────────────

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  loginApi,
  signupApi,
  getMeApi,
  updateProfileApi,
  forgotPasswordApi,
  resetPasswordApi,
} from '../services/api';

const AuthContext = createContext();

function formatUser(userData) {
  if (!userData) return null;
  return {
    id: userData.id,
    email: userData.email,
    full_name: userData.full_name,
    role: userData.role || 'user',
    user_metadata: {
      full_name: userData.full_name,
    },
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if access token exists in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    // Validate token against backend
    getMeApi()
      .then((userData) => {
        setUser(formatUser(userData));
      })
      .catch((err) => {
        console.warn('Session verification failed, logging out:', err.message);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = async (email, password) => {
    const data = await loginApi({ email, password });
    localStorage.setItem('token', data.access_token);
    const formatted = formatUser(data.user);
    localStorage.setItem('user', JSON.stringify(formatted));
    setUser(formatted);
    return data;
  };

  const signup = async (email, password, metadata = {}) => {
    const data = await signupApi({
      email,
      password,
      full_name: metadata?.full_name || '',
    });
    localStorage.setItem('token', data.access_token);
    const formatted = formatUser(data.user);
    localStorage.setItem('user', JSON.stringify(formatted));
    setUser(formatted);
    return data;
  };

  const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const resetPassword = async (email) => {
    return await forgotPasswordApi(email);
  };

  const completeResetPassword = async (token, newPassword) => {
    return await resetPasswordApi(token, newPassword);
  };

  const updatePassword = async (newPassword, oldPassword = null) => {
    const data = await updateProfileApi({
      new_password: newPassword,
      old_password: oldPassword,
    });
    const formatted = formatUser(data);
    setUser(formatted);
  };

  const updateProfile = async (profileData) => {
    const data = await updateProfileApi(profileData);
    const formatted = formatUser(data);
    setUser(formatted);
    return formatted;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        signup,
        logout,
        resetPassword,
        completeResetPassword,
        updatePassword,
        updateProfile,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
