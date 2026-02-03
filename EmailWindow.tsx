import React from 'react';
import { EmailVariant } from '../types';

interface EmailWindowProps {
  variant: EmailVariant;
  id: 'A' | 'B' | 'MOBILE';
  onClick: (id: 'A' | 'B') => void;
  disabled?: boolean;
}

const EmailWindow: React.FC<EmailWindowProps> = ({ variant, id, onClick, disabled }) => {
  const isMobile = id === 'MOBILE';
  
  return (
    <div 
      className={`flex flex-col bg-white win95-shadow-inset h-full w-full group transition-all overflow-hidden ${disabled ? 'opacity-50 grayscale' : ''} ${id !== 'MOBILE' ? 'cursor-pointer hover:ring-2 hover:ring-zinc-800' : ''}`}
      onClick={() => !disabled && id !== 'MOBILE' && onClick(id as 'A' | 'B')}
    >
      {/* Header section - Extremely compact to preserve vertical space */}
      <div className="p-1 sm:p-2 border-b border-zinc-300 bg-zinc-50 text-[7px] sm:text-[11px] shrink-0">
        <div className="flex items-baseline gap-1 leading-tight">
          <span className="font-bold w-6 sm:w-10 shrink-0 text-zinc-500 uppercase text-[6px] sm:text-[8px]">From:</span> 
          <span className="text-zinc-900 font-medium truncate"><strong>{variant.fromName}</strong> &lt;{variant.fromEmail}&gt;</span>
        </div>
        <div className="flex items-baseline gap-1 leading-tight">
          <span className="font-bold w-6 sm:w-10 shrink-0 text-zinc-500 uppercase text-[6px] sm:text-[8px]">To:</span> 
          <span className="text-zinc-700 truncate italic">agent@cyber-secure.n...</span>
        </div>
        <div className="mt-0.5 pt-0.5 border-t border-zinc-200 flex items-baseline gap-1 leading-tight">
          <span className="font-bold w-6 sm:w-10 shrink-0 text-zinc-500 uppercase text-[6px] sm:text-[8px]">Subj:</span> 
          <strong className="text-black text-[9px] sm:text-xs truncate">{variant.subject}</strong>
        </div>
      </div>

      {/* Content section - Strictly forced to scale within available space */}
      <div className="flex-1 bg-[#ffffff] p-0.5 sm:p-1 flex items-center justify-center overflow-hidden min-h-0">
        <img 
          src={variant.templateUrl} 
          alt={variant.textAlternative} 
          className="max-h-full max-w-full object-contain select-none pointer-events-none"
        />
      </div>

      {/* Identification Button - Compact footer */}
      {!isMobile && (
        <div className="p-1 sm:p-2 bg-zinc-100 border-t border-zinc-300 text-center shrink-0">
          <button 
            className="w-full sm:w-auto px-3 sm:px-5 py-1 sm:py-2 bg-zinc-900 text-white font-black text-[8px] sm:text-[10px] win95-shadow hover:bg-black active:bg-zinc-700 disabled:bg-zinc-400 uppercase tracking-tighter border border-zinc-100" 
            disabled={disabled}
          >
            PHISHING ATTEMPT
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailWindow;