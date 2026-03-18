import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProjectForm from '../components/ProjectForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ResultsView from '../components/ResultsView';
import Footer from '../components/Footer';
import { generateProjects } from '../services/api';

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

  return (
    <div className="min-h-screen bg-surface-900">
      <Navbar />

      <main className="pt-24 pb-16 px-6">
        {view === 'form' && (
          <ProjectForm onSubmit={handleSubmit} isLoading={false} />
        )}

        {view === 'loading' && <LoadingSpinner />}

        {view === 'results' && results && (
          <ResultsView data={results} onReset={handleReset} />
        )}

        {view === 'error' && (
          <div className="max-w-lg mx-auto text-center py-32 animate-fade-in">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
            <p className="text-gray-400 text-sm mb-6">{error}</p>
            <button onClick={handleReset} className="btn-primary px-6 py-2.5 rounded-xl text-sm">
              <span>Try Again</span>
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
