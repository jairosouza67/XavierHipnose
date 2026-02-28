import React from 'react';
import { Home, Brain, Stethoscope, User, MessageSquare } from 'lucide-react';
import { ViewState } from '../../types';

interface MobileNavBarProps {
  activeTab: ViewState;
  onTabChange: (id: ViewState) => void;
}

const MobileNavBar = ({ activeTab, onTabChange }: MobileNavBarProps) => {
  const navItems = [
    { id: 'home' as ViewState, icon: Home, label: 'Inicio' },
    { id: 'hipnose' as ViewState, icon: Brain, label: 'Hipnose' },
    { id: 'servicos' as ViewState, icon: Stethoscope, label: 'Servicos' },
    { id: 'sobre' as ViewState, icon: User, label: 'Sobre' },
    { id: 'contato' as ViewState, icon: MessageSquare, label: 'Contato' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl border-t border-[var(--color-border-light)] dark:border-slate-700/60 transition-colors duration-300">
      <div className="flex items-center justify-around px-2 py-2.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'text-secondary' 
                  : 'text-[var(--color-text-muted)] dark:text-slate-400 hover:text-primary dark:hover:text-white'
              }`}
            >
              <Icon 
                size={20} 
                className={`transition-all duration-300 ${isActive ? 'scale-110' : ''}`}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavBar;
