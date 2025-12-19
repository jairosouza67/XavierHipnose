import React from 'react';
import Card from '../ui/Card';
import SectionHeading from './SectionHeading';
import AnimatedSection from '../ui/AnimatedSection';
import { Brain, Heart, Zap, Moon, Scale, Apple, GraduationCap, Users, ShieldCheck } from 'lucide-react';
import { Service } from '../../types';

const SERVICES: Service[] = [
    { id: 1, title: 'Ansiedade', description: 'Retome o controle da sua paz mental e liberte-se dos pensamentos que te aprisionam.', icon: 'Brain' },
    { id: 2, title: 'Depressão', description: 'Recupere sua vitalidade e reconecte-se com o sentido e propósito da sua vida.', icon: 'Heart' },
    { id: 3, title: 'Fobias', description: 'Supere fobias sociais, medo de dirigir, de avião ou de espaços fechados de forma rápida e segura.', icon: 'Zap' },
    { id: 4, title: 'Traumas', description: 'Ressignifique experiências traumáticas e libere-se do peso emocional do passado.', icon: 'ShieldCheck' },
    { id: 5, title: 'Compulsões', description: 'Quebre padrões compulsivos e recupere o controle sobre suas escolhas e comportamentos.', icon: 'Scale' },
    { id: 6, title: 'Vícios', description: 'Liberte-se do tabagismo e outros comportamentos viciantes permanentemente.', icon: 'Moon' },
    { id: 7, title: 'Insônia', description: 'Reconquiste noites de sono reparador e acorde revigorado todos os dias.', icon: 'Moon' },
    { id: 8, title: 'Dores Crônicas', description: 'Gerencie e reduza dores crônicas através da reprogramação mental.', icon: 'Heart' },
    { id: 9, title: 'Estresse', description: 'Aprenda a controlar suas respostas ao estresse e recupere seu equilíbrio emocional.', icon: 'Brain' },
    { id: 10, title: 'Angústia', description: 'Transforme sentimentos de angústia em clareza mental e bem-estar emocional.', icon: 'Heart' },
];

const iconMap: Record<string, any> = { Brain, Heart, Zap, Moon, Scale, Apple, GraduationCap, Users };

const ServicesSection = () => {
    return (
        <section
            id="servicos"
            className="py-32 bg-slate-50"
            aria-labelledby="services-heading"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <SectionHeading
                        subtitle="Especialidades"
                        title="Como podemos te ajudar?"
                        headingId="services-heading"
                    />
                </div>

                <ul
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0"
                    role="list"
                    aria-label="Lista de tratamentos disponíveis"
                >
                    {SERVICES.map((service, index) => {
                        const Icon = iconMap[service.icon] || ShieldCheck;
                        return (
                            <li key={service.id}>
                                <AnimatedSection delay={index * 0.1}>
                                    <Card
                                        className="group h-full"
                                        aria-labelledby={`service-${service.id}-title`}
                                    >
                                        <div
                                            className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 text-primary group-hover:bg-secondary transition-colors duration-500"
                                            aria-hidden="true"
                                        >
                                            <Icon size={32} />
                                        </div>
                                        <h3
                                            id={`service-${service.id}-title`}
                                            className="text-2xl font-bold mb-4 text-primary group-hover:text-secondary transition-colors duration-500"
                                        >
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-500 leading-relaxed mb-8">
                                            {service.description}
                                        </p>
                                        <button
                                            className="flex items-center gap-2 text-primary font-bold text-sm cursor-pointer hover:gap-4 transition-all bg-transparent border-none p-0"
                                            aria-label={`Saber mais sobre ${service.title}`}
                                        >
                                            Saber mais <Zap size={16} className="text-secondary" aria-hidden="true" />
                                        </button>
                                    </Card>
                                </AnimatedSection>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default ServicesSection;

