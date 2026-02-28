import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import AnimatedSection from '../ui/AnimatedSection';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeroSectionProps {
    onAction: () => void;
}

const HeroSection = ({ onAction }: HeroSectionProps) => {
    const { isHybrid } = useTheme();

    return (
        <div className={isHybrid ? 'dark' : ''}>
            <section
                id="home"
                className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-28 bg-warm-white dark:bg-slate-900 transition-colors duration-300"
                aria-labelledby="hero-heading"
            >
                {/* Subtle Background Decor */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <div className="overlay-layer overlay-noise" />
                    <div className="absolute top-16 right-[-8%] w-[600px] h-[600px] bg-secondary/[0.07] rounded-full blur-[140px]" />
                    <div className="absolute bottom-16 left-[-8%] w-[500px] h-[500px] bg-primary/[0.05] rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">
                    {/* Left Content */}
                    <div className="space-y-10">
                        <AnimatedSection direction="left">
                            <div className="inline-flex items-center gap-2.5 bg-secondary/[0.08] text-secondary border border-secondary/20 px-5 py-2.5 rounded-full font-semibold text-sm tracking-wide">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary" aria-hidden="true" />
                                <span>Aqui, vidas sao transformadas</span>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.1}>
                            <h1
                                id="hero-heading"
                                className="font-serif text-primary dark:text-white leading-[1.1]"
                            >
                                <span className="block text-4xl md:text-5xl lg:text-[3.5rem] font-normal">O comando do seu</span>
                                <span className="block text-7xl md:text-8xl lg:text-[7rem] text-secondary italic font-bold mt-1 tracking-tight">TRONO</span>
                            </h1>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <div className="space-y-5 text-lg text-[var(--color-text-secondary)] dark:text-slate-300 leading-relaxed max-w-xl">
                                <p>
                                    Cada pessoa que chega ate mim traz uma historia unica, uma dor unica e uma forca unica.
                                </p>
                                <p>
                                    E elas se esquecem disso: <span className="font-semibold text-primary dark:text-white">dentro de todos nos existe um TRONO.</span>
                                </p>
                                <p>
                                    Voce nao e um problema a ser "arrumado". Voce e alguem que, em algum ponto do caminho, perdeu acesso ao seu proprio comando. Mas, quando voce entende como sua mente aprende, te protege e repete padroes, voce comeca a recuperar algo essencial:
                                </p>
                                <p className="text-xl font-bold text-primary dark:text-white font-serif italic">
                                    O Comando do seu TRONO.
                                </p>
                                <p>
                                    Meu trabalho e ajudar voce a <span className="font-semibold text-primary dark:text-white">retornar a ser REI OU RAINHA do seu IMPERIO</span>, com profissionalismo, seguranca, etica e clareza...
                                </p>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.3} className="flex flex-wrap gap-4">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={onAction}
                                rightIcon={<ArrowRight size={20} aria-hidden="true" />}
                            >
                                Agendar Avaliacao
                            </Button>
                            <Button variant="outline" size="lg">
                                Conhecer o Metodo
                            </Button>
                        </AnimatedSection>
                    </div>

                    {/* Right - Photo */}
                    <AnimatedSection direction="right" delay={0.2} className="relative">
                        <div className="relative">
                            {/* Decorative gold accent behind the image */}
                            <div className="absolute -inset-3 bg-secondary/[0.08] rounded-[2.5rem] -rotate-2" aria-hidden="true" />
                            
                            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-xl border border-cream dark:border-slate-700">
                                <img
                                    src="/profile.jpg"
                                    alt="Filipe Xavier - Hipnoterapeuta Clinico"
                                    className="w-full h-full object-cover aspect-[4/5]"
                                    loading="eager"
                                />
                                {/* Subtle overlay at the bottom for depth */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" aria-hidden="true" />
                            </div>
                        </div>

                        {/* Floating Quote */}
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-8 -left-6 lg:-left-12 bg-white dark:bg-slate-800 p-6 lg:p-8 rounded-2xl shadow-xl border border-cream dark:border-slate-700 z-20 max-w-[220px]"
                            role="complementary"
                            aria-label="Citacao inspiradora"
                        >
                            <div className="w-8 h-0.5 bg-secondary rounded-full mb-3" aria-hidden="true" />
                            <p className="text-primary dark:text-white font-serif italic text-base leading-snug">
                                "A jornada para a mudanca comeca no seu subconsciente."
                            </p>
                        </motion.div>
                    </AnimatedSection>
                </div>

                {/* Scroll indicator */}
                <motion.div 
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-[var(--color-text-muted)]"
                    aria-hidden="true"
                >
                    <span className="text-xs font-medium tracking-widest uppercase">Explore</span>
                    <div className="w-px h-8 bg-secondary/40" />
                </motion.div>
            </section>
        </div>
    );
};

export default HeroSection;
