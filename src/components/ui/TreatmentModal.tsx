import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import type { TreatmentSection } from '../../content/treatmentContent';

interface TreatmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    icon: React.ReactNode;
    description: string;
    sections: TreatmentSection[];
}

const TreatmentModal: React.FC<TreatmentModalProps> = ({
    isOpen,
    onClose,
    title,
    icon,
    description,
    sections,
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

                    {/* Sections (original PDF content) */}
                    <div className="space-y-10">
                        {sections.map((section, index) => (
                            <div key={`${section.title}-${index}`}>
                                <h3 className="text-2xl font-serif font-bold text-primary dark:text-white mb-4">
                                    {section.title}
                                </h3>
                                <div className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                    {section.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreatmentModal;
