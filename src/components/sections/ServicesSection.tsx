import React, { useState } from 'react';
import Card from '../ui/Card';
import SectionHeading from './SectionHeading';
import AnimatedSection from '../ui/AnimatedSection';
import TreatmentModal from '../ui/TreatmentModal';
import { Brain, Heart, Zap, Moon, Scale, Apple, GraduationCap, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { Service } from '../../types';
import { TREATMENT_CONTENT } from '../../content/treatmentContent';

const SERVICES: Service[] = [
    { 
        id: 1, 
        title: 'Ansiedade', 
        description: 'Retome o controle da sua paz mental e liberte-se dos pensamentos que te aprisionam.', 
        icon: 'Brain',
        contentKey: 'ansiedade',
    },
    { 
        id: 2, 
        title: 'Depressao', 
        description: 'Recupere sua vitalidade e reconecte-se com o sentido e proposito da sua vida.', 
        icon: 'Heart',
        contentKey: 'depressao',
    },
    { 
        id: 3, 
        title: 'Fobias', 
        description: 'Supere fobias sociais, medo de dirigir, de aviao ou de espacos fechados de forma rapida e segura.', 
        icon: 'Zap',
        contentKey: 'fobias',
    },
    { 
        id: 4, 
        title: 'Traumas', 
        description: 'Ressignifique experiencias traumaticas e libere-se do peso emocional do passado.', 
        icon: 'ShieldCheck',
        contentKey: 'trauma',
    },
    { 
        id: 5, 
        title: 'Compulsoes', 
        description: 'Quebre padroes compulsivos e recupere o controle sobre suas escolhas e comportamentos.', 
        icon: 'Scale',
        contentKey: 'compulsoes',
    },
    { 
        id: 6, 
        title: 'Vicios', 
        description: 'Liberte-se do tabagismo e outros comportamentos viciantes permanentemente.', 
        icon: 'Moon',
        contentKey: 'vicios',
    },
    { 
        id: 7, 
        title: 'Insonia', 
        description: 'Reconquiste noites de sono reparador e acorde revigorado todos os dias.', 
        icon: 'Moon',
        contentKey: 'insonia',
    },
    { 
        id: 8, 
        title: 'Estresse', 
        description: 'Aprenda a controlar suas respostas ao estresse e recupere seu equilibrio emocional.', 
        icon: 'Brain',
        contentKey: 'estresse',
    },
    { 
        id: 9, 
        title: 'Angustia', 
        description: 'Transforme sentimentos de angustia em clareza mental e bem-estar emocional.', 
        icon: 'Heart',
        contentKey: 'angustia',
    },
];

const iconMap: Record<string, any> = { Brain, Heart, Zap, Moon, Scale, Apple, GraduationCap, Users };

const ServicesSection = () => {
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    return (
        <section
            id="servicos"
            className="relative overflow-hidden py-28 lg:py-36 bg-cream dark:bg-slate-900/80 transition-colors duration-300"
            aria-labelledby="services-heading"
        >
            {/* Subtle background accents */}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                <div className="overlay-layer overlay-noise" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-20">
                    <SectionHeading
                        subtitle="Especialidades"
                        title="Como podemos te ajudar?"
                        headingId="services-heading"
                    />
                </div>

                <ul
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 list-none p-0"
                    role="list"
                    aria-label="Lista de tratamentos disponiveis"
                >
                    {SERVICES.map((service, index) => {
                        const Icon = iconMap[service.icon] || ShieldCheck;
                        return (
                            <li key={service.id}>
                                <AnimatedSection delay={index * 0.08}>
                                    <Card
                                        className="group h-full cursor-pointer relative overflow-hidden"
                                        aria-labelledby={`service-${service.id}-title`}
                                        onClick={() => setSelectedService(service)}
                                    >
                                        {/* Hover accent */}
                                        <div className="absolute top-0 left-0 w-full h-1 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" aria-hidden="true" />
                                        
                                        <div
                                            className="w-14 h-14 bg-cream dark:bg-slate-700 rounded-xl flex items-center justify-center mb-6 text-primary dark:text-white group-hover:bg-secondary group-hover:text-primary transition-all duration-500"
                                            aria-hidden="true"
                                        >
                                            <Icon size={28} />
                                        </div>
                                        <h3
                                            id={`service-${service.id}-title`}
                                            className="text-xl font-bold mb-3 text-primary dark:text-white group-hover:text-secondary transition-colors duration-500"
                                        >
                                            {service.title}
                                        </h3>
                                        <p className="text-[var(--color-text-muted)] dark:text-slate-300 leading-relaxed mb-6 text-[0.95rem]">
                                            {service.description}
                                        </p>
                                        <button
                                            className="flex items-center gap-2 text-secondary font-semibold text-sm cursor-pointer group-hover:gap-3 transition-all bg-transparent border-none p-0"
                                            aria-label={`Saber mais sobre ${service.title}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedService(service);
                                            }}
                                        >
                                            Saber mais <ArrowRight size={14} aria-hidden="true" />
                                        </button>
                                    </Card>
                                </AnimatedSection>
                            </li>
                        );
                    })}
                </ul>

                {/* Treatment Modal */}
                {selectedService && selectedService.contentKey && (
                    <TreatmentModal
                        isOpen={!!selectedService}
                        onClose={() => setSelectedService(null)}
                        title={selectedService.title}
                        icon={React.createElement(iconMap[selectedService.icon] || ShieldCheck, { size: 48 })}
                        description={selectedService.description}
                        sections={TREATMENT_CONTENT[selectedService.contentKey].sections}
                    />
                )}
            </div>
        </section>
    );
};

export default ServicesSection;
