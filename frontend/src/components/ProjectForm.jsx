import React, { useState } from 'react';
import { Sparkles, Code2, Globe, BarChart3, Clock } from 'lucide-react';

const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

export default function ProjectForm({ onSubmit, isLoading }) {
  const [form, setForm] = useState({
    skills: '',
    domain: '',
    difficulty: 'Intermediate',
  });
  const [timeValue, setTimeValue] = useState('');
  const [timeUnit, setTimeUnit] = useState('hours'); // 'hours' | 'days' | 'weeks'

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Working-hour multipliers (1 day = 8h, 1 week = 40h)
  const toHours = { hours: 1, days: 8, weeks: 40 };
  const unitLimits = { hours: [1, 99], days: [1, 30], weeks: [1, 52] };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.skills || !form.domain || !timeValue) return;
    const totalHours = Math.round(Number(timeValue) * toHours[timeUnit]);
    onSubmit({ ...form, time_hours: totalHours });
  };

  const isValid = form.skills && form.domain && timeValue;

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
        <div className="glass-card p-8 space-y-3 animate-fade-in-up opacity-0 animate-delay-400">
          <label className="flex items-center gap-2.5 text-sm font-bold text-purple-300 uppercase tracking-widest">
            <Clock className="w-4 h-4" />
            Available Time
          </label>
          <div className="flex gap-3">
            {/* Quantity */}
            <input
              type="number"
              min={unitLimits[timeUnit][0]}
              max={unitLimits[timeUnit][1]}
              value={timeValue}
              onChange={(e) => setTimeValue(e.target.value)}
              placeholder="e.g. 2"
              className="flex-1 bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all text-base"
            />
            {/* Unit Selector */}
            <select
              value={timeUnit}
              onChange={(e) => { setTimeUnit(e.target.value); setTimeValue(''); }}
              className="bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-4 text-white font-bold focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all text-sm cursor-pointer appearance-none text-center"
            >
              <option value="hours" className="bg-[#0d0d0d]">Hours</option>
              <option value="days" className="bg-[#0d0d0d]">Days</option>
              <option value="weeks" className="bg-[#0d0d0d]">Weeks</option>
            </select>
          </div>
          <p className="text-xs text-gray-500 font-medium">
            {timeUnit === 'hours' && 'Up to 99 hours'}
            {timeUnit === 'days'  && `Up to 30 days · ${timeValue ? timeValue * 8 : '?'} working hours`}
            {timeUnit === 'weeks' && `Up to 52 weeks · ${timeValue ? timeValue * 40 : '?'} working hours`}
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
