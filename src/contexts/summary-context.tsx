import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useContext,
} from 'react';

interface SummaryContextType {
  summaryData: any;
  setSummaryData: (SummaryData: string) => void;
}

export const SummaryContext = createContext<SummaryContextType | undefined>(
  undefined,
);

interface SummaryProviderProps {
  children: ReactNode;
}

export const SummaryProvider: FC<SummaryProviderProps> = ({ children }) => {
  const [summaryData, setSummaryData] = useState<any>(null);

  return (
    <SummaryContext.Provider value={{ summaryData, setSummaryData }}>
      {children}
    </SummaryContext.Provider>
  );
};

export const useSummaryContext = () => {
  const context = useContext(SummaryContext);
  if (!context) {
    throw new Error('useSummaryContext must be used within a SummaryProvider');
  }
  return context;
};
