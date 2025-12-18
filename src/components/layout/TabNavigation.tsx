import React from 'react';
import { motion } from 'framer-motion';
import { NavItem, ViewState } from '../../types';

interface TabNavigationProps {
    items: NavItem[];
    activeTab: ViewState;
    onTabChange: (id: ViewState) => void;
}

const TabNavigation = ({ items, activeTab, onTabChange }: TabNavigationProps) => {
    return (
        <nav className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-full border border-slate-200">
            {items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onTabChange(item.id as ViewState)}
                    className={`
            relative px-6 py-2 rounded-full text-sm font-bold transition-all duration-300
            ${activeTab === item.id ? 'text-primary' : 'text-slate-500 hover:text-primary'}
          `}
                >
                    {activeTab === item.id && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-white rounded-full shadow-sm"
                            transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                        />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                        {item.label}
                    </span>
                </button>
            ))}
        </nav>
    );
};

export default TabNavigation;
