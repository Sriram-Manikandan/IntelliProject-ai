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
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Common <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Everything you need to know about starting your next project.
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((q, i) => (
            <div 
              key={i} 
              className={`glass-card overflow-hidden transition-all duration-300 border-white/5 ${activeIndex === i ? 'ring-2 ring-primary-500/20 bg-white/5' : ''}`}
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4"
              >
                <h3 className="text-lg font-semibold text-white leading-snug">{q.question}</h3>
                <div className={`p-1.5 rounded-lg border border-white/5 transition-transform duration-300 ${activeIndex === i ? 'rotate-180 bg-primary-500/10 text-primary-400' : 'text-gray-500'}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              <div 
                className={`transition-all duration-300 ease-in-out ${activeIndex === i ? 'max-h-96 opacity-100 mb-8 px-8 sm:px-8' : 'max-h-0 opacity-0 pointer-events-none'}`}
              >
                <div className="text-gray-400 leading-relaxed text-sm pt-2">
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
