import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';
import './ServiceFrontEnd.css';

// Importar imagens
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
        className="whatsapp-button"
        style={{ display: whatsappVisible ? 'flex' : 'none' }}
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {/* Hero Section */}
      <section className="hero-servico idv-hero" id="inicio">
        <div className="hero-description">
          <h1>Identidade Visual</h1>
          <p>
            Construo identidades visuais criativas, estratégicas e alinhadas à essência da sua marca para que ela se destaque e se posicione com autoridade.
          </p>
          <Button
            className='lg:w-[40%] w-full'
            href="https://wa.me/5511964932007"
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fale comigo
          </Button>
        </div>
      </section>

      {/* Service Description */}
      <section className="service-description">
        <div className="container description-container">
          <div className="included">
            <h2>O que inclui</h2>
            <ul>
              <li>Criação de logotipo (símbolo e tipografia personalizada)</li>
              <li>Definição de paleta de cores e tipografia</li>
              <li>Manual de uso da marca (PDF)</li>
              <li>Apresentação da marca (PDF)</li>
              <li>Aplicações da marca (redes sociais, papelaria, etc)</li>
            </ul>
          </div>

          <div className="process">
            <h2>Processo de criação</h2>
            <ul>
              <li><strong>Briefing:</strong> análise da marca, público e objetivos.</li>
              <li><strong>Pesquisa e referências:</strong> estudo de mercado e concorrentes.</li>
              <li><strong>Conceito e esboços:</strong> desenvolvimento das ideias iniciais.</li>
              <li><strong>Apresentação e ajustes:</strong> refinamento e entrega final.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery">
        <div className="container gallery-container">
          <h2>Projetos relacionados</h2>
          <div className="grid-galeria">
            <a href="https://www.behance.net/gallery/236215677/Alexandre-Ivo-Professor-de-musica" target="_blank" rel="noopener noreferrer">
              <img src={alexandreIvo} alt="Projeto Alexandre Ivo" />
            </a>
            <a href="https://www.behance.net/gallery/221467317/PowerBrain" target="_blank" rel="noopener noreferrer">
              <img src={powerbrain} alt="Projeto PowerBrain" />
            </a>
            <a href="https://www.behance.net/gallery/180857079/Chimp-Skatewear" target="_blank" rel="noopener noreferrer">
              <img src={chimp} alt="Projeto Chimp Skatewear" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-servico">
        <div className="container cta-container">
          <div className="front-content">
            <h2>Quer uma identidade visual que destaque sua marca?</h2>
            <p>Crie uma presença marcante com uma identidade visual criativa, coerente e profissional.</p>
            <Button
              className='lg:w-[40%] w-full'
              href="https://wa.me/5511964932007"
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fale comigo
            </Button>
          </div>
          <div className="img-content">
            <img src={ctaIdv} alt="Identidade Visual" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceIdentidadeVisual;
