import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-surface-900">
      <Navbar />
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          About <span className="text-gradient">IntelliProject</span>
        </h1>
        <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
          <p>
            IntelliProject was born from a simple observation: many talented developers struggle not with 
            coding, but with deciding *what* to build to showcase their skills.
          </p>
          <p>
            Our mission is to bridge the gap between "tutorial hell" and real-world engineering. By 
            leveraging AI, we help you identify projects that are both challenging and resume-worthy, 
            tailored specifically to your current expertise and future ambitions.
          </p>
          <div className="p-8 glass-card border-white/5 mt-12">
            <h3 className="text-white font-bold mb-4 text-xl">Our Vision</h3>
            <p className="text-sm">
              To become the standard platform for project discovery and architectural guidance, 
              empowering the next generation of builders to ship meaningful software.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
