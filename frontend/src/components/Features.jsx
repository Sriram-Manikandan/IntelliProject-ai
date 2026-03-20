import React from 'react';
import { Brain, Target, Map } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Ideas',
    description:
      'Our engine analyzes your skills and interests to generate project concepts that are both challenging and achievable.',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Target,
    title: 'Resume-Worthy Output',
    description:
      'Every recommendation comes with a resume score and innovation score — so you build projects that actually impress recruiters.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Map,
    title: 'Structured Roadmaps',
    description:
      'Get a step-by-step implementation plan, tech stack recommendations, and potential challenges — all mapped to your timeline.',
    gradient: 'from-violet-500 to-purple-500',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why <span className="text-gradient">IntelliProject</span>?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            More than a random idea generator. An AI mentor that guides you to build meaningful, high-quality projects.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card-hover p-8 opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                style={{ boxShadow: `0 8px 24px rgba(139, 92, 246, 0.15)` }}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
