import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAdminStats } from '../services/api';
import { Users, LayoutTemplate, AlertTriangle, Activity, Server, Database, Globe, ExternalLink, LogOut, User as UserIcon, Shield, ArrowLeft } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats(user.id);
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchStats();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderSidebar = () => (
    <aside className="w-64 bg-white dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-white/10 flex flex-col fixed inset-y-0 left-0 z-50 transition-colors duration-300">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2.5 group mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter">
            Intelli<span className="text-rose-500">Admin</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-2">
        <Link 
          to="/dashboard"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
      </nav>

      <div className="p-4 mt-auto border-t border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
          <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
            <UserIcon className="w-4 h-4 text-rose-500 dark:text-rose-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.email}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors font-bold"
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
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#030303] flex text-gray-900 dark:text-white font-sans transition-colors duration-300">
        {renderSidebar()}
        <main className="flex-1 ml-64 p-8 lg:p-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500" />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#030303] flex text-gray-900 dark:text-white font-sans transition-colors duration-300">
        {renderSidebar()}
        <main className="flex-1 ml-64 p-8 lg:p-12 flex flex-col items-center justify-center text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-gray-500 dark:text-gray-400">{error}</p>
        </main>
      </div>
    );
  }

  const chartData = [
    { name: 'Active Users', value: stats.total_users, color: '#f43f5e' }, // rose-500
    { name: 'Saved Projects', value: stats.total_saved_projects, color: '#10b981' } // emerald-500
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030303] flex text-gray-900 dark:text-white font-sans selection:bg-rose-500/30 transition-colors duration-300">
      {renderSidebar()}
      
      <main className="flex-1 ml-64 p-8 lg:p-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-black mb-2 flex items-center gap-3 text-gray-900 dark:text-white tracking-tight">
              <Activity className="w-8 h-8 text-rose-500" />
              System Overview
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Manage your backend, database, and system threats.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-rose-50 dark:bg-rose-500/10 rounded-xl">
                  <Users className="w-6 h-6 text-rose-500 dark:text-rose-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">Total Users</h3>
              </div>
              <p className="text-4xl font-black text-gray-900 dark:text-white">{stats.total_users}</p>
            </div>
            
            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
                  <LayoutTemplate className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">Saved Projects</h3>
              </div>
              <p className="text-4xl font-black text-gray-900 dark:text-white">{stats.total_saved_projects}</p>
            </div>

            <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-col justify-center shadow-sm dark:shadow-none">
               <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 text-center">System Distribution</h3>
               <div className="h-[120px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie
                       data={chartData}
                       cx="50%"
                       cy="50%"
                       innerRadius={40}
                       outerRadius={60}
                       paddingAngle={5}
                       dataKey="value"
                     >
                       {chartData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                     </Pie>
                     <Tooltip 
                       contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333', borderRadius: '8px' }}
                       itemStyle={{ color: '#fff' }}
                     />
                   </PieChart>
                 </ResponsiveContainer>
               </div>
            </div>
          </div>

          {/* External Infrastructure */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
              <Server className="w-5 h-5 text-rose-500" />
              Infrastructure Management
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-gray-300 dark:hover:border-rose-500/30 transition-all group shadow-sm dark:shadow-none">
                <div className="p-4 bg-black rounded-full group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">Frontend <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white transition-colors" /></h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage Vercel Deployment</p>
                </div>
              </a>
              
              <a href="https://railway.app" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-gray-300 dark:hover:border-purple-500/30 transition-all group shadow-sm dark:shadow-none">
                <div className="p-4 bg-purple-100 dark:bg-purple-500/10 rounded-full group-hover:scale-110 transition-transform">
                  <Server className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">Backend <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white transition-colors" /></h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage Railway FastAPI</p>
                </div>
              </a>

              <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-gray-300 dark:hover:border-emerald-500/30 transition-all group shadow-sm dark:shadow-none">
                <div className="p-4 bg-emerald-100 dark:bg-emerald-500/10 rounded-full group-hover:scale-110 transition-transform">
                  <Database className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">Database <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white transition-colors" /></h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage Supabase Auth & DB</p>
                </div>
              </a>
            </div>
          </div>

          {/* Threat Logs */}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:shadow-none">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Recent System Threats & Logs
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
                <thead className="text-xs uppercase bg-gray-50 dark:bg-black/50 text-gray-500 border-b border-gray-200 dark:border-white/10">
                  <tr>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Event Type</th>
                    <th className="px-4 py-3">User ID</th>
                    <th className="px-4 py-3">IP Address</th>
                    <th className="px-4 py-3">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recent_logs && stats.recent_logs.length > 0 ? (
                    stats.recent_logs.map((log) => (
                      <tr key={log.id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                        <td className="px-4 py-4">{new Date(log.created_at).toLocaleString()}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${log.event_type === 'fake_input' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
                            {log.event_type}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-mono text-xs truncate max-w-[150px]">{log.user_id || 'Anonymous'}</td>
                        <td className="px-4 py-4 font-mono">{log.ip_address}</td>
                        <td className="px-4 py-4 truncate max-w-[200px]">{JSON.stringify(log.details)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                        No recent threats or logs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
