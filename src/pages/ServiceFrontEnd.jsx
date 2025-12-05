import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';

// Importar imagens
import ctaDev from '../images/cta-dev.webp';
import powerBrain from '../images/cta-powerbrain-web.webp';
import classz from '../images/cta-sacada.webp';
import isaqueMoveis from '../images/cta-isaquemoveis.webp';
import heroFrontEnd from '../images/service-frontend-bg.webp';

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
        className={`fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg transition-opacity duration-300 ${whatsappVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label="Fale pelo WhatsApp"
      >
        <i className="fa-brands fa-whatsapp text-3xl"></i>
      </a>

      {/* Hero Section */}
      <section 
        id="inicio" 
        className="relative h-[780px] flex items-center justify-center text-center overflow-hidden bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${heroFrontEnd})` }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 lg:px-52">
          <h1 className="font-title font-extralight text-cream text-4xl md:text-5xl lg:text-6xl tracking-wide mb-6">
            Desenvolvimento Front-End
          </h1>
          <p className="font-sans text-cream text-base md:text-lg lg:text-xl font-light tracking-wide mb-10 leading-7">
            Desenvolvimento de sites modernos, rápidos e otimizados para fortalecer sua presença digital.
          </p>
          <Button
            className='lg:w-[40%] w-full'
            href="https://wa.me/5511964932007"
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Começar seu Posicionamento
          </Button>
        </div>
      </section>

      {/* Service Description */}
      <section className="bg-dark-bg py-24 px-4 lg:px-52">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-10">
          <div className="lg:w-1/2">
            <h2 className="font-title text-3xl lg:text-5xl font-light text-primary uppercase text-center mb-8">
              O que inclui
            </h2>
            <ul className="space-y-4 pl-4">
              <li className="text-cream text-lg lg:text-2xl font-extralight leading-relaxed">
                Desenvolvimento front-end (HTML, CSS, JavaScript)
              </li>
              <li className="text-cream text-lg lg:text-2xl font-extralight leading-relaxed">
                Estrutura semântica e código limpo
              </li>
              <li className="text-cream text-lg lg:text-2xl font-extralight leading-relaxed">
                Estilo moderno com foco em tipografia, hierarquia visual e performance
              </li>
              <li className="text-cream text-lg lg:text-2xl font-extralight leading-relaxed">
                Estrutura otimizada e leve para carregamento rápido e excelente usabilidade
              </li>
            </ul>
          </div>

          <div className="lg:w-1/2 lg:pt-60">
            <h2 className="font-title text-3xl lg:text-5xl font-light text-primary uppercase text-center mb-8">
              Processo de criação
            </h2>
            <ul className="space-y-4 pl-4">
              <li className="text-cream text-lg lg:text-2xl font-extralight leading-relaxed">
                <strong className="font-normal text-blue-light">Alinhamento de objetivos:</strong> compreensão do propósito do site, público-alvo e necessidades funcionais.
              </li>
              <li className="text-cream text-lg lg:text-2xl font-extralight leading-relaxed">
                <strong className="font-normal text-blue-light">Planejamento e prototipagem:</strong> definição da estrutura das páginas e navegação com base no design existente ou em um wireframe.
              </li>
              <li className="text-cream text-lg lg:text-2xl font-extralight leading-relaxed">
                <strong className="font-normal text-blue-light">Desenvolvimento:</strong> conforme necessidade, construção do site em WordPress ou HTML, CSS e JavaScript, com possibilidade de integração React conforme necessidade.
              </li>
              <li className="text-cream text-lg lg:text-2xl font-extralight leading-relaxed">
                <strong className="font-normal text-blue-light">Testes e ajustes:</strong> verificação de performance, compatibilidade e segurança.
              </li>
              <li className="text-cream text-lg lg:text-2xl font-extralight leading-relaxed">
                <strong className="font-normal text-blue-light">Entrega e suporte:</strong> entrega do projeto otimizado e suporte inicial para ajustes e orientações de uso.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-cream py-24 px-4 lg:px-52">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-title text-3xl lg:text-5xl font-light text-primary uppercase text-center mb-8">
            Projetos relacionados
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://powerbrainbr.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 min-w-[calc(33.333%-1rem)] max-w-[calc(33.333%-1rem)]"
            >
              <img 
                src={powerBrain} 
                alt="Site PowerBrain" 
                className="w-full h-full object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </a>
            <a 
              href="https://www.sacadaclassz.com.br/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 min-w-[calc(33.333%-1rem)] max-w-[calc(33.333%-1rem)]"
            >
              <img 
                src={classz} 
                alt="Site Sacada Classz" 
                className="w-full h-full object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </a>
            <a 
              href="https://isaquemoveis.com.br/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 min-w-[calc(33.333%-1rem)] max-w-[calc(33.333%-1rem)]"
            >
              <img 
                src={isaqueMoveis} 
                alt="Site Isaque Móveis" 
                className="w-full h-full object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-24 px-4 lg:px-52">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12 rounded-3xl p-6 lg:p-12 bg-gradient-to-br from-primary to-secondary">
          <div className="lg:w-[70%] flex flex-col justify-center text-cream">
            <h2 className="font-title text-3xl lg:text-5xl font-light leading-snug mb-5">
              Quer transformar seu design em um site funcional?
            </h2>
            <p className="text-base lg:text-lg font-extralight mb-10">
              Entre em contato e descubra como posso te ajudar a dar vida à sua interface.
            </p>
            <Button
              className='lg:w-[40%] w-full'
              href="/agenda"
              variant="secondary"
              icon={<i className="fa-regular fa-calendar"></i>}
            >
              Agendar Conversa Estratégica
            </Button>
          </div>
          <div className="lg:w-[30%] flex justify-center">
            <img 
              src={ctaDev} 
              alt="Desenvolvimento Front-End" 
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceFrontEnd;
