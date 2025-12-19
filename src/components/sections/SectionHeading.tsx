import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';

interface SectionHeadingProps {
    subtitle: string;
    title: string;
    headingId?: string;
    titleClassName?: string;
}

const SectionHeading = ({ subtitle, title, headingId, titleClassName }: SectionHeadingProps) => {
    return (
        <div className="space-y-4">
            <AnimatedSection direction="down">
                <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm block">
                    {subtitle}
                </span>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
                <h2
                    id={headingId}
                    className={`text-4xl md:text-5xl font-serif leading-tight text-primary dark:text-white ${titleClassName || ''}`}
                >
                    {title}
                </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
                <div className="w-20 h-1.5 bg-secondary rounded-full mx-auto mt-6" aria-hidden="true" />
            </AnimatedSection>
        </div>
    );
};

export default SectionHeading;