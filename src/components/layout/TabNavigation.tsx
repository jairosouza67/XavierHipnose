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
        <nav className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full border border-slate-200 dark:border-slate-700">
            {items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onTabChange(item.id as ViewState)}
                    className={`
            relative px-6 py-2 rounded-full text-sm font-bold transition-all duration-300
            ${activeTab === item.id ? 'text-primary dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white'}
          `}
                >
                    {activeTab === item.id && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-sm"
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
