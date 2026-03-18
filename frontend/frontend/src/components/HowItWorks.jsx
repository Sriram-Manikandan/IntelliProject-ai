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
    <section id="how-it-works" className="relative py-24 px-6">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From confused to building in four simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative glass-card p-6 text-center opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-primary-500/40 to-accent-500/40" />
              )}

              {/* Number badge */}
              <div className="text-xs font-bold text-primary-400/60 tracking-widest mb-4">
                STEP {step.number}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary-500/10 to-accent-500/10 border border-primary-500/10 flex items-center justify-center mb-5">
                <step.icon className="w-6 h-6 text-primary-400" />
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
