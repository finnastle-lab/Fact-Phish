import React, { useState } from 'react';
import Win95Window from './Win95Window.tsx';
import FishParticles from './FishParticles.tsx';
import BillyBass from './BillyBass.tsx';
import { SCENARIOS } from '../constants.ts';

interface CompleteScreenProps {
  results: Record<string, boolean>;
  onReset: () => void;
}

const CompleteScreen: React.FC<CompleteScreenProps> = ({ results, onReset }) => {
  const score = Object.values(results).filter(Boolean).length;
  const total = Object.keys(results).length || SCENARIOS.length;
  const percentage = Math.round((score / total) * 100);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-[#008080] flex items-center justify-center z-[100] p-1 sm:p-4 overflow-hidden">
      <FishParticles continuous={true} />
      
      <Win95Window 
        title="CERTIFICATION COMPLETE" 
        width="98%" 
        className="max-w-[480px] z-[120] relative max-h-[95dvh] flex flex-col"
      >
        <div className="p-2 sm:p-6 text-center flex flex-col items-center bg-zinc-200 overflow-y-auto scrollbar-hide flex-1">
          <div className="mb-2 scale-[0.4] sm:scale-75 origin-center shrink-0 h-16 sm:h-auto flex items-center">
            <BillyBass />
          </div>
          
          <h1 className="text-lg sm:text-2xl font-black mb-1.5 text-black tracking-tighter uppercase shrink-0">Simulation Ended.</h1>
          
          <div className="bg-white p-2 sm:p-3 win95-shadow-inset w-full mb-3 border border-zinc-400 shrink-0">
             <p className="text-zinc-600 font-bold uppercase text-[8px] sm:text-xs mb-0.5">Final Accuracy</p>
             <div className="text-2xl sm:text-4xl font-black text-black leading-none mb-1">{score} / {total}</div>
             <p className="text-zinc-900 font-bold text-xs sm:text-base">{percentage}% Correct</p>
          </div>
          
          {!submitted ? (
            <div className="w-full bg-zinc-100 p-2 sm:p-3 border-2 border-zinc-400 mb-3 shrink-0">
               <p className="text-[9px] sm:text-[10px] font-black text-zinc-700 uppercase mb-1.5">Mailing List Enrollment:</p>
               <form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
                 <input 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="agent@secure.net"
                   className="w-full px-2 py-1 bg-white border border-zinc-400 win95-shadow-inset text-black text-xs outline-none font-mono"
                   required
                 />
                 <button className="bg-zinc-800 text-white px-3 py-1 font-black uppercase text-[9px] sm:text-[10px] win95-shadow active:translate-y-0.5 border border-zinc-500">Subscribe</button>
               </form>
            </div>
          ) : (
            <div className="w-full bg-zinc-800 text-white p-2 border-2 border-white mb-3 uppercase text-[9px] font-black animate-pulse shrink-0">
               Access Granted.
            </div>
          )}
          
          <button 
            onClick={onReset} 
            className="w-full px-6 py-2.5 sm:py-3.5 bg-zinc-900 text-white font-black text-sm sm:text-lg win95-shadow hover:bg-black uppercase tracking-widest border border-zinc-100 shrink-0"
          >
            Reset Terminal
          </button>
        </div>
      </Win95Window>
    </div>
  );
};

export default CompleteScreen;