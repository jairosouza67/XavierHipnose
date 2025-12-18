import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import AnimatedSection from '../ui/AnimatedSection';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
    onAction: () => void;
}

const HeroSection = ({ onAction }: HeroSectionProps) => {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden pt-20"
            aria-labelledby="hero-heading"
        >
            {/* Background Decor - decorative, hidden from screen readers */}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 left-[-10%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-8">
                    <AnimatedSection direction="left">
                        <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full font-bold text-sm">
                            <Sparkles size={16} aria-hidden="true" />
                            <span>Aqui, vidas são transformadas</span>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.1}>
                        <h1
                            id="hero-heading"
                            className="text-6xl md:text-7xl font-serif text-primary leading-[1.1]"
                        >
                            O Comando do seu <br />
                            <span className="text-secondary italic">TRONO</span>
                        </h1>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                            <p>
                                Cada pessoa que chega até mim traz uma história única, uma dor única e uma força única.
                            </p>
                            <p>
                                E elas se esquecem disso: <span className="font-bold text-primary">dentro de todos nós existe um TRONO.</span>
                            </p>
                            <p>
                                Você não é um problema a ser "arrumado". Você é alguém que, em algum ponto do caminho, perdeu acesso/controle do seu próprio comando. Mas, quando você entende como sua mente aprende, te protege e repete padrões, você começa a recuperar algo essencial:
                            </p>
                            <p className="text-xl font-bold text-primary">
                                O Comando do seu TRONO.
                            </p>
                            <p>
                                Meu trabalho é ajudar você a <span className="font-bold text-primary">retornar a ser REI OU RAINHA do seu IMPÉRIO</span>, com profissionalismo, segurança, ética e clareza...
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
                            Agendar Avaliação
                        </Button>
                        <Button variant="outline" size="lg">
                            Conhecer o Método
                        </Button>
                    </AnimatedSection>

                    <AnimatedSection delay={0.4} className="flex items-center gap-6 pt-8">
                        <div className="flex -space-x-4" role="group" aria-label="Fotos de pacientes satisfeitos">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-slate-200">
                                    <img
                                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                        alt={`Paciente satisfeito ${i}`}
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                        <div>
                            <p className="font-bold text-primary">+500 vidas transformadas</p>
                            <div
                                className="flex text-secondary gap-1"
                                role="img"
                                aria-label="Avaliação 5 de 5 estrelas"
                            >
                                {'★★★★★'.split('').map((s, i) => (
                                    <span key={i} aria-hidden="true">{s}</span>
                                ))}
                            </div>
                        </div>
                    </AnimatedSection>
                </div>

                <AnimatedSection direction="right" delay={0.2} className="relative">
                    <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                        <img
                            src="/profile.jpg"
                            alt="Filipe Xavier - Hipnoterapeuta Clínico"
                            className="w-full h-full object-cover aspect-[4/5]"
                            loading="eager"
                        />
                    </div>
                    {/* Floating Element */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl z-20 max-w-[240px]"
                        role="complementary"
                        aria-label="Citação inspiradora"
                    >
                        <p className="text-primary font-bold italic text-lg leading-tight">
                            "A jornada para a mudança começa no seu subconsciente."
                        </p>
                    </motion.div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default HeroSection;

