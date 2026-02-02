import React from 'react';
import { Palette, Smartphone, Server } from 'lucide-react';

const Services = () => {
    return (
        <section id="services" className="py-32 px-8 bg-black/40">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: Palette, title: "Product Design", desc: "User-centric UI/UX that drives conversion and brand loyalty." },
                        { icon: Smartphone, title: "Mobile & Web", desc: "Seamless cross-platform experiences built on modern frameworks." },
                        { icon: Server, title: "Cloud Architecture", desc: "Robust, scalable backends designed for millions of concurrent users." }
                    ].map((s, i) => (
                        <div key={i} className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all group">
                            <div className="w-16 h-16 bg-cyan-500/10 rounded-3xl flex items-center justify-center text-cyan-400 mb-8 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                                <s.icon size={32} />
                            </div>
                            <h4 className="text-2xl font-black text-white mb-4">{s.title}</h4>
                            <p className="text-slate-500 leading-relaxed">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
