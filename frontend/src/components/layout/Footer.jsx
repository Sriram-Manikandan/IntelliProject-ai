// components/layout/Footer.jsx
// ─────────────────────────────────────────────
// PURPOSE: The site-wide footer displayed at the bottom of every page.
//          Contains brand info, navigation link groups, and social icons.
//
// Used by: Home, Generate, Dashboard pages
// ─────────────────────────────────────────────

import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Linkedin, Mail } from 'lucide-react';

const links = [
  { label: 'Product', items: ['Testimonials', 'FAQ'] },
  { label: 'Company', items: ['Feedback', 'Contact', 'Blog'] }
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-32 pb-16 px-6 bg-[#030303]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-24">
          <div className="col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-widest uppercase">
                Intelli<span className="text-gradient text-glow">Project</span>
              </span>
            </div>
            <p className="text-base text-gray-500 leading-relaxed max-w-sm font-medium">
              Empowering students and self-taught developers to build practical projects and improve their engineering skills.
              <span className="block mt-4 text-indigo-400/80 italic font-bold tracking-widest uppercase text-[10px]">Built for practical learning.</span>
            </p>
            <div className="flex items-center gap-4 pt-4">
              <a href="https://github.com/Sriram-Manikandan/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-500 shadow-xl group">
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.linkedin.com/in/srirammanikandan/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-500 shadow-xl group">
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="mailto:sriramtech2007@gmail.com" className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-500 shadow-xl group">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {links.map((group, i) => (
            <div key={i} className="space-y-8">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">{group.label}</h4>
              <ul className="space-y-5">
                {group.items.map((item, j) => (
                  <li key={j}>
                    <a 
                      href={item === 'FAQ' ? '#faq' : (item === 'Testimonials' ? '#testimonials' : (item === 'Contact' ? 'mailto:sriramtech2007@gmail.com' : '#!'))} 
                      onClick={(e) => {
                        if (item !== 'FAQ' && item !== 'Testimonials' && item !== 'Contact') {
                          e.preventDefault();
                        }
                      }}
                      className="text-sm text-gray-500 hover:text-indigo-400 transition-all font-medium hover:pl-2"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-12 border-t border-white/5">
          <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} IntelliProject. Engineered with precision.
          </p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="text-xs text-gray-600 hover:text-white transition-all font-bold uppercase tracking-widest">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-gray-600 hover:text-white transition-all font-bold uppercase tracking-widest">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
