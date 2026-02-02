import React from 'react';
import { Layers } from 'lucide-react';
import { useScroll } from '../../hooks/useScroll';

const Navbar = () => {
    const scrolled = useScroll(50);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-[#030712]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
            <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-11 h-11 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-[1.2rem] flex items-center justify-center shadow-xl shadow-cyan-900/30 group-hover:rotate-[15deg] transition-transform">
                        <Layers className="text-white" size={24} />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-white">CUBIT<span className="text-cyan-400">IT</span></span>
                </div>
                <div className="hidden md:flex items-center gap-12 text-[11px] font-black tracking-[0.25em] uppercase text-slate-400">
                    <a href="#vision" className="hover:text-cyan-400 transition-colors">Our Vision</a>
                    <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
                    <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
                    <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-cyan-400 hover:text-white transition-all transform active:scale-95 shadow-2xl shadow-white/5">
                        Start Building
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
