import React from 'react';
import { Mail, Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contact" className="pt-32 pb-20 px-8 relative z-10 border-t border-white/5">
            <div className="max-w-[1440px] mx-auto">
                <div className="grid md:grid-cols-2 gap-20 items-start mb-24">
                    <div>
                        <div className="flex items-center gap-4 mb-10">
                            <img src="/logo.png" alt="Cubit It Logo" className="w-12 h-12 rounded-2xl object-cover" />
                            <span className="text-3xl font-black text-white tracking-tighter">CUBIT IT</span>
                        </div>
                        <h5 className="text-4xl font-black text-white mb-8 leading-tight">Ready to build the <br />next big thing?</h5>
                        <div className="space-y-6">
                            <a href="mailto:info@cubitit.com" className="flex items-center gap-4 group text-lg font-bold hover:text-white transition-colors">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 transition-colors"><Mail size={20} /></div>
                                info@cubitit.com
                            </a>
                            <div className="flex gap-4">
                                <a href="https://www.facebook.com/CubitItGroup" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                                    <Facebook size={24} />
                                </a>
                                <a href="https://www.linkedin.com/company/cubitit" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all">
                                    <Linkedin size={24} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 p-12 rounded-[3rem] border border-white/10">
                        <h6 className="text-xl font-black text-white mb-8 uppercase tracking-widest">Connect with Us</h6>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Name" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500" />
                                <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500" />
                            </div>
                            <textarea placeholder="Message" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 h-32 outline-none focus:border-cyan-500 resize-none"></textarea>
                            <button className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-cyan-400 hover:text-white transition-all">Send Brief</button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12 text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">
                    <div>Cubit IT Solutions © {new Date().getFullYear()}</div>
                    <div className="flex gap-10">
                        <a href="#" className="hover:text-white">Privacy</a>
                        <a href="#" className="hover:text-white">Terms</a>
                        <a href="#" className="hover:text-white">Security</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
