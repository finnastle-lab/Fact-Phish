import React, { useState, useEffect, useMemo } from 'react';
import { GameState, MobileTrial } from './types.ts';
import { SCENARIOS } from './constants.ts';
import Inbox from './components/Inbox.tsx';
import Win95Window from './components/Win95Window.tsx';
import EmailWindow from './components/EmailWindow.tsx';
import Overlay from './components/Overlay.tsx';
import CompleteScreen from './components/CompleteScreen.tsx';
import FishParticles from './components/FishParticles.tsx';

const App: React.FC = () => {
  // Treating screens >= 640px as Desktop/Tablet comparison experience
  const [isPhone, setIsPhone] = useState(window.innerWidth < 640);
  const [showReadme, setShowReadme] = useState(false);

  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem('phish_game_state_v4_mobile');
    if (saved) return JSON.parse(saved);
    return {
      view: 'DESKTOP', 
      activeScenarioId: null, 
      completedScenarioIds: [],
      results: {},
      attemptsByScenario: {}, 
      lastPick: null, 
      scenarioLayouts: {},
      readmeOpened: false,
      mobileTrials: [],
      currentMobileTrialIndex: 0
    };
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const handleResize = () => setIsPhone(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('phish_game_state_v4_mobile', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const activeScenario = useMemo(() => {
    if (isPhone && state.view === 'MOBILE_TRIAL') {
      const trial = state.mobileTrials[state.currentMobileTrialIndex];
      return SCENARIOS.find(s => s.id === trial?.scenarioId);
    }
    return SCENARIOS.find(s => s.id === state.activeScenarioId);
  }, [state.activeScenarioId, state.mobileTrials, state.currentMobileTrialIndex, state.view, isPhone]);

  const startPhoneGame = () => {
    const shuffled = [...SCENARIOS].sort(() => 0.5 - Math.random()).slice(0, 3);
    const trials: MobileTrial[] = shuffled.map(s => ({
      scenarioId: s.id,
      variantKey: Math.random() < 0.5 ? 'A' : 'B'
    }));
    setState(prev => ({
      ...prev,
      view: 'MOBILE_TRIAL',
      mobileTrials: trials,
      currentMobileTrialIndex: 0,
      results: {},
      completedScenarioIds: []
    }));
  };

  const handleSelectScenario = (id: string) => {
    if (state.completedScenarioIds.includes(id)) return;
    setState(prev => {
      const layout = prev.scenarioLayouts[id] || (Math.random() < 0.5 ? 'NORMAL' : 'FLIPPED');
      return { 
        ...prev, 
        activeScenarioId: id, 
        view: 'COMPARE', 
        scenarioLayouts: { ...prev.scenarioLayouts, [id]: layout } 
      };
    });
  };

  const handlePick = (picked: 'A' | 'B') => {
    if (!activeScenario || state.completedScenarioIds.includes(activeScenario.id)) return;
    const correct = picked === activeScenario.phishingVariant;
    setState(prev => ({
      ...prev,
      results: { ...prev.results, [activeScenario.id]: correct },
      completedScenarioIds: [...prev.completedScenarioIds, activeScenario.id],
      lastPick: { scenarioId: activeScenario.id, picked, correct },
      view: correct ? 'SUCCESS' : 'FAILURE'
    }));
  };

  const handleClassification = (choice: 'FACT' | 'PHISH') => {
    const trial = state.mobileTrials[state.currentMobileTrialIndex];
    if (!trial || !activeScenario) return;

    const isActuallyPhishing = trial.variantKey === activeScenario.phishingVariant;
    const correct = (choice === 'PHISH' && isActuallyPhishing) || (choice === 'FACT' && !isActuallyPhishing);

    setState(prev => ({
      ...prev,
      results: { ...prev.results, [trial.scenarioId]: correct },
      lastPick: { scenarioId: trial.scenarioId, picked: choice, correct },
      view: correct ? 'SUCCESS' : 'FAILURE'
    }));
  };

  const handleBackToInbox = () => {
    setState(prev => {
      if (isPhone) {
        const nextIndex = prev.currentMobileTrialIndex + 1;
        if (nextIndex >= 3) return { ...prev, view: 'COMPLETE' };
        return { ...prev, view: 'MOBILE_TRIAL', currentMobileTrialIndex: nextIndex };
      }
      const isGameFinished = prev.completedScenarioIds.length === SCENARIOS.length;
      return { ...prev, view: isGameFinished ? 'COMPLETE' : 'INBOX', activeScenarioId: null };
    });
  };

  const handleReset = () => {
    localStorage.removeItem('phish_game_state_v4_mobile');
    setState({ 
      view: 'DESKTOP', 
      activeScenarioId: null, 
      completedScenarioIds: [], 
      results: {},
      attemptsByScenario: {}, 
      lastPick: null, 
      scenarioLayouts: {},
      readmeOpened: false,
      mobileTrials: [],
      currentMobileTrialIndex: 0
    });
  };

  const layout = state.activeScenarioId ? state.scenarioLayouts[state.activeScenarioId] : 'NORMAL';

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden flex flex-col bg-[#6a7b88] select-none">
      <div className="absolute inset-0 z-0 bg-zinc-900 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>

      {/* Desktop Icons */}
      <div className="p-3 sm:p-6 z-10 flex flex-col gap-4 sm:gap-6 w-20 sm:w-28 shrink-0">
        <button 
          onClick={() => isPhone ? startPhoneGame() : setState(prev => ({ ...prev, view: 'INBOX' }))} 
          className="flex flex-col items-center gap-1 group outline-none"
        >
          <div className="w-10 h-10 sm:w-16 sm:h-16 bg-zinc-300 win95-shadow flex items-center justify-center text-2xl sm:text-4xl group-hover:bg-zinc-200 active:translate-y-0.5">✉</div>
          <span className="text-white text-[8px] sm:text-xs font-bold bg-zinc-900 px-2 py-0.5 rounded border border-white/20 uppercase tracking-tighter">Inbox</span>
        </button>

        <button onClick={() => setShowReadme(true)} className="flex flex-col items-center gap-1 group outline-none">
          <div className="w-10 h-10 sm:w-16 sm:h-16 bg-zinc-300 win95-shadow flex items-center justify-center text-2xl sm:text-4xl group-hover:bg-zinc-200 active:translate-y-0.5">📄</div>
          <span className="text-white text-[8px] sm:text-xs font-bold bg-zinc-900 px-2 py-0.5 rounded border border-white/20 uppercase tracking-tighter">ReadMe</span>
        </button>

        <button onClick={handleReset} className="flex flex-col items-center gap-1 group outline-none">
          <div className="w-10 h-10 sm:w-16 sm:h-16 bg-zinc-300 win95-shadow flex items-center justify-center text-2xl sm:text-4xl group-hover:bg-zinc-200 active:translate-y-0.5">💾</div>
          <span className="text-white text-[8px] sm:text-xs font-bold bg-zinc-900 px-2 py-0.5 rounded border border-white/20 uppercase tracking-tighter">Reset</span>
        </button>
      </div>

      {state.view === 'INBOX' && !isPhone && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-2 sm:p-8 bg-black/30 backdrop-blur-sm">
          <Inbox completedScenarioIds={state.completedScenarioIds} results={state.results} onSelectScenario={handleSelectScenario} onClose={() => setState(p => ({ ...p, view: 'DESKTOP' }))} />
        </div>
      )}

      {isPhone && state.view === 'MOBILE_TRIAL' && activeScenario && (
        <div className="absolute inset-x-0 top-0 bottom-12 z-20 flex flex-col bg-zinc-300 overflow-hidden">
           <div className="bg-zinc-800 text-white p-1 text-[10px] font-bold flex justify-between items-center h-8 shrink-0 px-3">
              <span className="truncate uppercase">TRIAL {state.currentMobileTrialIndex + 1}/3</span>
           </div>
           <div className="flex-1 overflow-hidden m-0.5 win95-shadow-inset bg-white flex flex-col min-h-0">
              <EmailWindow 
                id="MOBILE" 
                variant={state.mobileTrials[state.currentMobileTrialIndex].variantKey === 'A' ? activeScenario.variants.A : activeScenario.variants.B} 
                onClick={() => {}} 
                disabled={false}
              />
           </div>
           <div className="p-1.5 bg-zinc-200 flex gap-2 h-14 shrink-0 border-t-2 border-white win95-shadow z-30">
              <button onClick={() => handleClassification('FACT')} className="flex-1 bg-zinc-100 border-2 border-zinc-800 font-black text-black text-sm win95-shadow uppercase">Fact</button>
              <button onClick={() => handleClassification('PHISH')} className="flex-1 bg-zinc-900 border-2 border-zinc-100 font-black text-white text-sm win95-shadow uppercase">Phish</button>
           </div>
        </div>
      )}

      {!isPhone && (state.view === 'COMPARE' || state.view === 'SUCCESS' || state.view === 'FAILURE') && activeScenario && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-1 sm:p-4 bg-black/20 overflow-hidden">
          <Win95Window 
            title={`ANALYSIS: ${activeScenario.industry.toUpperCase()}`} 
            className="w-[99%] h-[98%] max-h-[920px] sm:w-[98%] sm:h-[95%]" 
            onClose={handleBackToInbox}
          >
            <div className="flex-1 flex flex-row gap-1 sm:gap-4 p-1 sm:p-4 bg-zinc-300 justify-center overflow-hidden min-h-0">
              <div className="flex-1 min-w-0 h-full flex flex-col">
                <EmailWindow 
                  id={layout === 'NORMAL' ? 'A' : 'B'} 
                  variant={layout === 'NORMAL' ? activeScenario.variants.A : activeScenario.variants.B} 
                  onClick={handlePick} 
                  disabled={state.view !== 'COMPARE'} 
                />
              </div>
              <div className="flex-1 min-w-0 h-full flex flex-col">
                <EmailWindow 
                  id={layout === 'NORMAL' ? 'B' : 'A'} 
                  variant={layout === 'NORMAL' ? activeScenario.variants.B : activeScenario.variants.A} 
                  onClick={handlePick} 
                  disabled={state.view !== 'COMPARE'} 
                />
              </div>
            </div>
          </Win95Window>
        </div>
      )}

      {(state.view === 'SUCCESS' || state.view === 'FAILURE') && (
        <Overlay 
          type={state.view} 
          reasons={activeScenario?.successReasons} 
          hints={activeScenario?.failureHints} 
          onAction={handleBackToInbox} 
        />
      )}
      
      {state.view === 'COMPLETE' && (
        <CompleteScreen results={state.results} onReset={handleReset} />
      )}

      {/* Taskbar */}
      <div className="mt-auto h-12 sm:h-14 bg-zinc-300 border-t-2 border-white win95-shadow z-[90] flex items-center px-2 sm:px-3 shrink-0">
        <button 
          onClick={() => isPhone ? startPhoneGame() : setState(prev => ({ ...prev, view: 'INBOX' }))}
          className="h-8 sm:h-10 px-4 sm:px-6 bg-zinc-300 win95-shadow font-black text-[10px] sm:text-lg border-2 border-zinc-100 flex items-center gap-1 sm:gap-2 active:translate-y-0.5"
        >
          <div className="w-3 h-3 sm:w-6 sm:h-6 bg-zinc-800 border border-white"></div>
          START
        </button>
        <div className="flex-1"></div>
        <div className="h-8 sm:h-10 px-2 sm:px-6 flex items-center bg-zinc-200 win95-shadow-inset font-mono text-[9px] sm:text-base font-bold text-zinc-800 border-l border-white shadow-inner">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default App;