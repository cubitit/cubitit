import React from 'react';

const Stats = () => {
    return (
        <section className="py-24 px-8">
            <div className="max-w-7xl mx-auto bg-gradient-to-br from-white/5 to-transparent p-1 border border-white/10 rounded-[4rem]">
                <div className="bg-[#030712] rounded-[3.8rem] py-20 px-10 flex flex-wrap justify-center gap-20 md:gap-40 text-center">
                    {[
                        { val: "100+", label: "Global Clients" },
                        { val: "15+", label: "Market Sectors" },
                        { val: "24/7", label: "Elite Support" },
                        { val: "Zero", label: "Failed Launches" }
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="text-5xl font-black text-white mb-2 tracking-tighter">{stat.val}</div>
                            <div className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
