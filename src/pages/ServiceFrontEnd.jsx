import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';
import './ServiceFrontEnd.css';

// Importar imagens
import ctaDev from '../images/cta-dev.webp';
import powerBrain from '../images/cta-powerbrain-web.webp';
import classz from '../images/cta-sacada.webp';
import isaqueMoveis from '../images/cta-isaquemoveis.webp';

const ServiceFrontEnd = () => {
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
      <section className="hero-servico dev-hero" id="inicio">
        <div className="hero-description">
          <h1>Desenvolvimento Front-End</h1>
          <p>
            Desenvolvimento de sites modernos, rápidos e otimizados para fortalecer sua presença digital.
          </p>
          <Button
            className=' lg:w-[40%] w-full'
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
              <li>Desenvolvimento front-end (HTML, CSS, JavaScript)</li>
              <li>Estrutura semântica e código limpo</li>
              <li>Estilo moderno com foco em tipografia, hierarquia visual e performance</li>
              <li>Estrutura otimizada e leve para carregamento rápido e excelente usabilidade</li>
            </ul>
          </div>

          <div className="process">
            <h2>Processo de criação</h2>
            <ul>
              <li><strong>Alinhamento de objetivos:</strong> compreensão do propósito do site, público-alvo e necessidades funcionais.</li>
              <li><strong>Planejamento e prototipagem:</strong> definição da estrutura das páginas e navegação com base no design existente ou em um wireframe.</li>
              <li><strong>Desenvolvimento:</strong> conforme necessidade, construção do site em WordPress ou HTML, CSS e JavaScript, com possibilidade de integração React conforme necessidade.</li>
              <li><strong>Testes e ajustes:</strong> verificação de performance, compatibilidade e segurança.</li>
              <li><strong>Entrega e suporte:</strong> entrega do projeto otimizado e suporte inicial para ajustes e orientações de uso.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery">
        <div className="container gallery-container">
          <h2>Projetos relacionados</h2>
          <div className="grid-galeria">
            <a href="https://powerbrainbr.com/" target="_blank" rel="noopener noreferrer">
              <img src={powerBrain} alt="Site PowerBrain" />
            </a>
            <a href="https://www.sacadaclassz.com.br/" target="_blank" rel="noopener noreferrer">
              <img src={classz} alt="Site Sacada Classz" />
            </a>
            <a href="https://isaquemoveis.com.br/" target="_blank" rel="noopener noreferrer">
              <img src={isaqueMoveis} alt="Site Isaque Móveis" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-servico">
        <div className="container cta-container">
          <div className="front-content">
            <h2>Quer transformar seu design em um site funcional?</h2>
            <p>Entre em contato e descubra como posso te ajudar a dar vida à sua interface.</p>
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
            <img src={ctaDev} alt="Desenvolvimento Front-End" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceFrontEnd;
