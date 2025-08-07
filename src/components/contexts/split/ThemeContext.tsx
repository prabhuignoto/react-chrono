import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { Theme } from '@models/Theme';
import { getDefaultThemeOrDark } from '@utils/index';

interface ThemeContextValue {
  theme: Theme;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onThemeChange?: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  initialTheme?: Theme;
  darkMode?: boolean;
  onThemeChange?: () => void;
}> = ({ children, initialTheme, darkMode = false, onThemeChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(darkMode);
  
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
    onThemeChange?.();
  }, [onThemeChange]);

  const theme = useMemo(
    () => getDefaultThemeOrDark(isDarkMode, initialTheme),
    [isDarkMode, initialTheme]
  );

  const value = useMemo(
    () => ({
      theme,
      isDarkMode,
      toggleDarkMode,
      onThemeChange,
    }),
    [theme, isDarkMode, toggleDarkMode, onThemeChange]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
};