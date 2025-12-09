import React from 'react';
import '../styles/BusinessCard.css';
import simbolo from '../images/simbolo.png';

const BusinessCard = () => {
  return (
    <div className="business-card-container">
      <div className="business-card">
        {/* Logo */}
        <div className="business-card-logo bg-white">
          <img src={simbolo} alt="Svicero Studio" className="logo-image" />
        </div>

        {/* Título e Tagline */}
        <div className="business-card-title">
          <h1>SVICERO STUDIO</h1>
          <p className="tagline">Simplicidade que posiciona</p>
        </div>

        {/* Descrição */}
        <div className="business-card-description">
          <p>
            Criamos a fundação digital da sua marca, integrando 
            Identidade Visual, UX/UI e Front-end para performance e 
            autoridade.
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="business-card-buttons">
          <a 
            href="https://wa.me/5500000000000" 
            className="business-card-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Começar um Projeto
          </a>

          <a 
            href="https://www.behance.net/seu-portfolio" 
            className="business-card-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver Portfólio (Behance)
          </a>

          <a 
            href="https://www.seuwebsite.com" 
            className="business-card-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nosso Website Oficial
          </a>

          <a 
            href="https://www.instagram.com/korustudyo" 
            className="business-card-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Acompanhe o Studio
          </a>

          <a 
            href="mailto:contato@seusite.com" 
            className="business-card-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            E-mail de contato
          </a>
        </div>

        {/* Rodapé */}
        <div className="business-card-footer">
          <div className="footer-dot"></div>
          <p>@2026 | Svicero Studio</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
