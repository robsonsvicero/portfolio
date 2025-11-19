import React, { useState, useEffect } from 'react';
import Button from '../UI/Button';
import './Header.css';
import logoBranco from '../../images/logo_branco.png';
import logoAzul from '../../images/logo_azul.png';

const Header = ({ variant = 'transparent' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${variant === 'solid' ? 'header-solid' : ''}`}>
      <div className="container header-container">
        <div className="header-content row justify-content-between">
          <div className="logo-container">
            <a href="/#inicio">
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
                <a className="item-list" href="/#inicio" onClick={closeMenu}>
                  Início
                </a>
              </li>
              <li>
                <a className="item-list" href="/#works" onClick={closeMenu}>
                  Portfólio
                </a>
              </li>
              <li>
                <a className="item-list" href="/#expertises" onClick={closeMenu}>
                  Serviços
                </a>
              </li>
              <li>
                <a className="item-list" href="/#about" onClick={closeMenu}>
                  Sobre
                </a>
              </li>
              <li>
                <a className="item-list" href="/#contact" onClick={closeMenu}>
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
