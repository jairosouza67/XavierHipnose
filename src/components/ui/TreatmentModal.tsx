import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface TreatmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    icon: React.ReactNode;
    description: string;
    detailedInfo: {
        howItHelps: string;
        benefits: string[];
        duration?: string;
    };
}

const TreatmentModal: React.FC<TreatmentModalProps> = ({
    isOpen,
    onClose,
    title,
    icon,
    description,
    detailedInfo,
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                    aria-label="Fechar modal"
                >
                    <X size={20} />
                </button>

                {/* Content */}
                <div className="p-8 md:p-12">
                    {/* Icon */}
                    <div className="w-20 h-20 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 text-secondary">
                        {icon}
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl font-serif font-bold text-primary dark:text-white mb-4">
                        {title}
                    </h2>

                    {/* Short Description */}
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                        {description}
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-slate-200 dark:bg-slate-700 mb-8" />

                    {/* How It Helps */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-serif font-bold text-primary dark:text-white mb-4">
                            Como a hipnoterapia ajuda
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {detailedInfo.howItHelps}
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-serif font-bold text-primary dark:text-white mb-4">
                            Benefícios esperados
                        </h3>
                        <ul className="space-y-3">
                            {detailedInfo.benefits.map((benefit, index) => (
                                <li key={index} className="flex gap-3 text-slate-600 dark:text-slate-300">
                                    <span className="text-secondary font-bold mt-1">✓</span>
                                    <span className="leading-relaxed">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Duration (if provided) */}
                    {detailedInfo.duration && (
                        <div className="bg-amber-50 dark:bg-amber-900/30 border-l-4 border-secondary p-6 rounded-2xl">
                            <p className="text-primary dark:text-white font-bold mb-2">
                                Duração do tratamento
                            </p>
                            <p className="text-slate-600 dark:text-slate-300">
                                {detailedInfo.duration}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TreatmentModal;
