import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate successful login and redirect
    navigate('/generate');
  };
  return (
    <div className="min-h-screen bg-[#030303] flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 pt-28 pb-12 relative overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full animate-float-delayed" />

        <div className="w-full max-w-md glass-card p-12 sm:p-14 border-white/10 shadow-2xl animate-fade-in-up opacity-0 relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-white mb-3 tracking-tight text-glow">Secure Login</h1>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.2em]">Authorized Access Only</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-3">
              <label htmlFor="login-email" className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] pl-1">Neural ID (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  id="login-email"
                  type="email" 
                  placeholder="architect@nexus.com"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/40 focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="login-password" className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] pl-1">Access Key (Password)</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  id="login-password"
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/40 focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label htmlFor="login-remember" className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input id="login-remember" type="checkbox" className="peer sr-only" />
                  <div className="w-5 h-5 rounded-lg border-2 border-white/10 bg-white/5 peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition-all shadow-[0_0_10px_rgba(99,102,241,0)] peer-checked:shadow-[0_0_10px_rgba(99,102,241,0.4)]" />
                  <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-opacity">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                </div>
                <span className="text-xs text-gray-500 font-bold group-hover:text-gray-400 transition-colors">Keep Me Synced</span>
              </label>
              <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 font-bold transition-colors uppercase tracking-widest">Restore Link</a>
            </div>

            <button type="submit" className="btn-primary w-full py-4.5 flex items-center justify-center gap-3 mt-6 text-lg group">
              Initialize Session <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-white/5 text-center">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
              New to the Nexus? <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 transition-colors ml-2 border-b-2 border-indigo-400/20 hover:border-indigo-400 pb-0.5">Create Identity</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
