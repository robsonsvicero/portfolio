import React from 'react';
import heroImage from '../../images/hero.webp';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-16 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/70 via-dark-bg/60 to-dark-bg/80"></div>
      </div>
      <div className="relative z-10 text-center max-w-4xl mx-auto py-32">
        <h1 className="font-title text-5xl md:text-7xl font-bold text-cream mb-6 leading-tight">
          Design que conecta, <br /> estratégia que converte
        </h1>
        <p className="font-sans text-xl md:text-2xl text-cream/90 mb-10 leading-relaxed">
          Identidade Visual, UI/UX Design e Desenvolvimento Front-end<br />
          que transformam negócios em marcas memoráveis
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
