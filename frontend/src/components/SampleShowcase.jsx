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
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none animate-float" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 animate-fade-in-up opacity-0">
          <h2 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight leading-tight">
            Example <span className="text-gradient text-glow">AI Blueprints</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Every generation includes a complete architecture, tech stack, roadmap, and complexity analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {samples.map((sample, index) => (
            <div 
              key={index}
              className="glass-card-hover group p-10 flex flex-col items-start gap-8 border-white/5 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${sample.color} flex items-center justify-center shadow-lg group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-110`}>
                <sample.icon className="w-8 h-8 text-white" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-black tracking-[0.2em] text-indigo-400 uppercase">{sample.category}</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-glow transition-all">
                  {sample.title}
                </h3>
                <p className="text-base text-gray-400 leading-relaxed mb-6 font-medium line-clamp-3">
                  {sample.description}
                </p>
              </div>

              <div className="w-full space-y-5 mb-8">
                <div className="space-y-2">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Resume Impact</span>
                    <span className="text-xs font-black text-white">{sample.impact}%</span>
                  </div>
                  <div className="score-bar">
                    <div 
                      className="score-bar-fill" 
                      style={{ width: `${sample.impact}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5 mt-auto">
                {sample.tech.map(t => (
                  <span key={t} className="text-[10px] px-3 py-1.5 rounded-xl bg-white/[0.02] border border-white/10 text-gray-400 font-bold group-hover:border-white/20 transition-all cursor-default">
                    {t}
                  </span>
                ))}
              </div>

              <button className="flex items-center gap-2 text-xs font-black text-indigo-400 group-hover:text-indigo-300 mt-8 transition-colors tracking-widest uppercase">
                EXPLORE ROADMAP <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
