import React from 'react';
import TabNavigation from './TabNavigation';
import { NavItem, ViewState } from '../../types';
import Button from '../ui/Button';

interface HeaderProps {
  navItems: NavItem[];
  activeTab: ViewState;
  onTabChange: (id: ViewState) => void;
}

const Header = ({ navItems, activeTab, onTabChange }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/80 backdrop-blur-md px-8 py-3 rounded-full border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onTabChange('home')}>
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-secondary font-serif text-2xl">F</div>
          <span className="font-serif text-xl font-bold text-primary tracking-tight">Filipe Xavier<span className="text-secondary"> Hipnose</span></span>
        </div>
        
        <div className="hidden lg:block">
          <TabNavigation items={navItems} activeTab={activeTab} onTabChange={onTabChange} />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="primary" size="sm" onClick={() => onTabChange('contato')}>
            Agendar Agora
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
