
import React from 'react';
import Win95Window from './Win95Window';
import { SCENARIOS } from '../constants';

interface InboxProps {
  completedScenarioIds: string[];
  results: Record<string, boolean>;
  onSelectScenario: (id: string) => void;
  onClose: () => void;
}

const Inbox: React.FC<InboxProps> = ({ completedScenarioIds, results, onSelectScenario, onClose }) => {
  return (
    <Win95Window title="Inbox - Classic Mail" width="100%" draggable={true} className="max-w-[1000px] h-[650px]" onClose={onClose}>
      <div className="flex h-full overflow-hidden bg-zinc-200">
        <div className="hidden sm:flex w-52 border-r border-zinc-400 pr-2 flex-col gap-1 py-2 bg-zinc-300">
          <div className="bg-zinc-900 text-white px-4 py-2 font-bold text-sm">Inbox</div>
          <div className="px-4 py-2 text-zinc-700 font-bold text-sm hover:bg-zinc-200 cursor-default">Sent Items</div>
          <div className="px-4 py-2 text-zinc-700 font-bold text-sm hover:bg-zinc-200 cursor-default">Deleted</div>
        </div>
        <div className="flex-1 flex flex-col bg-white win95-shadow-inset overflow-hidden min-w-0 m-1">
          <div className="flex border-b-2 border-zinc-400 bg-zinc-200 text-sm font-bold text-black">
            <div className="w-12 py-3 text-center border-r border-zinc-300">!</div>
            <div className="flex-1 px-4 py-3 border-r border-zinc-300 uppercase">Sender</div>
            <div className="flex-[2] px-4 py-3 uppercase">Subject Line</div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {SCENARIOS.map((s) => {
              const isCompleted = completedScenarioIds.includes(s.id);
              const isCorrect = results[s.id] === true;
              
              return (
                <div 
                  key={s.id} 
                  onClick={() => !isCompleted && onSelectScenario(s.id)} 
                  className={`flex border-b border-zinc-200 h-20 items-center transition-colors ${isCompleted ? 'bg-zinc-50 cursor-default opacity-80' : 'hover:bg-zinc-100 cursor-pointer'}`}
                >
                  <div className="w-12 flex justify-center text-xl">
                    {!isCompleted ? '🔴' : (isCorrect ? '✅' : '❌')}
                  </div>
                  <div className={`flex-1 px-4 truncate font-bold text-base ${isCompleted ? 'text-zinc-500' : 'text-black'}`}>{s.inboxFromName}</div>
                  <div className={`flex-[2] px-4 truncate text-base ${isCompleted ? 'text-zinc-500 italic' : 'text-zinc-900 font-medium'}`}>{s.inboxSubject}</div>
                  {isCompleted && (
                    <div className="px-4 text-xs font-black uppercase tracking-widest text-zinc-400 mr-2">Processed</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Win95Window>
  );
};

export default Inbox;
