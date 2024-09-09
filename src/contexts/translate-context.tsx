import React, { createContext, useContext, useState } from 'react';

interface TranslateContextProps {
  translateText: string;
  setTranslatedText: (text: string) => void;
  articleAudio: string;
  setArticleAudio: (audio: string) => void;
}

const TranslateContext = createContext<TranslateContextProps | undefined>(
  undefined,
);

export const TranslateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [translateText, setTranslatedText] = useState<any>('');
  const [articleAudio, setArticleAudio] = useState<any>('');

  return (
    <TranslateContext.Provider
      value={{
        translateText,
        setTranslatedText,
        articleAudio,
        setArticleAudio,
      }}
    >
      {children}
    </TranslateContext.Provider>
  );
};

export const useTranslate = () => {
  const context = useContext(TranslateContext);
  if (!context) {
    throw new Error('useTranslate must be used within a TranslateProvider');
  }
  return context;
};
