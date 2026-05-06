import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { Mail, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030303] flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-md bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tighter mb-4">Check your email</h2>
              <p className="text-gray-400 text-sm font-medium mb-8">
                We've sent a password reset link to <span className="text-white font-bold">{email}</span>.
              </p>
              <Link to="/login" className="btn-primary inline-flex items-center gap-2 py-3 px-8 text-sm">
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-white tracking-tighter mb-2">Reset Password</h2>
                <p className="text-gray-400 text-sm font-medium">We'll send a recovery link to your inbox.</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-xs font-bold text-red-400">
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  <label htmlFor="reset-email" className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] pl-1">Email address</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-indigo-400 transition-colors" />
                    <input 
                      id="reset-email"
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="architect@nexus.com"
                      className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/40 focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full py-4.5 flex items-center justify-center gap-3 mt-6 text-lg group disabled:opacity-50">
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Send Link <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <Link to="/login" className="text-xs text-gray-500 font-bold hover:text-white transition-colors uppercase tracking-widest">
                  Back to login
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
