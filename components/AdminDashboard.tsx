
import React, { useMemo, useState } from 'react';
import { getGuestEntries, exportToJsonFile, clearAllEntries } from '../services/storage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Download, Trash2, Users, Baby, LogOut, AlertTriangle, X } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
  const entries = useMemo(() => getGuestEntries(), []);
  
  const stats = useMemo(() => {
    const boyCount = entries.filter(e => e.genderVote === 'boy').length;
    const girlCount = entries.filter(e => e.genderVote === 'girl').length;
    return [
      { name: 'Team Boy', count: boyCount, color: '#93C5FD' },
      { name: 'Team Girl', count: girlCount, color: '#F9A8D4' }
    ];
  }, [entries]);

  const sortedSuggestions = useMemo(() => {
    return [...entries].sort((a, b) => a.suggestedBabyName.localeCompare(b.suggestedBabyName));
  }, [entries]);

  const handleClear = () => {
    clearAllEntries();
    setIsConfirmingClear(false);
    window.location.reload();
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-20">
      {/* Custom Confirmation Modal */}
      {isConfirmingClear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Everything?</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              This action is <span className="text-red-600 font-bold uppercase">permanent</span> and <span className="text-red-600 font-bold uppercase">irreversible</span>. All guest votes and name suggestions will be deleted forever.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleClear}
                className="w-full py-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
              >
                Yes, Delete All Data
              </button>
              <button
                onClick={() => setIsConfirmingClear(false)}
                className="w-full py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
              >
                Cancel, Keep Data
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          <button onClick={onLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
            <LogOut className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-xs text-blue-600 uppercase font-bold">Total Guests</p>
              <p className="text-2xl font-bold text-blue-800">{entries.length}</p>
            </div>
          </div>
          <div className="bg-pink-50 p-4 rounded-2xl border border-pink-100 flex items-center gap-3">
            <Baby className="w-8 h-8 text-pink-400" />
            <div>
              <p className="text-xs text-pink-600 uppercase font-bold">Votes Cast</p>
              <p className="text-2xl font-bold text-pink-800">{entries.length}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-700 mb-4">Voting Trends</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={60}>
                  {stats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={exportToJsonFile}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors shadow-lg"
          >
            <Download className="w-4 h-4" /> Export JSON
          </button>
          <button
            onClick={() => setIsConfirmingClear(true)}
            className="px-4 py-3 border-2 border-red-100 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all active:scale-95"
            title="Clear all data"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Baby Name Suggestions (A-Z)</h3>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-500 font-bold uppercase tracking-widest">{entries.length} Entries</span>
        </div>
        <div className="space-y-3">
          {sortedSuggestions.length > 0 ? (
            sortedSuggestions.map((entry) => (
              <div key={entry.id} className="p-4 rounded-2xl border border-gray-100 flex justify-between items-center group hover:bg-gray-50 transition-all hover:border-blue-100">
                <div>
                  <p className="text-lg font-bold text-gray-800">{entry.suggestedBabyName}</p>
                  <p className="text-sm text-gray-500">suggested by <span className="text-gray-700 font-medium">{entry.guestName}</span></p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${entry.genderVote === 'boy' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>
                  {entry.genderVote}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-400 italic bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
              No suggestions yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
