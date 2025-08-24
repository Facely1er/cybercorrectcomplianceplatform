import React, { createContext, useContext, useState, useEffect } from 'react';
 
type Theme = 'light' | 'dark';

interface ThemeContextType { 
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Apply theme-specific body background
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#0F1419'; // dark-bg
    
    } else {
      document.body.style.backgroundColor = '#FFFFFF'; // surface
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    console.log('Theme toggle clicked, current theme:', theme);
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('Switching to theme:', newTheme);
    setThemeState(newTheme);
  };

  const setTheme = (newTheme: Theme) => {
    console.log('Setting theme to:', newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme: toggleTheme, setTheme }}>
      {children }
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};