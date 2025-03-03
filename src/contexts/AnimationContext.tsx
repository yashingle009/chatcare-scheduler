
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AnimationContextType {
  pageTransition: boolean;
  setPageTransition: (value: boolean) => void;
  pageVariant: string;
  setPageVariant: (value: string) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pageTransition, setPageTransition] = useState(false);
  const [pageVariant, setPageVariant] = useState('default');

  return (
    <AnimationContext.Provider
      value={{
        pageTransition,
        setPageTransition,
        pageVariant,
        setPageVariant
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};
