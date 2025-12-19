import { useEffect } from 'react';
import { ViewState } from '../types';

export const useScrollSpy = (
    sectionIds: string[],
    onActiveChange: (id: ViewState) => void,
    offsetPx: number = 0
) => {
    useEffect(() => {
        const handleScroll = () => {
            // Find which section is currently most visible
            const sections = sectionIds.map(id => {
                const element = document.getElementById(id);
                if (!element) return null;
                
                const rect = element.getBoundingClientRect();
                const offset = offsetPx + 100; // Account for fixed header
                
                // Check if section is in view
                const isInView = rect.top <= offset && rect.bottom > offset;
                
                return { id, rect, isInView, top: rect.top };
            }).filter(Boolean) as { id: string; rect: DOMRect; isInView: boolean; top: number }[];

            // Find the first section that's in view, or the one closest to the offset
            const inView = sections.find(s => s.isInView);
            
            if (inView) {
                onActiveChange(inView.id as ViewState);
            } else {
                // If no section is in view, find the closest one
                const closest = sections.reduce((prev, curr) => 
                    Math.abs(curr.top) < Math.abs(prev.top) ? curr : prev
                );
                if (closest) {
                    onActiveChange(closest.id as ViewState);
                }
            }
        };

        handleScroll(); // Run once on mount
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds, onActiveChange, offsetPx]);
};

