import React, { useState, useCallback } from 'react';
import SectionHeading from './SectionHeading';
import AnimatedSection from '../ui/AnimatedSection';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ } from '../../types';

const FAQS: FAQ[] = [
    { q: "A hipnose e segura?", a: "Totalmente. A hipnose e um estado natural da mente humana. Durante a sessao, voce esta sempre no controle e consciente." },
    { q: "Quantas sessoes sao necessarias?", a: "O tratamento e breve. A maioria dos casos e resolvida entre 1 a 4 sessoes, dependendo da complexidade." },
    { q: "Eu vou dormir durante a sessao?", a: "Nao. Voce estara em um estado de relaxamento profundo, mas acordado e ouvindo tudo o que acontece." },
    { q: "A hipnoterapia serve para mim?", a: "Se voce tem vontade de mudar e consegue seguir instrucoes simples, a hipnoterapia e altamente eficaz para voce." },
];

const FAQSection = () => {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    const handleToggle = useCallback((index: number) => {
        setOpenIdx(openIdx === index ? null : index);
    }, [openIdx]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle(index);
        }
    }, [handleToggle]);

    return (
        <section
            id="faq"
            className="py-28 lg:py-36 bg-warm-white dark:bg-slate-900 transition-colors duration-300"
            aria-labelledby="faq-heading"
        >
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <SectionHeading
                        subtitle="Duvidas"
                        title="Perguntas Frequentes"
                        headingId="faq-heading"
                    />
                </div>

                <div
                    className="space-y-4"
                    role="region"
                    aria-label="Secao de perguntas frequentes"
                >
                    {FAQS.map((faq, i) => {
                        const isOpen = openIdx === i;
                        const headerId = `faq-header-${i}`;
                        const panelId = `faq-panel-${i}`;

                        return (
                            <AnimatedSection key={i} delay={i * 0.08}>
                                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-[var(--color-border-light)] dark:border-slate-700 overflow-hidden transition-all duration-300 hover:border-secondary/30">
                                    <button
                                        id={headerId}
                                        onClick={() => handleToggle(i)}
                                        onKeyDown={(e) => handleKeyDown(e, i)}
                                        aria-expanded={isOpen}
                                        aria-controls={panelId}
                                        className="w-full px-6 lg:px-8 py-5 lg:py-6 flex items-center justify-between text-left bg-transparent border-none cursor-pointer"
                                    >
                                        <span className="font-semibold text-primary dark:text-white text-base lg:text-lg pr-4">{faq.q}</span>
                                        <motion.div
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-secondary shrink-0"
                                            aria-hidden="true"
                                        >
                                            <ChevronDown size={20} />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                id={panelId}
                                                role="region"
                                                aria-labelledby={headerId}
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                                className="px-6 lg:px-8 pb-5 lg:pb-6"
                                            >
                                                <p className="text-[var(--color-text-muted)] dark:text-slate-300 leading-relaxed border-t border-[var(--color-border-light)] dark:border-slate-700 pt-5">
                                                    {faq.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </AnimatedSection>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
