
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import GuestForm from './components/GuestForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { Settings, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

enum View {
  WELCOME = 'welcome',
  VOTING = 'voting',
  SUCCESS = 'success',
  ADMIN_LOGIN = 'admin_login',
  ADMIN_DASHBOARD = 'admin_dashboard'
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.WELCOME);

  useEffect(() => {
    if (currentView === View.SUCCESS) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#FFD1DC', '#D1EAFF', '#B0E0E6']
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#FFD1DC', '#D1EAFF', '#B0E0E6']
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [currentView]);

  const handleStart = () => {
    setCurrentView(View.VOTING);
  };

  const handleVoteComplete = () => {
    setCurrentView(View.SUCCESS);
  };

  const handleBackToLogin = () => {
    setCurrentView(View.WELCOME);
  };

  const renderView = () => {
    switch (currentView) {
      case View.WELCOME:
        return (
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="bg-white rounded-3xl p-10 shadow-xl text-center border-t-8 border-pink-200">
              <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-pink-300 fill-pink-300" />
              </div>
              <h2 className="text-2xl font-bold text-gray-700 mb-4">You're Invited!</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                We're so happy to have you here. Please join our celebration by casting your vote for the baby's gender and suggesting a name!
              </p>
              
              <button
                onClick={handleStart}
                className="w-full py-4 px-6 bg-gradient-to-r from-pink-400 to-blue-400 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                Join the Fun!
              </button>
            </div>

            <button 
              onClick={() => setCurrentView(View.ADMIN_LOGIN)}
              className="w-full py-2 text-gray-400 text-xs flex items-center justify-center gap-2 hover:text-gray-600 transition-colors"
            >
              <Settings className="w-3 h-3" /> Organizer Login
            </button>
          </div>
        );
      
      case View.VOTING:
        return <GuestForm onComplete={handleVoteComplete} onBack={handleBackToLogin} />;

      case View.SUCCESS:
        return (
          <div className="bg-white rounded-3xl p-10 shadow-2xl text-center border-t-8 border-green-200 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-3xl font-pacifico text-gray-800 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Your guess and name suggestion have been added to our celebration! We can't wait to share the big news with you.
            </p>
            <button 
              onClick={handleBackToLogin}
              className="px-8 py-3 bg-gray-100 text-gray-600 rounded-full font-bold hover:bg-gray-200 transition-colors"
            >
              Back to Start
            </button>
          </div>
        );

      case View.ADMIN_LOGIN:
        return (
          <AdminLogin 
            onLogin={(success) => success && setCurrentView(View.ADMIN_DASHBOARD)} 
            onBack={handleBackToLogin}
          />
        );

      case View.ADMIN_DASHBOARD:
        return <AdminDashboard onLogout={handleBackToLogin} />;

      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case View.ADMIN_DASHBOARD: return "Organizer Dashboard";
      case View.ADMIN_LOGIN: return "Admin Access";
      case View.VOTING: return "Join the Celebration";
      case View.SUCCESS: return "Much Love!";
      default: return "Our Baby Shower";
    }
  };

  return (
    <Layout title={getTitle()}>
      {renderView()}
    </Layout>
  );
};

export default App;
