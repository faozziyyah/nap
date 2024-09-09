import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useContext,
} from 'react';

interface UrlContextType {
  url: string;
  setUrl: (url: string) => void;
}

export const UrlContext = createContext<UrlContextType | undefined>(undefined);

interface UrlProviderProps {
  children: ReactNode;
}

export const UrlProvider: FC<UrlProviderProps> = ({ children }) => {
  const [url, setUrl] = useState<string>('');

  return (
    <UrlContext.Provider value={{ url, setUrl }}>
      {children}
    </UrlContext.Provider>
  );
};

export const useUrlContext = () => {
  const context = useContext(UrlContext);
  if (!context) {
    throw new Error('useUrlContext must be used within a UrlProvider');
  }
  return context;
};
