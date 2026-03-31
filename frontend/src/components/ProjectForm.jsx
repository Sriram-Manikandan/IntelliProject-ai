import React, { useState } from 'react';
import { Sparkles, Code2, Globe, BarChart3, Clock } from 'lucide-react';

const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

export default function ProjectForm({ onSubmit, isLoading }) {
  const [form, setForm] = useState({
    skills: '',
    domain: '',
    difficulty: 'Intermediate',
  });
  const [weeks, setWeeks] = useState(0);
  const [days, setDays]   = useState(0);
  const [hours, setHours] = useState(0);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Working-hour multipliers: 1 week = 40h, 1 day = 8h
  const totalHours = (weeks * 40) + (days * 8) + hours;

  // Human-readable preview
  const previewParts = [];
  if (weeks)  previewParts.push(`${weeks} week${weeks  > 1 ? 's' : ''}`);
  if (days)   previewParts.push(`${days} day${days    > 1 ? 's' : ''}`);
  if (hours)  previewParts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  const preview = previewParts.length ? previewParts.join(' ') : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.skills || !form.domain || totalHours < 1) return;
    onSubmit({ ...form, time_hours: totalHours });
  };

  const isValid = form.skills && form.domain && totalHours >= 1;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in-up opacity-0">
        <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
          Let's find your <span className="text-gradient text-glow">perfect project</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Tell us about yourself and we'll generate tailored project ideas.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Skills Input */}
        <div className="glass-card p-8 space-y-3 animate-fade-in-up opacity-0 animate-delay-100">
          <label className="flex items-center gap-2.5 text-sm font-bold text-indigo-300 uppercase tracking-widest">
            <Code2 className="w-4 h-4" />
            Your Expertise
          </label>
          <input
            type="text"
            value={form.skills}
            onChange={(e) => handleChange('skills', e.target.value)}
            placeholder="e.g., Python, React, Machine Learning"
            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all text-base"
          />
          <p className="text-xs text-gray-500 font-medium">What technologies do you know best?</p>
        </div>

        {/* Domain Input */}
        <div className="glass-card p-8 space-y-3 animate-fade-in-up opacity-0 animate-delay-200">
          <label className="flex items-center gap-2.5 text-sm font-bold text-purple-300 uppercase tracking-widest">
            <Globe className="w-4 h-4" />
            Domain of Interest
          </label>
          <input
            type="text"
            value={form.domain}
            onChange={(e) => handleChange('domain', e.target.value)}
            placeholder="e.g., Healthcare, FinTech, Web3"
            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all text-base"
          />
          <p className="text-xs text-gray-500 font-medium">What industry excites you most?</p>
        </div>

        {/* Difficulty Selector */}
        <div className="glass-card p-8 space-y-4 animate-fade-in-up opacity-0 animate-delay-300">
          <label className="flex items-center gap-2.5 text-sm font-bold text-indigo-300 uppercase tracking-widest">
            <BarChart3 className="w-4 h-4" />
            Complexity Level
          </label>
          <div className="flex gap-4">
            {difficulties.map((level) => (
              <button
                type="button"
                key={level}
                onClick={() => handleChange('difficulty', level)}
                className={`flex-1 py-3.5 rounded-2xl text-sm font-bold transition-all duration-500 border ${
                  form.difficulty === level
                    ? 'bg-indigo-500/20 border-indigo-500/50 text-white shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                    : 'bg-white/[0.02] border-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Time Input */}
        <div className="glass-card p-8 space-y-4 animate-fade-in-up opacity-0 animate-delay-400">
          <label className="flex items-center gap-2.5 text-sm font-bold text-purple-300 uppercase tracking-widest">
            <Clock className="w-4 h-4" />
            Available Time
          </label>

          {/* Three duration selects */}
          <div className="grid grid-cols-3 gap-3">
            {/* Weeks */}
            <div className="flex flex-col items-center gap-2">
              <select
                value={weeks}
                onChange={(e) => setWeeks(Number(e.target.value))}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-4 text-white font-bold text-lg focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all text-center appearance-none cursor-pointer"
              >
                {Array.from({ length: 53 }, (_, i) => (
                  <option key={i} value={i} className="bg-[#0d0d0d]">{i}</option>
                ))}
              </select>
              <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Weeks</span>
            </div>

            {/* Days */}
            <div className="flex flex-col items-center gap-2">
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-4 text-white font-bold text-lg focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all text-center appearance-none cursor-pointer"
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <option key={i} value={i} className="bg-[#0d0d0d]">{i}</option>
                ))}
              </select>
              <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Days</span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center gap-2">
              <select
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-3 py-4 text-white font-bold text-lg focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all text-center appearance-none cursor-pointer"
              >
                {Array.from({ length: 8 }, (_, i) => (
                  <option key={i} value={i} className="bg-[#0d0d0d]">{i}</option>
                ))}
              </select>
              <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Hours</span>
            </div>
          </div>

          {/* Live summary */}
          <p className="text-xs text-gray-500 font-medium">
            {preview
              ? <span>Total: <span className="text-indigo-400 font-bold">{preview}</span> &middot; {totalHours} working hours</span>
              : 'Select your available time above'}
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-4 animate-fade-in-up opacity-0 animate-delay-500">
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={`w-full btn-primary py-5 rounded-2xl text-lg font-bold shadow-2xl transition-all ${
              !isValid || isLoading ? 'opacity-40 cursor-not-allowed grayscale' : 'hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            <span className="flex items-center justify-center gap-3">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Sparkles className="w-6 h-6" />
              )}
              {isLoading ? 'Architecting your project...' : 'Generate Project Blueprint'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
