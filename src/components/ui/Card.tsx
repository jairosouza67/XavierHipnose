import React from 'react';

export type CardVariant = 'elevated' | 'flat' | 'bordered' | 'glass';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
  padding?: CardPadding;
  onClick?: () => void;
  role?: string;
}

const Card = ({ 
  children, 
  className = '',
  variant = 'elevated',
  padding = 'md',
  onClick,
  role,
  ...props 
}: CardProps) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';
  
  const variantClasses = {
    elevated: 'bg-white dark:bg-slate-800 shadow-[var(--shadow-md)] border border-[var(--color-border-light)] dark:border-slate-700 hover:shadow-[var(--shadow-lg)]',
    flat: 'bg-white dark:bg-slate-800',
    bordered: 'bg-white dark:bg-slate-800 border border-[var(--color-border)] dark:border-slate-600',
    glass: 'glass-effect bg-white/10 dark:bg-slate-800/10 backdrop-blur-md border border-white/20 dark:border-slate-700/20',
  };
  
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6 lg:p-8',
    lg: 'p-8 lg:p-12',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${onClick ? 'cursor-pointer card-hover-lift' : ''} ${className}`;
  
  return (
    <div 
      className={classes}
      onClick={onClick}
      role={role}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
