import React, { useState } from 'react';
import { CheckCircle2, Terminal, Loader2, Sparkles, Send } from 'lucide-react';
import { useGemini } from '../../hooks/useGemini';

const ArchitectureLab = () => {
    const [aiResult, setAiResult] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const { generate, loading } = useGemini();

    const generateProjectBlueprint = async (e) => {
        e.preventDefault();
        const vision = new FormData(e.target).get('vision');
        if (!vision) return;

        setAiResult(null);
        setShowForm(false);
        const systemPrompt = "Architect a technical business roadmap JSON. Return a SINGLE JSON object (not an array). Fields: architecture (string), strategy (string), timeline (string). Use terms like 'Enterprise Cloud', 'High-Frequency Processing', 'Next-Gen Frontend'. Do not mention specific AI models.";

        try {
            let result = await generate(`Idea: ${vision}`, systemPrompt, true);
            // Handle case where model returns an array of phases instead of single object
            if (Array.isArray(result)) {
                result = result[0];
            }
            setAiResult(result);
        } catch (err) {
            console.error(err);
            setAiResult({ architecture: "Cloud infrastructure drafting error.", strategy: "Consult with a Cubit architect.", timeline: "Pending review." });
        }
    };

    const submitProposal = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Mock email submission
        console.log("Submitting proposal:", { ...data, aiResult });
        alert(`Proposal submitted for ${data.name}! We will contact you at ${data.email} shortly.`);

        // Reset
        setShowForm(false);
        setAiResult(null);
    };

    return (
        <section id="blueprint" className="py-20 md:py-32 px-6 md:px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
                <div className="lg:col-span-2 space-y-10">
                    <h2 className="text-6xl font-black text-white leading-none tracking-tighter">
                        Blueprint <br />
                        <span className="text-cyan-500">to Reality.</span>
                    </h2>
                    <p className="text-lg text-slate-400 font-medium">
                        Every unicorn starts as a thought. Our automated business architect drafts the infrastructure you need to turn that thought into a competitive force.
                    </p>
                    <div className="grid gap-4">
                        {['Architecture Mapping', 'Scalability Strategy', 'Market Entry Plan'].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 text-white font-black text-xs uppercase tracking-widest bg-white/5 p-4 rounded-2xl border border-white/5">
                                <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-[10px] text-black">
                                    <CheckCircle2 size={14} />
                                </div>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <div className="relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative bg-slate-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-3xl backdrop-blur-sm">
                            <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
                                </div>
                                <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Cubit Architecture Lab</span>
                            </div>

                            <div className="p-6 md:p-10 min-h-[450px] flex flex-col justify-center">
                                {showForm ? (
                                    <form onSubmit={submitProposal} className="animate-in slide-in-from-right duration-500 space-y-6">
                                        <div className="space-y-2">
                                            <h4 className="text-2xl font-black text-white">Submit for Review</h4>
                                            <p className="text-slate-400 text-sm">Our experts will refine this architecture.</p>
                                        </div>
                                        <div className="space-y-4">
                                            <input name="name" required placeholder="Full Name" className="w-full bg-black/30 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-cyan-500 text-white placeholder:text-slate-600" />
                                            <input name="email" required type="email" placeholder="Email Address" className="w-full bg-black/30 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-cyan-500 text-white placeholder:text-slate-600" />
                                            <input name="phone" required type="tel" placeholder="Phone Number" className="w-full bg-black/30 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-cyan-500 text-white placeholder:text-slate-600" />
                                        </div>
                                        <div className="flex gap-4 pt-2">
                                            <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-4 rounded-xl font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all">Back</button>
                                            <button type="submit" className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/20">
                                                <Send size={18} /> Submit
                                            </button>
                                        </div>
                                    </form>
                                ) : aiResult ? (
                                    <div className="animate-in zoom-in-95 duration-700 space-y-8 font-mono">
                                        <div className="space-y-4">
                                            <div className="text-cyan-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                                <Terminal size={14} /> Proposed Architecture
                                            </div>
                                            <div className="p-6 bg-black/40 rounded-3xl border border-white/5 text-xs text-slate-400 leading-loose">
                                                {aiResult.architecture}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="p-6 bg-white/5 rounded-3xl">
                                                <div className="text-[9px] font-black text-slate-500 uppercase mb-2">Strategy</div>
                                                <p className="text-[11px] leading-relaxed text-slate-400">{aiResult.strategy}</p>
                                            </div>
                                            <div className="p-6 bg-white/5 rounded-3xl">
                                                <div className="text-[9px] font-black text-slate-500 uppercase mb-2">Timeline</div>
                                                <p className="text-[11px] leading-relaxed text-slate-400">{aiResult.timeline}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 pt-4">
                                            <button onClick={() => setAiResult(null)} className="flex-1 text-[10px] uppercase font-black text-slate-600 hover:text-cyan-400 py-3">Reset Lab</button>
                                            <button onClick={() => setShowForm(true)} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl text-[10px] uppercase font-black tracking-widest border border-white/5">
                                                Submit for Review
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={generateProjectBlueprint} className="space-y-8">
                                        <h4 className="text-2xl font-black text-white">Project Vision</h4>
                                        <textarea
                                            name="vision"
                                            required
                                            placeholder="Describe your business idea... (e.g. A decentralised rental platform for premium tech gear)"
                                            className="w-full bg-black/30 border border-white/10 rounded-[2rem] p-8 h-40 outline-none focus:border-cyan-500 transition-all text-white placeholder:text-slate-700 resize-none shadow-inner"
                                        />
                                        <button disabled={loading} className="w-full bg-cyan-500 hover:bg-cyan-400 text-white py-5 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-cyan-900/40 transition-all">
                                            {loading ? <Loader2 size={24} className="animate-spin" /> : <Sparkles size={24} />}
                                            {loading ? 'Synthesizing...' : 'Architect Business'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArchitectureLab;
