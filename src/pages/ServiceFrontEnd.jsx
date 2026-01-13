import React from 'react';
import ServicePage from '../components/ServicePage';
import SEOHelmet from '../components/SEOHelmet';

// Importar imagens
import ctaDev from '../images/cta-dev.webp';
import powerBrain from '../images/cta-powerbrain-web.webp';
import classz from '../images/cta-sacada.webp';
import isaqueMoveis from '../images/cta-isaquemoveis.webp';
import heroFrontEnd from '../images/hero_service-frontend-bg.webp';

const ServiceFrontEnd = () => {
  const serviceData = {
    heroImage: heroFrontEnd,
    title: 'Desenvolvimento Front-End',
    subtitle: 'Desenvolvimento de sites modernos, rápidos e otimizados para fortalecer sua presença digital.',
    includes: [
      'Desenvolvimento front-end (HTML, CSS, JavaScript)',
      'Estrutura semântica e código limpo',
      'Estilo moderno com foco em tipografia, hierarquia visual e performance',
      'Estrutura otimizada e leve para carregamento rápido e excelente usabilidade'
    ],
    process: [
      'Alinhamento de objetivos: compreensão do propósito do site, público-alvo e necessidades funcionais',
      'Planejamento e prototipagem: definição da estrutura das páginas e navegação com base no design existente ou em um wireframe',
      'Desenvolvimento: conforme necessidade, construção do site em WordPress ou HTML, CSS e JavaScript, com possibilidade de integração React',
      'Testes e ajustes: verificação de performance, compatibilidade e segurança',
      'Entrega e suporte: entrega do projeto otimizado e suporte inicial para ajustes e orientações de uso'
    ],
    examples: [
      { image: powerBrain, alt: 'Site PowerBrain', title: 'PowerBrain', link: 'https://powerbrainbr.com/' },
      { image: classz, alt: 'Site Sacada Classz', title: 'Sacada Classz', link: 'https://www.sacadaclassz.com.br/' },
      { image: isaqueMoveis, alt: 'Site Isaque Móveis', title: 'Isaque Móveis', link: 'https://isaquemoveis.com.br/' }
    ],
    ctaImage: ctaDev,
    ctaTitle: 'Quer um site que une design e funcionalidade?',
    ctaDescription: 'Vamos criar juntos um site minimalista, rápido e que converte visitantes em clientes fiéis.',
    accentColor: 'secondary'
  };

  return (
    <>
      <SEOHelmet 
        title="Desenvolvimento Front-End"
        description="Desenvolvimento de sites modernos, rápidos e otimizados para fortalecer sua presença digital. HTML, CSS, JavaScript e React."
        keywords="desenvolvimento front-end, criação de sites, html css javascript, react, sites modernos, desenvolvimento web"
      />
      <ServicePage {...serviceData} />
    </>
  );
};

export default ServiceFrontEnd;
