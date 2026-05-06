import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#030303] flex flex-col selection:bg-indigo-500/30 font-sans text-white">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 px-6 max-w-4xl mx-auto w-full">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 tracking-[0.2em] uppercase mb-4">
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Terms of <span className="text-gradient">Service</span>
          </h1>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div className="space-y-12 prose prose-invert max-w-none text-gray-300">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using IntelliProject, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Description of Service</h2>
            <p className="leading-relaxed">
              IntelliProject provides project generation, management, and tracking tools for educational purposes. The service includes, but is not limited to, the generation of project blueprints, tracking progress, and storing related data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. User Accounts</h2>
            <p className="leading-relaxed">
              To use certain features of the service, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. User Content</h2>
            <p className="leading-relaxed">
              You retain ownership of any content you submit or create using the service. However, by using the service, you grant IntelliProject a worldwide, non-exclusive license to host, copy, and display such content for the purpose of providing the service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Termination</h2>
            <p className="leading-relaxed">
              We reserve the right to suspend or terminate your account at any time, with or without cause, including but not limited to violations of these Terms of Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Disclaimer of Warranties</h2>
            <p className="leading-relaxed">
              The service is provided "as is" and "as available" without any warranties of any kind, either express or implied. IntelliProject does not warrant that the service will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">7. Limitation of Liability</h2>
            <p className="leading-relaxed">
              In no event shall IntelliProject or its operators be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">8. Changes to Terms</h2>
            <p className="leading-relaxed">
              We may modify these terms at any time. We will provide notice of significant changes. Your continued use of the service after such modifications constitutes your acceptance of the new terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">9. Contact Information</h2>
            <p className="leading-relaxed">
              If you have any questions about these Terms, please contact us at <a href="mailto:sriramtech2007@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">sriramtech2007@gmail.com</a>.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
