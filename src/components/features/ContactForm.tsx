import React, { useState } from 'react';
import Button from '../ui/Button';
import { Send } from 'lucide-react';

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const text = `Olá, meu nome é ${formData.name}. ${formData.message}`;
        window.open(`https://wa.me/5577988672210?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-primary dark:text-white ml-4">Nome Completo</label>
                <input
                    required
                    type="text"
                    placeholder="Como posso te chamar?"
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-full px-8 py-4 focus:outline-none focus:border-secondary transition-colors dark:text-white"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-primary dark:text-white ml-4">E-mail</label>
                <input
                    required
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-full px-8 py-4 focus:outline-none focus:border-secondary transition-colors dark:text-white"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-primary dark:text-white ml-4">Como posso ajudar?</label>
                <textarea
                    required
                    rows={4}
                    placeholder="Conte um pouco sobre o que você busca superar..."
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-[2rem] px-8 py-6 focus:outline-none focus:border-secondary transition-colors resize-none dark:text-white"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
            </div>
            <Button type="submit" variant="primary" size="lg" className="w-full" rightIcon={<Send size={20} />}>
                Enviar Via WhatsApp
            </Button>
            <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                Prometemos responder em até 24 horas úteis.
            </p>
        </form>
    );
};

export default ContactForm;