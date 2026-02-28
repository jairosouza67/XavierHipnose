import React from 'react';
import SectionHeading from './SectionHeading';
import AnimatedSection from '../ui/AnimatedSection';
import ContactForm from '../features/ContactForm';
import { MapPin, Phone, Instagram, ArrowRight } from 'lucide-react';

const ContactSection = () => {
    return (
        <section id="contato" className="py-28 lg:py-36 bg-cream dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
                    <AnimatedSection direction="left">
                        <div className="space-y-12">
                            <div>
                                <SectionHeading subtitle="Contato" title="Vamos conversar?" align="left" />
                                <p className="text-[var(--color-text-muted)] dark:text-slate-300 mt-8 text-lg leading-relaxed">
                                    Tire suas duvidas ou agende sua primeira sessao. Atendimento presencial em Vitoria da Conquista, BA.
                                </p>
                                <div className="mt-8">
                                    <a 
                                        href="https://wa.me/5577988672210"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#20BD5A] transition-all duration-300 shadow-lg hover:shadow-xl text-base group"
                                    >
                                        <Phone size={20} />
                                        Agende sua consulta inicial
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                                <p className="text-primary dark:text-white font-serif italic text-lg mt-8 leading-relaxed">
                                    Lembre-se: dentro de voce existe um TRONO.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { icon: MapPin, title: 'Endereco', d: 'Vitoria da Conquista, BA - Brasil', link: null },
                                    { icon: Phone, title: 'WhatsApp', d: '(77) 98867-2210', link: 'https://wa.me/5577988672210' },
                                    { icon: Instagram, title: 'Instagram', d: '@filipexavier.of', link: 'https://www.instagram.com/filipexavier.of?igsh=c3QzZ3p6YTUxMjM3&utm_source=qr' },
                                ].map((item, i) => (
                                    <AnimatedSection key={i} delay={i * 0.1}>
                                        <div className="flex gap-5 items-center group">
                                            {item.link ? (
                                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex gap-5 items-center w-full">
                                                    <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-secondary border border-[var(--color-border-light)] dark:border-slate-700 group-hover:bg-secondary group-hover:text-primary group-hover:border-secondary transition-all duration-300">
                                                        <item.icon size={22} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-primary dark:text-white text-sm">{item.title}</h4>
                                                        <p className="text-[var(--color-text-muted)] dark:text-slate-400 text-sm">{item.d}</p>
                                                    </div>
                                                </a>
                                            ) : (
                                                <>
                                                    <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-secondary border border-[var(--color-border-light)] dark:border-slate-700 transition-all duration-300">
                                                        <item.icon size={22} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-primary dark:text-white text-sm">{item.title}</h4>
                                                        <p className="text-[var(--color-text-muted)] dark:text-slate-400 text-sm">{item.d}</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </AnimatedSection>
                                ))}
                            </div>

                            <div className="h-56 rounded-2xl overflow-hidden border border-[var(--color-border-light)] dark:border-slate-700">
                                <iframe
                                    title="Mapa"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62057.94064505963!2d-40.857643!3d-14.861788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x746016c56b000001%3A0x868b1a32a68846c4!2sVit%C3%B3ria%20da%20Conquista%2C%20BA!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr"
                                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection direction="right" delay={0.2}>
                        <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl border border-[var(--color-border-light)] dark:border-slate-700 shadow-[var(--shadow-lg)]">
                            <ContactForm />
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
