import React from 'react';
import Button from '../UI/Button';
import './Footer.css';
import logoFooter from '../../images/logo_robsonsvicero.png';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container social-container">
        <div className="social">
          <nav>
            <ul>
              <li>
                <a
                  href="https://wa.me/5511964932007"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/robsonsvicero.dsgr/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/robsonsvicero/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/robsonsvicero"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fa-brands fa-github-alt"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.behance.net/robsonsvicero"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fa-brands fa-behance"></i>
                </a>
              </li>
            </ul>
          </nav>

          <div className="buttons btn-social row">
            <Button
              onClick={scrollToTop}
              variant="outline"
              icon={<i className="fa-brands fa-space-awesome"></i>}
              className="button hover:bg-primary hover:border-primary"
            >
              Voltar ao topo
            </Button>
          </div>

          <div className="made">
            <p>
              Feito com <span>💙</span> em Sampa.
            </p>
          </div>

          <div className="rp-footer">
            <p>© 2025 | Desenvolvido por </p>
            <div>
              <img src={logoFooter} alt="Logo Robson Svicero" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
