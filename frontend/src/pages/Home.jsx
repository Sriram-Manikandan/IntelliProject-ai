import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import SampleShowcase from '../components/SampleShowcase';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-900 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <SampleShowcase />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
