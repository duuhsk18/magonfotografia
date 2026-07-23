'use client';

import Image from 'next/image';

export function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById('projetos');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-screen min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <Image
        src="/projects/show-2024.png"
        alt="Magon Fotografia"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto animate-in fade-in duration-1000">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight text-balance">
          Imagens para viver agora
        </h1>
        <p className="text-xl md:text-2xl text-white/90 font-light mb-12 text-pretty">
          E lembrar depois.
        </p>
        
        <button
          onClick={scrollToProjects}
          className="inline-block px-8 py-3 bg-white text-black font-semibold tracking-widest text-sm hover:bg-white/90 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          VER PROJETOS
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center pt-2">
          <div className="w-1 h-1.5 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
