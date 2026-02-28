import React, { Suspense, lazy } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileNavBar from './components/layout/MobileNavBar';
import HeroSection from './components/sections/HeroSection';
import LoadingSpinner from './components/ui/LoadingSpinner';
import SkipToContent from './components/ui/SkipToContent';
import { useActiveTab } from './hooks/useActiveTab';
import { useScrollSpy } from './hooks/useScrollSpy';
import { NavItem, ViewState } from './types';

// Lazy load non-critical sections for better initial load performance
const HypnotherapySection = lazy(() => import('./components/sections/HypnotherapySection'));
const ServicesSection = lazy(() => import('./components/sections/ServicesSection'));
const AboutSection = lazy(() => import('./components/sections/AboutSection'));
const FAQSection = lazy(() => import('./components/sections/FAQSection'));
const ContactSection = lazy(() => import('./components/sections/ContactSection'));

const NAV_ITEMS: NavItem[] = [
    { id: 'home', label: 'Início', href: '#home' },
    { id: 'hipnose', label: 'A Hipnoterapia', href: '#hipnose' },
    { id: 'servicos', label: 'Tratamentos', href: '#servicos' },
    { id: 'sobre', label: 'O Especialista', href: '#sobre' },
    { id: 'contato', label: 'Contato', href: '#contato' },
];

const App = () => {
    const { activeTab, setActiveTab, handleTabChange } = useActiveTab('home');

    useScrollSpy(
        NAV_ITEMS.map(i => i.id),
        (id) => setActiveTab(id),
        150
    );

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 pb-20 lg:pb-0 transition-colors duration-300">
            {/* Skip to content link for keyboard navigation (a11y) */}
            <SkipToContent targetId="main-content" />

            <Header
                navItems={NAV_ITEMS}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />

            <main id="main-content" role="main" aria-label="Conteúdo principal">
                {/* Hero loads immediately for fast LCP */}
                <HeroSection onAction={() => handleTabChange('contato')} />

                {/* Lazy loaded sections with Suspense boundaries */}
                <Suspense fallback={<LoadingSpinner text="Carregando..." />}>
                    <HypnotherapySection />
                </Suspense>

                <Suspense fallback={<LoadingSpinner text="Carregando tratamentos..." />}>
                    <ServicesSection />
                </Suspense>

                <Suspense fallback={<LoadingSpinner text="Carregando..." />}>
                    <AboutSection />
                </Suspense>

                <Suspense fallback={<LoadingSpinner text="Carregando perguntas..." />}>
                    <FAQSection />
                </Suspense>

                <Suspense fallback={<LoadingSpinner text="Carregando contato..." />}>
                    <ContactSection />
                </Suspense>
            </main>

            <MobileNavBar activeTab={activeTab} onTabChange={handleTabChange} />

            <Footer onNavigate={handleTabChange} />

            {/* Floating WhatsApp */}
            <a
                href="https://wa.me/5577988672210"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contato via WhatsApp"
                className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-40 flex bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all"
            >
                <svg className="w-7 h-7 lg:w-8 lg:h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.585-3.85-1.585-5.946 0-6.556 5.332-11.891 11.894-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.417 0 6.556-5.333 11.892-11.893 11.892-1.997 0-3.951-.5-5.688-1.448l-6.309 1.652zm5.835-3.332c1.515.899 3.3 1.374 5.123 1.374 5.4 0 9.793-4.393 9.793-9.793 0-2.618-1.019-5.079-2.87-6.931-1.85-1.851-4.311-2.87-6.924-2.87-5.4 0-9.793 4.392-9.793 9.793 0 1.83.51 3.61 1.47 5.143l-1.056 3.86 3.96-.103-.003-.003zm12.443-6.175c-.328-.163-1.94-.957-2.242-1.066-.301-.11-.52-.163-.74.163-.22.327-.85 1.066-1.042 1.284-.191.217-.383.245-.71.082-.328-.163-1.383-.509-2.636-1.626-.974-.87-1.631-1.944-1.821-2.271-.191-.327-.02-.505.143-.667.149-.144.327-.38.491-.571.163-.19.217-.327.327-.544.11-.217.054-.408-.027-.571-.081-.163-.74-1.785-1.014-2.439-.266-.638-.538-.553-.74-.563-.19-.011-.408-.011-.627-.011s-.573.082-.871.408c-.297.327-1.135 1.112-1.135 2.712 0 1.6 1.163 3.14 1.325 3.359.163.218 2.288 3.494 5.542 4.9.774.334 1.378.534 1.851.684.777.247 1.485.212 2.044.129.622-.092 1.94-.793 2.214-1.558.274-.764.274-1.417.192-1.558-.083-.141-.301-.223-.628-.386z" />
                </svg>
            </a>
        </div>
    );
};

export default App;

