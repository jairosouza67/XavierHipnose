import React, { useState, useCallback } from 'react';
import SectionHeading from './SectionHeading';
import AnimatedSection from '../ui/AnimatedSection';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ } from '../../types';

const FAQS: FAQ[] = [
    { q: "A hipnose é segura?", a: "Totalmente. A hipnose é um estado natural da mente humana. Durante a sessão, você está sempre no controle e consciente." },
    { q: "Quantas sessões são necessárias?", a: "O tratamento é breve. A maioria dos casos é resolvida entre 4 a 6 sessões, dependendo da complexidade." },
    { q: "Eu vou dormir durante a sessão?", a: "Não. Você estará em um estado de relaxamento profundo, mas acordado e ouvindo tudo o que acontece." },
    { q: "A hipnoterapia serve para mim?", a: "Se você tem vontade de mudar e consegue seguir instruções simples, a hipnoterapia é altamente eficaz para você." },
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
            className="py-32 bg-slate-50"
            aria-labelledby="faq-heading"
        >
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-16">
                    <SectionHeading
                        subtitle="Dúvidas"
                        title="Perguntas Frequentes"
                        headingId="faq-heading"
                    />
                </div>

                <div
                    className="space-y-4"
                    role="region"
                    aria-label="Seção de perguntas frequentes"
                >
                    {FAQS.map((faq, i) => {
                        const isOpen = openIdx === i;
                        const headerId = `faq-header-${i}`;
                        const panelId = `faq-panel-${i}`;

                        return (
                            <AnimatedSection key={i} delay={i * 0.1}>
                                <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <button
                                        id={headerId}
                                        onClick={() => handleToggle(i)}
                                        onKeyDown={(e) => handleKeyDown(e, i)}
                                        aria-expanded={isOpen}
                                        aria-controls={panelId}
                                        className="w-full px-8 py-6 flex items-center justify-between text-left bg-transparent border-none cursor-pointer"
                                    >
                                        <span className="font-bold text-primary text-lg">{faq.q}</span>
                                        <motion.div
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            className="text-secondary"
                                            aria-hidden="true"
                                        >
                                            <ChevronDown size={24} />
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
                                                className="px-8 pb-6"
                                            >
                                                <p className="text-slate-500 leading-relaxed border-t border-slate-50 pt-6">
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

