import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden bg-[#030303]">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-black tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Our Mission
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tighter">
              Stop searching for <br />
              <span className="text-gradient text-glow">what to build.</span>
            </h2>

            <div className="space-y-6 text-gray-400 text-lg font-medium leading-relaxed max-w-xl">
              <p>
                As a student or self-taught developer, figuring out <span className="text-white">what</span> to build is often harder than actually writing the code.
              </p>
              <p>
                IntelliProject analyzes your current tech stack and the time you have available to suggest realistic projects. 
                We provide a clear roadmap, prerequisite tools, and warn you about potential scope creep before you even start.
              </p>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="glass-card p-12 border-white/10 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-50" />
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full group-hover:bg-indigo-600/20 transition-all duration-700" />
              
              <h3 className="text-white font-black mb-6 text-2xl tracking-tight uppercase tracking-widest text-indigo-400">How it helps</h3>
              <p className="text-gray-300 text-lg leading-relaxed font-medium">
                Instead of building another generic todo list, get suggestions that fit your exact skillset. 
                You'll receive a step-by-step roadmap, a feasibility analysis, and warnings about the hardest parts of the project so you don't get stuck.
              </p>
              
              <div className="mt-10 pt-10 border-t border-white/5 flex items-center justify-between">
                <div className="text-xs font-black text-gray-500 uppercase tracking-widest">System Status</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
