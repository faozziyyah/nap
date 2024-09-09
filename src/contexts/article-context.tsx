import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useContext,
} from 'react';

interface ErrorMessage {
  error?: string;
}

interface ArticleContextType {
  articleData: any;
  setArticleData: (articleData: any) => void;
  errorMessage: ErrorMessage;
  setErrorMessage: (errorMessage: ErrorMessage) => void;
  type: string;
  setType: (type: string) => void;
}

export const ArticleContext = createContext<ArticleContextType | undefined>(
  undefined,
);

interface ArticleProviderProps {
  children: ReactNode;
}

export const ArticleProvider: FC<ArticleProviderProps> = ({ children }) => {
  const [articleData, setArticleData] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({});
  const [type, setType] = useState<any>('');

  return (
    <ArticleContext.Provider
      value={{
        articleData,
        setArticleData,
        errorMessage,
        setErrorMessage,
        type,
        setType,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticleContext = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticleContext must be used within a ArticleProvider');
  }
  return context;
};
