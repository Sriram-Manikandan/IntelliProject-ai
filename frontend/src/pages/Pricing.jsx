import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check, Sparkles, Zap, Shield, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    price: '0',
    description: 'Perfect for students and early-stage hobbyists.',
    features: [
      '3 Project ideas per day',
      'Basic tech stack analysis',
      'Resume score preview',
      'Community discord access'
    ],
    cta: 'Start Building',
    icon: Zap,
    popular: false
  },
  {
    name: 'Pro Builder',
    price: '12',
    description: 'For serious developers building a portfolio.',
    features: [
      'Unlimited project ideas',
      'Detailed architecture diagrams',
      'Full implementation roadmaps',
      'One-click GitHub Export',
      'Innovation analyzer tool'
    ],
    cta: 'Go Pro',
    icon: Rocket,
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For coding bootcamps and universities.',
    features: [
      'Custom AI model training',
      'Student progress tracking',
      'Batch generation API',
      'Dedicated support',
      'SLA guarantee'
    ],
    cta: 'Contact Sales',
    icon: Shield,
    popular: false
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-surface-900 overflow-x-hidden">
      <Navbar />

      <main className="pt-32 pb-24 px-6 relative">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/10 blur-[150px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-500/10 blur-[150px] -z-10" />

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold tracking-widest uppercase mb-6">
              <Sparkles className="w-4 h-4" />
              Simple Pricing
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Invest in your <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Choose the plan that fits your ambition. From hobby projects to career-defining builds.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`relative glass-card p-8 flex flex-col items-start border-white/5 group hover:border-primary-500/30 transition-all duration-300 ${plan.popular ? 'ring-2 ring-primary-500 ring-offset-4 ring-offset-surface-900 scale-105 z-10' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white text-[10px] font-bold tracking-widest uppercase">
                    Most Popular
                  </div>
                )}

                <div className={`p-3 rounded-xl bg-white/5 mb-6 group-hover:bg-primary-500/10 transition-colors`}>
                  <plan.icon className="w-6 h-6 text-primary-400" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-500 text-sm">/month</span>}
                </div>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                  {plan.description}
                </p>

                <div className="space-y-4 w-full mb-10">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary-400" />
                      </div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/generate" className="w-full mt-auto">
                  <button className={`w-full py-4 rounded-xl text-sm font-bold transition-all duration-300 ${plan.popular ? 'btn-primary shadow-lg shadow-primary-500/20' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'}`}>
                    {plan.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* Money Back Guarantee */}
          <div className="text-center p-12 glass-card border-dashed border-white/10 max-w-3xl mx-auto">
            <h4 className="text-lg font-bold text-white mb-2">30-Day Money Back Guarantee</h4>
            <p className="text-sm text-gray-500">
              Not satisfied with your roadmaps? We'll refund your entire subscription, no questions asked.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
