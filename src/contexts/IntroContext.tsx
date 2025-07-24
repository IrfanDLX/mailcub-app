import React, { createContext, useContext, useState, useEffect } from 'react';

interface IntroContextType {
  hasSeenIntro: (screen: string) => boolean;
  markIntroAsSeen: (screen: string) => void;
  resetIntros: () => void;
}

const IntroContext = createContext<IntroContextType | undefined>(undefined);

export const useIntro = () => {
  const context = useContext(IntroContext);
  if (context === undefined) {
    throw new Error('useIntro must be used within an IntroProvider');
  }
  return context;
};

export const IntroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [seenIntros, setSeenIntros] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('mailcub-seen-intros');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem('mailcub-seen-intros', JSON.stringify(Array.from(seenIntros)));
  }, [seenIntros]);

  const hasSeenIntro = (screen: string) => {
    return seenIntros.has(screen);
  };

  const markIntroAsSeen = (screen: string) => {
    setSeenIntros(prev => new Set([...prev, screen]));
  };

  const resetIntros = () => {
    setSeenIntros(new Set());
    localStorage.removeItem('mailcub-seen-intros');
  };

  return (
    <IntroContext.Provider value={{ hasSeenIntro, markIntroAsSeen, resetIntros }}>
      {children}
    </IntroContext.Provider>
  );
};