import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface WizardData {
  profileId: string;
  profileLabel: string;
  peopleCount: number;
  addons: string[];
  context: 'cabin' | 'van' | 'tinyhome' | 'boat' | 'other' | 'backpacker';
}

export interface CalculatedNeeds {
  dailyKWh: number;
  peakKw: number;
}

interface WizardContextType {
  isOpen: boolean;
  openWizard: () => void;
  closeWizard: () => void;
  wizardData: WizardData | null;
  calculatedNeeds: CalculatedNeeds | null;
  setWizardResults: (data: WizardData, needs: CalculatedNeeds) => void;
  setWizardData: React.Dispatch<React.SetStateAction<WizardData | null>>;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [wizardData, setWizardData] = useState<WizardData | null>(null);
  const [calculatedNeeds, setCalculatedNeeds] = useState<CalculatedNeeds | null>(null);

  const openWizard = () => setIsOpen(true);
  const closeWizard = () => setIsOpen(false);

  const setWizardResults = (data: WizardData, needs: CalculatedNeeds) => {
    setWizardData(data);
    setCalculatedNeeds(needs);
  };

  return (
    <WizardContext.Provider value={{ isOpen, openWizard, closeWizard, wizardData, calculatedNeeds, setWizardResults, setWizardData }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
}
