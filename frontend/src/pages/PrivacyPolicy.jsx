import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-indigo-500/30 font-sans">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 uppercase tracking-widest mb-6">
            <Shield className="w-4 h-4" />
            Legal & Privacy
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">Privacy Policy</h1>
          <p className="text-gray-400 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              We collect information you provide directly to us when you create an account or interact with our AI services. This includes:
            </p>
            <ul className="list-disc pl-5 text-gray-400 space-y-2">
              <li>Account data (email address and securely hashed password via Supabase Auth).</li>
              <li>Project generation data (skills, domain, difficulty, and time budget entered into the prompt).</li>
              <li>Saved project blueprints.</li>
            </ul>
          </section>

          <section className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              We use the information we collect to operate, maintain, and provide the features of IntelliProject. Specifically:
            </p>
            <ul className="list-disc pl-5 text-gray-400 space-y-2">
              <li>To securely authenticate your login.</li>
              <li>To pass your anonymized project criteria to our LLM provider (Groq) to generate your architectural blueprints.</li>
              <li>To save your generated blueprints to your personal dashboard.</li>
            </ul>
          </section>

          <section className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Sharing & Third Parties</h2>
            <p className="text-gray-400 leading-relaxed">
              We do not sell or rent your personal information to third parties. 
              We utilize third-party services to power our application:
              <br /><br />
              <strong>Supabase:</strong> Used for secure authentication and database hosting.<br />
              <strong>Groq:</strong> Used to process your AI prompts. No personally identifiable information (PII) is sent to Groq; only your inputted tech stack and domain criteria.
            </p>
          </section>

          <section className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4">4. Cookies</h2>
            <p className="text-gray-400 leading-relaxed">
              We use cookies to maintain your login session and store your cookie consent preferences. You can control cookie settings through your browser. Disabling session cookies will prevent you from logging in.
            </p>
          </section>

          <section className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
            <p className="text-gray-400 leading-relaxed">
              You have the right to access, update, or delete your account information at any time. If you wish to permanently delete your account and all associated saved blueprints, please contact support.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
