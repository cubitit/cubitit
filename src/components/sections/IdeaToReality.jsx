import React from 'react';
import { Lightbulb, Palette, Code2, ShieldCheck, Rocket } from 'lucide-react';

const IdeaToReality = () => {
    const steps = [
        { icon: Lightbulb, title: "Concept", desc: "Brainstorming & Strategy" },
        { icon: Palette, title: "Design", desc: "UI/UX & Prototyping" },
        { icon: Code2, title: "Development", desc: "Clean, Scalable Code" },
        { icon: ShieldCheck, title: "QA Testing", desc: "Rigorous Bug Hunting" },
        { icon: Rocket, title: "Launch", desc: "Deployment & Scale" }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-black to-[#050b1d] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                        Idea to <span className="text-cyan-500">Reality.</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        A clear, structured pathway turning your initial concept into a market-ready product.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/40 to-cyan-500/20 transform -translate-y-1/2 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center group">
                                <div className="w-24 h-24 rounded-full bg-[#030712] border border-cyan-500/30 flex items-center justify-center mb-6 relative z-10 group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-500">
                                    <step.icon size={32} className="text-cyan-500 group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute -inset-2 rounded-full border border-dashed border-white/10 animate-[spin_10s_linear_infinite]"></div>
                                </div>
                                <h3 className="text-xl font-black text-white mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-500 font-medium">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IdeaToReality;
