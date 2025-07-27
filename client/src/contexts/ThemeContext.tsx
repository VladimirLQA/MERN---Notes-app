import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ThemeColors {
  background: string;
  cardBackground: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  headerBackground: string;
  buttonPrimary: string;
  buttonSecondary: string;
  shadow: string;
  inputBackground: string;
  tagBackground: string;
}

export interface Theme {
  name: 'light' | 'dark';
  colors: ThemeColors;
}

const lightTheme: Theme = {
  name: 'light',
  colors: {
    background: '#fff',
    cardBackground: '#ffffff',
    textPrimary: '#000000',
    textSecondary: '#666666',
    border: '#f0f0f0',
    headerBackground: '#ffffff',
    buttonPrimary: '#1890ff',
    buttonSecondary: '#f5f5f5',
    shadow: '0 2px 8px rgba(0,0,0,0.1)',
    inputBackground: '#ffffff',
    tagBackground: '#f0f0f0',
  }
};

const darkTheme: Theme = {
  name: 'dark',
  colors: {
    background: '#1a1a1a',
    cardBackground: '#2d2d2d',
    textPrimary: '#ffffff',
    textSecondary: '#cccccc',
    border: '#404040',
    headerBackground: '#2d2d2d',
    buttonPrimary: '#1890ff',
    buttonSecondary: '#404040',
    shadow: '0 2px 8px rgba(0,0,0,0.3)',
    inputBackground: '#4d4d4dff',
    tagBackground: '#404040',
  }
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 