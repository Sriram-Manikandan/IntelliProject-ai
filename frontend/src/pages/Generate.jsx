import React, { useState, useEffect } from 'react';
// layout/ — persistent page shell components
import { Link } from 'react-router-dom';
// generate/ — components specific to the AI generation feature
import ProjectForm from '../components/generate/ProjectForm';
import SkeletonLoader from '../components/generate/SkeletonCard';
import ResultsView from '../components/generate/ResultsView';
// services/api.js — calls the backend API
import { generateProjects } from '../services/api';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

export default function Generate() {
  const [view, setView] = useState('form'); // 'form' | 'loading' | 'results' | 'error'
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  // ── Browser History Fix ──────────────────────────
  // Attempt to load from session storage on initial mount
  useEffect(() => {
    const cached = sessionStorage.getItem('intelliproject_current_generation');
    if (cached) {
      try {
        setResults(JSON.parse(cached));
        setView('results');
      } catch (e) {
        sessionStorage.removeItem('intelliproject_current_generation');
      }
    }
  }, []);
  // ────────────────────────────────────────────────

  const handleSubmit = async (formData) => {
    setView('loading');
    setError('');

    try {
      const data = await generateProjects(formData);
      sessionStorage.setItem('intelliproject_current_generation', JSON.stringify(data));
      setResults(data);
      setView('results');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setView('error');
    }
  };

  const handleReset = () => {
    sessionStorage.removeItem('intelliproject_current_generation');
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
      sessionStorage.setItem('intelliproject_current_generation', JSON.stringify(data));
      setResults(data);
      setView('results');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setView('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030303] transition-colors duration-300">
      <div className="pt-8 px-6 max-w-7xl mx-auto">
        <Link 
          to="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all shadow-sm dark:shadow-none"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>

      <main className="pt-8 pb-16 px-6">

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
    </div>
  );
}
