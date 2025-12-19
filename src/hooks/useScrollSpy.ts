import { useEffect } from 'react';
import { ViewState } from '../types';

export const useScrollSpy = (
    sectionIds: string[],
    onActiveChange: (id: ViewState) => void,
    offsetPx: number = 0
) => {
    useEffect(() => {
        const handleScroll = () => {
            // Check if at top of page
            if (window.scrollY < 100) {
                onActiveChange('home');
                return;
            }

            // Find which section is currently most visible
            const sections = sectionIds.map(id => {
                const element = document.getElementById(id);
                if (!element) return null;
                
                const rect = element.getBoundingClientRect();
                const viewportCenter = window.innerHeight / 2;
                const elementCenter = rect.top + (rect.height / 2);
                const distance = Math.abs(viewportCenter - elementCenter);
                
                return { id, distance, rect };
            }).filter(Boolean) as { id: string; distance: number; rect: DOMRect }[];

            // Find closest section to viewport center
            const closest = sections.reduce((prev, curr) => 
                curr.distance < prev.distance ? curr : prev
            );

            if (closest) {
                onActiveChange(closest.id as ViewState);
            }
        };

        handleScroll(); // Run once on mount
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds, onActiveChange, offsetPx]);
};

