import React from 'react';
import SectionHeading from './SectionHeading';
import AnimatedSection from '../ui/AnimatedSection';
import { Award, GraduationCap, Users, Heart } from 'lucide-react';
const ACTUAL_PROFILE_IMAGE = "/profile.jpg";

const AboutSection = () => {
    return (
        <section id="sobre" className="py-32 bg-primary text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
                <AnimatedSection direction="left">
                    <div className="space-y-8">
                        <SectionHeading subtitle="O Especialista" title="Filipe Xavier" />
                        <div className="space-y-6 text-white/70 text-lg leading-relaxed">
                            <p>
                                Desde 2017, quando realizei minha primeira formação em Hipnose, fiquei impressionado com o poder extraordinário do cérebro humano. Foi a partir dessa experiência que nasceu minha curiosidade e paixão pelo estudo da mente.
                            </p>
                            <p>
                                Desde então, tenho dedicado horas dos meus dias para adquirir conhecimentos e acumular formações em Hipnose Clínica, Neurociência e Comportamento Humano, sempre com o objetivo de transformar vidas de forma profissional, ética e baseada em evidências científicas.
                            </p>
                            <p className="text-white/90 font-semibold">
                                Respeito a individualidade de cada pessoa que entra em contato comigo, pois dentro de nós contém um TRONO e você é o REI/RAINHA do seu Império.
                            </p>
                        </div>

                        <div className="space-y-4 pt-4">
                            <h4 className="text-secondary font-bold text-xl mb-6">Minhas Certificações</h4>
                            {[
                                { icon: Award, title: 'Master em Hipnose Clínica Avançada', d: 'Instituto PIH® (SBPHC)' },
                                { icon: GraduationCap, title: 'Hipnoterapeuta Especialista', d: 'Neuroscience International Academy (EUA)' },
                                { icon: Award, title: 'Método MIDAS®', d: 'Neuroterapia - Instituto Versate' },
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

                        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 mt-8">
                            <h4 className="text-secondary font-bold text-lg mb-3">Minha Abordagem</h4>
                            <p className="text-white/70 leading-relaxed mb-4">
                                Meu trabalho integra hipnose clínica, neurociência e a compreensão profunda do comportamento humano. Cada pessoa já carrega recursos internos únicos e o meu papel é guiar você para acessá-los com mais clareza.
                            </p>
                            <p className="text-white italic font-semibold text-lg">
                                "Não se trata de controlar sua mente, mas de despertar seu próprio poder para mudar, pois o PODER não está fora, ele já está dentro de você."
                            </p>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection direction="right" delay={0.2} className="relative">
                    <div className="rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-white/10 relative z-10">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                            alt="Filipe Xavier - Hipnoterapeuta"
                            className="w-full aspect-[4/5] object-cover object-top"
                        />
                    </div>
                    <div className="absolute -bottom-10 -left-10 bg-secondary p-8 rounded-[2rem] text-primary max-w-xs shadow-2xl z-20 hidden xl:block">
                        <p className="font-bold text-xl italic leading-tight">
                            Dentro de todos nós existe um TRONO. Você é o REI ou RAINHA do seu IMPÉRIO.
                        </p>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default AboutSection;
