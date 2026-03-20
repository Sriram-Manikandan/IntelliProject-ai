import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary-500/30 transition-shadow duration-300">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Intelli<span className="text-gradient">Project</span>
          </span>
        </Link>

        {/* Navigation Links and CTA */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 mr-4">
            <Link to="/" className={`text-sm font-semibold transition-colors ${location.pathname === '/' && !location.hash ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}>Home</Link>
            <Link to="/about" className={`text-sm font-semibold transition-colors ${location.pathname === '/about' ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}>About</Link>
            <Link to="/#features" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Features</Link>
            <Link to="/#testimonials" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Testimonials</Link>
            <Link to="/#faq" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">FAQ</Link>
          </div>

          <Link to="/login">
            <button className="btn-primary text-sm px-6 py-2.5 rounded-xl">
              <span className="flex items-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
