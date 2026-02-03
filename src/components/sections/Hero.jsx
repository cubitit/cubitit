import React from 'react';
import { ArrowRight, Mail, ChevronDown } from 'lucide-react';

const Hero = () => {
    return (
        <section id="mission" className="relative pt-40 pb-20 md:pt-64 md:pb-32 px-6 md:px-8">
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 md:px-6 md:py-2 bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 rounded-full text-[9px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase mb-8 md:mb-12 animate-in fade-in slide-in-from-top-6 duration-1000">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></div>
                    Turning Prototypes into Profit
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white leading-[0.9] md:leading-[0.85] tracking-tighter mb-8 md:mb-12 max-w-6xl mx-auto">
                    Ideate. Engineer. <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">Dominate Markets.</span>
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 md:mb-16 leading-relaxed font-medium">
                    We are a full-cycle technology partner that transforms your boldest concepts into <span className="text-white">enterprise-grade business ecosystems.</span>
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                    <button onClick={() => document.getElementById('blueprint')?.scrollIntoView({ behavior: 'smooth' })} className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-5 md:px-14 md:py-6 rounded-[1.5rem] md:rounded-[2rem] font-black text-lg md:text-xl flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(6,182,212,0.4)] hover:-translate-y-2 transition-all">
                        Launch Your Idea <ArrowRight size={20} className="md:w-6 md:h-6" />
                    </button>
                    <a href="#contact" className="w-full md:w-auto px-8 py-5 md:px-14 md:py-6 rounded-[1.5rem] md:rounded-[2rem] font-black text-lg md:text-xl flex items-center justify-center gap-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all backdrop-blur-sm">
                        <Mail size={20} className="md:w-6 md:h-6" /> Consult Experts
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
