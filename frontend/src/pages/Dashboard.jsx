import React, { useState, useEffect } from 'react';
import { Bookmark, LayoutDashboard, Search, Loader2, Settings, LogOut, User as UserIcon, Briefcase, Sun, Moon, BrainCircuit, Shield, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserProjects, deleteProject } from '../services/projectService';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ProjectCard from '../components/generate/ProjectCard';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard() {
  const [savedProjects, setSavedProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');
  const { user, logout, updateProfile, updatePassword, resetPassword } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setDisplayName(user.user_metadata.full_name);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const fetchSavedProjects = async () => {
      setLoading(true);
      try {
        const projects = await getUserProjects(user.id);
        setSavedProjects(projects);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProjects();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredProjects = savedProjects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.problem_statement.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProjectDelete = async (projectId) => {
    console.log('DASHBOARD: Requesting delete for project ID:', projectId);
    try {
      await deleteProject(user.id, projectId);
      console.log('DASHBOARD: Delete request sent successfully.');
      setSavedProjects(prev => {
        const newList = prev.filter(p => p.id !== projectId);
        console.log(`DASHBOARD: Local state updated. Before: ${prev.length}, After: ${newList.length}`);
        return newList;
      });
    } catch (err) {
      console.error('DASHBOARD: Delete failed:', err);
      alert('Error deleting project: ' + err.message);
    }
  };

  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    
    // Only require old password if the user is trying to change their password
    if (newPassword && !oldPassword) {
      return setMessage({ type: 'error', text: 'Current password is required to update your password' });
    }
    
    if (newPassword && newPassword !== confirmPassword) {
      return setMessage({ type: 'error', text: 'New passwords do not match' });
    }
    
    setIsUpdating(true);
    setMessage({ type: '', text: '' });
    
    try {
      // 1. Verify old password ONLY if a new password is being set
      if (newPassword) {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: user.email,
          password: oldPassword
        });
        
        if (authError) {
          throw new Error('Incorrect current password. Please try again.');
        }
      }

      // 2. Update Profile (Name)
      await updateProfile({ full_name: displayName });
      
      // 3. Update Password if provided
      if (newPassword) {
        await updatePassword(newPassword);
      }
      
      setMessage({ type: 'success', text: 'Account updated successfully!' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setIsEditModalOpen(false), 2000);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      await logout();
      navigate('/');
    }
  };

  const handleForgotPasswordInSettings = async () => {
    try {
      await resetPassword(user.email);
      setMessage({ type: 'success', text: 'Password reset link sent to your email!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const handleAvatarChange = () => {
    setMessage({ type: 'success', text: 'Avatar upload functionality will be available in the next update!' });
  };

  return (
    <div className="min-h-screen bg-[#030303] flex text-gray-900 dark:text-white font-sans selection:bg-indigo-500/30 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-white/10 flex flex-col fixed inset-y-0 left-0 z-50 transition-colors duration-300">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter">
              Intelli<span className="text-gradient">Project</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link 
            to="/generate"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 mb-4"
          >
            <BrainCircuit className="w-5 h-5" />
            Generate Idea
          </Link>

          <div className="h-px bg-gray-200 dark:bg-white/10 my-4" />

          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold ${activeTab === 'projects' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Your Projects
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold ${activeTab === 'settings' ? 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'}`}
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors font-bold"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
        <div className="px-4 pb-6 text-center">
          <p className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            © {new Date().getFullYear()} IntelliProject. Engineered with precision.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 lg:p-12">
        {activeTab === 'projects' ? (
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                  Your <span className="text-gradient">Projects</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Manage your architected blueprints.
                </p>
              </div>

              <div className="relative group w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm font-medium"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                <p className="text-gray-500 text-xs font-black uppercase tracking-[0.2em]">Syncing...</p>
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-8">
                {filteredProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.id || index} 
                    project={project} 
                    index={index} 
                    initialIsSaved={true} 
                    onDelete={() => handleProjectDelete(project.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center mb-6">
                  <Bookmark className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
                <p className="text-gray-400 text-sm max-w-xs mx-auto mb-8 font-medium">
                  You haven't saved any projects yet.
                </p>
                <Link to="/generate" className="btn-primary px-8 py-3 text-sm">
                  Generate Idea
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto pb-24">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                User <span className="text-gradient">Settings</span>
              </h1>
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="btn-primary py-2.5 px-6 text-sm flex items-center gap-2"
              >
                Edit Profile
              </button>
            </div>

            {message.text && !isEditModalOpen && (
              <div className={`mb-6 p-4 rounded-xl border ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                {message.text}
              </div>
            )}

            {/* Account Info Card */}
            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 mb-8 shadow-sm dark:shadow-none transition-colors duration-300">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-indigo-500" />
                Account Profile
              </h3>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center border-2 border-indigo-100 dark:border-indigo-500/20">
                  <UserIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">{user?.user_metadata?.full_name || 'IntelliUser'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{user?.email}</p>
                  <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Status: Verified
                  </p>
                </div>
              </div>
            </div>

            {/* Edit Profile Modal/Box */}
            {isEditModalOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
                <div className="w-full max-w-lg bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl relative">
                  <button 
                    onClick={() => setIsEditModalOpen(false)}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Edit Your Profile</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 font-medium">Update your identity and account security.</p>

                  <form onSubmit={handleUpdateAccount} className="space-y-5">
                    {message.text && (
                      <div className={`p-4 rounded-xl border text-xs font-bold ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                        {message.text}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                        <input 
                          type="text" 
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors text-sm font-medium"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email (Read Only)</label>
                        <input type="text" value={user?.email} disabled className="w-full bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-gray-500 dark:text-gray-400 cursor-not-allowed text-sm font-medium" />
                      </div>
                    </div>

                    <div className="h-px bg-gray-200 dark:bg-white/10 my-4" />

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Current Password</label>
                        <input 
                          type="password" 
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          placeholder="Required for changes"
                          className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors text-sm font-medium"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">New Password</label>
                          <input 
                            type="password" 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Min 6 chars"
                            className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors text-sm font-medium"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Confirm New</label>
                          <input 
                            type="password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Match password"
                            className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors text-sm font-medium"
                          />
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={handleForgotPasswordInSettings}
                        className="text-[10px] font-black text-indigo-500 hover:text-indigo-400 uppercase tracking-widest transition-colors"
                      >
                        Forgot Password? Send Reset Link
                      </button>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button 
                        type="button"
                        onClick={() => setIsEditModalOpen(false)}
                        className="flex-1 py-3.5 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        disabled={isUpdating}
                        className="flex-1 btn-primary py-3.5 text-sm disabled:opacity-50"
                      >
                        {isUpdating ? 'Updating...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Notifications & Preferences Card */}
            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 mb-8 shadow-sm dark:shadow-none transition-colors duration-300">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-500" />
                Preferences & Notifications
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Email Notifications</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Receive updates about your account and new features.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                  </label>
                </div>

                <div className="h-px bg-gray-200 dark:bg-white/10 w-full" />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Marketing & Promotions</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Receive promotional offers and newsletters.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Admin Access */}
            <div className="bg-indigo-50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl p-8 mb-8 shadow-sm transition-colors duration-300">
              <h4 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">Administrative Access</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 font-medium">Access system analytics, threat logs, and infrastructure management panels.</p>
              <Link to="/admin" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-all shadow-lg shadow-indigo-500/20">
                Go to Admin Dashboard
              </Link>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/20 rounded-2xl p-8 transition-colors duration-300">
               <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">
                 Danger Zone
               </h3>
               <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 font-medium">Permanently delete your account and all associated projects. This action cannot be undone.</p>
               <button 
                 onClick={handleDeleteAccount}
                 className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-all shadow-lg shadow-red-500/20"
               >
                 Delete Account
               </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
