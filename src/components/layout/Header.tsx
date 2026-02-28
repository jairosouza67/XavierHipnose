import React from 'react';
import { Layers, Moon, Sun } from 'lucide-react';
import TabNavigation from './TabNavigation';
import { NavItem, ViewState } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  navItems: NavItem[];
  activeTab: ViewState;
  onTabChange: (id: ViewState) => void;
}

const Header = ({ navItems, activeTab, onTabChange }: HeaderProps) => {
  const { theme, toggleTheme, toggleHybrid, isHybrid } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-2 sm:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/80 dark:bg-slate-900/90 backdrop-blur-md px-4 sm:px-8 py-2.5 sm:py-3 rounded-full border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onTabChange('home')}>
          <img src="/icon.png" alt="Instituto Xavier" className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl object-cover" />
          <span className="font-serif text-base sm:text-xl font-bold text-primary dark:text-white tracking-tight">Filipe Xavier<span className="text-secondary"> Hipnose Clínica</span></span>
        </div>

        <div className="hidden lg:block">
          <TabNavigation items={navItems} activeTab={activeTab} onTabChange={onTabChange} />
        </div>

        {/* Mobile action buttons */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={toggleHybrid}
            className={`p-2 rounded-full transition-all ${isHybrid
              ? 'bg-secondary/20 text-secondary hover:bg-secondary/25'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            aria-label="Alternar modo híbrido"
            aria-pressed={isHybrid}
            title="Modo híbrido"
          >
            <Layers size={18} />
          </button>

        </div>

        {/* Desktop action buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={toggleHybrid}
            className={`p-2 rounded-full transition-all ${isHybrid
              ? 'bg-secondary/20 text-secondary hover:bg-secondary/25'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            aria-label="Alternar modo híbrido"
            aria-pressed={isHybrid}
            title="Modo híbrido"
          >
            <Layers size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
