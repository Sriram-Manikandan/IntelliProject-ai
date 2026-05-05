import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const questions = [
  {
    question: 'How does the AI generator work?',
    answer: 'We pass your technical skills, desired domain, and time budget into an advanced Language Model. We instruct the AI to analyze feasibility and common pitfalls, and it returns a structured JSON blueprint with a step-by-step roadmap.'
  },
  {
    question: 'Are these projects actually realistic?',
    answer: 'Yes. We specifically prompt the AI to run a "feasibility analysis" before showing you the result. It will warn you about unrealistic scope, difficult data sources, or missing prerequisites.'
  },
  {
    question: 'Is it free to use?',
    answer: 'Yes, this tool is 100% free and open-source. We built this to solve our own problem of not knowing what to build.'
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
