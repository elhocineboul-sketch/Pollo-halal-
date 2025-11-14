import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Locale } from '../types';
import { translations, getDirection } from './locales';

// Define the shape of the locale context
interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, args?: Record<string, string | number>) => string;
}

// Create the context with a default (null) value
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Props for LocaleProvider
interface LocaleProviderProps {
  children: ReactNode;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('es'); // Default to Spanish

  useEffect(() => {
    // Update HTML lang and dir attributes
    document.documentElement.lang = locale;
    document.documentElement.dir = getDirection(locale);
  }, [locale]);

  // Translation function
  const t = (key: string, args?: Record<string, string | number>): string => {
    let translation = translations[locale][key] || key; // Fallback to key if not found

    if (args) {
      for (const argKey in args) {
        translation = translation.replace(`{${argKey}}`, String(args[argKey]));
      }
    }
    return translation;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

// Custom hook to use the locale context
export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};

// Custom hook to use translations
export const useTranslation = () => {
  const { t } = useLocale();
  return t;
};
