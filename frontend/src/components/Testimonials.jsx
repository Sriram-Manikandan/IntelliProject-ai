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
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Trusted by <span className="text-gradient">Engineers</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Hundreds of developers use IntelliProject to plan projects that stand out in a crowded market.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="glass-card p-8 group hover:border-primary-500/30 transition-all duration-300"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed italic mb-8 relative">
                <span className="absolute -top-4 -left-2 text-4xl text-primary-500/20 font-serif overflow-hidden">"</span>
                {t.text}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/5 bg-white/5 p-0.5">
                    <img src={t.avatar} alt={t.name} className="w-full h-full rounded-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">{t.name}</h4>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
                <t.social className="w-4 h-4 text-gray-600 group-hover:text-primary-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
