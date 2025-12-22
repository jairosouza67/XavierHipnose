import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

type Theme = 'light' | 'dark' | 'hybrid';
type NonHybridTheme = Exclude<Theme, 'hybrid'>;

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  toggleHybrid: () => void;
  isHybrid: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialTheme = useMemo<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved === 'light' || saved === 'dark' || saved === 'hybrid') return saved;
    return 'light';
  }, []);

  const initialLastNonHybrid = useMemo<NonHybridTheme>(() => {
    const saved = localStorage.getItem('lastNonHybridTheme') as NonHybridTheme | null;
    if (saved === 'light' || saved === 'dark') return saved;
    if (initialTheme === 'dark' || initialTheme === 'light') return initialTheme;
    return 'light';
  }, [initialTheme]);

  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [lastNonHybridTheme, setLastNonHybridTheme] = useState<NonHybridTheme>(initialLastNonHybrid);
  const lastNonHybridRef = useRef<NonHybridTheme>(initialLastNonHybrid);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    lastNonHybridRef.current = lastNonHybridTheme;
    localStorage.setItem('lastNonHybridTheme', lastNonHybridTheme);
  }, [lastNonHybridTheme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const base = prev === 'hybrid' ? lastNonHybridRef.current : prev;
      const next: NonHybridTheme = base === 'light' ? 'dark' : 'light';
      setLastNonHybridTheme(next);
      return next;
    });
  };

  const toggleHybrid = () => {
    setTheme(prev => {
      if (prev === 'hybrid') return lastNonHybridRef.current;
      if (prev === 'light' || prev === 'dark') setLastNonHybridTheme(prev);
      return 'hybrid';
    });
  };

  const isHybrid = theme === 'hybrid';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, toggleHybrid, isHybrid }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
