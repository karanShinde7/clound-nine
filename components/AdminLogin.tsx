
import React, { useState } from 'react';
import { Lock } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'adminRam') {
      onLogin(true);
    } else {
      setError('Invalid credentials. Hint: admin/adminRam');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border-t-8 border-purple-200">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-purple-50 rounded-full">
          <Lock className="w-8 h-8 text-purple-400" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Organizer Login</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:outline-none"
            placeholder="admin"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-200 focus:outline-none"
            placeholder="••••••••"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        
        <button
          type="submit"
          className="w-full py-4 bg-purple-500 text-white rounded-full font-bold shadow-lg hover:bg-purple-600 transition-colors"
        >
          Access Dashboard
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full py-2 text-gray-400 text-sm"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
