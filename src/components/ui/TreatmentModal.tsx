import React, { useEffect, useId, useRef } from 'react';
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

const WHATSAPP_URL = 'https://wa.me/5577988672210';

const stripCtaMarkers = (content: string) => {
    const hasMarker = content.includes('🔘') || content.includes('👉');

    const cleaned = content
        .replace(/\n?\s*🔘\s*Botão\s*:\s*\n?/g, '\n')
        .replace(/\n?\s*👉\s*Agendar\s*(Avaliação|Sessão)\s*\n?/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

    return { cleaned, hadCta: hasMarker && cleaned !== content };
};

const normalizePdfText = (raw: string) => {
    // Keep tone, fix layout: remove mid-sentence line breaks from PDF extraction,
    // preserve paragraphs and bullet lists.
    const text = raw.replace(/\r\n/g, '\n');

    const isNumbered = (line: string) => /^\d+\./.test(line);
    const isBullet = (line: string) => /^-\s+/.test(line);
    const isLooseBullet = (line: string) => /^[o•]\s+/.test(line);

    const out: string[] = [];
    let paragraph: string[] = [];
    let lastWasListItem = false;

    const flushParagraph = () => {
        if (!paragraph.length) return;
        const joined = paragraph.join(' ');
        out.push(
            joined
                // Fix word breaks from PDFs: "neuro-\nbiológica" -> "neurobiológica"
                .replace(/([A-Za-zÀ-ÖØ-öø-ÿ])-\s+([A-Za-zÀ-ÖØ-öø-ÿ])/g, '$1$2')
                .replace(/\s+/g, ' ')
                .trim(),
        );
        paragraph = [];
    };

    for (const rawLine of text.split('\n')) {
        let line = rawLine.trim();

        if (!line) {
            flushParagraph();
            // avoid stacking too many blank lines
            if (out.length && out[out.length - 1] !== '') out.push('');
            lastWasListItem = false;
            continue;
        }

        // Fix a common PDF artifact where a bullet becomes "o "
        if (isLooseBullet(line)) {
            line = line.replace(/^[o•]\s+/, '- ');
        }

        // Fix a common artifact: "- 4. Título" should be "4. Título"
        line = line.replace(/^[-–—]\s*(\d+\.)\s+/, '$1 ');

        const isNumberedHeading = () => {
            if (!isNumbered(line)) return false;
            // Treat as heading if the next content is a bullet list (common in PDFs)
            return false;
        };

        if (isBullet(line) || isNumbered(line)) {
            flushParagraph();
            out.push(line);
            lastWasListItem = true;
            continue;
        }

        // Some lines are effectively headings inside the same section.
        // Keep them as their own line for readability.
        if (/^(Quais\s+são\s+os\s+sintomas\s+mais\s+comuns\?|Tipos\s+comuns\b|⚠|⚠️|🔘|👉)/.test(line)) {
            flushParagraph();
            out.push(line);
            lastWasListItem = false;
            continue;
        }

        // If a bullet/numbered item wrapped to the next line in the PDF, attach it.
        if (lastWasListItem && out.length) {
            out[out.length - 1] = `${out[out.length - 1]} ${line}`.replace(/\s+/g, ' ').trim();
            continue;
        }

        paragraph.push(line);
        lastWasListItem = false;
    }

    flushParagraph();

    let normalized = out
        .join('\n')
        // Normalize excessive blank lines
        .replace(/\n{3,}/g, '\n\n')
        // Keep lists tight (avoid empty lines inside lists)
        .replace(/\n\n(-\s+)/g, '\n$1')
        .replace(/\n\n(\d+\.)\s+/g, '\n$1 ')
        // Fix spacing before punctuation
        .replace(/\s+([,.;:!?])/g, '$1')
        .replace(/\(\s+/g, '(')
        .replace(/\s+\)/g, ')')
        // Fix some common spacing typos from extraction
        .replace(/\s+,/g, ',')
        .replace(/\s+\./g, '.')
        // Keep double dots when author uses it (".."), but remove accidental 3+ dots
        .replace(/\.{4,}/g, '...')
        .trim();

    // Targeted tiny fixes (keep informal tone)
    normalized = normalized
        .replace(/ansiosona\s+,/gi, 'ansiosona,')
        .replace(/ansiosão\s+,/gi, 'ansiosão,');

    return normalized;
};

const mergeBrokenSectionTitles = (sections: Array<TreatmentSection & { _hadCta?: boolean }>) => {
    const merged: Array<TreatmentSection & { _hadCta?: boolean }> = [];

    for (const section of sections) {
        const title = section.title.trim();
        const content = section.content ?? '';

        const [firstLineRaw, ...restLines] = content.split('\n');
        const firstLine = (firstLineRaw ?? '').trim();
        const rest = restLines.join('\n').trimStart();

        const isShortContinuation = firstLine.length > 0 && firstLine.length <= 22;
        const startsLowercase = /^[a-zà-ÿ]/i.test(firstLine) && /^[a-zà-ÿ]/.test(firstLine);
        const looksLikeSingleWordOrQuestion = /^[a-zà-ÿ]+[?.!]?$/.test(firstLine);

        // Common PDF split: title ends with "... sistema" and content starts with "nervoso.";
        // or title ends with "... medos e" and content starts with "fobias?".
        if (isShortContinuation && (startsLowercase || looksLikeSingleWordOrQuestion)) {
            merged.push({
                ...section,
                title: `${title} ${firstLine}`.replace(/\s+/g, ' ').trim(),
                content: rest,
            });
            continue;
        }

        merged.push({ ...section, title, content });
    }

    return merged;
};

const splitBoldSegments = (text: string): React.ReactNode[] => {
    // Very small inline formatter: **bold**
    const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
    return parts.map((part, idx) => {
        const isBold = part.startsWith('**') && part.endsWith('**') && part.length > 4;
        if (!isBold) return <React.Fragment key={idx}>{part}</React.Fragment>;
        return <strong key={idx}>{part.slice(2, -2)}</strong>;
    });
};

const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');

    const blocks: React.ReactNode[] = [];
    let paragraph: string[] = [];
    let listType: 'ul' | 'ol' | null = null;
    let listItems: string[] = [];

    const flushParagraph = () => {
        if (!paragraph.length) return;
        const text = paragraph.join(' ').replace(/\s+/g, ' ').trim();
        if (text) {
            blocks.push(
                <p key={`p-${blocks.length}`} className="leading-relaxed">
                    {splitBoldSegments(text)}
                </p>,
            );
        }
        paragraph = [];
    };

    const flushList = () => {
        if (!listType || !listItems.length) {
            listType = null;
            listItems = [];
            return;
        }

        const Tag = listType === 'ul' ? 'ul' : 'ol';
        blocks.push(
            <Tag
                key={`list-${blocks.length}`}
                className={
                    listType === 'ul'
                        ? 'list-disc pl-6 space-y-1'
                        : 'list-decimal pl-6 space-y-1'
                }
            >
                {listItems.map((item, idx) => (
                    <li key={idx}>{splitBoldSegments(item)}</li>
                ))}
            </Tag>,
        );

        listType = null;
        listItems = [];
    };

    const isHeadingLine = (line: string) => {
        if (!line) return false;
        if (line.startsWith('⚠') || line.startsWith('⚠️')) return true;
        if (/^(Quais\s+são\s+os\s+sintomas\s+mais\s+comuns\?|Tipos\s+comuns\b)/i.test(line)) return true;
        if (line === 'À noite' || line === 'Durante o dia') return true;
        if (/^Sintomas\b/i.test(line)) return true;
        if (line.endsWith(':') && line.length <= 80) return true;
        return false;
    };

    const nextNonEmptyLine = (startIdx: number) => {
        for (let i = startIdx + 1; i < lines.length; i++) {
            const next = lines[i].trim();
            if (next) return next;
        }
        return '';
    };

    for (let i = 0; i < lines.length; i++) {
        const raw = lines[i] ?? '';
        const line = raw.trim();

        if (!line) {
            flushParagraph();
            flushList();
            continue;
        }

        const bulletMatch = line.match(/^[-–—]\s+(.*)$/);
        if (bulletMatch) {
            flushParagraph();
            if (listType && listType !== 'ul') flushList();
            listType = 'ul';
            listItems.push(bulletMatch[1].trim());
            continue;
        }

        const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/);
        if (numberedMatch) {
            // Treat as heading when it introduces a category followed by bullets.
            const next = nextNonEmptyLine(i);
            const looksLikeCategory = !!next && /^[-–—]\s+/.test(next);
            if (looksLikeCategory) {
                flushParagraph();
                flushList();
                blocks.push(
                    <p
                        key={`h-${blocks.length}`}
                        className="font-semibold text-slate-700 dark:text-slate-200 leading-relaxed"
                    >
                        {splitBoldSegments(line)}
                    </p>,
                );
                continue;
            }

            flushParagraph();
            if (listType && listType !== 'ol') flushList();
            listType = 'ol';
            listItems.push(numberedMatch[2].trim());
            continue;
        }

        // Continuation of the last list item (common in PDFs)
        if (listType && listItems.length && !isHeadingLine(line)) {
            const prev = listItems[listItems.length - 1] ?? '';
            listItems[listItems.length - 1] = `${prev} ${line}`.replace(/\s+/g, ' ').trim();
            continue;
        }

        if (isHeadingLine(line)) {
            flushParagraph();
            flushList();
            blocks.push(
                <p
                    key={`h-${blocks.length}`}
                    className="font-semibold text-slate-700 dark:text-slate-200 leading-relaxed"
                >
                    {splitBoldSegments(line)}
                </p>,
            );
            continue;
        }

        paragraph.push(line);
    }

    flushParagraph();
    flushList();

    return <div className="space-y-3">{blocks}</div>;
};

const TreatmentModal: React.FC<TreatmentModalProps> = ({
    isOpen,
    onClose,
    title,
    icon,
    description,
    sections,
}) => {
    const titleId = useId();
    const descriptionId = useId();
    const modalRef = useRef<HTMLDivElement | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);
    const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

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
        if (!isOpen) return;

        previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;
        // Focus the close button for keyboard users.
        const t = window.setTimeout(() => {
            closeButtonRef.current?.focus();
        }, 0);

        return () => {
            window.clearTimeout(t);
            previouslyFocusedElementRef.current?.focus?.();
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

    const processedSections = mergeBrokenSectionTitles(
        sections.map((section) => {
        const { cleaned, hadCta } = stripCtaMarkers(section.content);
        return {
            ...section,
            title: section.title.trim(),
            content: normalizePdfText(cleaned),
            _hadCta: hadCta,
        };
        }),
    );

    const showCta = processedSections.some((s) => s._hadCta);

    const handleModalKeyDown = (e: React.KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        const root = modalRef.current;
        if (!root) return;

        const focusable = Array.from(
            root.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
        ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
            if (!active || active === first || !root.contains(active)) {
                e.preventDefault();
                last.focus();
            }
            return;
        }

        if (active === last) {
            e.preventDefault();
            first.focus();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto overscroll-contain flex flex-col animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={handleModalKeyDown}
            >
                {/* Sticky Header */}
                <div className="sticky top-0 z-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-700">
                    <div className="px-6 py-5 md:px-10 md:py-6 flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                            {icon}
                        </div>

                        <div className="min-w-0 flex-1">
                            <h2
                                id={titleId}
                                className="text-2xl md:text-3xl font-serif font-bold text-primary dark:text-white leading-tight"
                            >
                                {title}
                            </h2>
                            <p id={descriptionId} className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                                {description}
                            </p>
                        </div>

                        <button
                            ref={closeButtonRef}
                            onClick={onClose}
                            className="mt-1 w-9 h-9 flex items-center justify-center rounded-full text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800"
                            aria-label="Fechar modal"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="min-h-0 flex-1">
                    <div className="p-6 md:p-10">
                        <div className="grid gap-10 md:grid-cols-[320px_1fr]">
                            {/* Left rail (no TOC) */}
                            <aside className="space-y-6 md:sticky md:top-6 self-start">
                                <div className="rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-slate-50/60 dark:bg-slate-900/30 p-6">
                                    <h3 className="text-lg font-bold text-primary dark:text-white mb-3">Visão geral</h3>
                                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {description}
                                    </p>
                                </div>

                                {showCta && (
                                    <div className="rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white dark:bg-slate-800 p-6 shadow-sm">
                                        <a
                                            href={WHATSAPP_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full inline-flex items-center justify-center font-bold rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-secondary text-primary hover:bg-secondary/90 focus:ring-secondary px-6 py-3 text-base"
                                            aria-label="Agendar avaliação via WhatsApp"
                                        >
                                            Agendar avaliação
                                        </a>
                                        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                            Você será direcionado para o WhatsApp para finalizar o agendamento.
                                        </p>
                                    </div>
                                )}
                            </aside>

                            {/* Content */}
                            <div className="min-w-0">
                                <div className="space-y-8">
                                    {processedSections.map((section, index) => (
                                        <section
                                            key={`${section.title}-${index}`}
                                            className="rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-slate-50/60 dark:bg-slate-900/30 p-6 md:p-8"
                                        >
                                            <h3 className="text-xl md:text-2xl font-serif font-bold text-primary dark:text-white mb-4">
                                                {section.title}
                                            </h3>
                                            {section.content && (
                                                <div className="text-slate-700 dark:text-slate-200">
                                                    {renderFormattedContent(section.content)}
                                                </div>
                                            )}
                                        </section>
                                    ))}
                                </div>

                                {showCta && (
                                    <div className="mt-10 md:hidden">
                                        <a
                                            href={WHATSAPP_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full inline-flex items-center justify-center font-bold rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-secondary text-primary hover:bg-secondary/90 focus:ring-secondary px-6 py-3 text-base"
                                            aria-label="Agendar avaliação via WhatsApp"
                                        >
                                            Agendar avaliação
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreatmentModal;
