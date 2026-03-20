import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface-900/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary-500/30 transition-shadow duration-300">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Intelli<span className="text-gradient">Project</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Home</Link>
          <Link to="/pricing" className={`text-sm font-medium transition-colors ${location.pathname === '/pricing' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Pricing</Link>
        </div>

        {/* CTA */}
        {location.pathname !== '/generate' && (
          <Link to="/generate">
            <button className="btn-primary text-sm px-5 py-2.5">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Generate Idea
              </span>
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
