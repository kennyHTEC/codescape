import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { themeColors, type ThemeColors, type ThemeMode } from '../theme/colors';

export interface ThemeContextValue {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>('dark');

  const value = useMemo<ThemeContextValue>(() => {
    const toggleTheme = (): void => {
      setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return {
      theme,
      colors: themeColors[theme],
      toggleTheme,
      setTheme,
    };
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('ThemeProviderMissingError: useTheme must be used within ThemeProvider');
  }

  return context;
}
