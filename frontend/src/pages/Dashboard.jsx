import React, { useState, useEffect } from 'react';
import { Bookmark, LayoutDashboard, Search, Loader2, Settings, LogOut, User as UserIcon, Briefcase, Sun, Moon, BrainCircuit, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserProjects } from '../services/projectService';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ProjectCard from '../components/generate/ProjectCard';

export default function Dashboard() {
  const [savedProjects, setSavedProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');
  const { user, logout, updateProfile, updatePassword } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user?.user_metadata?.full_name || '');
  const [newPassword, setNewPassword] = useState('');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    setMessage({ type: '', text: '' });
    try {
      await updateProfile({ full_name: displayName });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword) return;
    setIsUpdatingPassword(true);
    setMessage({ type: '', text: '' });
    try {
      await updatePassword(newPassword);
      setNewPassword('');
      setMessage({ type: 'success', text: 'Password updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      // In a real app, you'd call a backend function here.
      // For now, as per request, we log out and redirect to home.
      await logout();
      navigate('/');
    }
  };

  const handleAvatarChange = () => {
    setMessage({ type: 'success', text: 'Avatar upload functionality will be available in the next update!' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030303] flex text-gray-900 dark:text-white font-sans selection:bg-indigo-500/30 transition-colors duration-300">
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
                  <ProjectCard key={project.title} project={project} index={index} initialIsSaved={true} />
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
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-8">
              User <span className="text-gradient">Settings</span>
            </h1>

            {message.text && (
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
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center border-2 border-indigo-100 dark:border-indigo-500/20">
                  <UserIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
                </div>
                <div>
                  <button 
                    onClick={handleAvatarChange}
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors mb-2"
                  >
                    Change Avatar
                  </button>
                  <p className="text-xs text-gray-500 dark:text-gray-400">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>
              
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Display Name</label>
                  <input 
                    type="text" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="IntelliUser" 
                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors text-sm font-medium" 
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1.5 block">Email Address</label>
                  <input type="text" value={user?.email || ''} disabled className="w-full bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/5 rounded-lg px-4 py-2.5 text-gray-500 dark:text-gray-400 cursor-not-allowed text-sm font-medium" />
                </div>
                <button 
                  type="submit"
                  disabled={isUpdatingProfile}
                  className="btn-primary py-2.5 px-6 text-sm disabled:opacity-50"
                >
                  {isUpdatingProfile ? 'Saving...' : 'Save Profile'}
                </button>
              </form>
            </div>

            {/* Security Section */}
            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 mb-8 shadow-sm dark:shadow-none transition-colors duration-300">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-500" />
                Security
              </h3>
              
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1.5 block">New Password</label>
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors text-sm font-medium" 
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isUpdatingPassword || !newPassword}
                  className="btn-primary py-2.5 px-6 text-sm disabled:opacity-50"
                >
                  {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>

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
