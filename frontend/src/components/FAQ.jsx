import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const questions = [
  {
    question: 'How does the AI generator work?',
    answer: 'Our AI analyzes your expertise, interests, and development timeframe. It then cross-references this with real-world project trends and recruiter expectations to craft a personalized roadmap that maximizes your learning and resume impact.'
  },
  {
    question: 'Are these projects really resume-worthy?',
    answer: 'Absolutely. Every recommendation includes a "Resume Impact" and "Innovation" score. We focus on non-trivial problems that demonstrate high-level architectural thinking and technical skills.'
  },
  {
    question: 'Is it free to use?',
    answer: 'Building something matters to us. Our basic generator is free for everyone. Premium users get access to more complex architectures and one-click export to GitHub repositories.'
  },
  {
    question: 'What if I don’t like the generated idea?',
    answer: 'No problem. You can refine your inputs (like adding or removing skills) or simply hit "Regenerate" to get a fresh perspective on what you should build next.'
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="faq" className="py-32 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20 animate-fade-in-up opacity-0">
          <h2 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight leading-tight">
            Common <span className="text-gradient text-glow">Questions</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto font-medium">
            Everything you need to know about starting your next project.
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((q, i) => (
            <div 
              key={i} 
              className={`glass-card overflow-hidden transition-all duration-500 border-white/5 animate-fade-in-up opacity-0 ${activeIndex === i ? 'ring-2 ring-indigo-500/20 bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full text-left p-8 sm:p-10 flex items-center justify-between gap-6"
              >
                <h3 className="text-xl font-bold text-white tracking-tight leading-snug">{q.question}</h3>
                <div className={`p-2 rounded-xl border border-white/10 transition-all duration-500 ${activeIndex === i ? 'rotate-180 bg-indigo-500/20 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'text-gray-500 hover:text-gray-300'}`}>
                  <ChevronDown className="w-6 h-6" />
                </div>
              </button>

              <div 
                className={`transition-all duration-500 ease-in-out px-10 pb-10 ${activeIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
              >
                <div className="text-gray-400 leading-[1.8] text-base font-medium border-t border-white/5 pt-8">
                  {q.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
