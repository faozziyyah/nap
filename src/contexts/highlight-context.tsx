import React, { createContext, useContext, useState } from 'react';

interface HighlightContextProps {
  selectedText: string;
  setSelectedText: (text: string) => void;
}

const HighlightContext = createContext<HighlightContextProps | undefined>(
  undefined,
);

export const HighlightProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedText, setSelectedText] = useState('');

  return (
    <HighlightContext.Provider value={{ selectedText, setSelectedText }}>
      {children}
    </HighlightContext.Provider>
  );
};

export const useHighlight = () => {
  const context = useContext(HighlightContext);
  if (!context) {
    throw new Error('useHighlight must be used within a HighlightProvider');
  }
  return context;
};
