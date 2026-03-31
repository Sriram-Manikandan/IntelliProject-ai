import React from 'react';
import { Star, Github, Twitter, Linkedin } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Drasner',
    role: 'Senior Software Engineer',
    text: "IntelliProject's generated roadmaps are incredibly thorough. I recommend it to every student who's stuck in tutorial hell and wants to build something real for their portfolio.",
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    social: Twitter
  },
  {
    name: 'Alex Rivera',
    role: 'Computer Science Student',
    text: "I was confused about how to start a web3 project. IntelliProject gave me a roadmap, a tech stack, and a problem statement I hadn't even thought of. I'm now halfway through building it!",
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    social: Github
  },
  {
    name: 'Elena Vance',
    role: 'Full Stack Developer',
    text: "The innovation score feature is a game changer. It pushed me to add unique features to my project that eventually helped me land an internship at a top-tier startup.",
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    social: Linkedin
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-fade-in-up opacity-0">
          <h2 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight leading-tight">
            Trusted by <span className="text-gradient text-glow">Builders</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Hundreds of developers use IntelliProject to plan projects that stand out in a crowded market.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="glass-card-hover p-10 group animate-fade-in-up opacity-0 flex flex-col items-start gap-8"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex gap-1.5 mb-2">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 text-indigo-400 fill-indigo-400/20 drop-shadow-[0_0_8px_rgba(99,102,241,0.4)]" />
                ))}
              </div>

              <div className="relative">
                <span className="absolute -top-10 -left-6 text-8xl text-indigo-500/10 font-black leading-none pointer-events-none uppercase tracking-tighter overflow-hidden">"</span>
                <p className="text-gray-200 text-lg leading-relaxed font-medium mb-4 relative z-10 line-clamp-4 italic">
                  {t.text}
                </p>
              </div>

              <div className="flex items-center justify-between w-full mt-auto pt-8 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full p-1 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 shadow-lg group-hover:shadow-indigo-500/10 transition-shadow">
                    <img src={t.avatar} alt={t.name} className="w-full h-full rounded-full object-cover border border-white/10" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white tracking-tight">{t.name}</h4>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 text-gray-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-all">
                  <t.social className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
