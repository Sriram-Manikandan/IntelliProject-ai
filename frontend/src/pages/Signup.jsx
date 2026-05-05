import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const { error } = await signup(email, password);
      if (error) throw error;
      setMessage('Account created successfully! Check your email to verify your account.');
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-indigo-500/30 font-sans">
      <Navbar />

      <div className="pt-32 pb-20 px-6 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-lg p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-6">Create your account</h2>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-md mb-6 text-sm text-center">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-md mb-6 text-sm text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-black border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white rounded-md py-2.5 font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-black transition-colors disabled:opacity-50 mt-4"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Log in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
