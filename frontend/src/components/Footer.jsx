import React from 'react';
import { Sparkles, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const links = [
  { label: 'Product', items: ['Features', 'Testimonials', 'FAQ', 'Pricing'] },
  { label: 'Company', items: ['About', 'Careers', 'Contact', 'Blog'] },
  { label: 'Legal', items: ['Privacy', 'Terms', 'Cookie Policy'] }
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Intelli<span className="text-gradient">Project</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Empowering developers to build meaningful projects with AI-driven insights and structured roadmaps. Don't just code, build.
            </p>
            <div className="flex items-center gap-4 pt-4">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-primary-400 hover:border-primary-400/30 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {links.map((group, i) => (
            <div key={i} className="space-y-6">
              <h4 className="text-sm font-bold text-white uppercase tracking-widest">{group.label}</h4>
              <ul className="space-y-4">
                {group.items.map((item, j) => (
                  <li key={j}>
                    <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} IntelliProject. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-gray-600 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-600 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
