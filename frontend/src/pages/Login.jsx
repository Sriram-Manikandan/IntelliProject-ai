import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      if (err.message?.toLowerCase().includes('email not confirmed')) {
        setError('Please verify your email first. Check your inbox for the link.');
      } else {
        setError(err.message || 'Invalid login credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white tracking-tighter mb-2">Log in to IntelliProject</h2>
            <p className="text-gray-400 text-sm font-medium">Access your architected blueprints.</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-xs font-bold text-red-400 animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <label htmlFor="login-email" className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] pl-1">Email address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  id="login-email"
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="architect@nexus.com"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/40 focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="login-password" className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] pl-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  id="login-password"
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/40 focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/[0.02] text-indigo-500 focus:ring-indigo-500/50 focus:ring-offset-0" />
                <span className="text-xs text-gray-500 font-bold group-hover:text-gray-400 transition-colors">Keep Me Synced</span>
              </label>
              <Link to="/forgot-password" size="sm" className="text-xs text-indigo-400 hover:text-indigo-300 font-bold transition-colors uppercase tracking-widest">Forgot Password?</Link>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-4.5 flex items-center justify-center gap-3 mt-6 text-lg group disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Log in <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-white/5 text-center">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
              Don't have an account? <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 transition-colors ml-2 border-b-2 border-indigo-400/20 hover:border-indigo-400 pb-0.5">Create an account</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
