import React from 'react';
import { Home, Brain, Stethoscope, User, MessageSquare } from 'lucide-react';
import { ViewState } from '../../types';

interface MobileNavBarProps {
  activeTab: ViewState;
  onTabChange: (id: ViewState) => void;
}

const MobileNavBar = ({ activeTab, onTabChange }: MobileNavBarProps) => {
  const navItems = [
    { id: 'home' as ViewState, icon: Home, label: 'Início' },
    { id: 'hipnose' as ViewState, icon: Brain, label: 'Hipnose' },
    { id: 'servicos' as ViewState, icon: Stethoscope, label: 'Tratamentos' },
    { id: 'sobre' as ViewState, icon: User, label: 'Sobre' },
    { id: 'contato' as ViewState, icon: MessageSquare, label: 'Contato' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg">
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'text-primary bg-secondary/10' 
                  : 'text-slate-500 hover:text-primary'
              }`}
            >
              <Icon 
                size={22} 
                className={`transition-all duration-300 ${isActive ? 'scale-110' : ''}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>
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
