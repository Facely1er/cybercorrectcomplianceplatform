import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme }
      className="p-2 rounded-lg bg-support-gray/50 dark:bg-dark-surface text-gray-600 dark:text-dark-text hover: bg-primary-teal/10 dark:hover: bg-dark-primary/20 hover:text-primary-teal dark:hover:text-dark-primary transition-all duration-300 hover:scale-105"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <Moon size={20} />  : <Sun size={20} />}
    </button>
  );
};