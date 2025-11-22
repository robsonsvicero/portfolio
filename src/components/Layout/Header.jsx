import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../UI/Button';
import './Header.css';
import logoBranco from '../../images/logo_branco.png';
import logoAzul from '../../images/logo_azul.png';

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
    <header className={`header ${scrolled ? 'scrolled' : ''} ${variant === 'solid' ? 'header-solid' : ''}`}>
      <div className="container header-container">
        <div className="header-content row justify-content-between">
          <div className="logo-container">
            <a href="/#inicio" onClick={(e) => handleNavigation(e, 'inicio')}>
              <img
                src={scrolled || variant === 'solid' ? logoAzul : logoBranco}
                alt="Logo Robson Svicero"
                className="logo"
              />
            </a>
          </div>

          <nav>
            <div
              className={`mobile-menu ${menuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
            >
              <span className="line1"></span>
              <span className="line2"></span>
              <span className="line3"></span>
            </div>

            <ul className={`nav-list ${menuOpen ? 'active' : ''}`}>
              <li>
                <a className="item-list" href="/#inicio" onClick={(e) => handleNavigation(e, 'inicio')}>
                  Início
                </a>
              </li>
              <li>
                <a className="item-list" href="/#works" onClick={(e) => handleNavigation(e, 'works')}>
                  Portfólio
                </a>
              </li>
              <li>
                <a className="item-list" href="/#expertises" onClick={(e) => handleNavigation(e, 'expertises')}>
                  Serviços
                </a>
              </li>
              <li>
                <a className="item-list" href="/#about" onClick={(e) => handleNavigation(e, 'about')}>
                  Sobre
                </a>
              </li>
              <li>
                <a className="item-list" href="/#contact" onClick={(e) => handleNavigation(e, 'contact')}>
                  Contato
                </a>
              </li>

              <div className="buttons-header row">
                <Button
                  href="/agenda"
                  variant="secondary"
                  className="btn-header"
                >
                  Agende uma reunião
                </Button>
              </div>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
