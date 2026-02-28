import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';

interface SectionHeadingProps {
    subtitle: string;
    title: string;
    headingId?: string;
    titleClassName?: string;
    align?: 'center' | 'left';
}

const SectionHeading = ({ subtitle, title, headingId, titleClassName, align = 'center' }: SectionHeadingProps) => {
    const alignClass = align === 'center' ? 'text-center' : 'text-left';
    const lineAlign = align === 'center' ? 'mx-auto' : '';

    return (
        <div className={`space-y-5 ${alignClass}`}>
            <AnimatedSection direction="down">
                <span className="text-secondary font-semibold tracking-[0.2em] uppercase text-xs block">
                    {subtitle}
                </span>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
                <h2
                    id={headingId}
                    className={`text-4xl md:text-5xl lg:text-[3.25rem] font-serif leading-tight text-primary dark:text-white text-balance ${titleClassName || ''}`}
                >
                    {title}
                </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
                <div className={`w-16 h-0.5 gold-line ${lineAlign} mt-6`} aria-hidden="true" />
            </AnimatedSection>
        </div>
    );
};

export default SectionHeading;
