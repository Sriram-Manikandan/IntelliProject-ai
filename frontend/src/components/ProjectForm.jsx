import React, { useState } from 'react';
import { Sparkles, Code2, Globe, BarChart3, Clock } from 'lucide-react';

const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

export default function ProjectForm({ onSubmit, isLoading }) {
  const [form, setForm] = useState({
    skills: '',
    domain: '',
    difficulty: 'Intermediate',
    time_weeks: '',
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.skills || !form.domain || !form.time_weeks) return;
    onSubmit(form);
  };

  const isValid = form.skills && form.domain && form.time_weeks;

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up opacity-0">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Let's find your <span className="text-gradient">perfect project</span>
        </h1>
        <p className="text-gray-400">
          Tell us about yourself and we'll generate tailored project ideas.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Skills Input */}
        <div className="glass-card p-6 space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Code2 className="w-4 h-4 text-primary-400" />
            Your Skills
          </label>
          <input
            type="text"
            value={form.skills}
            onChange={(e) => handleChange('skills', e.target.value)}
            placeholder="e.g., Python, React, Machine Learning, REST APIs"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all text-sm"
          />
          <p className="text-xs text-gray-600">Comma-separated list of technologies you know</p>
        </div>

        {/* Domain Input */}
        <div className="glass-card p-6 space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Globe className="w-4 h-4 text-accent-400" />
            Domain of Interest
          </label>
          <input
            type="text"
            value={form.domain}
            onChange={(e) => handleChange('domain', e.target.value)}
            placeholder="e.g., Healthcare, Finance, Education, E-commerce"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all text-sm"
          />
          <p className="text-xs text-gray-600">The industry or field you want to build for</p>
        </div>

        {/* Difficulty Selector */}
        <div className="glass-card p-6 space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <BarChart3 className="w-4 h-4 text-primary-400" />
            Difficulty Level
          </label>
          <div className="flex gap-3">
            {difficulties.map((level) => (
              <button
                type="button"
                key={level}
                onClick={() => handleChange('difficulty', level)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${
                  form.difficulty === level
                    ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20 border-primary-500/40 text-white shadow-lg shadow-primary-500/10'
                    : 'bg-white/[0.02] border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Time Input */}
        <div className="glass-card p-6 space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Clock className="w-4 h-4 text-accent-400" />
            Time Available (weeks)
          </label>
          <input
            type="number"
            min="1"
            max="52"
            value={form.time_weeks}
            onChange={(e) => handleChange('time_weeks', e.target.value)}
            placeholder="e.g., 4, 8, 12"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all text-sm"
          />
          <p className="text-xs text-gray-600">How many weeks can you dedicate to this project?</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className={`w-full btn-primary py-4 rounded-xl text-base ${
            !isValid ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Generate Project Ideas
          </span>
        </button>
      </form>
    </div>
  );
}
