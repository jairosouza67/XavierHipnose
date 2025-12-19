import React from 'react';
import SectionHeading from './SectionHeading';
import AnimatedSection from '../ui/AnimatedSection';
import ContactForm from '../features/ContactForm';
import { MapPin, Phone, Instagram } from 'lucide-react';

const ContactSection = () => {
    return (
        <section id="contato" className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20">
                    <AnimatedSection direction="left">
                        <div className="space-y-12">
                            <div>
                                <SectionHeading subtitle="Contato" title="Vamos conversar?" />
                                <p className="text-slate-500 mt-8 text-lg">
                                    Tire suas dúvidas ou agende sua primeira sessão. Atendimento presencial em Vitória da Conquista e online para todo o mundo.
                                </p>
                                <div className="mt-8">
                                    <a 
                                        href="https://wa.me/5577988672210"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:bg-[#20BD5A] transition-all hover:gap-4 shadow-lg hover:shadow-xl text-lg"
                                    >
                                        <Phone size={24} />
                                        Agende sua consulta inicial
                                    </a>
                                </div>
                                <p className="text-primary font-semibold text-lg mt-8 italic">
                                    Lembre-se: dentro de você existe um TRONO. Você é o REI/RAINHA do seu Império.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { icon: MapPin, title: 'Endereço', d: 'Vitória da Conquista, BA - Brasil', link: null },
                                    { icon: Phone, title: 'WhatsApp', d: '(77) 98867-2210', link: 'https://wa.me/5577988672210' },
                                    { icon: Instagram, title: 'Instagram', d: '@filipexavier.of', link: 'https://www.instagram.com/filipexavier.of?igsh=c3QzZ3p6YTUxMjM3&utm_source=qr' },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-center group">
                                        {item.link ? (
                                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex gap-6 items-center w-full">
                                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-secondary transition-all duration-300">
                                                    <item.icon size={28} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-primary">{item.title}</h4>
                                                    <p className="text-slate-500">{item.d}</p>
                                                </div>
                                            </a>
                                        ) : (
                                            <>
                                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-secondary transition-all duration-300">
                                                    <item.icon size={28} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-primary">{item.title}</h4>
                                                    <p className="text-slate-500">{item.d}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="h-64 rounded-[2.5rem] overflow-hidden shadow-xl border-8 border-slate-50">
                                <iframe
                                    title="Mapa"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62057.94064505963!2d-40.857643!3d-14.861788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x746016c56b000001%3A0x868b1a32a68846c4!2sVit%C3%B3ria%20da%20Conquista%2C%20BA!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr"
                                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection direction="right" delay={0.2}>
                        <div className="bg-slate-50 p-10 md:p-14 rounded-[3.5rem] border border-slate-100 shadow-sm">
                            <ContactForm />
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
