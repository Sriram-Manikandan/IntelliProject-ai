import React from 'react';
import { UserCircle, Settings2, Wand2, Rocket } from 'lucide-react';

const steps = [
  {
    icon: UserCircle,
    number: '01',
    title: 'Tell Us About You',
    description: 'Enter your skills, domain interest, experience level, and available time.',
  },
  {
    icon: Settings2,
    number: '02',
    title: 'AI Analyzes',
    description: 'Our engine processes your profile against real-world project patterns.',
  },
  {
    icon: Wand2,
    number: '03',
    title: 'Get Ideas',
    description: 'Receive 3 structured, personalized project recommendations instantly.',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Start Building',
    description: 'Follow the roadmap, overcome challenges, and ship something impressive.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 px-6 overflow-hidden">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24 animate-fade-in-up opacity-0">
          <h2 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight leading-tight">
            How It <span className="text-gradient text-glow">Works</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            From architecture to implementation, our AI ecosystem guides you through every phase of building.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative glass-card p-10 text-center animate-fade-in-up opacity-0 group hover:bg-white/[0.03] transition-all duration-500"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-indigo-500/40 to-transparent z-0 group-hover:from-indigo-400 transition-all duration-500" />
              )}

              {/* Number/Icon Stack */}
              <div className="relative mb-8 pt-4">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-5xl font-black text-indigo-500/5 select-none tracking-tighter group-hover:text-indigo-500/10 transition-colors">
                  {step.number}
                </div>
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-500 shadow-xl group-hover:shadow-indigo-500/10">
                  <step.icon className="w-8 h-8 text-indigo-400" />
                </div>
              </div>

              <h3 className="text-xl font-black text-white mb-4 tracking-tight group-hover:text-glow transition-all">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-medium">{step.description}</p>

              {/* Step label */}
              <div className="mt-8 flex justify-center">
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-black tracking-[0.2em] text-gray-500 uppercase group-hover:text-indigo-400 group-hover:border-indigo-500/20 transition-all">
                  Phase {step.number}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
