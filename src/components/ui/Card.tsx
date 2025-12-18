import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: React.ReactNode;
    variant?: 'elevated' | 'flat' | 'bordered' | 'glass';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: () => void;
    /** For accessibility: ID of the element that labels this card */
    'aria-labelledby'?: string;
    /** Role for the card element */
    role?: string;
}

const Card = ({
    children,
    variant = 'elevated',
    padding = 'md',
    className = '',
    onClick,
    'aria-labelledby': ariaLabelledby,
    role,
}: CardProps) => {
    const baseStyles = 'rounded-[2rem] transition-all duration-300';

    const variants = {
        elevated: 'bg-white shadow-md hover:shadow-xl border border-slate-100',
        flat: 'bg-slate-50 border border-transparent',
        bordered: 'bg-transparent border-2 border-slate-100 hover:border-secondary',
        glass: 'glass-effect text-white',
    };

    const paddings = {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-8',
        lg: 'p-12',
    };

    return (
        <motion.div
            whileHover={onClick ? { scale: 1.02 } : {}}
            onClick={onClick}
            className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${paddings[padding]} 
        ${onClick ? 'cursor-pointer' : ''} 
        ${className}
      `}
            role={role}
            aria-labelledby={ariaLabelledby}
        >
            {children}
        </motion.div>
    );
};

export default Card;

