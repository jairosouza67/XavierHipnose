import React from 'react';
import SectionHeading from './SectionHeading';
import AnimatedSection from '../ui/AnimatedSection';
import Card from '../ui/Card';
import { ShieldCheck, XCircle, CheckCircle2 } from 'lucide-react';
import { Myth } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

const MYTHS: Myth[] = [
    { m: 'Voce perde o controle da mente', v: 'Voce esta no controle total e pode sair do estado quando desejar.' },
    { m: 'Voce pode ficar preso na hipnose', v: 'Impossivel. E um estado natural de foco, como ler um livro.' },
    { m: 'Diz segredos que nao quer contar', v: 'Voce nunca dira algo que nao diria em estado normal.' },
];

const STEPS = [
    { i: 1, t: 'Foco e Relaxamento', d: 'Estado guiado de relaxamento mantendo total controle.' },
    { i: 2, t: 'Acesso Direto', d: 'Comunicacao com a parte que gera respostas automaticas.' },
    { i: 3, t: 'Dessensibilizacao', d: 'Eliminacao da carga emocional ligada a um gatilho, sem apagar a memoria.' },
    { i: 4, t: 'Ressignificacao', d: 'Mudanca de percepcao e eliminacao de gatilhos.' },
];

const STUDIES = [
    { href: 'https://www.jornaldahipnose.com/hipnose/hipnose-clinica-eficaz/', title: 'Jornal da Hipnose', desc: 'Pesquisas sobre eficacia da hipnose clinica' },
    { href: 'https://pubmed.ncbi.nlm.nih.gov/31251710/', title: 'PubMed', desc: 'Estudos cientificos internacionais' },
    { href: 'https://www.gov.br/saude/pt-br/composicao/saps/pics/recursos-teraupeticos/hipnoterapia', title: 'Gov.br - PICS', desc: 'Praticas Integrativas reconhecidas pelo Ministerio da Saude' },
];

const HypnotherapyContent = () => (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-20">
        {/* Intro */}
        <div className="text-center space-y-8">
            <SectionHeading subtitle="Educacao" title="O que e Hipnose Clinica?" />
            <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] dark:text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
                E um conjunto de tecnicas que, por meio de intenso relaxamento, concentracao e foco, induz a pessoa a alcancar um estado de consciencia aumentado que permita alterar condicoes ou comportamentos indesejados, como: ansiedade, medos, fobias, insonia, depressao, angustia, estresse, vicios e dores cronicas.
            </p>
        </div>

        {/* Neuroscience */}
        <div className="space-y-10">
            <h3 className="text-2xl lg:text-3xl font-serif text-primary dark:text-white text-center text-balance">O que acontece no cerebro, segundo a neurociencia?</h3>
            <div className="bg-white dark:bg-slate-800 p-6 lg:p-8 rounded-2xl border border-[var(--color-border-light)] dark:border-slate-700 shadow-[var(--shadow-sm)]">
                <p className="text-base lg:text-lg text-[var(--color-text-secondary)] dark:text-slate-300 leading-relaxed mb-6">
                    Durante a hipnose, ha uma mudanca temporaria na forma como o cerebro filtra informacoes:
                </p>
                <ul className="space-y-4 text-[var(--color-text-secondary)] dark:text-slate-300">
                    {[
                        ['cortex pre-frontal', 'relacionado ao controle e julgamento', 'relaxa'],
                        ['sistema limbico', 'emocoes e memoria', 'se torna mais acessivel'],
                        ['areas de atencao e imaginacao', '', 'ficam mais ativas'],
                    ].map(([area, desc, effect], idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5 shrink-0" />
                            <span>O <strong className="text-primary dark:text-white">{area}</strong>{desc ? ` (${desc})` : ''} {effect}.</span>
                        </li>
                    ))}
                </ul>
                <p className="text-base lg:text-lg text-[var(--color-text-secondary)] dark:text-slate-300 leading-relaxed mt-6">
                    Isso permite que a pessoa explore pensamentos e memorias com menos resistencia emocional. A hipnoterapia facilita reprogramar padroes automaticos, como ansiedade, medos, compulsoes ou crencas limitantes.
                </p>
            </div>

            <div className="bg-primary text-white p-6 lg:p-8 rounded-2xl">
                <div className="w-10 h-0.5 bg-secondary rounded-full mb-4" aria-hidden="true" />
                <h4 className="text-xl lg:text-2xl font-serif mb-3">E como se a mente entrasse em um modo de "reedicao interna"</h4>
                <p className="text-white/75 text-base lg:text-lg leading-relaxed">
                    Voce reve uma experiencia antiga de outro angulo e grava uma nova resposta sem a carga emocional envolvida.
                </p>
            </div>

            <div className="bg-secondary/[0.08] border-l-2 border-secondary p-5 lg:p-6 rounded-xl">
                <p className="text-primary dark:text-white font-semibold mb-2 text-sm">Exemplo pratico:</p>
                <p className="text-[var(--color-text-secondary)] dark:text-slate-300 leading-relaxed text-sm lg:text-base">
                    Uma pessoa que reage com panico ao falar em publico pode, em hipnose, simular a situacao de forma segura, treinar uma resposta calma e depois levar isso para o mundo real.
                </p>
            </div>
        </div>

        {/* Studies */}
        <div className="space-y-10">
            <h3 className="text-2xl lg:text-3xl font-serif text-primary dark:text-white text-center text-balance">Estudos que comprovam a eficacia</h3>
            <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
                {STUDIES.map((study, idx) => (
                    <AnimatedSection key={idx} delay={idx * 0.1}>
                        <a 
                            href={study.href}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block bg-white dark:bg-slate-800 p-5 lg:p-6 rounded-xl border border-[var(--color-border-light)] dark:border-slate-700 hover:border-secondary/40 hover:shadow-[var(--shadow-md)] transition-all duration-300 group h-full"
                        >
                            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                                <ShieldCheck className="text-secondary" size={20} />
                            </div>
                            <h4 className="font-semibold text-primary dark:text-white mb-1.5 group-hover:text-secondary transition-colors duration-300">{study.title}</h4>
                            <p className="text-xs text-[var(--color-text-muted)] dark:text-slate-400">{study.desc}</p>
                        </a>
                    </AnimatedSection>
                ))}
            </div>
        </div>

        {/* Myths */}
        <div className="space-y-10">
            <h3 className="text-2xl lg:text-3xl font-serif text-primary dark:text-white text-center">Mitos vs Verdades</h3>
            <div className="grid gap-4">
                {MYTHS.map((myth, i) => (
                    <AnimatedSection key={i} delay={i * 0.08} direction="up">
                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="p-4 lg:p-5 bg-rose-50/80 dark:bg-rose-900/20 rounded-xl border border-rose-100 dark:border-rose-800/40 flex gap-3 items-start">
                                <XCircle className="text-rose-400 dark:text-rose-300 shrink-0 mt-0.5" size={18} />
                                <p className="text-rose-900 dark:text-rose-200 font-medium text-sm">MITO: {myth.m}</p>
                            </div>
                            <div className="p-4 lg:p-5 bg-emerald-50/80 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/40 flex gap-3 items-start">
                                <CheckCircle2 className="text-emerald-500 dark:text-emerald-300 shrink-0 mt-0.5" size={18} />
                                <p className="text-emerald-900 dark:text-emerald-200 font-medium text-sm">VERDADE: {myth.v}</p>
                            </div>
                        </div>
                    </AnimatedSection>
                ))}
            </div>
        </div>

        {/* Steps */}
        <AnimatedSection direction="up">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {STEPS.map((step, index) => (
                    <AnimatedSection key={step.i} delay={index * 0.08}>
                        <Card className="group h-full flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary font-bold text-lg mb-5 group-hover:scale-110 transition-transform duration-500">
                                {step.i}
                            </div>
                            <h4 className="text-base font-bold text-primary dark:text-white mb-3 group-hover:text-secondary transition-colors duration-500 min-h-[2.5rem] flex items-center justify-center">
                                {step.t}
                            </h4>
                            <p className="text-[var(--color-text-muted)] dark:text-slate-300 leading-relaxed text-sm">
                                {step.d}
                            </p>
                        </Card>
                    </AnimatedSection>
                ))}
            </div>
        </AnimatedSection>
    </div>
);

const HypnotherapySection = () => {
    const { isHybrid } = useTheme();

    if (!isHybrid) {
        return (
            <section id="hipnose" className="py-28 lg:py-36 bg-warm-white dark:bg-slate-900 transition-colors duration-300">
                <HypnotherapyContent />
            </section>
        );
    }

    return (
        <section id="hipnose" className="transition-colors duration-300">
            {/* Light part */}
            <div className="py-28 lg:py-36 bg-warm-white">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-20">
                    <div className="text-center space-y-8">
                        <SectionHeading subtitle="Educacao" title="O que e Hipnose Clinica?" />
                        <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] leading-relaxed font-normal max-w-3xl mx-auto">
                            E um conjunto de tecnicas que, por meio de intenso relaxamento, concentracao e foco, induz a pessoa a alcancar um estado de consciencia aumentado que permita alterar condicoes ou comportamentos indesejados.
                        </p>
                    </div>
                </div>
            </div>

            {/* Dark part */}
            <div className="dark">
                <div className="bg-slate-900 text-white py-20 lg:py-28">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-20">
                        {/* Studies */}
                        <div className="space-y-10">
                            <h3 className="text-2xl lg:text-3xl font-serif text-white text-center text-balance">Estudos que comprovam a eficacia</h3>
                            <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
                                {STUDIES.map((study, idx) => (
                                    <AnimatedSection key={idx} delay={idx * 0.1}>
                                        <a 
                                            href={study.href}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="block bg-slate-800 p-5 lg:p-6 rounded-xl border border-slate-700 hover:border-secondary/40 hover:shadow-lg transition-all duration-300 group h-full"
                                        >
                                            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                                                <ShieldCheck className="text-secondary" size={20} />
                                            </div>
                                            <h4 className="font-semibold text-white mb-1.5 group-hover:text-secondary transition-colors duration-300">{study.title}</h4>
                                            <p className="text-xs text-slate-400">{study.desc}</p>
                                        </a>
                                    </AnimatedSection>
                                ))}
                            </div>
                        </div>

                        {/* Myths */}
                        <div className="space-y-10">
                            <h3 className="text-2xl lg:text-3xl font-serif text-white text-center">Mitos vs Verdades</h3>
                            <div className="grid gap-4">
                                {MYTHS.map((myth, i) => (
                                    <AnimatedSection key={i} delay={i * 0.08} direction="up">
                                        <div className="grid md:grid-cols-2 gap-3">
                                            <div className="p-4 lg:p-5 bg-rose-900/20 rounded-xl border border-rose-800/40 flex gap-3 items-start">
                                                <XCircle className="text-rose-300 shrink-0 mt-0.5" size={18} />
                                                <p className="text-rose-200 font-medium text-sm">MITO: {myth.m}</p>
                                            </div>
                                            <div className="p-4 lg:p-5 bg-emerald-900/20 rounded-xl border border-emerald-800/40 flex gap-3 items-start">
                                                <CheckCircle2 className="text-emerald-300 shrink-0 mt-0.5" size={18} />
                                                <p className="text-emerald-200 font-medium text-sm">VERDADE: {myth.v}</p>
                                            </div>
                                        </div>
                                    </AnimatedSection>
                                ))}
                            </div>
                        </div>

                        {/* Steps */}
                        <AnimatedSection direction="up">
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                                {STEPS.map((step, index) => (
                                    <AnimatedSection key={step.i} delay={index * 0.08}>
                                        <Card className="group h-full flex flex-col items-center text-center">
                                            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary font-bold text-lg mb-5 group-hover:scale-110 transition-transform duration-500">
                                                {step.i}
                                            </div>
                                            <h4 className="text-base font-bold text-white mb-3 group-hover:text-secondary transition-colors duration-500 min-h-[2.5rem] flex items-center justify-center">
                                                {step.t}
                                            </h4>
                                            <p className="text-slate-300 leading-relaxed text-sm">
                                                {step.d}
                                            </p>
                                        </Card>
                                    </AnimatedSection>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HypnotherapySection;
