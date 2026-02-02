import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Sparkles, Loader2, Volume2, Send } from 'lucide-react';
import { useGemini } from '../../hooks/useGemini';

const ChatWidget = () => {
    const [showChat, setShowChat] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        { role: 'ai', text: 'Welcome to Cubit IT. We turn disruptive ideas into market-leading businesses. How can we assist your venture today?' }
    ]);
    const [chatInput, setChatInput] = useState('');

    const { generate, playTTS, loading: isChatLoading, isTtsLoading } = useGemini();
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages, showChat]); // Added showChat to scroll on open

    const handleChat = async () => {
        if (!chatInput.trim() || isChatLoading) return;
        const userMsg = chatInput;
        setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setChatInput('');

        try {
            const result = await generate(userMsg, "You are the Cubit IT Business Consultant. We turn ideas into multi-million dollar businesses. Professional and elite.");
            const textResponse = typeof result === 'string' ? result : (result?.text || "I'm processing your request. Please email info@cubitit.com for immediate business scaling.");
            setChatMessages(prev => [...prev, { role: 'ai', text: textResponse }]);
        } catch (err) {
            setChatMessages(prev => [...prev, { role: 'ai', text: "Support currently busy. Please email info@cubitit.com." }]);
        }
    };

    return (
        <>
            <button onClick={() => setShowChat(!showChat)} className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-gradient-to-tr from-cyan-500 to-blue-600 text-white rounded-[2rem] shadow-[0_0_40px_rgba(6,182,212,0.3)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 group">
                {showChat ? <X size={28} /> : <MessageSquare size={28} />}
            </button>

            {showChat && (
                <div className="fixed bottom-28 right-8 z-[60] w-[380px] h-[550px] bg-slate-900/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
                    <div className="p-6 bg-white/5 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                            <span className="font-bold text-white text-lg tracking-tight">Cubit Concierge</span>
                        </div>
                        <Sparkles size={18} className="text-cyan-400" />
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-5">
                        {chatMessages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                                <div className={`group relative max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${msg.role === 'ai' ? 'bg-white/5 text-slate-300 border border-white/5 shadow-sm' : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'}`}>
                                    {msg.text}
                                    {msg.role === 'ai' && (
                                        <button onClick={() => playTTS(msg.text)} className="absolute -right-10 top-2 p-2 text-slate-500 hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {isTtsLoading ? <Loader2 size={16} className="animate-spin" /> : <Volume2 size={16} />}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                    <div className="p-5 bg-white/5 border-t border-white/10 flex gap-2">
                        <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleChat()} placeholder="How can we scale you?" className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm outline-none focus:border-cyan-500/50 transition-colors text-white" />
                        <button onClick={handleChat} disabled={isChatLoading} className="p-3 bg-cyan-500 text-white rounded-2xl hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-900/20">
                            {isChatLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatWidget;
