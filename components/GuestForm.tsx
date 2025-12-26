
import React, { useState } from 'react';
import { saveGuestEntry } from '../services/storage';
import { Gender } from '../types';
import { Check, Send, ArrowLeft } from 'lucide-react';

interface GuestFormProps {
  onComplete: () => void;
  onBack: () => void;
}

const GuestForm: React.FC<GuestFormProps> = ({ onComplete, onBack }) => {
  const [guestName, setGuestName] = useState('');
  const [genderVote, setGenderVote] = useState<Gender | null>(null);
  const [babyName, setBabyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!genderVote || !guestName || !babyName) return;

    setIsSubmitting(true);
    
    // Simulate server delay and ensure data is stored in localStorage
    setTimeout(() => {
      saveGuestEntry({
        id: crypto.randomUUID(),
        guestName,
        genderVote,
        suggestedBabyName: babyName,
        timestamp: Date.now()
      });
      setIsSubmitting(false);
      onComplete();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors font-medium mb-2"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Welcome
      </button>

      <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-t-8 border-blue-100">
          <label className="block text-xl font-bold text-gray-700 mb-4">Hello Guest! What's your name?</label>
          <input
            required
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Enter your name here..."
            className="w-full p-4 rounded-2xl bg-blue-50/50 border-2 border-transparent focus:border-blue-300 focus:outline-none text-lg text-gray-700 transition-all"
          />
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-gray-700 mb-6 text-center">Cast Your Vote: Boy or Girl?</h2>
          <div className="grid grid-cols-2 gap-6">
            <button
              type="button"
              onClick={() => setGenderVote('boy')}
              className={`relative group flex flex-col items-center p-6 rounded-3xl transition-all border-4 hover:shadow-lg hover:scale-[1.02] hover:opacity-100 active:scale-95 ${
                genderVote === 'boy' 
                  ? 'border-blue-400 bg-blue-50 scale-105 opacity-100 grayscale-0 shadow-md' 
                  : 'border-transparent bg-gray-50 grayscale opacity-70'
              }`}
            >
              <div className="w-24 h-24 mb-4 rounded-full bg-blue-200 flex items-center justify-center text-5xl shadow-inner group-hover:bg-blue-300 transition-colors">
                 👶
              </div>
              <span className="font-bold text-blue-600 text-lg">It's a Boy!</span>
              {genderVote === 'boy' && (
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1 shadow-lg">
                  <Check className="w-5 h-5" />
                </div>
              )}
            </button>

            <button
              type="button"
              onClick={() => setGenderVote('girl')}
              className={`relative group flex flex-col items-center p-6 rounded-3xl transition-all border-4 hover:shadow-lg hover:scale-[1.02] hover:opacity-100 active:scale-95 ${
                genderVote === 'girl' 
                  ? 'border-pink-400 bg-pink-50 scale-105 opacity-100 grayscale-0 shadow-md' 
                  : 'border-transparent bg-gray-50 grayscale opacity-70'
              }`}
            >
              <div className="w-24 h-24 mb-4 rounded-full bg-pink-200 flex items-center justify-center text-5xl shadow-inner group-hover:bg-pink-300 transition-colors">
                 👶‍♀️
              </div>
              <span className="font-bold text-pink-600 text-lg">It's a Girl!</span>
              {genderVote === 'girl' && (
                <div className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full p-1 shadow-lg">
                  <Check className="w-5 h-5" />
                </div>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl border-b-8 border-pink-100">
          <label className="block text-xl font-bold text-gray-700 mb-4">Any name suggestions for our baby?</label>
          <input
            required
            type="text"
            value={babyName}
            onChange={(e) => setBabyName(e.target.value)}
            placeholder="A cute name..."
            className="w-full p-4 rounded-2xl bg-pink-50/50 border-2 border-transparent focus:border-pink-300 focus:outline-none text-lg text-gray-700 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !genderVote || !guestName || !babyName}
          className="w-full py-5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-pink-200/50 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Sending Love...</span>
          ) : (
            <>
              Submit My Guess <Send className="w-6 h-6" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default GuestForm;
