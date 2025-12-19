import React from 'react';
import { ViewState } from '../../types';
import { Instagram, MessageCircle, Phone, MapPin } from 'lucide-react';

interface FooterProps {
    onNavigate: (id: ViewState) => void;
}

const Footer = ({ onNavigate }: FooterProps) => {
    return (
        <footer className="bg-primary dark:bg-slate-950 text-white py-20 px-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-secondary font-serif text-2xl">X</div>
                        <span className="font-serif text-xl font-bold tracking-tight">Xavier<span className="text-secondary">Hipnose</span></span>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">
                        Transformando vidas através do poder do subconsciente. Atendimento ético, profissional e humanizado.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://www.instagram.com/filipexavier.of?igsh=c3QzZ3p6YTUxMjM3&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href="https://wa.me/5577988672210" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors">
                            <MessageCircle size={20} />
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-lg">Navegação</h4>
                    <ul className="space-y-4 text-white/50 text-sm">
                        <li><button onClick={() => onNavigate('home')} className="hover:text-secondary transition-colors">Início</button></li>
                        <li><button onClick={() => onNavigate('hipnose')} className="hover:text-secondary transition-colors">A Hipnoterapia</button></li>
                        <li><button onClick={() => onNavigate('servicos')} className="hover:text-secondary transition-colors">Tratamentos</button></li>
                        <li><button onClick={() => onNavigate('sobre')} className="hover:text-secondary transition-colors">O Profissional</button></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-lg">Contatos</h4>
                    <ul className="space-y-4 text-white/50 text-sm">
                        <li className="flex items-center gap-3">
                            <Phone size={16} className="text-secondary" />
                            <a href="https://wa.me/5577988672210" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                                (77) 98867-2210
                            </a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Instagram size={16} className="text-secondary" />
                            <a href="https://www.instagram.com/filipexavier.of?igsh=c3QzZ3p6YTUxMjM3&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                                @filipexavier.of
                            </a>
                        </li>
                        <li className="flex items-center gap-3">
                            <MapPin size={16} className="text-secondary" />
                            <span>Vitória da Conquista, BA</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
                    <p className="text-white/50 text-sm mb-4">Receba dicas de saúde mental.</p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Seu e-mail"
                            className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-secondary w-full"
                        />
                        <button className="bg-secondary text-primary px-4 py-2 rounded-full font-bold text-sm">OK</button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-white/5 text-center text-white/20 text-xs">
                <p>&copy; {new Date().getFullYear()} Xavier Hipnose. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
