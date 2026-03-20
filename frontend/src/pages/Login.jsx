import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  return (
    <div className="min-h-screen bg-surface-900 flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 pt-20">
        <div className="w-full max-w-md glass-card p-10 border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-sm">Please enter your details to sign in.</p>
          </div>

          <form className="space-y-5" onClick={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary-400 transition-colors" />
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary-400 transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-white/10 bg-white/5" />
                <span className="text-xs text-gray-400">Remember me</span>
              </div>
              <a href="#" className="text-xs text-primary-400 hover:text-primary-300 font-medium transition-colors">Forgot password?</a>
            </div>

            <button className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 mt-4">
              Sign In <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account? <Link to="/signup" className="text-primary-400 hover:text-primary-300 font-bold transition-colors">Sign up for free</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
