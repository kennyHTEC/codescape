import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Appearance } from 'react-native';

import { themeColors, type ThemeMode } from '../theme/colors';

interface ThemeContextValue {
  mode: ThemeMode;
  colors: typeof themeColors.light;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): ThemeMode {
  return Appearance.getColorScheme() === 'light' ? 'light' : 'dark';
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(getSystemTheme);

  const toggleTheme = (): void => {
    setMode((currentMode) => (currentMode === 'dark' ? 'light' : 'dark'));
  };

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      colors: themeColors[mode],
      toggleTheme,
    }),
    [mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
