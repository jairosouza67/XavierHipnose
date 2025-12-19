import React from 'react';
import SectionHeading from './SectionHeading';
import AnimatedSection from '../ui/AnimatedSection';
import { Award, GraduationCap, Users, Heart } from 'lucide-react';

const AboutSection = () => {
    return (
        <section id="sobre" className="py-24 md:py-28 bg-primary text-white overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 xl:gap-16 items-start">
                <AnimatedSection direction="left">
                    <div className="space-y-7">
                        <SectionHeading subtitle="O Especialista" title="Filipe Xavier" titleClassName="text-white" />
                        <div className="space-y-5 text-white/70 text-lg leading-relaxed">
                            <p>
                                Desde 2017, quando realizei minha primeira formação em Hipnose, fiquei impressionado com o poder extraordinário do cérebro humano. Foi a partir dessa experiência que nasceu minha curiosidade e paixão pelo estudo da mente (cérebro).
                            </p>
                            <p>
                                Desde então, tenho dedicado algumas horas dos meus dias para adquirir conhecimentos e acumular algumas formações em Hipnose Clínica, Neurociência e Comportamento Humano, sempre com o objetivo em transformar a minha vida, através do saber de como controlar essa "coisa" chamada cérebro e a vida das pessoas de forma profissional, ética e baseada em evidências/estudos científicos.
                            </p>
                            <p className="text-white/90 font-semibold">
                                E óbvio, respeitando a individualidade de cada pessoa que entra em contato comigo, pois dentro de nós contém um TRONO e você é o REI/RAINHA do seu Império.
                            </p>
                        </div>

                        <div className="pt-2">
                            <h4 className="text-secondary font-bold text-xl mb-6">Minhas Certificações</h4>
                            <div className="space-y-4">
                                {[
                                    { icon: Award, title: 'Master em Hipnose Clínica Avançada', d: 'Instituto PIH® (SBPHC)' },
                                    { icon: GraduationCap, title: 'Hipnoterapeuta Especialista em Neurociências', d: 'Neuroscience International Academy (EUA)' },
                                    { icon: Award, title: 'Método MIDAS®', d: 'Neuroterapia e Hipnose - Instituto Versate' },
                                    { icon: GraduationCap, title: 'Neuroterapeuta', d: 'Faculdade JK (Brasília)' },
                                    { icon: Users, title: 'Analista HMI Comportamental', d: 'Lavinte Academy' },
                                ].map((cred, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                        <cred.icon className="text-secondary shrink-0" size={24} />
                                        <div>
                                            <h5 className="font-bold text-sm text-white">{cred.title}</h5>
                                            <p className="text-white/50 text-xs mt-1">{cred.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection direction="right" delay={0.2} className="lg:self-start">
                    <div className="relative">
                        <div className="rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-white/10 relative z-10">
                            <img
                                src="/profile.jpg"
                                alt="Filipe Xavier - Hipnoterapeuta"
                                className="w-full aspect-[4/5] object-cover object-center"
                            />
                        </div>
                        <div className="absolute -bottom-10 -left-10 bg-secondary p-8 rounded-[2rem] text-primary max-w-xs shadow-2xl z-20 hidden lg:block">
                            <p className="font-bold text-xl italic leading-tight">
                                Dentro de todos nós existe um TRONO. Você é o REI ou RAINHA do seu IMPÉRIO.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/5 p-6 rounded-3xl border border-white/10 mt-16">
                        <h4 className="text-secondary font-bold text-lg mb-3">Minha Abordagem</h4>
                        <p className="text-white/70 leading-relaxed mb-4">
                            Meu trabalho integra hipnose clínica, neurociência e a compreensão profunda do comportamento humano. Cada pessoa já carrega recursos internos únicos e o meu papel é guiar você para acessá-los com mais clareza.
                        </p>
                        <p className="text-white italic font-semibold text-lg">
                            "Não se trata de controlar sua mente, mas de despertar seu próprio poder para mudar, pois o PODER não está fora, ele já está dentro de você."
                        </p>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default AboutSection;