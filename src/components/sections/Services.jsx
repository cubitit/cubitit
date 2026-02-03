import React from 'react';
import { Palette, Smartphone, Server, ShieldCheck, RefreshCw, TrendingUp } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';

import 'swiper/css/pagination';

const Services = () => {
    const services = [
        { icon: Palette, title: "Product Design", desc: "User-centric UI/UX that drives conversion and brand loyalty." },
        { icon: Smartphone, title: "Development", desc: "Seamless cross-platform experiences built on modern frameworks." },
        { icon: ShieldCheck, title: "QA Testing", desc: "Rigorous automated and manual testing for flawless reliability." },
        { icon: Server, title: "Cloud Architecture", desc: "Robust, scalable backends designed for millions of concurrent users." },
        { icon: RefreshCw, title: "Full IT Lifecycle", desc: "End-to-end management from concept to legacy modernization." },
        { icon: TrendingUp, title: "Marketing", desc: "Data-driven growth strategies to dominate your market niche." }
    ];

    return (
        <section id="services" className="py-32 relative w-full overflow-hidden">
            <div className="absolute inset-0 bg-black/40 z-0"></div>
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

            <div className="max-w-[1440px] mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Services.</span></h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">Comprehensive solutions for digital dominance.</p>
                </div>

                <div className="services-swiper relative py-10">
                    <Swiper
                        centeredSlides={true}
                        loop={true}
                        spaceBetween={20}
                        breakpoints={{
                            0: { slidesPerView: 1.2, spaceBetween: 20 },
                            768: { slidesPerView: 2, spaceBetween: 30 },
                            1024: { slidesPerView: 3, spaceBetween: 40 }
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        modules={[Pagination, Autoplay]}
                        className="w-full !overflow-visible py-10"
                    >
                        {services.map((s, i) => (
                            <SwiperSlide key={i} className="!h-auto self-stretch">
                                <div className="service-card h-full p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all group flex flex-col items-center justify-center text-center relative overflow-hidden">
                                    <div className="w-16 h-16 bg-cyan-500/10 rounded-3xl flex items-center justify-center text-cyan-400 mb-8 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all relative z-10">
                                        <s.icon size={32} />
                                    </div>
                                    <h4 className="text-2xl font-black text-white mb-4 relative z-10">{s.title}</h4>
                                    <p className="text-slate-500 leading-relaxed text-sm relative z-10 font-medium">{s.desc}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style>{`
                .swiper-pagination-bullet {
                    background: #475569;
                    opacity: 0.5;
                    width: 10px;
                    height: 10px;
                    transition: all 0.3s ease;
                }
                .swiper-pagination-bullet-active {
                    background: #06b6d4;
                    opacity: 1;
                    width: 24px;
                    border-radius: 999px;
                }
                .swiper-slide {
                    transition: all 0.5s ease;
                    opacity: 0.6;
                    transform: scale(0.85);
                }
                .swiper-slide-active {
                    opacity: 1;
                    transform: scale(1);
                    z-index: 20;
                }
                .swiper-slide-active .service-card {
                    background: rgba(255, 255, 255, 0.05);
                    box-shadow: 0 0 40px rgba(6, 182, 212, 0.15);
                    border-color: rgba(6, 182, 212, 0.3);
                }
            `}</style>
        </section>
    );
};

export default Services;
