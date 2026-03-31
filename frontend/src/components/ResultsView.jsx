import React from 'react';
import { ArrowLeft, RefreshCw, Code2, Globe, BarChart3, Clock } from 'lucide-react';
import ProjectCard from './ProjectCard';

const summaryIcons = {
  skills: Code2,
  domain: Globe,
  difficulty: BarChart3,
  time_weeks: Clock,
};

const summaryLabels = {
  skills: 'Skills',
  domain: 'Domain',
  difficulty: 'Difficulty',
  time_weeks: 'Time (weeks)',
};

export default function ResultsView({ data, onReset }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in-up opacity-0">
        <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
          Your <span className="text-gradient text-glow">Project Architecture</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          We've architected {data.recommendations.length} personalized roadmaps based on your expertise and goals.
        </p>
      </div>

      {/* Input Summary */}
      <div className="glass-card p-6 mb-12 flex flex-wrap items-center gap-6 justify-center animate-fade-in-up opacity-0 animate-delay-100">
        {Object.entries(data.input_summary).map(([key, value], i) => {
          const Icon = summaryIcons[key];
          return (
            <div
              key={key}
              className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.02] border border-white/5 transition-all hover:border-indigo-500/30 group"
            >
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                {Icon && <Icon className="w-4 h-4" />}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{summaryLabels[key]}</span>
                <span className="text-sm font-bold text-gray-200">{value}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Cards */}
      <div className="grid gap-8 mb-16">
        {data.recommendations.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-fade-in opacity-0 animate-delay-500">
        <button
          onClick={onReset}
          className="btn-primary flex items-center gap-3 text-lg px-10 py-4 scale-105 active:scale-95 transition-all"
        >
          <RefreshCw className="w-5 h-5" />
          Generate New Blueprint
        </button>
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-all text-sm font-bold group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Terminal
        </Link>
      </div>
    </div>
  );
}
