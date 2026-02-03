import React, { useState } from 'react';
import Win95Window from './Win95Window';
import FishParticles from './FishParticles';
import BillyBass from './BillyBass';

interface OverlayProps {
  type: 'SUCCESS' | 'FAILURE';
  reasons?: string[];
  hints?: string[];
  onAction: () => void;
  onRetry?: () => void; // Keeping prop for compatibility but not using it
}

const Overlay: React.FC<OverlayProps> = ({ type, reasons, hints, onAction }) => {
  const isSuccess = type === 'SUCCESS';
  
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[150] p-4">
      {isSuccess && <FishParticles />}
      <Win95Window title={isSuccess ? "SYSTEM MESSAGE - ANALYSIS RECORDED" : "SECURITY ALERT - BREACH LOGGED"} width="95%" className="max-w-[600px]">
        <div className="p-4 sm:p-8 flex flex-col items-center text-center">
          <div className="mb-6"> 
            {isSuccess ? <BillyBass /> : <div className="text-6xl">⚠️</div>} 
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-black uppercase tracking-tighter">
            {isSuccess ? "Phishing Neutralised." : "Threat Missed."}
          </h2>
          <div className="bg-white win95-shadow-inset p-4 sm:p-5 w-full mb-8 text-left border border-zinc-400 max-h-[40vh] overflow-y-auto">
            {isSuccess ? (
              <ul className="list-disc list-outside ml-5 text-sm sm:text-base font-bold text-black space-y-3">
                {reasons?.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            ) : (
              <div className="text-sm sm:text-base text-black font-bold leading-relaxed">
                <p className="mb-4">Simulation concluded. You failed to identify the phishing attempt.</p>
                <div className="bg-zinc-100 p-2 border-l-4 border-zinc-800">
                   <p className="underline mb-1">Expert Analysis:</p>
                   {hints?.[0] || "Critical headers were overlooked. Always verify the sender domain."}
                </div>
              </div>
            )}
          </div>
          <div className="w-full">
            <button 
              onClick={onAction} 
              className="w-full py-4 bg-zinc-900 text-white font-bold text-base sm:text-lg win95-shadow hover:bg-black uppercase tracking-widest"
            >
              Back to Inbox
            </button>
          </div>
        </div>
      </Win95Window>
    </div>
  );
};

export default Overlay;