import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// layout/ — components that appear on every page
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
// home/ — sections that only appear on the landing page
import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import HowItWorks from '../components/home/HowItWorks';
import SampleShowcase from '../components/home/SampleShowcase';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import CallToAction from '../components/home/CallToAction';

export default function Home() {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-surface-900 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
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
