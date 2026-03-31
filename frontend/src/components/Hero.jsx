import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary-600/20 blur-[130px] animate-float" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-accent-500/15 blur-[120px] animate-float-delayed" />
        <div className="absolute -bottom-40 left-1/4 w-[400px] h-[400px] rounded-full bg-primary-500/10 blur-[100px] animate-pulse-glow" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/20 bg-primary-500/5 text-primary-400 text-sm font-medium mb-8 animate-fade-in opacity-0">
          <Zap className="w-3.5 h-3.5" />
          AI-Powered Project Recommendations
        </div>

        {/* Headline */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black leading-[1.1] tracking-tighter mb-8 animate-fade-in-up opacity-0">
          Don't just code.
          <br />
          <span className="text-gradient text-glow">Build something</span>
          <br />
          that matters.
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
          Tell us your skills, interests, and timeline — and IntelliProject will craft
          structured, resume-worthy project ideas tailored just for you.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
          <Link to="/signup">
            <button className="btn-primary text-lg px-10 py-4 scale-105 hover:scale-110 transition-transform">
              <span className="flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.7s' }}>
          {[
            { value: '3+', label: 'Ideas per query' },
            { value: '100%', label: 'Personalized' },
            { value: '∞', label: 'Possibilities' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-gradient">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
