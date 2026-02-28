import React from 'react';
import SectionHeading from './SectionHeading';
import AnimatedSection from '../ui/AnimatedSection';
import { Award, GraduationCap, Users } from 'lucide-react';

const AboutSection = () => {
    return (
        <section id="sobre" className="py-28 lg:py-36 bg-primary text-white overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 xl:gap-20 items-start">
                <AnimatedSection direction="left">
                    <div className="space-y-8">
                        <SectionHeading subtitle="O Especialista" title="Filipe Xavier" titleClassName="text-white" align="left" />
                        <div className="space-y-5 text-white/65 text-lg leading-relaxed">
                            <p>
                                Desde 2017, quando realizei minha primeira formacao em Hipnose, fiquei impressionado com o poder extraordinario do cerebro humano. Foi a partir dessa experiencia que nasceu minha curiosidade e paixao pelo estudo da mente.
                            </p>
                            <p>
                                Desde entao, tenho dedicado algumas horas dos meus dias para adquirir conhecimentos e acumular formacoes em Hipnose Clinica, Neurociencia e Comportamento Humano, sempre com o objetivo em transformar vidas de forma profissional, etica e baseada em evidencias cientificas.
                            </p>
                            <p className="text-white/85 font-medium border-l-2 border-secondary pl-5">
                                Dentro de nos contem um TRONO e voce e o REI/RAINHA do seu Imperio.
                            </p>
                        </div>

                        <div className="pt-4">
                            <h4 className="text-secondary font-semibold text-lg mb-6 tracking-wide">Certificacoes</h4>
                            <div className="space-y-3">
                                {[
                                    { icon: Award, title: 'Master em Hipnose Clinica Avancada', d: 'Instituto PIH (SBPHC)' },
                                    { icon: GraduationCap, title: 'Hipnoterapeuta Especialista em Neurociencias', d: 'Neuroscience International Academy (EUA)' },
                                    { icon: Award, title: 'Metodo MIDAS', d: 'Neuroterapia e Hipnose - Instituto Versate' },
                                    { icon: GraduationCap, title: 'Neuroterapeuta', d: 'Faculdade JK (Brasilia)' },
                                    { icon: Users, title: 'Analista HMI Comportamental', d: 'Lavinte Academy' },
                                ].map((cred, i) => (
                                    <AnimatedSection key={i} delay={i * 0.08}>
                                        <div className="flex items-start gap-4 p-4 bg-white/[0.04] rounded-xl border border-white/[0.06] hover:bg-white/[0.08] hover:border-secondary/20 transition-all duration-300">
                                            <cred.icon className="text-secondary shrink-0 mt-0.5" size={20} />
                                            <div>
                                                <h5 className="font-semibold text-sm text-white/90">{cred.title}</h5>
                                                <p className="text-white/40 text-xs mt-1">{cred.d}</p>
                                            </div>
                                        </div>
                                    </AnimatedSection>
                                ))}
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection direction="right" delay={0.2} className="lg:self-start">
                    <div className="relative">
                        {/* Decorative accent */}
                        <div className="absolute -inset-3 bg-secondary/[0.06] rounded-[2.5rem] rotate-1" aria-hidden="true" />
                        
                        <div className="relative rounded-[2.5rem] overflow-hidden border border-white/[0.08] z-10">
                            <img
                                src="/profile.jpg"
                                alt="Filipe Xavier - Hipnoterapeuta"
                                className="w-full aspect-[4/5] object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" aria-hidden="true" />
                        </div>
                        
                        <div className="absolute -bottom-8 -left-6 bg-secondary p-6 rounded-2xl text-primary max-w-[240px] shadow-xl z-20 hidden lg:block">
                            <div className="w-8 h-0.5 bg-primary/30 rounded-full mb-3" aria-hidden="true" />
                            <p className="font-bold text-lg italic leading-tight">
                                Dentro de todos nos existe um TRONO. Voce e o REI ou RAINHA do seu IMPERIO.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/[0.04] p-6 lg:p-8 rounded-2xl border border-white/[0.06] mt-16">
                        <h4 className="text-secondary font-semibold text-lg mb-4">Minha Abordagem</h4>
                        <p className="text-white/60 leading-relaxed mb-5">
                            Meu trabalho integra hipnose clinica, neurociencia e a compreensao profunda do comportamento humano. Cada pessoa ja carrega recursos internos unicos e o meu papel e guiar voce para acessa-los com mais clareza.
                        </p>
                        <p className="text-white/90 italic font-serif text-lg leading-snug">
                            "Nao se trata de controlar sua mente, mas de despertar seu proprio poder para mudar."
                        </p>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default AboutSection;
