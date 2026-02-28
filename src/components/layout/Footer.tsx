import React from 'react';
import { ViewState } from '../../types';
import { Instagram, MessageCircle, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface FooterProps {
    onNavigate: (id: ViewState) => void;
}

const Footer = ({ onNavigate }: FooterProps) => {
    const { isHybrid } = useTheme();

    return (
        <div className={isHybrid ? 'dark' : ''}>
            <footer className="bg-primary dark:bg-slate-950 text-white py-20 px-6 transition-colors duration-300">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-12 gap-12 md:gap-8">
                        {/* Branding */}
                        <div className="md:col-span-5 space-y-6">
                            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
                                <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary font-serif text-xl font-bold">X</div>
                                <span className="font-serif text-lg font-bold tracking-tight">Xavier<span className="text-secondary">Hipnose</span></span>
                            </div>
                            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                                Transformando vidas atraves do poder do subconsciente. Atendimento etico, profissional e humanizado.
                            </p>
                            <div className="flex gap-3">
                                <a href="https://www.instagram.com/filipexavier.of?igsh=c3QzZ3p6YTUxMjM3&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-secondary hover:text-primary hover:border-secondary transition-all duration-300" aria-label="Instagram">
                                    <Instagram size={18} />
                                </a>
                                <a href="https://wa.me/5577988672210" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-secondary hover:text-primary hover:border-secondary transition-all duration-300" aria-label="WhatsApp">
                                    <MessageCircle size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="md:col-span-3">
                            <h4 className="font-semibold mb-6 text-sm text-white/80 uppercase tracking-wider">Navegacao</h4>
                            <ul className="space-y-3 text-white/50 text-sm">
                                <li><button onClick={() => onNavigate('home')} className="hover:text-secondary transition-colors duration-300 hover:translate-x-1 inline-block">Inicio</button></li>
                                <li><button onClick={() => onNavigate('hipnose')} className="hover:text-secondary transition-colors duration-300 hover:translate-x-1 inline-block">A Hipnoterapia</button></li>
                                <li><button onClick={() => onNavigate('servicos')} className="hover:text-secondary transition-colors duration-300 hover:translate-x-1 inline-block">Tratamentos</button></li>
                                <li><button onClick={() => onNavigate('sobre')} className="hover:text-secondary transition-colors duration-300 hover:translate-x-1 inline-block">O Profissional</button></li>
                                <li><button onClick={() => onNavigate('contato')} className="hover:text-secondary transition-colors duration-300 hover:translate-x-1 inline-block">Contato</button></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="md:col-span-4">
                            <h4 className="font-semibold mb-6 text-sm text-white/80 uppercase tracking-wider">Contato</h4>
                            <ul className="space-y-4 text-white/50 text-sm">
                                <li className="flex items-start gap-3">
                                    <Phone size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                                    <a href="https://wa.me/5577988672210" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors duration-300">
                                        (77) 98867-2210
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Instagram size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                                    <a href="https://www.instagram.com/filipexavier.of?igsh=c3QzZ3p6YTUxMjM3&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors duration-300">
                                        @filipexavier.of
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <MapPin size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                                    <span>Vitoria da Conquista, BA</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider + copyright */}
                <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-white/[0.06] text-center text-white/30 text-xs">
                    <p>2025 Filipe Xavier - Hipnose Clinica. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
