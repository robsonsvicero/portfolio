import React, { useEffect, useState } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { supabase } from '../lib/supabase';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Preloader from '../components/Preloader';

import idvDesigner from '../images/idv-deigner.webp';
import uiDesigner from '../images/ui-designer.webp';
import developer from '../images/developer.webp';

import heroImage from '../images/hero.webp';
import aboutPhoto from '../images/about-photo.webp';
import sviceroCta from '../images/Svicero_CTA.png';


const Home = () => {
  // Dados dos serviços principais
  const servicos = [
    {
      img: idvDesigner,
      alt: 'Card Designer',
      badge: { text: 'Branding & Identidade', className: 'designer text-[15px] font-medium text-[#800020] bg-[#F8CDC6]' },
      title: 'Construção de ativos que geram reconhecimento e desejo.',
      link: '/servico-identidade-visual'
    },
    {
      img: uiDesigner,
      alt: 'Card UI designer',
      badge: { text: 'UI & UX', className: 'ui-ux text-[15px] font-medium text-[#094C7E] bg-[#EAF4F6]' },
      title: 'Experiências fluidas que removem as barreiras entre você e seu cliente.',
      link: '/servico-uiux-design'
    },
    {
      img: developer,
      alt: 'Card Web Design',
      badge: { text: 'Web Design', className: 'developer text-[15px] font-medium text-[#205C20] bg-[#D6F8D6]' },
      title: 'Sites de alta performance com design minimalista.',
      link: '/servico-front-end'
    },
  ];
  const [whatsappVisible, setWhatsappVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [depoimentos, setDepoimentos] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setWhatsappVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inicializar Swiper
  const swipersRef = React.useRef([]);
  useEffect(() => {
    // Aguarda o próximo paint do React para garantir que os elementos estejam no DOM
    let rafId = null;
    function initSwipers() {
      const cardWrappers = document.querySelectorAll('.card-wrapper');
      if (cardWrappers.length > 0) {
        // Destruir swipers anteriores
        swipersRef.current.forEach(swiper => {
          if (swiper && swiper.destroy) {
            try { swiper.destroy(); } catch (e) { /* ignora */ }
          }
        });
        swipersRef.current = [];

        cardWrappers.forEach((cardWrapper) => {
          const slides = cardWrapper.querySelectorAll('.swiper-slide');
          const slidesCount = slides.length;
          const screenWidth = window.innerWidth;

          // Determinar slidesPerView baseado na largura da tela
          let currentSlidesPerView = 1;
          if (screenWidth >= 1240) currentSlidesPerView = 3;
          else if (screenWidth >= 768) currentSlidesPerView = 2;

          // Só habilita loop se houver slides suficientes
          const enableLoop = slidesCount > currentSlidesPerView;

          const swiperInstance = new Swiper(cardWrapper, {
            loop: enableLoop,
            spaceBetween: 24,
            pagination: {
              el: cardWrapper.querySelector('.swiper-pagination'),
              clickable: true,
              dynamicBullets: true,
            },
            navigation: {
              nextEl: cardWrapper.querySelector('.swiper-button-next'),
              prevEl: cardWrapper.querySelector('.swiper-button-prev'),
            },
            breakpoints: {
              426: {
                slidesPerView: 1
              },
              768: {
                slidesPerView: 2
              },
              1240: {
                slidesPerView: 3
              }
            }
          });
          swipersRef.current.push(swiperInstance);
        });
      }
    }
    rafId = requestAnimationFrame(initSwipers);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      swipersRef.current.forEach(swiper => {
        if (swiper && swiper.destroy && typeof swiper.destroy === 'function') {
          try { swiper.destroy(); } catch (e) { /* ignora */ }
        }
      });
    };
  }, [depoimentos]);

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

  // Buscar projetos do Supabase (últimos 5 marcados para exibir na home)
  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const { data, error } = await supabase
          .from('projetos')
          .select('*')
          .eq('mostrar_home', true)
          .order('data_projeto', { ascending: false })
          .limit(5);

        if (error) throw error;

        // Mapear dados do banco para o formato esperado
        const projetosFormatados = data.map(projeto => ({
          image: projeto.imagem_url,
          title: projeto.titulo,
          description: projeto.descricao,
          link: projeto.link,
          buttonText: projeto.button_text,
          link2: projeto.link2,
          buttonText2: projeto.button_text2
        }));

        setProjects(projetosFormatados);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        // Array vazio como fallback - incentiva usar o banco de dados
        setProjects([]);
      }
    };

    fetchProjetos();
  }, []);

  // Buscar últimas 3 publicações do blog
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('publicado', true)
          .order('data_publicacao', { ascending: false })
          .limit(3);

        if (error) throw error;
        setBlogPosts(data || []);
      } catch (error) {
        console.error('Erro ao buscar posts do blog:', error);
        setBlogPosts([]);
      }
    };

    fetchBlogPosts();
  }, []);

  // Buscar depoimentos do Supabase
  useEffect(() => {
    const fetchDepoimentos = async () => {
      try {
        const { data, error } = await supabase
          .from('depoimentos')
          .select('*')
          .eq('ativo', true)
          .order('ordem', { ascending: true });

        if (error) throw error;
        setDepoimentos(data || []);
      } catch (error) {
        console.error('Erro ao buscar depoimentos:', error);
        setDepoimentos([]);
      }
    };

    fetchDepoimentos();
  }, []);

  // Função para obter a classe de cor do avatar
  const getAvatarColorClass = (cor) => {
    const cores = {
      orange: 'bg-orange-500/20 text-orange-500',
      gold: 'bg-amber-500/20 text-amber-500',
      blue: 'bg-blue-600/20 text-blue-600',
      silver: 'bg-gray-400/20 text-gray-400',
      // Cores legadas para compatibilidade
      primary: 'bg-orange-500/20 text-orange-500',
      secondary: 'bg-amber-500/20 text-amber-500',
      accent: 'bg-blue-600/20 text-blue-600',
    };
    return cores[cor] || cores.orange;
  };

  return (
    <>
      <Preloader />
      <div className="bg-cream min-h-screen">
        <Header />

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

        {/* Hero Section / Banner */}
        <section id="inicio" className="relative h-[780px] flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
            <h1 className="font-title font-extralight text-cream text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6 drop-shadow-lg">O design que transforma sua autoridade <br /> em valor de mercado.</h1>
            <p className="font-sans text-cream text-xl md:text-2xl lg:text-3xl font-light tracking-wide mb-10 max-w-5xl">Unimos Branding Estratégico e UX Design para criar marcas líderes. Simplicidade que posiciona e converte.</p>
            <Button
              href="https://wa.me/5511964932007"
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >Solicitar Diagnóstico de Marca</Button>
          </div>
          <div className="absolute bottom-20 left-0 w-full flex justify-center z-20">
            <a href="#triade" className="animate-bounce text-cream text-3xl hover:text-primary transition-colors duration-300">
              <i className="fa-solid fa-chevron-down"></i>
            </a>
          </div>
        </section>

        {/* Tríade Integrada */}
        <section id="triade" className="bg-cream py-24 px-4 md:px-16">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-title text-4xl md:text-5xl font-light text-low-dark mb-4">A Tríade Integrada: Simplicidade que posiciona.</h2>

              <p className="font-sans text-xl text-low-medium max-w-3xl mx-auto leading-relaxed">
                Eliminamos o abismo entre estratégia e execução. Oferecemos uma solução completa que conecta a força da sua marca à performance tecnológica.
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:justify-center md:items-stretch gap-8 md:gap-10 mb-12">
              {/* Identidade Visual */}
              <div className="bg-white rounded-2xl p-6 md:p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-primary flex-1 flex flex-col justify-between md:max-w-[400px] w-full mx-auto">
                <div className="h-full flex flex-col">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-palette text-4xl text-primary"></i>
                    </div>
                  </div>
                  <h3 className="font-title text-2xl font-light text-center text-low-dark mb-4">Branding & Identidade</h3>
                  <p className="text-lg text-low-medium text-center leading-relaxed mb-4 break-words">
                    A fundação da sua autoridade. Criamos a base estratégica e visual que posiciona sua marca no mercado, garantindo que ela seja percebida como líder desde o primeiro contato.
                  </p>
                </div>
                <div className="text-center mt-auto">
                  <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
                    O que somos
                  </span>
                </div>
              </div>

              {/* Seta conectora (oculta em mobile) */}
              <div className="hidden md:flex items-center justify-center">
                <i className="fa-solid fa-arrow-right text-4xl text-primary/40"></i>
              </div>

              {/* UX/UI Design */}
              <div className="bg-white rounded-2xl p-6 md:p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-primary flex-1 flex flex-col justify-between md:max-w-[400px] w-full mx-auto">
                <div className="h-full flex flex-col">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-pen-ruler text-4xl text-primary"></i>
                    </div>
                  </div>
                  <h3 className="font-title text-2xl font-light text-center text-low-dark mb-4">UX/UI Design</h3>
                  <p className="text-lg text-low-medium text-center leading-relaxed mb-4 break-words">
                    Onde a estética encontra a conversão. Projetamos interfaces intuitivas que guiam o olhar do seu cliente, transformando a navegação em uma jornada de confiança e desejo de compra.
                  </p>
                </div>
                <div className="text-center mt-auto">
                  <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
                    Como pensamos
                  </span>
                </div>
              </div>

              {/* Seta conectora (oculta em mobile) */}
              <div className="hidden md:flex items-center justify-center">
                <i className="fa-solid fa-arrow-right text-4xl text-primary/40"></i>
              </div>

              {/* Front-end */}
              <div className="bg-white rounded-2xl p-6 md:p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-primary flex-1 flex flex-col justify-between md:max-w-[400px] w-full mx-auto">
                <div className="h-full flex flex-col">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-code text-4xl text-primary"></i>
                    </div>
                  </div>
                  <h3 className="font-title text-2xl font-light text-center text-low-dark mb-4">Desenvolvimento Front-end</h3>
                  <p className="text-lg text-low-medium text-center leading-relaxed mb-4 break-words">
                    Fidelidade técnica e performance. Entregamos plataformas rápidas, responsivas e visualmente impecáveis, garantindo que a tecnologia trabalhe a favor do seu faturamento.
                  </p>
                </div>
                <div className="text-center mt-auto">
                  <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
                    Como entregamos
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center pt-8">
              <Button
                href="https://form.jotform.com/253516622262655"
                variant="primary"
                target="_blank"
                className="inline-block mt-8"
              >
                Solicitar Diagnóstico Estratégico
              </Button>
              <p className="font-sans text-lg text-low-medium max-w-2xl mx-auto leading-relaxed mt-8">
                Analisamos o seu posicionamento atual e identificamos as oportunidades de crescimento para o seu negócio.
              </p>
            </div>
          </div>
        </section>

        {/* Projetos Selecionados / Works */}
        <section id="projetos" className="bg-low-dark py-24 px-4 md:px-16">
          <div className="max-w-screen-xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="font-title text-4xl md:text-5xl font-light text-cream mb-2">Projetos Selecionados</h2>

            </div>
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-8 min-h-[2000px]">
                {projects.map((project, index) => (
                  <Card
                    key={index}
                    variant="project"
                    className={`sticky top-0 z-[${10 + index}] flex flex-col items-center bg-[#1a1a1a] backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-10 gap-8 border border-cream/10 transition-transform duration-300 hover:scale-[1.03] min-h-[400px] mb-8`}
                  >
                    <div className="w-full flex justify-center h-full">
                      <Card.Image src={project.image} alt={project.title} className="h-full object-contain" />
                    </div>
                    <div className="w-full flex flex-col justify-center h-full px-0 md:px-10">
                      <Card.Title>{project.title}</Card.Title>
                      <Card.Description className="text-lg text-cream/70 mb-6 leading-relaxed">{project.description}</Card.Description>
                      <Card.Actions className="flex flex-col gap-4">
                        <Card.Button href={project.link}>{project.buttonText}</Card.Button>
                        {project.buttonText2 && (
                          <Card.Button href={project.link2}>{project.buttonText2}</Card.Button>
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
        <section id="servicos" className="bg-cream py-24 px-4 md:px-16">
          <div className="max-w-screen-xl mx-auto px-2 sm:px-4 md:px-16">
            <div className="mb-12 text-center">
              <h2 className="font-title text-4xl md:text-5xl font-light text-low-dark mb-2">Principais Serviços</h2>

            </div>
            <div className="swiper overflow-visible pb-12 max-w-full">
              <div className="card-wrapper mx-2 md:mx-0 py-5 px-2 md:px-4 overflow-hidden">
                <ul className="card-list swiper-wrapper h-auto md:h-[400px]">
                  {servicos.map((servico, idx) => (
                    <li key={idx} className="card-item swiper-slide bg-white rounded-2xl shadow-md border border-[#f3ede7] p-6 transition-all duration-300 h-auto md:h-[400px] md:max-w-[400px] w-full">
                      <div className="flex flex-col h-full">
                        <img src={servico.img} alt={servico.alt} className="w-full aspect-[16/9] object-cover rounded-xl mb-4" />
                        <p className={"inline-block w-fit px-4 py-2 mb-4 rounded-full text-[14px] font-medium border text-left " + (servico.badge.className || "")}>{servico.badge.text}</p>
                        <div className="flex-1">
                          <h2 className="text-base text-[#2b4a5a] font-normal mb-6">{servico.title}</h2>
                        </div>
                        <a href={servico.link} className="mt-auto inline-block px-6 py-2 rounded-full border border-[#b5c6d6] text-[#232323] bg-[#F4F4F4] text-sm font-medium hover:bg-[#e0e6ed] transition-colors">Saiba mais...</a>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="swiper-pagination mt-8"></div>
                <div className="swiper-slide-button swiper-button-prev block md:hidden"></div>
                <div className="swiper-slide-button swiper-button-next block md:hidden"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre / About */}
        <section id="sobre" className="bg-low-dark py-24 px-4 md:px-16">
          <div className="max-w-screen-xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="font-title text-4xl md:text-5xl font-light text-cream mb-2">Quem está por trás do Svicero Studio</h2>

            </div>
            <div className="flex flex-col lg:flex-row-reverse gap-12 items-center mb-8">
              <div className="w-full lg:w-2/5 flex justify-center mb-8 lg:mb-0">
                <img src={aboutPhoto} alt="Robson Svicero - Fundador do Svicero Studio" className="w-full h-auto rounded-2xl shadow-lg" />
              </div>
              <div className="w-full lg:w-3/5 text-cream">
                <div className="text-about">
                  <p className="text-lg leading-relaxed mb-6">O <strong className='text-blue-light'>Svicero Studio</strong> nasceu da minha trajetória integrando design e desenvolvimento. Eu sou o <strong className='text-blue-light'>Robson Svicero</strong>, fundador do estúdio e responsável por transformar a estratégia visual da sua marca em uma presença digital completa e de alta performance.</p>
                  <p className="text-lg leading-relaxed mb-6">Minha jornada começou no <strong className='text-blue-light'>design gráfico</strong>, criando identidades visuais que ajudavam marcas a se expressarem com propósito e autenticidade. Com o tempo, percebi que queria ir além da estética — queria entender como as pessoas interagem com o design. Foi aí que mergulhei no universo do <strong className='text-blue-light'>UI/UX design</strong>, unindo beleza e funcionalidade para criar interfaces que realmente conectam marcas e usuários.</p>
                  <p className="text-lg leading-relaxed mb-6">Em seguida, encontrei no <strong className='text-blue-light'>desenvolvimento front-end</strong> a ponte perfeita entre o design e a tecnologia. Hoje, utilizo HTML, CSS, JavaScript e React para dar vida às criações e garantir que cada detalhe visual funcione de forma fluida e responsiva.</p>
                  <p className="text-lg leading-relaxed mb-6">Essa trajetória é a base do Svicero Studio: um estúdio focado em <strong className='text-blue-light'>simplicidade estratégica</strong>, onde cada projeto integra <strong className='text-blue-light'>identidade visual</strong>, <strong className='text-blue-light'>UX/UI</strong> e <strong className='text-blue-light'>front-end</strong> de forma coesa. Acredito que o design não termina no layout — ele ganha força quando se transforma em uma experiência real, acessível e envolvente.</p>
                  <p className="text-lg leading-relaxed mb-6">Quando não estou projetando ou codando, você provavelmente vai me encontrar brincando com minha filha, ouvindo música, assistindo filmes, séries ou animes, ou lendo HQs — paixões que alimentam minha criatividade e mantêm minha mente em constante movimento.</p>
                  <p className="text-lg leading-relaxed mb-6"><strong className='text-secondary300'>Vamos construir sua autoridade digital juntos?</strong> O Svicero Studio está sempre aberto a novos desafios, colaborações estratégicas e projetos que façam a diferença.</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Button
                href="/agenda"
                variant="secondary"
                icon={<i className="fa-regular fa-calendar"></i>}
                className="mb-16 px-8 py-4 text-lg w-full lg:w-[40%]"
              >Agendar Conversa</Button>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        {depoimentos.length > 0 && (
          <section className="bg-cream py-24 px-4 md:px-16">
            <div className="max-w-screen-xl mx-auto px-2 sm:px-4 md:px-2">
              <div className="mb-12 text-center">
                <h2 className="font-title text-4xl md:text-5xl font-light text-low-dark mb-4">Depoimentos</h2>
                <p className="text-lg text-low-dark/80 font-light max-w-2xl mx-auto leading-relaxed">
                  Palavras de quem valoriza a excelência
                </p>
              </div>
              <div className="swiper depoimentos-swiper overflow-visible pb-12 max-w-full">
                <div className="card-wrapper mx-2 md:mx-0 py-5 px-2 md:px-4 overflow-hidden">
                  <ul className="card-list swiper-wrapper h-auto">
                    {depoimentos.map((depoimento) => (
                      <li key={depoimento.id} className="card-item swiper-slide bg-low-dark/90 rounded-2xl p-8 border border-cream/10 h-auto md:max-w-[400px] w-full">
                        <div className="flex flex-col h-full">
                          <p className="text-cream/90 text-base leading-relaxed mb-6 italic flex-1">"{depoimento.texto}"</p>
                          <div className="flex items-center gap-4 mt-auto">
                            <div className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center ${getAvatarColorClass(depoimento.cor_avatar)}`}>
                              <span className="font-semibold text-lg">{depoimento.iniciais || depoimento.nome?.substring(0, 2).toUpperCase()}</span>
                            </div>
                            <div>
                              <p className="text-cream font-medium">{depoimento.nome}</p>
                              <p className="text-cream/60 text-sm">{depoimento.cargo}{depoimento.empresa ? `, ${depoimento.empresa}` : ''}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="swiper-pagination mt-8"></div>
                  <div className="swiper-slide-button swiper-button-prev block md:hidden"></div>
                  <div className="swiper-slide-button swiper-button-next block md:hidden"></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Final */}
        <section className="w-full bg-primary overflow-hidden">
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-stretch">
            {/* Imagem - aparece primeiro em mobile */}
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <img
                src={sviceroCta}
                alt="Svicero Studio CTA"
                className="w-full h-64 md:h-full object-cover rounded-bl-[60px] rounded-tr-[60px]"
              />
            </div>
            {/* Texto - aparece segundo em mobile */}
            <div className="w-full md:w-1/2 order-2 md:order-1 flex flex-col items-center md:items-start max-w-screen-xl mx-auto justify-center text-cream text-center md:text-left py-12 md:py-20 px-4 md:px-16">
              <h2 className="font-title font-semibold text-3xl md:text-4xl mb-4 text-cream">Pronto para o próximo nível?</h2>
              <p className="text-lg md:text-xl mb-8 text-cream/75">Deixe a complexidade para trás. Vamos construir o posicionamento que o seu negócio merece.</p>
              <Button
                href="https://form.jotform.com/253516622262655"
                variant="custom"
                className="border-2 border-cream text-cream hover:text-primary transition-colors inline-block mt-8"
                target="_blank"
                rel="noopener noreferrer"
              >Solicitar Diagnóstico Estratégico
              </Button>
            </div>
          </div>
        </section>

        {/* Blog - Últimas Publicações */}
        <section className="bg-low-dark  py-24 px-4 md:px-16">
          <div className="max-w-screen-xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="font-title text-4xl md:text-5xl font-light text-cream mb-2">Crônicas de Design</h2>

              <p className="text-lg text-cream font-light max-w-2xl mx-auto leading-relaxed">
                Insights, tutoriais e reflexões sobre design e desenvolvimento
              </p>
            </div>

            {blogPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {blogPosts.map((post) => {
                    const formatDate = (dateString) => {
                      const date = new Date(dateString);
                      return date.toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      });
                    };

                    return (
                      <a
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-cream/20"
                      >
                        {post.imagem_destaque && (
                          <div className="aspect-video overflow-hidden bg-cream">
                            <img
                              src={post.imagem_destaque}
                              alt={post.titulo}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          {post.categoria && (
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
                              {post.categoria}
                            </span>
                          )}
                          <h3 className="font-title text-xl font-light text-low-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {post.titulo}
                          </h3>
                          {post.resumo && (
                            <p className="text-low-medium text-sm mb-3 line-clamp-2 leading-relaxed">
                              {post.resumo}
                            </p>
                          )}
                          <span className="text-sm text-low-medium flex items-center gap-2">
                            <i className="fa-regular fa-calendar"></i>
                            {formatDate(post.data_publicacao)}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>

                <div className="text-center">
                  <Button
                    href="/blog"
                    variant="primary"
                    icon={<i className="fa-solid fa-arrow-right"></i>}
                    className="px-8 py-4 text-lg"
                  >
                    Ver Todos os Posts
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <i className="fa-regular fa-newspaper text-5xl text-low-light mb-4"></i>
                <p className="text-lg text-low-medium">Em breve novos conteúdos por aqui!</p>
              </div>
            )}
          </div>
        </section>

        {/* Contato / Contact */}
        <section id="contato" className="bg-cream py-24 px-4 md:px-16">
          <div className="max-w-screen-md mx-auto">
            <div className="mb-12 text-center">
              <h2 className="font-title text-4xl md:text-5xl font-light text-low-dark mb-2">Inicie sua transformação estratégica</h2>
              <p className="text-base md:text-lg text-low-dark/60 mx-auto mb-6">Preencha os campos abaixo para que possamos analisar o seu perfil e preparar um diagnóstico personalizado para o seu negócio.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white rounded-xl shadow-lg p-8">

              <div className="flex flex-col gap-1">
                <label htmlFor="nome" className="text-low-dark text-base">Nome*</label>
                <input type="text" name="nome" id="nome" required className="px-4 py-3 rounded-lg bg-black/25 border border-cream/20 text-low-dark text-base focus:border-primary focus:outline-none" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-low-dark text-base">E-mail*</label>
                <input type="email" name="email" id="email" required className="px-4 py-3 rounded-lg bg-black/25 border border-cream/20 text-low-dark text-base focus:border-primary focus:outline-none" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="whats" className="text-low-dark text-base">WhatsApp*</label>
                <input type="tel" name="whats" id="whats" required className="px-4 py-3 rounded-lg bg-black/25 border border-cream/20 text-low-dark text-base focus:border-primary focus:outline-none" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="link" className="text-low-dark text-base">Link do site ou Instagram atual da empresa.</label>
                <input type="tel" name="link" id="link" required className="px-4 py-3 rounded-lg bg-black/25 border border-cream/20 text-low-dark text-base focus:border-primary focus:outline-none" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="budget" className="text-low-dark text-base">Qual o investimento planejado para o projeto?*</label>
                <select name="budget" id="budget" required className="px-4 py-3 rounded-lg bg-black/25 border border-cream/20 text-low-dark text-base focus:border-primary focus:outline-none">
                  <option value="">Selecione uma opção</option>
                  <option value="5k">R$ 5k a R$ 8k</option>
                  <option value="9k">R$ 9k a R$ 12k</option>
                  <option value="+12k">Acima de R$12k</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="projeto" className="text-low-dark text-base">Tipo de projeto*</label>
                <select name="projeto" id="projeto" required className="px-4 py-3 rounded-lg bg-black/25 border border-cream/20 text-low-dark text-base focus:border-primary focus:outline-none">
                  <option value="">Selecione uma opção</option>
                  <option value="Triade" className='font-bold'>Ecossistema Completo (Branding + Site + UX)</option>
                  <option value="Identidade Visual">Branding & Identidade</option>
                  <option value="UI/UX Design">Experiência Digital e Interfaces (UI/UX)</option>
                  <option value="Web Site">Desenvolvimento web</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="mensagem" className="text-low-dark text-base">Conte-nos brevemente sobre o seu desafio atual.*</label>
                <textarea name="mensagem" id="mensagem" required className="px-4 py-3 rounded-lg bg-black/25 border border-cream/20 text-low-dark text-base focus:border-primary focus:outline-none min-h-[150px] resize-y" />
              </div>

              <p className='w-full text-left text-cream/60 text-sm'>*campos obrigatórios</p>

              <input type="hidden" name="_subject" value="Novo envio!" />

              <div className='w-full flex justify-center items-center'>
                <Button
                  type="submit"
                  variant="secondary"
                  className="text-cream w-full md:w-1/2 border-2 hover:border-primary px-8 py-4 text-lg"
                  disabled={isSubmitting}
                >{isSubmitting ? 'Enviando...' : 'Solicitar Diagnóstico Estratégico'}</Button>
              </div>
            </form>
          </div>
        </section>


        <Footer />





        {/* Toast Notification */}
        {showToast && (
          <div className={`fixed top-8 right-8 z-50 min-w-[320px] max-w-[450px] p-6 bg-white rounded-xl shadow-2xl flex items-center justify-between gap-4 animate-slideInRight border-l-4 ${toastType === 'success' ? 'border-green-500' : 'border-red-500'}`}>
            <div className="flex items-center gap-3 flex-1">
              <i className={`fa-solid text-2xl ${toastType === 'success' ? 'fa-circle-check text-green-500' : 'fa-circle-exclamation text-red-500'}`}></i>
              <span className="text-neutral-900 text-base font-medium">{toastMessage}</span>
            </div>
            <button
              className="bg-transparent border-none text-neutral-500 hover:text-neutral-900 transition-colors p-1 flex items-center justify-center text-xl"
              onClick={() => setShowToast(false)}
              aria-label="Fechar notificação"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
