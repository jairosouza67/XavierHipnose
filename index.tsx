import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Menu, X, ChevronRight, CheckCircle, HelpCircle,
  MapPin, Phone, MessageCircle, Info, Star,
  Send, Brain, User, ShieldCheck, ArrowRight, Instagram, Loader2,
  ChevronLeft, Quote, XCircle, Zap, Heart, Cigarette, Scale, Moon, Mic, Baby, Activity, Sparkles,
  Award, GraduationCap, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Type } from "@google/genai";

// --- Configurações Gerais ---
const WHATSAPP_NUMBER = "5577988672210";
const ACTUAL_PROFILE_IMAGE = "/profile.jpg";

const SERVICES = [
  { id: 1, title: 'Ansiedade e Estresse', description: 'Retome o controle da sua paz mental através de técnicas modernas de hipnose clínica.', icon: <Heart className="w-6 h-6" /> },
  { id: 2, title: 'Fobias e Medos', description: 'Supere bloqueios emocionais e fobias que impedem você de viver plenamente de forma definitiva.', icon: <ShieldCheck className="w-6 h-6" /> },
  { id: 3, title: 'Tabagismo', description: 'Pare de fumar sem sofrimento. Reprogramação mental para eliminar a dependência química e emocional.', icon: <Cigarette className="w-6 h-6" /> },
  { id: 4, title: 'Emagrecimento', description: 'Transforme sua relação com a comida. Elimine compulsões e desenvolva hábitos saudáveis.', icon: <Scale className="w-6 h-6" /> },
  { id: 5, title: 'Performance e Foco', description: 'Maximize seu potencial cognitivo e alcance resultados excepcionais na carreira ou esportes.', icon: <Sparkles className="w-6 h-6" /> },
  { id: 6, title: 'Insônia', description: 'Recupere noites de sono reparador. Tratamento para insônia crônica e distúrbios do sono.', icon: <Moon className="w-6 h-6" /> },
  { id: 7, title: 'Depressão', description: 'Reencontre a motivação e a alegria de viver com uma abordagem focada na raiz emocional.', icon: <Brain className="w-6 h-6" /> },
  { id: 8, title: 'Dores Crônicas', description: 'Alívio de dores como fibromialgia e enxaqueca através do controle mental do sistema nervoso.', icon: <Activity className="w-6 h-6" /> },
];

const FAQS = [
  { q: "A hipnose é segura?", a: "Totalmente segura. A hipnose é um estado natural da mente humana que você experimenta diariamente. Durante a sessão, você está sempre consciente e no controle total." },
  { q: "Vou perder o controle ou ficar inconsciente?", a: "Não. Você permanece completamente consciente e ouvindo tudo. É um estado de relaxamento profundo com foco aumentado, onde você pode sair do estado a qualquer momento." },
  { q: "Quantas sessões são necessárias?", a: "Depende de cada caso, mas a hipnoterapia é focada em resultados rápidos. A maioria dos tratamentos é resolvida entre 1 a 5 sessões." },
  { q: "Qualquer pessoa pode ser hipnotizada?", a: "Sim, qualquer pessoa com capacidade de concentração. É uma habilidade natural; a profundidade varia, mas os resultados terapêuticos ocorrem em todos os níveis." },
  { q: "Como funciona o atendimento online?", a: "O atendimento online é realizado via videochamada segura. É tão efetivo quanto o presencial, com a vantagem do conforto da sua casa." },
  { q: "Os resultados são permanentes?", a: "Sim, na maioria dos casos são permanentes pois trabalhamos na raiz do problema, promovendo mudanças reais no padrão de pensamento subconsciente." },
  { q: "A hipnose substitui tratamento médico?", a: "A hipnoterapia é uma ferramenta complementar. Não substitui tratamentos médicos ou psiquiátricos, mas os potencializa significativamente." },
  { q: "Qual o investimento das sessões?", a: "O valor varia conforme o tratamento. Agende uma conversa gratuita para avaliarmos seu caso e apresentarmos o plano de investimento personalizado." }
];

const TESTIMONIALS = [
  {
    name: 'Maria Clara S.',
    role: 'Empresária',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    rating: 5,
    text: 'Sofri com ansiedade por mais de 10 anos. Em apenas 4 sessões com o Felipe, consegui uma transformação que achei impossível.',
  },
  {
    name: 'João Pedro M.',
    role: 'Advogado',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    rating: 5,
    text: 'Tinha um medo terrível de falar em público. Após o tratamento, apresentei para uma plateia de 500 pessoas com total confiança.',
  },
  {
    name: 'Ana Beatriz L.',
    role: 'Médica',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    rating: 5,
    text: 'Como profissional de saúde, era cética. Me surpreendi com a base científica. Parei de fumar após 15 anos em apenas 2 sessões.',
  },
];

const MYTHS = [
  { m: 'Você perde o controle da mente', v: 'Você está sempre consciente e no controle total durante toda a sessão.' },
  { m: 'Hipnose é dormir ou ficar inconsciente', v: 'É um estado de hiperfoco e relaxamento profundo, não inconsciência.' },
  { m: 'Funciona apenas para pessoas sugestionáveis', v: 'Qualquer pessoa pode ser hipnotizada, é uma habilidade natural da mente.' },
  { m: 'Os resultados não duram', v: 'As mudanças são permanentes pois atuam na raiz do problema no subconsciente.' },
];

// --- Componentes ---

const FAQItem = ({ q, a, isOpen, onClick }: { q: string, a: string, isOpen: boolean, onClick: () => void, key?: any }) => (
  <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
          <HelpCircle className="w-5 h-5 text-secondary" />
        </div>
        <span className="font-bold text-primary">{q}</span>
      </div>
      <ChevronRight className={`w-5 h-5 text-secondary transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-6 pl-20 text-slate-500 leading-relaxed text-sm">
            {a}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const MythsSection = () => (
  <div className="space-y-6">
    <div className="text-center mb-10">
      <h3 className="text-2xl font-serif text-primary">Quebrando Mitos</h3>
      <p className="text-slate-500 text-sm">A verdade sobre a hipnoterapia clínica</p>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      {MYTHS.map((item, idx) => (
        <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <XCircle className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Mito</p>
              <p className="text-slate-400 line-through decoration-red-200 text-sm">{item.m}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Verdade</p>
              <p className="text-primary font-medium text-sm">{item.v}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TestimonialsSection = () => {
  const [idx, setIdx] = useState(0);

  const next = () => setIdx((idx + 1) % TESTIMONIALS.length);
  const prev = () => setIdx((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="Transformação" title="Histórias Reais" />

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-slate-50 rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-sm">
            <Quote className="absolute top-10 right-10 w-20 h-20 text-secondary/10" />

            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col md:flex-row items-center gap-8 relative z-10"
              >
                <div className="shrink-0 relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img src={TESTIMONIALS[idx].image} alt={TESTIMONIALS[idx].name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-secondary text-primary p-2 rounded-full">
                    <Star size={16} fill="white" stroke="white" />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-6">
                  <div className="flex justify-center md:justify-start gap-1">
                    {[...Array(TESTIMONIALS[idx].rating)].map((_, i) => (
                      <Star key={i} size={18} className="text-secondary fill-secondary" />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl text-primary font-serif italic leading-relaxed">
                    "{TESTIMONIALS[idx].text}"
                  </p>
                  <div>
                    <h4 className="font-bold text-primary text-lg">{TESTIMONIALS[idx].name}</h4>
                    <p className="text-slate-500 text-sm uppercase tracking-widest">{TESTIMONIALS[idx].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button onClick={prev} className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
          {[
            { v: '4.9', l: 'Avaliação Média', s: '/5' },
            { v: '500+', l: 'Avaliações', s: '' },
            { v: '98%', l: 'Recomendariam', s: '' },
            { v: '95%', l: 'Resultados', s: '' },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-50 p-6 rounded-3xl text-center border border-white hover:border-secondary transition-colors">
              <p className="text-3xl font-bold text-secondary mb-1">
                {stat.v}<span className="text-sm text-slate-400 font-normal">{stat.s}</span>
              </p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">{stat.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Navbar = ({ currentView, setView }: { currentView: string, setView: (v: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Início', id: 'home' },
    { name: 'Dúvidas', id: 'hipnose' },
    { name: 'Tratamentos', id: 'servicos' },
    { name: 'O Profissional', id: 'sobre' },
    { name: 'Contato', id: 'contato' },
  ];

  const handleNavClick = (id: string) => {
    setView(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || currentView !== 'home' ? 'bg-primary/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-serif font-bold text-white flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')}>
          <Brain className="text-secondary w-8 h-8" />
          <span className="tracking-tight">Xavier <span className="text-secondary">Hipnose</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-white/90 font-medium">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`hover:text-secondary transition-colors ${currentView === item.id ? 'text-secondary font-bold' : ''}`}
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('contato')}
            className="bg-secondary text-primary px-5 py-2 rounded-full font-bold hover:bg-white transition-all shadow-md transform hover:scale-105 active:scale-95"
          >
            Agendar Sessão
          </button>
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary text-white p-6 absolute w-full flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top duration-300 z-50 border-t border-white/10">
          {menuItems.map(item => (
            <button key={item.id} onClick={() => handleNavClick(item.id)} className="py-3 border-b border-white/5 text-lg text-left w-full">{item.name}</button>
          ))}
          <button className="bg-secondary text-primary p-4 rounded-lg text-center font-bold text-lg mt-2 shadow-lg" onClick={() => handleNavClick('contato')}>Agendar Sessão</button>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ setView }: { setView: (v: string) => void }) => (
  <section id="inicio" className="hero-gradient min-h-[90vh] flex items-center pt-20 overflow-hidden relative">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 blur-[120px] rounded-full pointer-events-none"></div>
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
      <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
          <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
          <h4 className="text-secondary font-bold tracking-widest uppercase text-[10px]">Hipnoterapia Clínica Avançada</h4>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
          Redescubra sua <br /><span className="italic text-secondary">Paz Interior</span>
        </h1>
        <p className="text-white/70 text-lg md:text-xl max-w-lg leading-relaxed">
          Recupere o controle da sua mente com o método clínico de Felipe Souza Xavier. Eficácia comprovada para ansiedade, fobias e traumas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={() => setView('contato')} className="bg-secondary text-primary px-8 py-4 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer">
            Agendar Sessão Gratuita <ArrowRight size={20} />
          </button>
          <button onClick={() => setView('hipnose')} className="border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 active:scale-95 transition-all text-center cursor-pointer">
            Como funciona?
          </button>
        </div>
      </div>
      <div className="relative group hidden md:block animate-in fade-in zoom-in duration-1000 delay-200">
        <div className="absolute -inset-4 bg-secondary/20 rounded-2xl blur-10 group-hover:bg-secondary/30 transition-all"></div>
        <img
          src={ACTUAL_PROFILE_IMAGE}
          alt="Felipe Souza Xavier Hipnoterapeuta"
          className="relative rounded-2xl shadow-2xl border border-white/10 grayscale-[5%] hover:grayscale-0 transition-all duration-700 h-[500px] w-full object-cover object-top"
        />
      </div>
    </div>
  </section>
);

const AuthorityBadges = () => (
  <div className="bg-slate-50 py-12 border-y border-slate-100">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <p className="text-slate-400 uppercase tracking-widest text-xs font-bold mb-8">Certificações e Autoridade Internacional</p>
      <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8" />
          <span className="font-bold text-xl">OMNI</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-8 h-8" />
          <span className="font-bold text-xl">IBHE</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-8 h-8" />
          <span className="font-bold text-xl">ISO Quality</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-8 h-8" />
          <span className="font-bold text-xl">Member</span>
        </div>
      </div>
    </div>
  </div>
);

const ComparisonSection = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h4 className="text-secondary font-bold tracking-widest uppercase text-sm">Por que Hipnoterapia?</h4>
          <h2 className="text-4xl font-serif text-primary">A Terapia mais Eficiente da Atualidade</h2>
          <p className="text-slate-600 leading-relaxed">
            Um estudo comparativo realizado pelo Dr. Alfred A. Barrios revelou resultados impressionantes sobre a eficácia da hipnoterapia em relação a outros métodos tradicionais.
          </p>
          <div className="space-y-4 pt-4">
            <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-secondary">
              <h3 className="text-2xl font-bold text-primary mb-1">93% de Recuperação</h3>
              <p className="text-slate-500 text-sm">após apenas 6 sessões de Hipnoterapia.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-slate-300">
              <h3 className="text-2xl font-bold text-slate-400 mb-1">38% de Recuperação</h3>
              <p className="text-slate-500 text-sm">após 600 sessões de Psicanálise.</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-primary/5 rounded-3xl flex items-center justify-center p-8">
            <div className="w-full space-y-6 text-primary">
              {[
                { label: 'Hipnoterapia', value: 93, color: 'bg-secondary' },
                { label: 'Terapia Comportamental', value: 72, color: 'bg-slate-400' },
                { label: 'Psicanálise', value: 38, color: 'bg-slate-300' }
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full transition-all duration-1000`} style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const BottomNav = ({ currentView, setView }: { currentView: string, setView: (v: string) => void }) => {
  const items = [
    { id: 'home', icon: <Brain size={20} />, label: 'Início' },
    { id: 'hipnose', icon: <HelpCircle size={20} />, label: 'Dúvidas' },
    { id: 'servicos', icon: <Star size={20} />, label: 'Serviços' },
    { id: 'sobre', icon: <User size={20} />, label: 'Eu' },
    { id: 'contato', icon: <MessageCircle size={20} />, label: 'Zap' },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 bg-primary/95 backdrop-blur-md rounded-2xl shadow-2xl z-50 border border-white/10 p-2 flex justify-around items-center">
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => { setView(item.id); window.scrollTo(0, 0); }}
          className={`flex flex-col items-center gap-1 p-2 transition-all ${currentView === item.id ? 'text-secondary scale-110' : 'text-white/50'}`}
        >
          {item.icon}
          <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

const AIAssistant = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: 'Olá! Sou o Xavier AI, assistente virtual da clínica. Como posso te ajudar a entender melhor a hipnoterapia hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `Você é o Xavier AI, assistente virtual educado e profissional da clínica "Xavier Hipnose" de Felipe Souza Xavier em Vitória da Conquista, BA.
          Seu objetivo é explicar o que é hipnoterapia, derrubar mitos (como o de perder o controle) e encorajar agendamentos.
          Mantenha as respostas curtas, empáticas e focadas na ciência por trás da hipnose. Se perguntarem sobre preço ou agendamento, diga para preencherem o formulário no site ou clicar no botão de WhatsApp. 
          Use um tom acolhedor e profissional.`
        }
      });
      const text = response.text || 'Desculpe, tive um problema técnico. Pode repetir?';
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (err) {
      console.error("AI Error:", err);
      // Fallback amigável caso a API falhe ou a chave não esteja configurada
      setMessages(prev => [...prev, { role: 'model', text: 'Estou passando por uma atualização rápida. Para um atendimento imediato, clique no botão do WhatsApp no canto da tela!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col h-[500px]">
      <div className="bg-primary p-4 text-white flex items-center gap-3">
        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
          <Brain size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-bold leading-tight">Xavier AI</h3>
          <p className="text-xs text-white/60">Especialista em Hipnoterapia</p>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white text-slate-700 shadow-sm rounded-bl-none'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl shadow-sm flex items-center gap-2 text-xs text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin" /> Pensando...
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t flex gap-2 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Tire sua dúvida aqui..."
          className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 text-slate-800"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-secondary p-2 rounded-full text-primary hover:scale-110 transition-transform disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Constrói a mensagem para o WhatsApp
    const whatsappMessage = `Olá Felipe! Me chamo *${formData.name}*.\n\nEstou entrando em contato pelo site.\n\n*Motivo:* ${formData.message}\n\n*Contato:* ${formData.phone}\n*Email:* ${formData.email}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Simulação de delay para feedback visual
    setTimeout(() => {
      // Abre o WhatsApp em nova aba
      window.open(whatsappUrl, '_blank');

      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });

      // Reset da mensagem de sucesso após 8 segundos
      setTimeout(() => setSubmitted(false), 8000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-white p-10 rounded-3xl shadow-xl space-y-8 h-full flex flex-col justify-center">
      <div>
        <h2 className="text-3xl font-serif mb-2 text-primary">Agende sua Sessão</h2>
        <p className="text-slate-500">Preencha abaixo para iniciar sua conversa diretamente no WhatsApp.</p>
      </div>

      {submitted ? (
        <div className="bg-green-50 text-green-700 p-8 rounded-2xl text-center animate-in zoom-in duration-300 border border-green-100">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
          <h3 className="text-xl font-bold mb-2">Redirecionando...</h3>
          <p>Obrigado, {formData.name}! Estamos abrindo seu WhatsApp para finalizar o agendamento.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 text-sm underline opacity-80 hover:opacity-100"
          >
            Enviar nova mensagem
          </button>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="Seu Nome Completo"
            className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
          />
          <div className="grid md:grid-cols-2 gap-4">
            <input
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Seu E-mail"
              className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
            />
            <input
              required
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              placeholder="Seu WhatsApp"
              className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
            />
          </div>
          <textarea
            required
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Conte-me um pouco sobre seu objetivo"
            rows={4}
            className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary/50 outline-none transition-all resize-none"
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-secondary text-primary p-5 rounded-xl font-bold text-lg hover:bg-white border-2 border-transparent hover:border-secondary transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
          >
            {isSubmitting ? <><Loader2 className="animate-spin" /> Processando...</> : <><MessageCircle size={20} /> Enviar para WhatsApp</>}
          </button>
        </form>
      )}
    </div>
  );
};

const SectionHeading = ({ subtitle, title, light = false }: { subtitle: string, title: string, light?: boolean }) => (
  <div className="text-center mb-16 space-y-4">
    <h4 className="text-secondary font-bold tracking-widest uppercase text-sm">{subtitle}</h4>
    <h2 className={`text-3xl md:text-4xl font-serif ${light ? 'text-white' : 'text-primary'}`}>{title}</h2>
    <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
  </div>
);

const FooterView = ({ setView }: { setView: (v: string) => void }) => (
  <footer className="bg-primary pt-20 pb-24 md:pb-10 text-white/60">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-12">
      <div className="col-span-2 space-y-6">
        <div className="text-2xl font-serif font-bold text-white flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
          <Brain className="text-secondary w-8 h-8" />
          <span>Xavier <span className="text-secondary">Hipnose</span></span>
        </div>
        <p className="max-w-sm leading-relaxed text-white/70">Terapia clínica focada em resultados e bem-estar emocional em Vitória da Conquista e para todo o mundo via atendimento online.</p>
        <div className="flex gap-4">
          <a href="https://instagram.com/xavierhipnose" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-secondary hover:text-primary transition-all"><Instagram size={18} /></a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-secondary hover:text-primary transition-all"><MessageCircle size={18} /></a>
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="text-white font-bold">Navegação</h4>
        <ul className="space-y-2 text-sm">
          <li><button onClick={() => setView('home')} className="hover:text-secondary transition-colors text-left w-full">Início</button></li>
          <li><button onClick={() => setView('hipnose')} className="hover:text-secondary transition-colors text-left w-full">Dúvidas Frequentes</button></li>
          <li><button onClick={() => setView('servicos')} className="hover:text-secondary transition-colors text-left w-full">Áreas de Atuação</button></li>
          <li><button onClick={() => setView('sobre')} className="hover:text-secondary transition-colors text-left w-full">O Profissional</button></li>
        </ul>
      </div>
      <div className="space-y-4">
        <h4 className="text-white font-bold">Atendimento</h4>
        <ul className="space-y-2 text-sm">
          <li>Segunda à Sexta: 08h - 19h</li>
          <li>Sábado: 09h - 13h</li>
          <li>Vitória da Conquista - BA</li>
          <li>Online via Google Meet</li>
        </ul>
      </div>
    </div>
    <div className="text-center text-xs px-6">
      <p>© {new Date().getFullYear()} Xavier Hipnose - Felipe Souza Xavier. Todos os direitos reservados.</p>
      <p className="mt-2 opacity-30">Desenvolvido com tecnologia de ponta para sua saúde mental.</p>
    </div>
  </footer>
);

const App = () => {
  const [view, setView] = useState('home');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen bg-background text-primary font-sans antialiased">
      <Navbar currentView={view} setView={setView} />

      <main className="animate-in fade-in duration-700">
        {view === 'home' && (
          <>
            <Hero setView={setView} />
            <AuthorityBadges />
            <section className="py-24 bg-slate-50">
              <div className="max-w-7xl mx-auto px-6 text-center">
                <SectionHeading subtitle="Especialidades" title="Como posso te ajudar?" />
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {SERVICES.slice(0, 4).map((s) => (
                    <div key={s.id} onClick={() => setView('servicos')} className="p-8 rounded-3xl bg-white border border-slate-100 hover:shadow-2xl transition-all cursor-pointer group">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:bg-secondary transition-colors">{s.icon}</div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors">{s.title}</h3>
                      <p className="text-slate-500 text-sm">{s.description}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => setView('servicos')} className="mt-12 text-primary font-bold inline-flex items-center gap-2 hover:gap-4 transition-all group">
                  Ver todas as especialidades <ArrowRight size={20} className="text-secondary group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </section>
            <ComparisonSection />
            <TestimonialsSection />
            <section className="py-24 bg-slate-50">
              <div className="max-w-3xl mx-auto px-6">
                <SectionHeading subtitle="Dúvidas" title="Perguntas Frequentes" />
                <div className="space-y-4">
                  <FAQItem q={FAQS[0].q} a={FAQS[0].a} isOpen={true} onClick={() => setView('hipnose')} />
                  <FAQItem q={FAQS[1].q} a={FAQS[1].a} isOpen={false} onClick={() => setView('hipnose')} />
                </div>
                <div className="text-center mt-10">
                  <button onClick={() => setView('hipnose')} className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-secondary hover:text-primary transition-all shadow-lg">
                    Ver todas as dúvidas
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {view === 'hipnose' && (
          <section className="py-32 bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-6">
              <SectionHeading subtitle="Educação" title="O Poder do Subconsciente" />
              <div className="prose prose-slate max-w-none text-slate-600 space-y-16">
                <p className="text-xl leading-relaxed font-medium text-slate-800 text-center">
                  A hipnoterapia não é mágica, é ciência. É o uso de um estado natural de foco para acessar o subconsciente, onde residem nossos padrões profundos.
                </p>

                <MythsSection />

                <div className="bg-slate-50 p-8 md:p-12 rounded-[40px] space-y-10 border border-slate-100">
                  <div className="text-center">
                    <h3 className="text-3xl font-serif text-primary">Como funciona na prática?</h3>
                    <p className="text-slate-500 mt-2">Um processo seguro, ético e focado em você</p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      { i: 1, t: 'Foco e Relaxamento', d: 'Você entra em um estado de relaxamento guiado, mantendo total controle.' },
                      { i: 2, t: 'Acesso Subconsciente', d: 'Conversamos com a parte da mente que gera as respostas automáticas.' },
                      { i: 3, t: 'Ressignificação', d: 'Mudamos a percepção de eventos passados, eliminando gatilhos.' },
                    ].map(step => (
                      <div key={step.i} className="space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-secondary text-primary flex items-center justify-center font-bold text-xl shadow-lg shadow-secondary/20">{step.i}</div>
                        <h4 className="font-bold text-primary">{step.t}</h4>
                        <p className="text-sm leading-relaxed">{step.d}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-serif text-primary">Dúvidas Frequentes</h3>
                    <p className="text-slate-500 mt-2">Tudo o que você precisa saber</p>
                  </div>
                  <div className="space-y-4">
                    {FAQS.map((faq, i) => (
                      <FAQItem
                        key={i}
                        q={faq.q}
                        a={faq.a}
                        isOpen={openFaqIdx === i}
                        onClick={() => setOpenFaqIdx(openFaqIdx === i ? null : i)}
                      />
                    ))}
                  </div>
                </div>
                <div className="pt-12">
                  <h3 className="text-center mb-8 font-serif italic text-slate-400">Tire suas dúvidas com nossa IA</h3>
                  <AIAssistant />
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'servicos' && (
          <section className="py-32 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto px-6">
              <SectionHeading subtitle="Tratamentos" title="Especialidades Clínicas" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SERVICES.map((t, i) => (
                  <div key={i} className="p-10 bg-white rounded-[40px] shadow-sm border border-slate-100 hover:border-secondary transition-all group hover:shadow-xl hover:-translate-y-1">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 text-primary group-hover:bg-secondary transition-colors">
                      {t.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-primary group-hover:text-secondary transition-colors">{t.title}</h3>
                    <p className="text-slate-500 leading-relaxed mb-8">{t.description}</p>
                    <button onClick={() => setView('contato')} className="text-secondary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                      Agendar Avaliação <ChevronRight size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {view === 'sobre' && (
          <section className="py-32 bg-primary text-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h4 className="text-secondary font-bold tracking-widest uppercase text-sm">O Especialista</h4>
                <h2 className="text-5xl font-serif">Felipe Souza Xavier</h2>
                <div className="space-y-6 text-white/70 text-lg leading-relaxed">
                  <p>Especialista em Hipnoterapia Clínica com formação internacional pelas maiores instituições do mundo.</p>
                  <p>Minha missão é encurtar o caminho entre o sofrimento e a solução. Através de métodos modernos de neurociência e hipnose, ajudo você a retomar o controle da sua vida em tempo recorde.</p>
                  <p>Com atendimento em Vitória da Conquista e online para todo o Brasil, já transformei centenas de vidas através do poder do subconsciente.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { icon: <Award />, title: 'Certificação', d: 'Internacional pela OMNI' },
                    { icon: <GraduationCap />, title: 'PNL', d: 'Practitioner Avançado' },
                    { icon: <Users />, title: 'SBH', d: 'Membro Ativo Sociedade Brasileira' },
                    { icon: <Heart />, title: 'Humanizada', d: 'Foco no acolhimento' },
                  ].map((cred, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-3 backdrop-blur-sm">
                      <div className="text-secondary shrink-0">{cred.icon}</div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-secondary tracking-widest">{cred.title}</p>
                        <p className="text-[10px] text-white/50">{cred.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 pt-4">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center flex-1">
                    <h5 className="text-secondary text-4xl font-bold">500+</h5>
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50 text-white mt-1">Vidas Transformadas</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center flex-1">
                    <h5 className="text-secondary text-4xl font-bold">10+</h5>
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50 text-white mt-1">Certificações</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src={ACTUAL_PROFILE_IMAGE}
                  alt="Felipe Souza Xavier"
                  className="rounded-3xl shadow-2xl w-full aspect-[4/5] object-cover object-top"
                />
                <div className="absolute -bottom-8 -left-8 bg-secondary p-8 rounded-3xl text-primary max-w-xs shadow-2xl hidden lg:block">
                  <p className="font-bold text-2xl italic leading-tight">"A mente é um excelente servo, mas um mestre terrível."</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'contato' && (
          <section className="py-32 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-16">
                <ContactForm />
                <div className="space-y-12 py-8">
                  <div>
                    <h2 className="text-4xl font-serif text-primary mb-6 text-primary">Informações de Contato</h2>
                    <p className="text-slate-500 mb-8">Escolha a melhor forma de falar conosco. Atendimento presencial e online.</p>
                  </div>
                  <div className="space-y-6 text-primary">
                    <div className="flex gap-6 items-center">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-secondary"><MapPin /></div>
                      <div>
                        <h4 className="font-bold">Endereço</h4>
                        <p className="text-slate-500">Vitória da Conquista, BA - Brasil</p>
                      </div>
                    </div>
                    <div className="flex gap-6 items-center">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-secondary"><Phone /></div>
                      <div>
                        <h4 className="font-bold text-primary">Telefone / Whats</h4>
                        <p className="text-slate-500">(77) 98867-2210</p>
                      </div>
                    </div>
                    <div className="flex gap-6 items-center">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-secondary"><Instagram /></div>
                      <div>
                        <h4 className="font-bold">Instagram</h4>
                        <p className="text-slate-500">@xavierhipnose</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-64 rounded-3xl overflow-hidden shadow-lg border-8 border-white">
                    <iframe
                      title="Mapa"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62057.94064505963!2d-40.857643!3d-14.861788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x746016c56b000001%3A0x868b1a32a68846c4!2sVit%C3%B3ria%20da%20Conquista%2C%20BA!5e0!3m2!1spt-BR!2sbr!4v1620000000000!5m2!1spt-BR!2sbr"
                      width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <FooterView setView={setView} />
      <BottomNav currentView={view} setView={setView} />

      {/* Float WhatsApp */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-125 transition-all z-40 animate-bounce hidden md:flex"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);