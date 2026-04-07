import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, LogOut, LayoutDashboard, BrainCircuit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/60 backdrop-blur-2xl border-b border-white/10 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-500">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">
            Intelli<span className="text-gradient">Project</span>
          </span>
        </Link>

        {/* Navigation Links and CTA */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            <Link to="/" className={`text-sm font-bold tracking-wide transition-colors ${location.pathname === '/' ? 'text-indigo-400' : 'text-gray-400 hover:text-white'}`}>Home</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={`text-sm font-bold tracking-wide transition-colors ${location.pathname === '/dashboard' ? 'text-indigo-400' : 'text-gray-400 hover:text-white'}`}>Vault</Link>
                <Link to="/generate" className={`text-sm font-bold tracking-wide transition-colors ${location.pathname === '/generate' ? 'text-indigo-400' : 'text-gray-400 hover:text-white'}`}>Generate</Link>
              </>
            ) : (
              <>
                <a href="/#about" className="text-sm font-bold tracking-wide text-gray-400 hover:text-white transition-colors">About</a>
                <a href="/#faq" className="text-sm font-bold tracking-wide text-gray-400 hover:text-white transition-colors">FAQ</a>
              </>
            )}
          </div>

          <div className="flex items-center gap-6">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/login" 
                  className="text-sm font-bold tracking-wide text-gray-400 hover:text-white transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link to="/signup">
                  <button className="btn-primary text-sm px-8 py-3 transform hover:scale-105 active:scale-95 transition-all">
                    <span className="flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                </Link>
              </>
            ) : (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-red-400 transition-colors"
              >
                Logout <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
