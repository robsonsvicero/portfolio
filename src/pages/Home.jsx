import React, { useEffect, useState } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import './Home.css';

// Importar imagens
import projetoAlexandre from '../images/projeto-alexandre.webp';
import projetoPowerbrain from '../images/projeto-powerbrain.webp';
import projetoSacada from '../images/projeto-sacada.webp';
import projetoIsaque from '../images/projeto-isaquemoveis.webp';
import projetoUmusic from '../images/projeto-umusicstore.webp';
import idvDesigner from '../images/idv-deigner.webp';
import uiDesigner from '../images/ui-designer.webp';
import developer from '../images/developer.webp';
import aboutPhoto from '../images/about-photo.webp';

const Home = () => {
  const [whatsappVisible, setWhatsappVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  useEffect(() => {
    const handleScroll = () => {
      setWhatsappVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inicializar Swiper
  useEffect(() => {
    const swiper = new Swiper('.card-wrapper', {
      loop: true,
      spaceBetween: 30,

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      breakpoints: {
        820: {
          slidesPerView: 1
        },
        1024: {
          slidesPerView: 2
        },
        1440: {
          slidesPerView: 3
        }
      }
    });

    return () => {
      if (swiper) swiper.destroy();
    };
  }, []);

  // Efeito botão ripple
  useEffect(() => {
    const buttons = document.querySelectorAll('.button');

    const handleMouseMove = (e) => {
      const btn = e.currentTarget;
      const x = e.pageX - btn.offsetLeft;
      const y = e.pageY - btn.offsetTop;

      btn.style.setProperty('--eixoX', x + 'px');
      btn.style.setProperty('--eixoY', y + 'px');
    };

    buttons.forEach((btn) => {
      btn.addEventListener('mousemove', handleMouseMove);
    });

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener('mousemove', handleMouseMove);
      });
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xdkegzaw', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setToastMessage('Mensagem enviada com sucesso! Entrarei em contato em breve.');
        setToastType('success');
        setShowToast(true);
        form.reset();
        
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      } else {
        setToastMessage('Erro ao enviar mensagem. Tente novamente.');
        setToastType('error');
        setShowToast(true);
        
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      }
    } catch (error) {
      setToastMessage('Erro ao enviar mensagem. Verifique sua conexão.');
      setToastType('error');
      setShowToast(true);
      
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const projects = [
    {
      image: projetoAlexandre,
      title: 'Alexandre Ivo',
      description: 'Criação da identidade visual do professor de música Alexandre Ivo. O projeto reflete sua missão de inspirar pessoas a viverem a música com propósito, unindo harmonia, expressão e autenticidade.',
      link: 'https://www.behance.net/gallery/236215677/Alexandre-Ivo-Professor-de-musica',
      buttonText: 'Visite o projeto de IDV'
    },
    {
      image: projetoPowerbrain,
      title: 'PowerBrain',
      description: 'Desenvolvimento da identidade visual e do site institucional da PowerBrain, empresa de tecnologia que aplica IoT no setor de energia elétrica. A marca traduz inovação e confiabilidade com um visual tecnológico e contemporâneo.',
      link: 'https://powerbrainbr.com',
      link2: 'https://www.behance.net/gallery/221467317/PowerBrain',
      buttonText: 'Visite o site',
      buttonText2: 'Visite o projeto de IDV'
    },
    {
      image: projetoSacada,
      title: 'Sacada Classz',
      description: 'Criação da identidade visual e desenvolvimento de site one-page para a Sacada Classz, especializada em fechamento de sacadas, guarda-corpos e vidraçarias. O design minimalista valoriza transparência, leveza e sofisticação.',
      link: 'https://sacadaclassz.com.br/',
      link2: 'https://www.behance.net/gallery/211657157/Sacada-Classz',
      buttonText: 'Visite o site',
      buttonText2: 'Visite o projeto de IDV'
    },
    {
      image: projetoIsaque,
      title: 'Isaque Móveis',
      description: 'Criação da identidade visual para a loja Isaque Móveis. A marca equilibra solidez e elegância, reforçando a essência artesanal e a qualidade presente em cada peça.',
      link: 'https://www.behance.net/gallery/188436653/Isaque-Moveis',
      buttonText: 'Visite o projeto de IDV'
    },
    {
      image: projetoUmusic,
      title: 'Universal Music',
      description: 'Projeto de UX Design voltado à modernização da experiência de navegação no site da Universal Music Store. A proposta trouxe fluidez, clareza e uma interface mais alinhada à linguagem contemporânea da marca.',
      link: 'https://www.behance.net/gallery/174232557/Universal-Music',
      buttonText: 'Visite o projeto de UX'
    }
  ];

  return (
    <div className="bg-cream">
      <Header />

      <div className="home">
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

        {/* Hero Section / Banner */}
        <section className="letter-banner" id="inicio">
          <div className="banner">
            <div className="description">
              <h1 className="title-banner">
                Design que conecta estratégia e estética.
              </h1>
              <p className="banner-description">
                Transformo marcas e interfaces em experiências memoráveis.
              </p>
              <div className="banner-button row" id="button">
                <Button
                  href="https://wa.me/5511964932007"
                  variant="outline"
                  icon={<i className="fa-brands fa-whatsapp"></i>}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='btn-banner hover:bg-primary hover:border-primary'
                >
                  Fale comigo
                </Button>
              </div>
            </div>
          </div>
          <div className="next-section">
            <div className="btn-next-section">
              <a href="#works">
                <i className="fa-solid fa-chevron-down"></i>
              </a>
            </div>
          </div>
        </section>

        {/* Projetos Selecionados / Works */}
        <section className="works section" id="works">
          <div className="container">
            <div className="section-title">
              <h2>Projetos Selecionados</h2>
              <span className="decorBar"></span>
            </div>
            <div className="row cards-works">
              <div className="interface">
                {projects.map((project, index) => (
                  <Card key={index} variant="project" className="card-work">
                    <div className="img">
                      <Card.Image src={project.image} alt={project.title} />
                    </div>
                    <div className="content">
                      <Card.Title>{project.title}</Card.Title>
                      <Card.Description className="text">{project.description}</Card.Description>
                      <Card.Actions className="buttons">
                        <Card.Button href={project.link}>
                          {project.buttonText}
                        </Card.Button>
                        {project.buttonText2 && (
                          <Card.Button href={project.link2}>
                            {project.buttonText2}
                          </Card.Button>
                        )}
                      </Card.Actions>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Principais Serviços / Expertise */}
        <section className="expertise section" id="expertises">
          <div className="container">
            <div className="section-title">
              <h2>Principais Serviços</h2>
              <span className="decorBar"></span>
            </div>
            <div className="swiper">
              <div className="card-wrapper">
                <ul className="card-list swiper-wrapper">
                  <li className="card-item swiper-slide">
                    <Card variant="service" className="card-link">
                      <Card.Image
                        src={idvDesigner}
                        alt="Card Designer"
                        className="card-image"
                      />
                      <Card.Badge variant="designer">Identidade Visual</Card.Badge>
                      <Card.Description className="card-title">
                        Desenvolvo identidades visuais autênticas que traduzem a
                        essência da sua marca. Do conceito ao design final, crio
                        conexões visuais fortes e memoráveis que destacam seu
                        negócio no mercado.
                      </Card.Description>
                      <a href="/servico-identidade-visual">
                        <Card.Badge variant="cta">Saiba mais...</Card.Badge>
                      </a>
                    </Card>
                  </li>

                  <li className="card-item swiper-slide">
                    <Card variant="service" className="card-link">
                      <Card.Image
                        src={uiDesigner}
                        alt="Card UI designer"
                        className="card-image"
                      />
                      <Card.Badge variant="ui-ux">UI & UX</Card.Badge>
                      <Card.Description className="card-title">
                        Crio interfaces intuitivas e envolventes, focadas na
                        melhor experiência do usuário. Aliando estética e
                        funcionalidade, entrego designs que encantam visualmente e
                        facilitam a navegação.
                      </Card.Description>
                      <a href="/servico-ui-design">
                        <Card.Badge variant="cta">Saiba mais...</Card.Badge>
                      </a>
                    </Card>
                  </li>

                  <li className="card-item swiper-slide">
                    <Card variant="service" className="card-link">
                      <Card.Image
                        src={developer}
                        alt="Card Programador"
                        className="card-image"
                      />
                      <Card.Badge variant="developer">Front-End</Card.Badge>
                      <Card.Description className="card-title">
                        Transformo ideias em sites funcionais com código limpo,
                        performance otimizada e designs que conectam marcas às
                        pessoas.
                      </Card.Description>
                      <a href="/servico-front-end">
                        <Card.Badge variant="cta">Saiba mais...</Card.Badge>
                      </a>
                    </Card>
                  </li>
                </ul>

                <div className="swiper-pagination"></div>
                <div className="swiper-slide-button swiper-button-prev"></div>
                <div className="swiper-slide-button swiper-button-next"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre / About */}
        <section className="about section" id="about">
          <div className="about-container center">
            <div className="section-title">
              <h2>Sobre</h2>
              <span className="decorBar"></span>
            </div>
            <div className="about-me">
              <div className="about-img">
                <img src={aboutPhoto} alt="Robson Svicero - Design" />
              </div>
              <div className="informacoes-about">
                <div className="text-about">
                  <p>
                    Eu sou o <strong>Robson Svicero</strong>,{' '}
                    <strong>designer de identidade visual</strong>,{' '}
                    <strong>UI designer</strong> e{' '}
                    <strong>desenvolvedor front-end</strong> apaixonado por
                    transformar ideias em experiências digitais marcantes.
                  </p>
                  <p>
                    Minha jornada começou no design gráfico, criando identidades
                    visuais que ajudavam marcas a se expressarem com propósito e
                    autenticidade. Com o tempo, percebi que queria ir além da
                    estética — queria entender como as pessoas interagem com o
                    design. Foi aí que mergulhei no universo do UI design, unindo
                    beleza e funcionalidade para criar interfaces que realmente
                    conectam marcas e usuários.
                  </p>
                  <p>
                    Em seguida, encontrei no desenvolvimento front-end a ponte
                    perfeita entre o design e a tecnologia. Hoje, utilizo HTML,
                    CSS, JavaScript e React para dar vida às minhas criações e
                    garantir que cada detalhe visual funcione de forma fluida e
                    responsiva.
                  </p>
                  <p>
                    Acredito que o design não termina no layout — ele ganha força
                    quando se transforma em uma experiência real, acessível e
                    envolvente.
                  </p>
                  <p>
                    Quando não estou projetando ou codando, você provavelmente vai
                    me encontrar brincando com minha filha, ouvindo música,
                    assistindo filmes, séries ou animes, ou lendo HQs — paixões
                    que alimentam minha criatividade e mantêm minha mente em
                    constante movimento.
                  </p>
                  <p>
                    <strong>Vamos conversar?</strong>
                    Estou sempre aberto a novos desafios, colaborações criativas e
                    projetos que façam a diferença.
                  </p>
                </div>
              </div>
            </div>
            <div className="buttons row">
              <Button
                href="https://wa.me/5511964932007"
                variant="outline"
                icon={<i className="fa-brands fa-whatsapp"></i>}
                target="_blank"
                rel="noopener noreferrer"
                className="border-primary text-primary hover:text-cream hover:bg-primary hover:border-primary mb-12"
              >
                Fale comigo
              </Button>
            </div>
          </div>
          <div className="reviews">
            {/* Elfsight Google Reviews */}
            <div
              className="elfsight-app-0ed1853d-fdbc-4203-a528-0b0f618422cd"
              data-elfsight-app-lazy
            ></div>
          </div>
        </section>

        {/* Contato / Contact */}
        <section className="forms section" id="contact">
          <div className="container form-container">
            <div className="chamada">
              <h2 className="titulo-chamada">
                FICOU COM DÚVIDA? MANDE UMA MENSAGEM!
              </h2>
              <p className="texto-chamada">
                Caso tenha ficado com qualquer dúvida basta mandar uma mensagem
                que entrarei em contato o mais breve possível.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="nome">Nome*</label>
              <input type="text" name="nome" id="nome" required />

              <label htmlFor="email">E-mail*</label>
              <input type="email" name="email" id="email" required />

              <label htmlFor="whats">WhatsApp*</label>
              <input type="tel" name="whats" id="whats" required />

              <label htmlFor="projeto">Tipo de projeto*</label>
              <select name="projeto" id="projeto" required>
                <option value="">Selecione uma opção</option>
                <option value="Identidade Visual">Identidade Visual</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Webdesign">Webdesign</option>
                <option value="Outros">Outros</option>
              </select>

              <label htmlFor="mensagem">Mensagem*</label>
              <textarea name="mensagem" id="mensagem" required></textarea>

              <p className='w-full text-left'>*campos obrigatórios</p>

              <input type="hidden" name="_subject" value="Novo envio!" />

              <div className='w-full items-center flex justify-center'>
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-[50%] border-2 hover:border-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Proposta'}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </div>

      <Footer />

      {/* Toast Notification */}
      {showToast && (
        <div className={`toast ${toastType}`}>
          <div className="toast-content">
            <i className={`fa-solid ${toastType === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
            <span>{toastMessage}</span>
          </div>
          <button 
            className="toast-close" 
            onClick={() => setShowToast(false)}
            aria-label="Fechar notificação"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
