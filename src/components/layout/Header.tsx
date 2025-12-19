import React from 'react';
import { Moon, Sun } from 'lucide-react';
import TabNavigation from './TabNavigation';
import { NavItem, ViewState } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';

interface HeaderProps {
  navItems: NavItem[];
  activeTab: ViewState;
  onTabChange: (id: ViewState) => void;
}

const Header = ({ navItems, activeTab, onTabChange }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/80 dark:bg-slate-900/90 backdrop-blur-md px-8 py-3 rounded-full border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onTabChange('home')}>
          <img src="/icon 2.PNG" alt="Instituto Xavier" className="w-10 h-10 rounded-xl object-cover" />
          <span className="font-serif text-xl font-bold text-primary dark:text-white tracking-tight">Filipe Xavier<span className="text-secondary"> Hipnose</span></span>
        </div>
        
        <div className="hidden lg:block">
          <TabNavigation items={navItems} activeTab={activeTab} onTabChange={onTabChange} />
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            aria-label="Alternar tema"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <Button variant="primary" size="sm" onClick={() => onTabChange('contato')}>
            Agendar Agora
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
