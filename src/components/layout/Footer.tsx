import React from 'react';
import { ViewState } from '../../types';
import { Instagram, MessageCircle, Phone, MapPin } from 'lucide-react';

interface FooterProps {
    onNavigate: (id: ViewState) => void;
}

const Footer = ({ onNavigate }: FooterProps) => {
    return (
        <footer className="bg-primary dark:bg-slate-950 text-white py-20 px-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-12 gap-12 md:gap-8">
                    {/* Branding Section - Larger */}
                    <div className="md:col-span-5 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-secondary font-serif text-2xl">X</div>
                            <span className="font-serif text-xl font-bold tracking-tight">Xavier<span className="text-secondary">Hipnose</span></span>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                            Transformando vidas através do poder do subconsciente. Atendimento ético, profissional e humanizado.
                        </p>
                        <div className="flex gap-3">
                            <a href="https://www.instagram.com/filipexavier.of?igsh=c3QzZ3p6YTUxMjM3&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all hover:scale-110" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="https://wa.me/5577988672210" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all hover:scale-110" aria-label="WhatsApp">
                                <MessageCircle size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Section */}
                    <div className="md:col-span-3">
                        <h4 className="font-bold mb-6 text-lg text-white">Navegação</h4>
                        <ul className="space-y-3 text-white/60 text-sm">
                            <li><button onClick={() => onNavigate('home')} className="hover:text-secondary transition-colors hover:translate-x-1 inline-block">Início</button></li>
                            <li><button onClick={() => onNavigate('hipnose')} className="hover:text-secondary transition-colors hover:translate-x-1 inline-block">A Hipnoterapia</button></li>
                            <li><button onClick={() => onNavigate('servicos')} className="hover:text-secondary transition-colors hover:translate-x-1 inline-block">Tratamentos</button></li>
                            <li><button onClick={() => onNavigate('sobre')} className="hover:text-secondary transition-colors hover:translate-x-1 inline-block">O Profissional</button></li>
                            <li><button onClick={() => onNavigate('contato')} className="hover:text-secondary transition-colors hover:translate-x-1 inline-block">Contato</button></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="md:col-span-4">
                        <h4 className="font-bold mb-6 text-lg text-white">Contato</h4>
                        <ul className="space-y-4 text-white/60 text-sm">
                            <li className="flex items-start gap-3">
                                <Phone size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                                <a href="https://wa.me/5577988672210" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                                    (77) 98867-2210
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Instagram size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                                <a href="https://www.instagram.com/filipexavier.of?igsh=c3QzZ3p6YTUxMjM3&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                                    @filipexavier.of
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                                <span>Vitória da Conquista, BA</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-white/5 text-center text-white text-sm">
                <p>&copy; 2025 Filipe Xavier - Hipnose Clínica. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
