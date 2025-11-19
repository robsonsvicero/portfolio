import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';
import './ServiceFrontEnd.css';

// Importar imagens
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
        className="whatsapp-button"
        style={{ display: whatsappVisible ? 'flex' : 'none' }}
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {/* Hero Section */}
      <section className="hero-servico ui-hero" id="inicio">
        <div className="hero-description">
          <h1>UI & UX Design</h1>
          <p>
            Crio interfaces visuais funcionais, modernas e esteticamente consistentes — focadas em experiência, usabilidade e conversão.
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
              <li>Criação de layout responsivo (desktop e mobile)</li>
              <li>Componentes e telas em Figma</li>
              <li>Design System e guia de estilo</li>
              <li>Prototipagem navegável (quando solicitado)</li>
            </ul>
          </div>

          <div className="process">
            <h2>Processo de criação</h2>
            <ul>
              <li><strong>Imersão:</strong> entendimento da proposta, público e objetivos.</li>
              <li><strong>Wireframes:</strong> definição da estrutura e fluxo de navegação.</li>
              <li><strong>Design Visual:</strong> aplicação da identidade visual e estética.</li>
              <li><strong>Prototipagem:</strong> criação de navegação interativa e apresentação final.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery">
        <div className="container gallery-container">
          <h2>Projetos relacionados</h2>
          <div className="grid-galeria">
            <a href="https://www.behance.net/gallery/174232557/Universal-Music" target="_blank" rel="noopener noreferrer">
              <img src={unm} alt="Projeto Universal Music Store" />
            </a>
            <a href="https://www.behance.net/gallery/174980645/Crypto" target="_blank" rel="noopener noreferrer">
              <img src={crypto} alt="Projeto Crypto" />
            </a>
            <a href="https://www.behance.net/gallery/164899909/App-JB-Imoveis" target="_blank" rel="noopener noreferrer">
              <img src={jbimoveis} alt="Projeto JB Imóveis" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-servico">
        <div className="container cta-container">
          <div className="front-content">
            <h2>Quer transformar sua interface em uma experiência memorável?</h2>
            <p>Vamos criar juntos uma interface intuitiva, envolvente e alinhada à identidade da sua marca.</p>
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
            <img src={ctaUi} alt="UI & UX Design" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceUIUXDesign;
