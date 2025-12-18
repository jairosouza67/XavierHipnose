import { useState, useCallback } from 'react';
import { ViewState } from '../types';

export const useActiveTab = (initialTab: ViewState = 'home') => {
    const [activeTab, setActiveTab] = useState<ViewState>(initialTab);

    const handleTabChange = useCallback((tabId: ViewState) => {
        setActiveTab(tabId);
        const element = document.getElementById(tabId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80, // Offset for navbar
                behavior: 'smooth',
            });
        }
    }, []);

    return { activeTab, setActiveTab, handleTabChange };
};
