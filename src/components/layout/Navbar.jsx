import React from 'react';
import { Layers, Menu, X } from 'lucide-react';
import { useScroll } from '../../hooks/useScroll';

const Navbar = () => {
    const scrolled = useScroll(50);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-700 ${scrolled ? 'bg-[#030712]/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6 md:py-8'}`}>
            <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
                <div className="flex items-center gap-3 md:gap-4 group cursor-pointer z-[60]">
                    <div className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-[1rem] md:rounded-[1.2rem] flex items-center justify-center shadow-xl shadow-cyan-900/30 group-hover:rotate-[15deg] transition-transform">
                        <Layers className="text-white" size={20} />
                    </div>
                    <span className="text-xl md:text-2xl font-black tracking-tighter text-white">CUBIT<span className="text-cyan-400">IT</span></span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-12 text-[11px] font-black tracking-[0.25em] uppercase text-slate-400">
                    <a href="#vision" className="hover:text-cyan-400 transition-colors">Our Vision</a>
                    <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
                    <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
                    <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-cyan-400 hover:text-white transition-all transform active:scale-95 shadow-2xl shadow-white/5">
                        Start Building
                    </button>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-white z-[60]"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 bg-[#030712]/95 backdrop-blur-3xl z-50 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    {['Our Vision', 'Services', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase().replace(' ', '')}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-2xl font-black tracking-tighter text-white hover:text-cyan-400 transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-full font-black text-lg shadow-2xl shadow-cyan-900/40">
                        Start Building
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
