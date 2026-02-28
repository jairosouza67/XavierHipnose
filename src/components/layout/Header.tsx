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
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-2.5 sm:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl px-4 sm:px-8 py-2.5 sm:py-3 rounded-full border border-[var(--color-border-light)] dark:border-slate-700/60 shadow-[var(--shadow-lg)]">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onTabChange('home')}>
          <img src="/icon.png" alt="Instituto Xavier" className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg object-cover" />
          <span className="font-serif text-sm sm:text-base font-bold text-primary dark:text-white tracking-tight">
            Filipe Xavier<span className="text-secondary"> Hipnose</span>
          </span>
        </div>

        <div className="hidden lg:block">
          <TabNavigation items={navItems} activeTab={activeTab} onTabChange={onTabChange} />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-cream dark:bg-slate-800 text-[var(--color-text-muted)] dark:text-slate-300 hover:text-secondary dark:hover:text-secondary hover:bg-secondary/10 transition-all duration-300"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={toggleHybrid}
            className={`p-2 rounded-lg transition-all duration-300 ${isHybrid
              ? 'bg-secondary/15 text-secondary'
              : 'bg-cream dark:bg-slate-800 text-[var(--color-text-muted)] dark:text-slate-300 hover:text-secondary hover:bg-secondary/10'
            }`}
            aria-label="Alternar modo hibrido"
            aria-pressed={isHybrid}
            title="Modo hibrido"
          >
            <Layers size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
