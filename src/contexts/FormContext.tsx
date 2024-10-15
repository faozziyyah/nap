// src/contexts/FormContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormContextType {
  formValues: any;
  setFormValues: (values: any) => void;
}

const FormContext = createContext<FormContextType | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formValues, setFormValues] = useState({});

  console.log('FormProvider is rendering');

  return (
    <FormContext.Provider value={{ formValues, setFormValues }}>
      {children}
    </FormContext.Provider>
  );
};
