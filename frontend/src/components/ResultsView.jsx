import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Code2, Globe, BarChart3, Clock, Zap } from 'lucide-react';
import ProjectCard from './ProjectCard';

const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

// Decompose total working hours → weeks, days, hours
function decomposeHours(totalHours) {
  const w = Math.floor(totalHours / 40);
  const d = Math.floor((totalHours % 40) / 8);
  const h = totalHours % 8;
  return { weeks: w, days: d, hours: h };
}

export default function ResultsView({ data, onReset, onRegenerate }) {
  const { input_summary, recommendations } = data;

  // Editable state — initialized from what was last submitted
  const [skills, setSkills]         = useState(input_summary.skills);
  const [domain, setDomain]         = useState(input_summary.domain);
  const [difficulty, setDifficulty] = useState(input_summary.difficulty);

  const init = decomposeHours(input_summary.time_hours);
  const [weeks, setWeeks] = useState(init.weeks);
  const [days,  setDays]  = useState(init.days);
  const [hours, setHours] = useState(init.hours);

  const totalHours = weeks * 40 + days * 8 + hours;

  // Live time preview label
  const timeParts = [];
  if (weeks) timeParts.push(`${weeks}w`);
  if (days)  timeParts.push(`${days}d`);
  if (hours) timeParts.push(`${hours}h`);
  const timeLabel = timeParts.join(' ') || '—';

  // Detect any change from original submission
  const hasChanges =
    skills     !== input_summary.skills  ||
    domain     !== input_summary.domain  ||
    difficulty !== input_summary.difficulty ||
    totalHours !== input_summary.time_hours;

  const handleRegenerate = () => {
    if (onRegenerate && totalHours >= 1) {
      onRegenerate({ skills, domain, difficulty, time_hours: totalHours });
    }
  };

  const inputCls =
    'w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm font-medium focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder-gray-600';

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in-up opacity-0">
        <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
          Your <span className="text-gradient text-glow">Project Architecture</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          {recommendations.length} personalized roadmaps — tweak your profile below and regenerate instantly.
        </p>
      </div>

      {/* Editable Profile Panel */}
      <div className="glass-card p-6 mb-12 animate-fade-in-up opacity-0 animate-delay-100">
        {/* Panel header */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
            Your Profile — edit any field to regenerate
          </p>
          {hasChanges && (
            <button
              onClick={handleRegenerate}
              disabled={totalHours < 1}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-black uppercase tracking-wider hover:bg-indigo-500/30 hover:border-indigo-400/60 hover:shadow-[0_0_16px_rgba(99,102,241,0.25)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Zap className="w-3.5 h-3.5" />
              Regenerate
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Skills */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
              <Code2 className="w-3 h-3" /> Skills
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className={inputCls}
              placeholder="e.g. Python, React, ML"
            />
          </div>

          {/* Domain */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[10px] font-black text-purple-400 uppercase tracking-widest">
              <Globe className="w-3 h-3" /> Domain
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className={inputCls}
              placeholder="e.g. Healthcare, FinTech"
            />
          </div>

          {/* Difficulty */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
              <BarChart3 className="w-3 h-3" /> Difficulty
            </label>
            <div className="flex gap-2">
              {difficulties.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setDifficulty(lvl)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    difficulty === lvl
                      ? 'bg-indigo-500/20 border-indigo-500/50 text-white shadow-[0_0_12px_rgba(99,102,241,0.15)]'
                      : 'bg-white/[0.02] border-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Time */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[10px] font-black text-purple-400 uppercase tracking-widest">
              <Clock className="w-3 h-3" /> Time
              {timeLabel !== '—' && (
                <span className="text-indigo-400 normal-case font-bold tracking-normal ml-1">
                  — {timeLabel} · {totalHours}h
                </span>
              )}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Weeks', val: weeks, set: setWeeks, max: 52 },
                { label: 'Days',  val: days,  set: setDays,  max: 4  },
                { label: 'Hours', val: hours, set: setHours, max: 7  },
              ].map(({ label, val, set, max }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <input
                    type="number"
                    min="0"
                    max={max}
                    value={val || ''}
                    onChange={(e) => set(Math.max(0, Math.min(max, Number(e.target.value) || 0)))}
                    placeholder="0"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-2 py-2.5 text-white text-sm font-bold focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all text-center"
                  />
                  <span className="text-[9px] font-black text-gray-600 uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project Cards */}
      <div className="grid gap-8 mb-16">
        {recommendations.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-fade-in opacity-0 animate-delay-500">
        <button
          onClick={onReset}
          className="btn-primary flex items-center gap-3 text-lg px-10 py-4 active:scale-95 transition-all"
        >
          <RefreshCw className="w-5 h-5" />
          Start Fresh
        </button>
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-all text-sm font-bold group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
