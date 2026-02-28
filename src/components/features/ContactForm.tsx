import React, { useState } from 'react';
import Button from '../ui/Button';
import { Send } from 'lucide-react';

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const text = `Ola, meu nome e ${formData.name}. ${formData.message}`;
        window.open(`https://wa.me/5577988672210?text=${encodeURIComponent(text)}`, '_blank');
    };

    const inputClasses = "w-full bg-cream dark:bg-slate-700 border border-[var(--color-border)] dark:border-slate-600 rounded-xl px-5 py-4 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 transition-all duration-300 dark:text-white text-primary placeholder:text-[var(--color-text-muted)]";

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-2xl font-serif font-bold text-primary dark:text-white mb-2">Envie sua mensagem</h3>
            <p className="text-[var(--color-text-muted)] dark:text-slate-400 text-sm mb-6">Preencha o formulario abaixo e entraremos em contato.</p>
            
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--color-text-secondary)] dark:text-white/70 uppercase tracking-wider ml-1">Nome Completo</label>
                <input
                    required
                    type="text"
                    placeholder="Como posso te chamar?"
                    className={inputClasses}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--color-text-secondary)] dark:text-white/70 uppercase tracking-wider ml-1">E-mail</label>
                <input
                    required
                    type="email"
                    placeholder="seu@email.com"
                    className={inputClasses}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--color-text-secondary)] dark:text-white/70 uppercase tracking-wider ml-1">Como posso ajudar?</label>
                <textarea
                    required
                    rows={4}
                    placeholder="Conte um pouco sobre o que voce busca superar..."
                    className={`${inputClasses} rounded-2xl resize-none`}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
            </div>
            <Button type="submit" variant="primary" size="lg" className="w-full" rightIcon={<Send size={18} />}>
                Enviar Via WhatsApp
            </Button>
            <p className="text-center text-xs text-[var(--color-text-muted)] dark:text-slate-500">
                Prometemos responder em ate 24 horas uteis.
            </p>
        </form>
    );
};

export default ContactForm;
