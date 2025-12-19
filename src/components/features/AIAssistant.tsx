import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/genai";

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<any[]>([
        { role: 'model', text: 'Olá! Sou o assistente virtual do Felipe. Como posso te ajudar a entender melhor a hipnoterapia hoje?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const genAI = new GoogleGenerativeAI((process.env as any).API_KEY || "");
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
                systemInstruction: "Você é o Xavier AI, assistente virtual profissional da clínica Xavier Hipnose. Responda em português, de forma empática e ética."
            });

            const result = await model.generateContent(input);
            const botMsg = { role: 'model', text: result.response.text() };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: 'Desculpe, tive um problema técnico. Pode tentar novamente?' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-6 bg-primary text-secondary p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-40 border-2 border-secondary/20"
            >
                <Bot size={32} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-6 right-6 w-[400px] h-[600px] bg-white rounded-[2.5rem] shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-100"
                    >
                        <div className="bg-primary p-6 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-secondary/20 rounded-xl text-secondary">
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold">Assistente Xavier</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Online Agora</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                                <X size={24} />
                            </button>
                        </div>

                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.role === 'user'
                                        ? 'bg-primary text-white rounded-tr-none'
                                        : 'bg-white text-slate-600 shadow-sm rounded-tl-none border border-slate-100'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 flex gap-2">
                                        <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
                                        <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-white border-t border-slate-100">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Sua dúvida..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-full pl-6 pr-14 py-4 focus:outline-none focus:border-secondary transition-colors"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading}
                                    className="absolute right-2 top-2 w-10 h-10 bg-secondary text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-secondary transition-all disabled:opacity-50"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIAssistant;