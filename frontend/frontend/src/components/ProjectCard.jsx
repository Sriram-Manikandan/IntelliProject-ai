import { useState } from 'react';
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
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-primary-400 shrink-0" />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-gray-400">{label}</span>
          <span className="text-xs font-semibold text-white">{score}/100</span>
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
      className="glass-card-hover p-6 sm:p-8 opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="text-xs font-bold text-primary-400/60 tracking-widest mb-2">
            PROJECT {String(index + 1).padStart(2, '0')}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Problem Statement */}
      <p className="text-gray-400 text-sm leading-relaxed mb-6">
        {project.problem_statement}
      </p>

      {/* Tech Stack Pills */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-accent-400" />
          <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Tech Stack</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs font-medium text-gray-300 hover:border-primary-500/30 hover:text-primary-300 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Scores */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <ScoreBar label="Resume Impact" score={project.resume_score} icon={Trophy} />
        <ScoreBar label="Innovation" score={project.innovation_score} icon={Lightbulb} />
      </div>

      {/* Expand / Collapse */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-gray-400 hover:text-white hover:border-primary-500/20 transition-all text-sm font-medium"
      >
        {expanded ? 'Show Less' : 'View Full Details'}
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="mt-6 space-y-6 animate-fade-in">
          {/* Architecture */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary-400" />
              Architecture
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed bg-white/[0.02] rounded-xl p-4 border border-white/5">
              {project.architecture}
            </p>
          </div>

          {/* Implementation Roadmap */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              Implementation Roadmap
            </h4>
            <div className="space-y-3">
              {project.implementation_roadmap.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/20 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-primary-400">{i + 1}</span>
                    </div>
                    {i < project.implementation_roadmap.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-primary-500/20 to-transparent mt-1" />
                    )}
                  </div>
                  <p className="text-sm text-gray-400 pb-3">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Potential Challenges
            </h4>
            <ul className="space-y-2">
              {project.challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60 mt-1.5 shrink-0" />
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
