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
              Bridging the gap from <br />
              <span className="text-gradient text-glow">Code to Engineering.</span>
            </h2>

            <div className="space-y-6 text-gray-400 text-lg font-medium leading-relaxed max-w-xl">
              <p>
                IntelliProject was born from a simple observation: many talented developers struggle not with 
                coding, but with deciding <span className="text-white">what</span> to build to showcase their skills.
              </p>
              <p>
                Our mission is to bridge the gap between "tutorial hell" and real-world engineering. By 
                leveraging AI, we help you identify projects that are both challenging and resume-worthy, 
                tailored specifically to your expertise.
              </p>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="glass-card p-12 border-white/10 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-50" />
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full group-hover:bg-indigo-600/20 transition-all duration-700" />
              
              <h3 className="text-white font-black mb-6 text-2xl tracking-tight uppercase tracking-widest text-indigo-400">Our Vision</h3>
              <p className="text-gray-300 text-lg leading-relaxed font-medium">
                To become the standard platform for project discovery and architectural guidance, 
                empowering the next generation of builders to ship meaningful software with precision 
                and confidence.
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
