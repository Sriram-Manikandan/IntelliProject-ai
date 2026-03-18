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
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Your <span className="text-gradient">Project Ideas</span>
        </h1>
        <p className="text-gray-400">
          Here are {data.recommendations.length} personalized recommendations based on your profile.
        </p>
      </div>

      {/* Input Summary */}
      <div className="glass-card p-4 mb-8 flex flex-wrap items-center gap-3 justify-center">
        {Object.entries(data.input_summary).map(([key, value]) => {
          const Icon = summaryIcons[key];
          return (
            <div
              key={key}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5"
            >
              {Icon && <Icon className="w-3.5 h-3.5 text-primary-400" />}
              <span className="text-xs text-gray-500">{summaryLabels[key]}:</span>
              <span className="text-xs font-medium text-gray-300">{value}</span>
            </div>
          );
        })}
      </div>

      {/* Project Cards */}
      <div className="space-y-6 mb-10">
        {data.recommendations.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onReset}
          className="btn-primary px-8 py-3 rounded-xl"
        >
          <span className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Generate Again
          </span>
        </button>
        <a
          href="/"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </a>
      </div>
    </div>
  );
}
