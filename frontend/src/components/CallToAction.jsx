import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[130px] rounded-full animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full animate-float-delayed" />
      
      <div className="max-w-6xl mx-auto relative z-10 glass-card p-16 sm:p-24 text-center border-white/10 overflow-hidden animate-fade-in-up opacity-0">
        {/* Animated accent lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-indigo-500 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-purple-500 to-transparent" />
        
        <div className="inline-flex items-center gap-2 mb-10 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs font-black tracking-[0.2em] uppercase">
          <Sparkles className="w-4 h-4" />
          Ready to Build?
        </div>

        <h2 className="text-5xl sm:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tighter">
          Stop staring at blank repos. <br />
          <span className="text-gradient text-glow">Start building today.</span>
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-14 text-lg font-medium leading-relaxed">
          Join thousands of developers turning their skills into impressive projects.
          No more tutorial hell. No more "I don't know what to build."
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <Link to="/signup">
            <button className="btn-primary flex items-center gap-3 text-lg px-12 py-5 scale-110 hover:scale-115 active:scale-105 transition-all">
              Start Building Now <ArrowRight className="w-6 h-6" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
