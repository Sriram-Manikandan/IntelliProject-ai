import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import Footer from '../components/Footer';
import { Bookmark, LayoutDashboard, Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [savedProjects, setSavedProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchSavedProjects = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('saved_projects')
          .select('project_data')
          .eq('user_id', user.id);

        if (error) throw error;
        setSavedProjects(data.map(item => item.project_data));
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProjects();
  }, [user]);

  const filteredProjects = savedProjects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.problem_statement.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 tracking-[0.2em] uppercase">
              <LayoutDashboard className="w-3 h-3" />
              User Terminal
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Project <span className="text-gradient">Vault</span>
            </h1>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest max-w-md">
              Collection of your architected blueprints and development roadmaps.
            </p>
          </div>

          <div className="relative group w-full md:w-80">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text"
              placeholder="Search in vault..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/40 focus:ring-4 focus:ring-indigo-500/5 transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4 animate-pulse">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
            <p className="text-gray-500 text-xs font-black uppercase tracking-[0.2em]">Syncing with Cloud Vault...</p>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} initialIsSaved={true} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border border-dashed border-white/5 rounded-[40px] bg-white/[0.01]">
            <div className="w-20 h-20 mx-auto rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center mb-8">
              <Bookmark className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Vault is Empty</h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto mb-10 leading-relaxed font-medium">
              You haven't saved any project blueprints yet. Start exploring to build your collection.
            </p>
            <Link to="/generate" className="btn-primary px-10 py-4.5 text-sm">
              Generate Ideas Now
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
