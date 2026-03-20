import React from 'react';
import { ArrowUpRight, Code2, Globe, Cpu } from 'lucide-react';

const samples = [
  {
    title: 'DeGrid: Decentralized Energy',
    category: 'Blockchain & IoT',
    description: 'A peer-to-peer energy trading platform using Ethereum smart contracts and IoT sensors to monitor grid health.',
    tech: ['Solidity', 'React', 'Raspberry Pi', 'Web3.js'],
    impact: 92,
    innovation: 95,
    icon: Cpu,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    title: 'SignLingo AI',
    category: 'Machine Learning',
    description: 'Real-time American Sign Language translator using MediaPipe and TensorFlow.js for browser-based accessibility.',
    tech: ['TensorFlow.js', 'React', 'MediaPipe', 'Python'],
    impact: 98,
    innovation: 89,
    icon: Globe,
    color: 'from-purple-500 to-pink-600'
  },
  {
    title: 'MedChain Passport',
    category: 'Healthcare Tech',
    description: 'A biometric-secured medical history passport using zero-knowledge proofs for privacy and instant global access.',
    tech: ['Next.js', 'ZK-Proofs', 'Biometrics', 'Tailwind'],
    impact: 95,
    innovation: 97,
    icon: Code2,
    color: 'from-emerald-500 to-teal-600'
  }
];

export default function SampleShowcase() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Example <span className="text-gradient">AI Generations</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Take a look at the depth and quality of projects our AI creates for builders like you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {samples.map((sample, index) => (
            <div 
              key={index}
              className="glass-card-hover group p-8 flex flex-col items-start gap-6 border-white/5"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sample.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-500`}>
                <sample.icon className="w-7 h-7 text-white" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold tracking-widest text-primary-400 uppercase">{sample.category}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors">
                  {sample.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  {sample.description}
                </p>
              </div>

              <div className="w-full space-y-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-xs text-gray-500 font-medium">Resume Impact</span>
                  <span className="text-sm font-bold text-white">{sample.impact}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-400" 
                    style={{ width: `${sample.impact}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {sample.tech.map(t => (
                  <span key={t} className="text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-400">
                    {t}
                  </span>
                ))}
              </div>

              <button className="flex items-center gap-2 text-xs font-bold text-primary-400 group-hover:text-primary-300 mt-6 transition-colors">
                SEE ROADMAP <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
