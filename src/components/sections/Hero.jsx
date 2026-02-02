import React from 'react';
import { ArrowRight, Mail, ChevronDown } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative pt-64 pb-32 px-8">
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-12 animate-in fade-in slide-in-from-top-6 duration-1000">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></div>
                    Turning Prototypes into Profit
                </div>
                <h1 className="text-7xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-12 max-w-6xl mx-auto">
                    Ideate. Engineer. <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">Dominate Markets.</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
                    We are a full-cycle technology partner that transforms your boldest concepts into <span className="text-white">enterprise-grade business ecosystems.</span>
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <button className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-14 py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(6,182,212,0.4)] hover:-translate-y-2 transition-all">
                        Launch Your Idea <ArrowRight size={24} />
                    </button>
                    <a href="mailto:info@cubitit.com" className="w-full md:w-auto px-14 py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all backdrop-blur-sm">
                        <Mail size={24} /> Consult Experts
                    </a>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-700 animate-bounce">
                <ChevronDown size={40} />
            </div>
        </section>
    );
};

export default Hero;
