import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
}

const LoadingSpinner = ({ size = 'md', text = 'Carregando...' }: LoadingSpinnerProps) => {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
    };

    return (
        <div
            className="flex flex-col items-center justify-center py-20 gap-4"
            role="status"
            aria-label={text}
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className={`${sizes[size]} border-3 border-[var(--color-border)] border-t-secondary rounded-full`}
            />
            <span className="text-slate-500 text-sm font-medium sr-only">{text}</span>
        </div>
    );
};

export default LoadingSpinner;
