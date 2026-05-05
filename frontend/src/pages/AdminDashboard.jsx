import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { getAdminStats } from '../services/api';
import { Users, LayoutTemplate, AlertTriangle, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center">
        <Navbar />
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center p-6 text-center">
        <Navbar />
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  const chartData = [
    { name: 'Active Users', value: stats.total_users, color: '#6366f1' },
    { name: 'Saved Projects', value: stats.total_saved_projects, color: '#10b981' }
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-indigo-500/30 font-sans">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-black mb-2 flex items-center gap-3">
            <Activity className="w-8 h-8 text-indigo-400" />
            System Overview
          </h1>
          <p className="text-gray-400">Manage your backend, database, and system threats.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-indigo-500/10 rounded-xl">
                <Users className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-300">Total Users</h3>
            </div>
            <p className="text-4xl font-black text-white">{stats.total_users}</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <LayoutTemplate className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-300">Saved Projects</h3>
            </div>
            <p className="text-4xl font-black text-white">{stats.total_saved_projects}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-center">
             <h3 className="text-sm font-bold text-gray-400 mb-4 text-center">System Distribution</h3>
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

        {/* Threat Logs */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Recent System Threats & Logs
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="text-xs uppercase bg-black/50 text-gray-500 border-b border-white/10">
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
                    <tr key={log.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="px-4 py-4">{new Date(log.created_at).toLocaleString()}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${log.event_type === 'fake_input' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
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
      </main>

      <Footer />
    </div>
  );
}
