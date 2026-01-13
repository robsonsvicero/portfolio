import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';

// Importar imagens
import heroServiceIdv from '../images/hero_service-idv-bg.webp';
import ctaIdv from '../images/cta-identidade.webp';
import alexandreIvo from '../images/cta-alexandreivo.webp';
import powerbrain from '../images/cta-powerbrain.webp';
import chimp from '../images/cta-chimp.webp';

const ServiceIdentidadeVisual = () => {
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
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroServiceIdv})` }}></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="font-title font-semibold text-cream text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-wide mb-6 drop-shadow-lg max-w-6xl">Identidade Visual</h1>
          <p className="font-body text-cream text-lg md:text-xl lg:text-2xl font-normal tracking-wide mb-10 max-w-4xl drop-shadow-md mx-auto">
            Construo identidades visuais criativas, estratégicas e alinhadas à essência da sua marca para que ela se destaque e se posicione com autoridade.
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
                <span className="text-secondary mt-1">•</span>
                <span>Criação de logotipo (símbolo e tipografia personalizada)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span>Definição de paleta de cores e tipografia</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span>Manual de uso da marca (PDF)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span>Apresentação da marca (PDF)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span>Aplicações da marca (redes sociais, papelaria, etc)</span>
              </li>
            </ul>
          </div>

          <div className="bg-neutral-900 rounded-2xl p-8 border border-cream/10">
            <h2 className="font-title text-4xl md:text-5xl font-light text-cream mb-4">Processo de criação</h2>
            <ul className="space-y-4 text-cream/80 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-cream">Briefing:</strong> análise da marca, público e objetivos.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-cream">Pesquisa e referências:</strong> estudo de mercado e concorrentes.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-cream">Conceito e esboços:</strong> desenvolvimento das ideias iniciais.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary mt-1">•</span>
                <span><strong className="text-cream">Apresentação e ajustes:</strong> refinamento e entrega final.</span>
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
            <a href="https://www.behance.net/gallery/236215677/Alexandre-Ivo-Professor-de-musica" target="_blank" rel="noopener noreferrer" className="block group">
              <img src={alexandreIvo} alt="Projeto Alexandre Ivo" className="w-full h-auto rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105" />
            </a>
            <a href="https://www.behance.net/gallery/221467317/PowerBrain" target="_blank" rel="noopener noreferrer" className="block group">
              <img src={powerbrain} alt="Projeto PowerBrain" className="w-full h-auto rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105" />
            </a>
            <a href="https://www.behance.net/gallery/180857079/Chimp-Skatewear" target="_blank" rel="noopener noreferrer" className="block group">
              <img src={chimp} alt="Projeto Chimp Skatewear" className="w-full h-auto rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-24 px-4 md:px-16">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <h2 className="font-title text-4xl md:text-5xl font-light text-cream mb-4">Quer uma identidade visual que destaque sua marca?</h2>
            <p className="font-sans text-lg text-cream/80 mb-8 leading-relaxed">Crie uma presença marcante com uma identidade visual criativa, coerente e profissional.</p>
            <Button
              href="/diagnostico"
              variant="secondary"
            >Solicitar Diagnóstico Estratégico</Button>
          </div>
          <div className="w-full lg:w-1/2">
            <img src={ctaIdv} alt="Identidade Visual" className="w-full h-auto rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceIdentidadeVisual;
