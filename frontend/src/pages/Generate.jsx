import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ProjectForm from '../components/ProjectForm';
import SkeletonLoader from '../components/SkeletonCard';
import ResultsView from '../components/ResultsView';
import Footer from '../components/Footer';
import { generateProjects } from '../services/api';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Generate() {
  const [view, setView] = useState('form'); // 'form' | 'loading' | 'results' | 'error'
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    setView('loading');
    setError('');

    try {
      const data = await generateProjects(formData);
      setResults(data);
      setView('results');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setView('error');
    }
  };

  const handleReset = () => {
    setView('form');
    setResults(null);
    setError('');
  };

  // Re-run with edited values from ResultsView without going back to the form
  const handleRegenerate = async (formData) => {
    setView('loading');
    setError('');
    try {
      const data = await generateProjects(formData);
      setResults(data);
      setView('results');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setView('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#030303]">
      <Navbar />

      <main className="pt-24 pb-16 px-6">

        {/* Form view */}
        {view === 'form' && (
          <ProjectForm onSubmit={handleSubmit} isLoading={false} />
        )}

        {/* Loading — skeleton cards fill the results layout */}
        {view === 'loading' && <SkeletonLoader />}

        {/* Results */}
        {view === 'results' && results && (
          <ResultsView data={results} onReset={handleReset} onRegenerate={handleRegenerate} />
        )}

        {/* Error */}
        {view === 'error' && (
          <div className="max-w-lg mx-auto text-center py-32 animate-fade-in">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>

            {/* Copy */}
            <h2 className="text-2xl font-black text-white mb-3 tracking-tight">
              Generation Failed
            </h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
              {error}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleReset}
                className="btn-primary flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
