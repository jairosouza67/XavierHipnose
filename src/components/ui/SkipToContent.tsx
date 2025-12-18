import React from 'react';

interface SkipToContentProps {
    targetId?: string;
    label?: string;
}

/**
 * Skip to Content link for keyboard navigation accessibility.
 * Allows users to bypass navigation and jump directly to main content.
 */
const SkipToContent = ({ targetId = 'main-content', label = 'Pular para o conteúdo principal' }: SkipToContentProps) => {
    return (
        <a
            href={`#${targetId}`}
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-6 focus:py-3 focus:rounded-full focus:font-bold focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-secondary"
        >
            {label}
        </a>
    );
};

export default SkipToContent;
