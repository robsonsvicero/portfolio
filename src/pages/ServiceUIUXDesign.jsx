import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';

// Importar imagens
import heroServiceUiux from '../images/hero_service-uiux-bg.webp';
import ctaUi from '../images/cta-uiux.webp';
import unm from '../images/cta-umusic.webp';
import crypto from '../images/cta-crypto.webp';
import jbimoveis from '../images/cta-jbimóveis.webp';

const ServiceUIUXDesign = () => {
  const [whatsappVisible, setWhatsappVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setWhatsappVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-cream">
      <Header variant="solid" />

      {/* Botão flutuante WhatsApp */}
      <a
        href="https://wa.me/5511964932007"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white text-3xl shadow-2xl hover:scale-110 transition-transform duration-300 ${whatsappVisible ? 'flex' : 'hidden'}`}
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-16 py-24" id="inicio">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroServiceUiux})` }}></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="font-title font-semibold text-cream text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-wide mb-6 drop-shadow-lg max-w-6xl">UI & UX Design</h1>
          <p className="font-body text-cream text-lg md:text-xl lg:text-2xl font-normal tracking-wide mb-10 max-w-4xl drop-shadow-md mx-auto">
            Crio interfaces visuais funcionais, modernas e esteticamente consistentes — focadas em experiência, usabilidade e conversão.
          </p>
          <Button
              href="/diagnostico"
              variant="secondary"
            >Solicitar Diagnóstico Estratégico</Button>
        </div>
      </section>

      {/* Service Description */}
      <section className="bg-dark-bg py-24 px-4 md:px-16">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-neutral-900 rounded-2xl p-8 border border-cream/10">
            <h2 className="font-title text-4xl md:text-5xl font-light text-cream mb-4">O que inclui</h2>
            <ul className="space-y-4 text-cream/80 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Criação de layout responsivo (desktop e mobile)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Componentes e telas em Figma</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Design System e guia de estilo</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Prototipagem navegável (quando solicitado)</span>
              </li>
            </ul>
          </div>

          <div className="bg-neutral-900 rounded-2xl p-8 border border-cream/10">
            <h2 className="font-title text-4xl md:text-5xl font-light text-cream mb-4">Processo de criação</h2>
            <ul className="space-y-4 text-cream/80 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-cream">Imersão:</strong> entendimento da proposta, público e objetivos.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-cream">Wireframes:</strong> definição da estrutura e fluxo de navegação.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-cream">Design Visual:</strong> aplicação da identidade visual e estética.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span><strong className="text-cream">Prototipagem:</strong> criação de navegação interativa e apresentação final.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-cream py-24 px-4 md:px-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-title text-4xl md:text-5xl font-light text-low-dark">Projetos relacionados</h2>
            
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <a href="https://www.behance.net/gallery/174232557/Universal-Music" target="_blank" rel="noopener noreferrer" className="block group">
              <img src={unm} alt="Projeto Universal Music Store" className="w-full h-auto rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105" />
            </a>
            <a href="https://www.behance.net/gallery/174980645/Crypto" target="_blank" rel="noopener noreferrer" className="block group">
              <img src={crypto} alt="Projeto Crypto" className="w-full h-auto rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105" />
            </a>
            <a href="https://www.behance.net/gallery/164899909/App-JB-Imoveis" target="_blank" rel="noopener noreferrer" className="block group">
              <img src={jbimoveis} alt="Projeto JB Imóveis" className="w-full h-auto rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-24 px-4 md:px-16">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <h2 className="font-title text-4xl md:text-5xl font-light text-cream mb-4">Quer transformar sua interface em uma experiência memorável?</h2>
            <p className="font-sans text-lg text-cream/80 mb-8 leading-relaxed">Vamos criar juntos uma interface intuitiva, envolvente e alinhada à identidade da sua marca.</p>
            <Button
              href="/diagnostico"
              variant="secondary"
            >Solicitar Diagnóstico Estratégico</Button>
          </div>
          <div className="w-full lg:w-1/2">
            <img src={ctaUi} alt="UI & UX Design" className="w-full h-auto rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceUIUXDesign;
