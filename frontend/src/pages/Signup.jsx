import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  
  // Real-time password validation
  const validation = {
    length: password.length >= 8,
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    upper: /[A-Z]/.test(password)
  };
  const isPasswordValid = Object.values(validation).every(Boolean);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) return; // double check

    setLoading(true);
    setError('');

    try {
      const data = await signup(email, password, { full_name: name });
      if (data) setIsSignedUp(true);
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isSignedUp) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#030303] flex flex-col transition-colors duration-300">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-md bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center shadow-2xl animate-fade-in-up">
            <div className="w-20 h-20 mx-auto rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-8">
              <Mail className="w-8 h-8 text-indigo-400" />
            </div>
            <h1 className="text-3xl font-black text-white mb-4">Check Your Email</h1>
            <p className="text-gray-400 mb-8 leading-relaxed font-medium">
              We've sent a verification link to <span className="text-white font-bold">{email}</span>. 
              Please confirm your identity.
            </p>
            <div className="space-y-4">
              <Link to="/login" className="btn-primary w-full py-4 block">Back to Login</Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030303] flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white tracking-tighter mb-2">Create Account</h2>
            <p className="text-gray-400 text-sm font-medium">Join IntelliProject today.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSignup}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-xs font-bold text-red-400 animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <label htmlFor="signup-name" className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] pl-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  id="signup-name"
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/40 focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="signup-email" className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] pl-1">Email address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  id="signup-email"
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/40 focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="signup-password" className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] pl-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  id="signup-password"
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 chars, num, spec."
                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/40 focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-medium"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4 px-2">
                {[
                  { label: '8+ Characters', met: validation.length },
                  { label: 'Numbers', met: validation.number },
                  { label: 'Uppercase', met: validation.upper },
                  { label: 'Special Symbol', met: validation.special }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-1 h-1 rounded-full ${item.met ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]' : 'bg-gray-700'}`} />
                    <span className={`text-[9px] font-black uppercase tracking-widest ${item.met ? 'text-indigo-400' : 'text-gray-600'}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading || !isPasswordValid} 
              className="btn-primary w-full py-4.5 flex items-center justify-center gap-3 mt-8 text-lg group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-white/5 text-center">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
              Already have an account? <Link to="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors ml-2 border-b-2 border-indigo-400/20 hover:border-indigo-400 pb-0.5">Log in</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
