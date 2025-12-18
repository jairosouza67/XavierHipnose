import { useEffect } from 'react';
import { ViewState } from '../types';

export const useScrollSpy = (
    sectionIds: string[],
    onActiveChange: (id: ViewState) => void,
    offsetPx: number = 0
) => {
    useEffect(() => {
        const options = {
            rootMargin: `-${25 + offsetPx}% 0px -${25 + offsetPx}% 0px`,
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    onActiveChange(entry.target.id as ViewState);
                }
            });
        }, options);

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sectionIds, onActiveChange, offsetPx]);
};

