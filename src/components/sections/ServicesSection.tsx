import React, { useState } from 'react';
import Card from '../ui/Card';
import SectionHeading from './SectionHeading';
import AnimatedSection from '../ui/AnimatedSection';
import TreatmentModal from '../ui/TreatmentModal';
import { Brain, Heart, Zap, Moon, Scale, Apple, GraduationCap, Users, ShieldCheck } from 'lucide-react';
import { Service } from '../../types';

const SERVICES: Service[] = [
    { 
        id: 1, 
        title: 'Ansiedade', 
        description: 'Retome o controle da sua paz mental e liberte-se dos pensamentos que te aprisionam.', 
        icon: 'Brain',
        detailedInfo: {
            howItHelps: 'A hipnoterapia trabalha diretamente com o subconsciente para identificar e reprogramar os padrões de pensamento que geram ansiedade. Através de técnicas de relaxamento profundo e sugestões terapêuticas, você aprende a responder de forma mais calma e equilibrada aos gatilhos do dia a dia.',
            benefits: [
                'Redução significativa dos sintomas de ansiedade',
                'Melhora na qualidade do sono',
                'Maior controle sobre pensamentos acelerados',
                'Aumento da sensação de calma e tranquilidade',
                'Desenvolvimento de ferramentas mentais para lidar com o estresse'
            ],
            duration: 'Geralmente de 4 a 8 sessões, dependendo da intensidade dos sintomas.'
        }
    },
    { 
        id: 2, 
        title: 'Depressão', 
        description: 'Recupere sua vitalidade e reconecte-se com o sentido e propósito da sua vida.', 
        icon: 'Heart',
        detailedInfo: {
            howItHelps: 'A hipnoterapia auxilia no tratamento da depressão ao acessar memórias e emoções profundas, permitindo ressignificar experiências passadas e desenvolver novos padrões de pensamento mais positivos e construtivos. O processo ajuda a reativar a motivação e o prazer nas atividades cotidianas.',
            benefits: [
                'Melhora do humor e disposição',
                'Reconexão com atividades prazerosas',
                'Redução de pensamentos negativos recorrentes',
                'Aumento da autoestima e autoconfiança',
                'Recuperação da motivação e energia vital'
            ],
            duration: 'Tratamento complementar que varia de 6 a 12 sessões.'
        }
    },
    { 
        id: 3, 
        title: 'Fobias', 
        description: 'Supere fobias sociais, medo de dirigir, de avião ou de espaços fechados de forma rápida e segura.', 
        icon: 'Zap',
        detailedInfo: {
            howItHelps: 'A hipnoterapia é extremamente eficaz no tratamento de fobias porque permite dessensibilizar o medo ao expor gradualmente o subconsciente ao objeto fóbico em um ambiente seguro e controlado. Através da ressignificação da resposta emocional, você pode superar medos que pareciam impossíveis de vencer.',
            benefits: [
                'Eliminação ou redução significativa do medo irracional',
                'Maior liberdade e autonomia no dia a dia',
                'Aumento da confiança em situações antes evitadas',
                'Resultados rápidos em comparação com outras terapias',
                'Técnicas de autocontrole para usar quando necessário'
            ],
            duration: 'Muitas fobias podem ser tratadas em 1 a 4 sessões.'
        }
    },
    { 
        id: 4, 
        title: 'Traumas', 
        description: 'Ressignifique experiências traumáticas e libere-se do peso emocional do passado.', 
        icon: 'ShieldCheck',
        detailedInfo: {
            howItHelps: 'A hipnoterapia permite acessar memórias traumáticas de forma segura, processando-as sem reviver a dor intensa. Através de técnicas especializadas, você pode ressignificar o trauma, separando a memória da carga emocional associada, permitindo finalmente seguir em frente.',
            benefits: [
                'Redução de sintomas de estresse pós-traumático',
                'Diminuição de flashbacks e pesadelos',
                'Recuperação da sensação de segurança',
                'Melhora nos relacionamentos pessoais',
                'Libertação do passado para viver plenamente o presente'
            ],
            duration: 'Varia de 6 a 12 sessões, dependendo da complexidade do trauma.'
        }
    },
    { 
        id: 5, 
        title: 'Compulsões', 
        description: 'Quebre padrões compulsivos e recupere o controle sobre suas escolhas e comportamentos.', 
        icon: 'Scale',
        detailedInfo: {
            howItHelps: 'A hipnoterapia identifica as raízes emocionais dos comportamentos compulsivos e trabalha para reprogramar as respostas automáticas. Ao fortalecer o autocontrole e desenvolver novos padrões de comportamento, você recupera o poder sobre suas ações.',
            benefits: [
                'Redução e eliminação de comportamentos compulsivos',
                'Maior autocontrole e força de vontade',
                'Compreensão das causas emocionais da compulsão',
                'Desenvolvimento de estratégias saudáveis de enfrentamento',
                'Melhora na autoestima e confiança pessoal'
            ],
            duration: 'Geralmente de 6 a 10 sessões para resultados duradouros.'
        }
    },
    { 
        id: 6, 
        title: 'Vícios', 
        description: 'Liberte-se do tabagismo e outros comportamentos viciantes permanentemente.', 
        icon: 'Moon',
        detailedInfo: {
            howItHelps: 'A hipnoterapia reprograma a mente subconsciente, onde os vícios estão enraizados, fortalecendo a motivação para a mudança e eliminando os gatilhos que levam ao comportamento viciante. O tratamento é especialmente eficaz para tabagismo, mas também auxilia outros vícios.',
            benefits: [
                'Eliminação do desejo e da dependência',
                'Fortalecimento da determinação e motivação',
                'Redução dos sintomas de abstinência',
                'Desenvolvimento de hábitos saudáveis substitutos',
                'Libertação permanente do vício'
            ],
            duration: 'Para tabagismo, muitas vezes em 1 a 3 sessões. Outros vícios podem requerer mais tempo.'
        }
    },
    { 
        id: 7, 
        title: 'Insônia', 
        description: 'Reconquiste noites de sono reparador e acorde revigorado todos os dias.', 
        icon: 'Moon',
        detailedInfo: {
            howItHelps: 'A hipnoterapia ensina técnicas profundas de relaxamento e trabalha para eliminar as causas mentais e emocionais da insônia, como ansiedade, preocupações e padrões de pensamento negativos. Você aprende a "desligar" a mente e entrar naturalmente em sono profundo.',
            benefits: [
                'Facilidade para adormecer naturalmente',
                'Sono mais profundo e reparador',
                'Redução de despertares noturnos',
                'Maior energia e disposição durante o dia',
                'Técnicas de auto-hipnose para usar sempre que necessário'
            ],
            duration: 'Geralmente de 3 a 6 sessões para estabelecer novos padrões de sono.'
        }
    },
    { 
        id: 8, 
        title: 'Dores Crônicas', 
        description: 'Gerencie e reduza dores crônicas através da reprogramação mental.', 
        icon: 'Heart',
        detailedInfo: {
            howItHelps: 'A hipnoterapia trabalha na conexão mente-corpo para modificar a percepção da dor. Através de técnicas de relaxamento profundo e sugestões terapêuticas, o cérebro aprende a processar os sinais de dor de forma diferente, reduzindo significativamente o desconforto.',
            benefits: [
                'Redução significativa da intensidade da dor',
                'Menor dependência de medicamentos analgésicos',
                'Melhora na qualidade de vida e mobilidade',
                'Desenvolvimento de técnicas de controle da dor',
                'Redução do estresse associado à dor crônica'
            ],
            duration: 'Varia de 6 a 12 sessões, com possível manutenção periódica.'
        }
    },
    { 
        id: 9, 
        title: 'Estresse', 
        description: 'Aprenda a controlar suas respostas ao estresse e recupere seu equilíbrio emocional.', 
        icon: 'Brain',
        detailedInfo: {
            howItHelps: 'A hipnoterapia ensina seu corpo e mente a responder de forma mais equilibrada aos estressores do cotidiano. Através de técnicas de relaxamento e reprogramação mental, você desenvolve resiliência e aprende a manter a calma mesmo em situações desafiadoras.',
            benefits: [
                'Redução dos níveis de cortisol (hormônio do estresse)',
                'Melhora na capacidade de lidar com pressões',
                'Maior clareza mental e foco',
                'Aumento da sensação de controle sobre a vida',
                'Técnicas práticas para usar em momentos de tensão'
            ],
            duration: 'Geralmente de 4 a 8 sessões para resultados sustentáveis.'
        }
    },
    { 
        id: 10, 
        title: 'Angústia', 
        description: 'Transforme sentimentos de angústia em clareza mental e bem-estar emocional.', 
        icon: 'Heart',
        detailedInfo: {
            howItHelps: 'A hipnoterapia ajuda a identificar e processar as emoções profundas que causam a angústia, permitindo uma compreensão mais clara de seus sentimentos. Através da ressignificação emocional, você pode transformar a angústia em paz interior e clareza mental.',
            benefits: [
                'Alívio da sensação de aperto no peito e desconforto',
                'Maior compreensão das próprias emoções',
                'Desenvolvimento de resiliência emocional',
                'Sensação renovada de leveza e bem-estar',
                'Ferramentas para processar emoções difíceis'
            ],
            duration: 'Geralmente de 5 a 10 sessões, dependendo da origem da angústia.'
        }
    },
];

const iconMap: Record<string, any> = { Brain, Heart, Zap, Moon, Scale, Apple, GraduationCap, Users };

const ServicesSection = () => {
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    return (
        <section
            id="servicos"
            className="py-32 bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
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
                                        className="group h-full cursor-pointer"
                                        aria-labelledby={`service-${service.id}-title`}
                                        onClick={() => setSelectedService(service)}
                                    >
                                        <div
                                            className="w-16 h-16 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-8 text-primary dark:text-white group-hover:bg-secondary transition-colors duration-500"
                                            aria-hidden="true"
                                        >
                                            <Icon size={32} />
                                        </div>
                                        <h3
                                            id={`service-${service.id}-title`}
                                            className="text-2xl font-bold mb-4 text-primary dark:text-white group-hover:text-secondary transition-colors duration-500"
                                        >
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-500 dark:text-slate-300 leading-relaxed mb-8">
                                            {service.description}
                                        </p>
                                        <button
                                            className="flex items-center gap-2 text-primary dark:text-white font-bold text-sm cursor-pointer hover:gap-4 transition-all bg-transparent border-none p-0"
                                            aria-label={`Saber mais sobre ${service.title}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedService(service);
                                            }}
                                        >
                                            Saber mais <Zap size={16} className="text-secondary" aria-hidden="true" />
                                        </button>
                                    </Card>
                                </AnimatedSection>
                            </li>
                        );
                    })}
                </ul>

                {/* Treatment Modal */}
                {selectedService && selectedService.detailedInfo && (
                    <TreatmentModal
                        isOpen={!!selectedService}
                        onClose={() => setSelectedService(null)}
                        title={selectedService.title}
                        icon={React.createElement(iconMap[selectedService.icon] || ShieldCheck, { size: 48 })}
                        description={selectedService.description}
                        detailedInfo={selectedService.detailedInfo}
                    />
                )}
            </div>
        </section>
    );
};

export default ServicesSection;