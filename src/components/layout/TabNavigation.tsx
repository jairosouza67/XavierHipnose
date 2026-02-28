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
        <nav className="flex items-center gap-0.5 bg-cream/80 dark:bg-slate-800/80 p-1 rounded-full border border-[var(--color-border-light)] dark:border-slate-700/60">
            {items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onTabChange(item.id as ViewState)}
                    className={`
                        relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                        ${activeTab === item.id 
                            ? 'text-primary dark:text-white' 
                            : 'text-[var(--color-text-muted)] dark:text-slate-400 hover:text-primary dark:hover:text-white'}
                    `}
                >
                    {activeTab === item.id && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-sm"
                            transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
                        />
                    )}
                    <span className="relative z-10">{item.label}</span>
                </button>
            ))}
        </nav>
    );
};

export default TabNavigation;
