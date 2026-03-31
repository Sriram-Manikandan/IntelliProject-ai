import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Layers,
  AlertTriangle,
  Trophy,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

function ScoreBar({ label, score, icon: Icon }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
        <Icon className="w-4 h-4 shrink-0" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</span>
          <span className="text-xs font-black text-white">{score}/100</span>
        </div>
        <div className="score-bar">
          <div className="score-bar-fill" style={{ width: `${score}%` }} />
        </div>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="glass-card-hover p-8 sm:p-10 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-6 mb-8">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/5 border border-indigo-500/20 text-[10px] font-black text-indigo-400 tracking-[0.2em] uppercase mb-4">
            Blueprint {String(index + 1).padStart(2, '0')}
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Problem Statement */}
      <p className="text-gray-400 text-base leading-relaxed mb-8 font-medium">
        {project.problem_statement}
      </p>

      {/* Tech Stack Pills */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-black text-gray-300 uppercase tracking-widest">Stack Architecture</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {project.tech_stack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-1.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs font-bold text-gray-300 hover:border-indigo-500/40 hover:text-indigo-300 transition-all cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <ScoreBar label="Portfolio Impact" score={project.resume_score} icon={Trophy} />
        <ScoreBar label="Technical Innovation" score={project.innovation_score} icon={Lightbulb} />
      </div>

      {/* Expand / Collapse */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border border-white/5 bg-white/[0.02] text-gray-400 hover:text-white hover:border-indigo-500/30 transition-all text-sm font-bold group"
      >
        {expanded ? 'Collapse Blueprint' : 'Expand Technical Details'}
        {expanded ? <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" /> : <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />}
      </button>

      {/* Expanded Content */}
      <div className={`overflow-hidden transition-all duration-700 ease-in-out ${expanded ? 'max-h-[2000px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-8 pt-4 border-t border-white/5">
          {/* Architecture */}
          <div>
            <h4 className="text-sm font-black text-white mb-3 flex items-center gap-2 uppercase tracking-widest">
              <Layers className="w-4 h-4 text-indigo-400" />
              Technical Architecture
            </h4>
            <div className="text-sm text-gray-400 leading-relaxed bg-white/[0.01] rounded-2xl p-6 border border-white/5 font-medium">
              {project.architecture}
            </div>
          </div>

          {/* Implementation Roadmap */}
          <div>
            <h4 className="text-sm font-black text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              Development Roadmap
            </h4>
            <div className="space-y-4">
              {project.implementation_roadmap.map((step, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                      <span className="text-xs font-black text-indigo-400 uppercase">{i + 1}</span>
                    </div>
                    {i < project.implementation_roadmap.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-indigo-500/20 to-transparent mt-2" />
                    )}
                  </div>
                  <p className="text-sm text-gray-400 pb-5 font-medium group-hover:text-gray-300 transition-colors">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div>
            <h4 className="text-sm font-black text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
              <AlertTriangle className="w-4 h-4 text-amber-500/80" />
              Complexity & Edge Cases
            </h4>
            <div className="grid gap-3">
              {project.challenges.map((challenge, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-amber-500/20 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60 mt-2 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
                  <p className="text-sm text-gray-400 font-medium leading-relaxed">{challenge}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
