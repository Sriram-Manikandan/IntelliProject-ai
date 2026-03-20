import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-600/10 blur-[130px] rounded-full" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent-500/10 blur-[130px] rounded-full" />
      
      <div className="max-w-5xl mx-auto relative z-10 glass-card p-12 sm:p-20 text-center border-white/10 overflow-hidden">
        {/* Animated accent lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-primary-500/80 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-accent-500/80 to-transparent" />
        
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary-400 text-xs font-bold tracking-widest uppercase">
          <Sparkles className="w-4 h-4" />
          Ready to Build?
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
          Stop staring at blank repos. <br />
          <span className="text-gradient">Start building today.</span>
        </h2>

        <p className="text-gray-400 max-w-xl mx-auto mb-12 text-lg">
          Join thousands of developers turning their skills into impressive projects.
          No more tutorial hell. No more "I don't know what to build."
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/generate">
            <button className="btn-primary flex items-center gap-2 text-base px-10 py-4 scale-110">
              Generate Your First Idea <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm font-medium border-b border-gray-500/20 hover:border-white pb-1">
            Learn more about AI models
          </a>
        </div>
      </div>
    </section>
  );
}
