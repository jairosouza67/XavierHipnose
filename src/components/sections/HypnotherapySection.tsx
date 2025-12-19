import React from 'react';
import SectionHeading from './SectionHeading';
import AnimatedSection from '../ui/AnimatedSection';
import Card from '../ui/Card';
import { ShieldCheck, XCircle, CheckCircle2 } from 'lucide-react';
import { Myth } from '../../types';

const MYTHS: Myth[] = [
    { m: 'Você perde o controle da mente', v: 'Você está no controle total e pode sair do estado quando desejar.' },
    { m: 'Você pode ficar preso na hipnose', v: 'Impossível. É um estado natural de foco, como ler um livro.' },
    { m: 'Diz segredos que não quer contar', v: 'Você nunca dirá algo que não diria em estado normal.' },
];

const HypnotherapySection = () => {
    return (
        <section id="hipnose" className="py-32 bg-white">
            <div className="max-w-4xl mx-auto px-6 space-y-24">
                <div className="text-center space-y-8">
                    <SectionHeading subtitle="Educação" title="O que é Hipnose Clínica?" />
                    <p className="text-xl text-slate-500 leading-relaxed font-medium">
                        É um conjunto de técnicas que, por meio de intenso relaxamento, concentração e/ou foco, induz a pessoa a alcançar um estado de consciência aumentado que permita alterar uma ampla gama de condições ou comportamentos indesejados, como: ansiedade, medos, fobias, insônia, depressão, angústia, estresse, vícios e dores crônicas.
                    </p>
                </div>

                <div className="space-y-12">
                    <h3 className="text-3xl font-serif text-primary text-center">O que acontece no cérebro, segundo a neurociência?</h3>
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                        <p className="text-lg text-slate-600 leading-relaxed mb-6">
                            Durante a hipnose, há uma mudança temporária na forma como o cérebro filtra informações:
                        </p>
                        <ul className="space-y-4 text-slate-600">
                            <li className="flex gap-3">
                                <span className="text-secondary font-bold">•</span>
                                <span>O <strong>córtex pré-frontal</strong> (relacionado ao controle e julgamento) relaxa.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-secondary font-bold">•</span>
                                <span>O <strong>sistema límbico</strong> (emoções e memória) se torna mais acessível.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-secondary font-bold">•</span>
                                <span>As áreas de <strong>atenção e imaginação</strong> ficam mais ativas.</span>
                            </li>
                        </ul>
                        <p className="text-lg text-slate-600 leading-relaxed mt-6">
                            Isso permite que a pessoa explore pensamentos e memórias com menos resistência emocional e mais abertura para novas associações. Por isso, a hipnoterapia facilita reprogramar padrões automáticos, como ansiedade, medos, compulsões ou crenças limitantes.
                        </p>
                    </div>

                    <div className="bg-primary text-white p-8 rounded-3xl">
                        <h4 className="text-2xl font-serif mb-4">É como se a mente entrasse em um modo de "reedição interna"</h4>
                        <p className="text-white/90 text-lg leading-relaxed">
                            Você revê uma experiência antiga (ou uma emoção atual) de outro ângulo e grava uma nova resposta sem a carga emocional envolvida.
                        </p>
                    </div>

                    <div className="bg-amber-50 border-l-4 border-secondary p-6 rounded-2xl">
                        <p className="text-primary font-bold mb-2">Exemplo prático:</p>
                        <p className="text-slate-600 leading-relaxed">
                            Uma pessoa que reage com pânico ao falar em público pode, em hipnose, simular a situação de forma segura, treinar uma resposta e um caminho calmo para o cérebro interpretar "essa cena" e depois levar isso para o mundo real.
                        </p>
                    </div>
                </div>

                <div className="space-y-12">
                    <h3 className="text-3xl font-serif text-primary text-center">Estudos que comprovam a eficácia da hipnoterapia</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <a 
                            href="https://www.jornaldahipnose.com/hipnose/hipnose-clinica-eficaz/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-secondary hover:shadow-lg transition-all group"
                        >
                            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                                <ShieldCheck className="text-secondary" size={24} />
                            </div>
                            <h4 className="font-bold text-primary mb-2 group-hover:text-secondary transition-colors">Jornal da Hipnose</h4>
                            <p className="text-sm text-slate-500">Pesquisas sobre eficácia da hipnose clínica</p>
                        </a>
                        
                        <a 
                            href="https://pubmed.ncbi.nlm.nih.gov/31251710/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-secondary hover:shadow-lg transition-all group"
                        >
                            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                                <ShieldCheck className="text-secondary" size={24} />
                            </div>
                            <h4 className="font-bold text-primary mb-2 group-hover:text-secondary transition-colors">PubMed</h4>
                            <p className="text-sm text-slate-500">Estudos científicos internacionais</p>
                        </a>
                        
                        <a 
                            href="https://www.gov.br/saude/pt-br/composicao/saps/pics/recursos-teraupeticos/hipnoterapia" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-secondary hover:shadow-lg transition-all group"
                        >
                            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                                <ShieldCheck className="text-secondary" size={24} />
                            </div>
                            <h4 className="font-bold text-primary mb-2 group-hover:text-secondary transition-colors">Gov.br - PICS</h4>
                            <p className="text-sm text-slate-500">Práticas Integrativas reconhecidas pelo Ministério da Saúde</p>
                        </a>
                    </div>
                </div>

                <div className="space-y-12">
                    <h3 className="text-3xl font-serif text-primary text-center">Mitos vs Verdades</h3>
                    <div className="grid gap-6">
                        {MYTHS.map((myth, i) => (
                            <AnimatedSection key={i} delay={i * 0.1} direction="up">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100 flex gap-4">
                                        <XCircle className="text-rose-500 shrink-0" />
                                        <p className="text-rose-900 font-bold text-sm">MITO: {myth.m}</p>
                                    </div>
                                    <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-4">
                                        <CheckCircle2 className="text-emerald-500 shrink-0" />
                                        <p className="text-emerald-900 font-bold text-sm">VERDADE: {myth.v}</p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>

                <AnimatedSection direction="up">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { i: 1, t: 'Foco e Relaxamento', d: 'Estado guiado de relaxamento mantendo total controle.' },
                            { i: 2, t: 'Acesso Direto', d: 'Comunicação com a parte que gera respostas automáticas.' },
                            { i: 3, t: 'Dessensibilização', d: 'Eliminação da carga emocional e corporal ligada a um gatilho/memória, sem apagar a memória.' },
                            { i: 4, t: 'Ressignificação', d: 'Mudança de percepção e eliminação de gatilhos.' },
                        ].map((step, index) => (
                            <AnimatedSection key={step.i} delay={index * 0.1}>
                                <Card className="group h-full flex flex-col">
                                    <div className="flex justify-center mb-6">
                                        <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-primary font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
                                            {step.i}
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-bold text-primary mb-4 text-center group-hover:text-secondary transition-colors duration-500 min-h-[3.5rem] flex items-center justify-center">
                                        {step.t}
                                    </h4>
                                    <p className="text-slate-500 leading-relaxed text-center text-sm">
                                        {step.d}
                                    </p>
                                </Card>
                            </AnimatedSection>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default HypnotherapySection;
