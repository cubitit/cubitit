import React, { useState, useEffect, useRef } from 'react';
import {
  Layers,
  Cpu,
  Globe,
  BarChart3,
  ArrowRight,
  X,
  Sparkles,
  MessageSquare,
  Send,
  Loader2,
  Volume2,
  Play,
  Terminal,
  Clock,
  Zap,
  Code2,
  ShieldCheck,
  ChevronDown,
  Facebook,
  Linkedin,
  Mail,
  ExternalLink,
  Smartphone,
  Server,
  Palette,
  CheckCircle2 // Added missing import
} from 'lucide-react';

const apiKey = ""; // Set by environment

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Welcome to Cubit IT. We turn disruptive ideas into market-leading businesses. How can we assist your venture today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isTtsLoading, setIsTtsLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const fetchGemini = async (prompt, systemPrompt = "", isJson = false) => {
    let delay = 1000;
    for (let i = 0; i < 5; i++) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            ...(isJson && { generationConfig: { responseMimeType: "application/json" } })
          })
        });
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) throw new Error('Empty response');

        if (isJson) {
          try {
            return JSON.parse(text);
          } catch (e) {
            // Fallback for malformed JSON
            return { architecture: "Architecture draft unavailable.", strategy: "Strategy generation error.", timeline: "Estimation failed." };
          }
        }
        return text;
      } catch (err) {
        if (i === 4) throw err;
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
  };

  const playTTS = async (text) => {
    setIsTtsLoading(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Professional assistant voice: ${text}` }] }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } } }
          },
          model: "gemini-2.5-flash-preview-tts"
        })
      });
      const result = await response.json();
      const pcmData = result.candidates[0].content.parts[0].inlineData.data;
      const audioBlob = pcmToWav(pcmData, 24000);
      new Audio(URL.createObjectURL(audioBlob)).play();
    } catch (err) { console.error(err); } finally { setIsTtsLoading(false); }
  };

  const pcmToWav = (base64Pcm, sampleRate) => {
    const pcmBuffer = Uint8Array.from(atob(base64Pcm), c => c.charCodeAt(0)).buffer;
    const header = new ArrayBuffer(44);
    const view = new DataView(header);
    const length = pcmBuffer.byteLength;
    view.setUint32(0, 0x46464952, true); view.setUint32(4, 36 + length, true); view.setUint32(8, 0x45564157, true);
    view.setUint32(12, 0x20746d66, true); view.setUint32(16, 16, true); view.setUint16(20, 1, true);
    view.setUint16(22, 1, true); view.setUint32(24, sampleRate, true); view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true); view.setUint16(34, 16, true); view.setUint32(36, 0x61746164, true); view.setUint32(40, length, true);
    return new Blob([header, pcmBuffer], { type: 'audio/wav' });
  };

  const generateProjectBlueprint = async (e) => {
    e.preventDefault();
    const vision = new FormData(e.target).get('vision');
    if (!vision) return;
    setIsAiLoading(true);
    setAiResult(null);
    const systemPrompt = "Architect a technical business roadmap JSON. Use terms like 'Enterprise Cloud', 'High-Frequency Processing', 'Next-Gen Frontend'. Fields: architecture (string), strategy (string), timeline (string). Do not mention specific AI models.";
    try {
      const result = await fetchGemini(`Idea: ${vision}`, systemPrompt, true);
      setAiResult(result);
    } catch (err) {
      console.error(err);
      setAiResult({ architecture: "Cloud infrastructure drafting error.", strategy: "Consult with a Cubit architect.", timeline: "Pending review." });
    } finally { setIsAiLoading(false); }
  };

  const handleChat = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsChatLoading(true);
    try {
      const result = await fetchGemini(userMsg, "You are the Cubit IT Business Consultant. We turn ideas into multi-million dollar businesses. Professional and elite.");
      // Ensure result is a string before setting state to avoid "Objects as child" error
      const textResponse = typeof result === 'string' ? result : (result?.text || "I'm processing your request. Please email info@cubitit.com for immediate business scaling.");
      setChatMessages(prev => [...prev, { role: 'ai', text: textResponse }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'ai', text: "Support currently busy. Please email info@cubitit.com." }]);
    } finally { setIsChatLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#030712] font-sans text-slate-300 selection:bg-cyan-500/30">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150"></div>
      </div>

      {/* Floating Support */}
      <button onClick={() => setShowChat(!showChat)} className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-gradient-to-tr from-cyan-500 to-blue-600 text-white rounded-[2rem] shadow-[0_0_40px_rgba(6,182,212,0.3)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 group">
        {showChat ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {showChat && (
        <div className="fixed bottom-28 right-8 z-[60] w-[380px] h-[550px] bg-slate-900/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
          <div className="p-6 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
              <span className="font-bold text-white text-lg tracking-tight">Cubit Concierge</span>
            </div>
            <Sparkles size={18} className="text-cyan-400" />
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                <div className={`group relative max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${msg.role === 'ai' ? 'bg-white/5 text-slate-300 border border-white/5 shadow-sm' : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'}`}>
                  {msg.text}
                  {msg.role === 'ai' && (
                    <button onClick={() => playTTS(msg.text)} className="absolute -right-10 top-2 p-2 text-slate-500 hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {isTtsLoading ? <Loader2 size={16} className="animate-spin" /> : <Volume2 size={16} />}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="p-5 bg-white/5 border-t border-white/10 flex gap-2">
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleChat()} placeholder="How can we scale you?" className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm outline-none focus:border-cyan-500/50 transition-colors text-white" />
            <button onClick={handleChat} disabled={isChatLoading} className="p-3 bg-cyan-500 text-white rounded-2xl hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-900/20">
              {isChatLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
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

      {/* Hero Section */}
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

      {/* Core Services */}
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

      {/* Idea-to-Business Engine */}
      <section id="vision" className="py-32 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-20 items-center">
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

                <div className="p-10 min-h-[450px] flex flex-col justify-center">
                  {aiResult ? (
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
                      <button onClick={() => setAiResult(null)} className="w-full text-center text-[10px] uppercase font-black text-slate-600 hover:text-cyan-400 pt-4">Reset Lab</button>
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
                      <button disabled={isAiLoading} className="w-full bg-cyan-500 hover:bg-cyan-400 text-white py-5 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-cyan-900/40 transition-all">
                        {isAiLoading ? <Loader2 size={24} className="animate-spin" /> : <Sparkles size={24} />}
                        {isAiLoading ? 'Synthesizing...' : 'Architect Business'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach */}
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

      {/* Footer / Contact */}
      <footer id="contact" className="pt-32 pb-20 px-8 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-start mb-24">
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center font-black text-xl">C</div>
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
    </div>
  );
};

export default App;