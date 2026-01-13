import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../UI/Button';

import logoBranco from '../../images/simbolo 3.png';
import logoAzul from '../../images/simbolo 1.png';

const Header = ({ variant = 'transparent' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleNavigation = (e, sectionId) => {
    e.preventDefault();
    closeMenu();

    // Se já estiver na home, apenas rola até a seção
    if (location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Se estiver em outra página, navega para home e depois rola
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header
      className={`w-full py-5 fixed top-0 left-0 z-50 transition-all duration-300
        ${scrolled || variant === 'solid' ? 'bg-[#fff8f0cc] shadow-lg' : 'bg-transparent'}
        `}
    >
      <div className="max-w-screen-xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/#inicio" onClick={(e) => handleNavigation(e, 'inicio')}>
              <img
                src={scrolled || variant === 'solid' ? logoAzul : logoBranco}
                alt="Logo Svicero Studio"
                className="h-14 sm:h-16 md:h-20 w-auto transition-all duration-300"
              />
            </a>
          </div>

          {/* Navegação Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            {[
              { label: 'Início', section: 'inicio' },
              { label: 'Tríade', section: 'triade' },
              { label: 'Projetos', section: 'projetos' },
              { label: 'Serviços', section: 'servicos' },
              { label: 'Sobre', section: 'sobre' },
            ].map((item) => (
              <a
                key={item.section}
                href={`/#${item.section}`}
                onClick={(e) => handleNavigation(e, item.section)}
                className={`font-title text-base xl:text-lg transition-colors duration-200 px-3 py-2
                  ${scrolled || variant === 'solid' ? 'text-primary' : 'text-cream'}
                  hover:bg-secondary hover:text-cream hover:rounded-lg`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/blog"
              onClick={closeMenu}
              className={`font-title text-base xl:text-lg transition-colors duration-200 px-3 py-2
                ${scrolled || variant === 'solid' ? 'text-primary' : 'text-cream'}
                hover:bg-secondary hover:text-cream hover:rounded-lg`}
            >
              Blog
            </a>
            <Button
                href="/diagnostico"
                variant="secondary"
                className="inline-block"
              >Solicitar Diagnóstico Estratégico
              </Button>
          </nav>

          {/* Menu Mobile */}
          <div className="lg:hidden flex items-center">
            <button
              className="flex flex-col justify-center items-center w-12 h-12 group"
              onClick={toggleMenu}
              aria-label="Menu de navegação"
              aria-expanded={menuOpen}
            >
              <span className={`block w-7 h-0.5 bg-primary mb-1 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-7 h-0.5 bg-primary mb-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-7 h-0.5 bg-primary transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <nav
          role="navigation"
          aria-label="Menu principal mobile"
          className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-cream/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center transition-all duration-300
            ${menuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}
        >
          {[
            { label: 'Início', section: 'inicio' },
            { label: 'Tríade', section: 'triade' },
            { label: 'Projetos', section: 'projetos' },
            { label: 'Serviços', section: 'servicos' },
            { label: 'Sobre', section: 'sobre' },
          ].map((item) => (
            <a
              key={item.section}
              href={`/#${item.section}`}
              onClick={(e) => handleNavigation(e, item.section)}
              className={`font-title text-2xl mb-6 transition-colors duration-200 px-4 py-2
                text-primary hover:bg-secondary hover:text-cream hover:rounded-lg`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/blog"
            onClick={closeMenu}
            className={`font-title text-2xl mb-6 transition-colors duration-200 px-4 py-2
              text-primary hover:bg-secondary hover:text-cream hover:rounded-lg`}
          >
            Blog
          </a>
          <Button
            href="/agenda"
            variant="secondary"
            icon={<i className="fa-regular fa-calendar"></i>}
            className="px-8 py-3 text-lg font-semibold"
          >
            Agendar Conversa
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
