
export type GameView = 'DESKTOP' | 'INBOX' | 'COMPARE' | 'SUCCESS' | 'FAILURE' | 'COMPLETE' | 'MOBILE_TRIAL';

export interface EmailVariant {
  templateUrl: string;
  fromName: string;
  fromEmail: string;
  subject: string;
  textAlternative: string;
}

export interface Scenario {
  id: string;
  industry: string;
  inboxFromName: string;
  inboxSubject: string;
  inboxPreview: string;
  variants: {
    A: EmailVariant;
    B: EmailVariant;
  };
  phishingVariant: 'A' | 'B';
  successReasons: string[];
  failureHints: string[];
}

export interface MobileTrial {
  scenarioId: string;
  variantKey: 'A' | 'B';
}

export interface GameState {
  view: GameView;
  activeScenarioId: string | null;
  completedScenarioIds: string[];
  results: Record<string, boolean>; // true = correct, false = incorrect
  attemptsByScenario: Record<string, number>;
  lastPick: { scenarioId: string; picked: 'A' | 'B' | 'FACT' | 'PHISH'; correct: boolean } | null;
  scenarioLayouts: Record<string, 'NORMAL' | 'FLIPPED'>;
  readmeOpened: boolean;
  mobileTrials: MobileTrial[];
  currentMobileTrialIndex: number;
}
