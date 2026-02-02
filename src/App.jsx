import React from 'react';
import Background from './components/layout/Background';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import ArchitectureLab from './components/sections/ArchitectureLab';
import Stats from './components/sections/Stats';
import ChatWidget from './components/chat/ChatWidget';

const App = () => {
  return (
    <div className="min-h-screen bg-[#030712] font-sans text-slate-300 selection:bg-cyan-500/30">
      <Background />
      <ChatWidget />
      <Navbar />
      <Hero />
      <Services />
      <ArchitectureLab />
      <Stats />
      <Footer />
    </div>
  );
};

export default App;