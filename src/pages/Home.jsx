import React, { useEffect, useState } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { supabase } from '../lib/supabase';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Preloader from '../components/Preloader';

// Importar imagens (apenas as usadas no layout)
import idvDesigner from '../images/idv-deigner.webp';
import uiDesigner from '../images/ui-designer.webp';
import developer from '../images/developer.webp';
import aboutPhoto from '../images/about-photo.webp';
import heroImage from '../images/hero.webp';

const Home = () => {
  const [whatsappVisible, setWhatsappVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setWhatsappVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inicializar Swiper
  useEffect(() => {
    const cardWrapper = document.querySelector('.card-wrapper');

    if (cardWrapper) {
      const swiper = new Swiper('.swiper', {
        loop: false,
        spaceBetween: 20,
        centeredSlides: false,
        freeMode: {
          enabled: true,
          sticky: false,
        },

        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: false,
        },

        navigation: false,

        breakpoints: {
          320: {
            slidesPerView: 1.2,
            spaceBetween: 16,
            freeMode: true,
          },
          640: {
            slidesPerView: 1.5,
            spaceBetween: 20,
            freeMode: true,
          },
          820: {
            slidesPerView: 2,
            spaceBetween: 20,
            freeMode: false,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
            freeMode: false,
          }
        }
      });
      return () => swiper && swiper.destroy();
    }
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
          <h1 className="font-title font-extralight text-cream text-5xl md:text-6xl lg:text-7xl tracking-wide mb-6 drop-shadow-lg">Simplicidade que Posiciona</h1>
          <p className="font-sans text-cream text-xl md:text-2xl lg:text-3xl font-light tracking-wide mb-10 max-w-5xl">Integramos Identidade Visual, UX/UI e Front-end para construir sua autoridade digital.</p>
          <Button
            href="https://wa.me/5511964932007"
            variant="primary"
            icon={<i className="fa-brands fa-whatsapp"></i>}
            target="_blank"
            rel="noopener noreferrer"
          >Começar seu Posicionamento</Button>
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
            <h2 className="font-title text-4xl md:text-5xl font-light text-low-dark mb-4">A Tríade Integrada</h2>
            <span className="block w-24 h-1 bg-primary mx-auto rounded mb-6"></span>
            <p className="font-sans text-xl text-low-medium max-w-3xl mx-auto leading-relaxed">
              O gap entre design e desenvolvimento acaba aqui. Oferecemos uma solução completa que conecta estratégia, usabilidade e performance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12 items-stretch">
            {/* Identidade Visual */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-primary flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-palette text-4xl text-primary"></i>
                  </div>
                </div>
                <h3 className="font-title text-2xl font-light text-center text-low-dark mb-4">Identidade Visual</h3>
                <p className="text-lg text-low-medium text-center leading-relaxed mb-4">
                  A base para a autoridade. Criamos a fundação estratégica que posiciona sua marca no mercado.
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
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-primary flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-pen-ruler text-4xl text-primary"></i>
                  </div>
                </div>
                <h3 className="font-title text-2xl font-light text-center text-low-dark mb-4">UX/UI Design</h3>
                <p className="text-lg text-low-medium text-center leading-relaxed mb-4">
                  Interfaces que convertem. Transformamos estratégia em experiências intuitivas e funcionais.
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
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-primary flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-code text-4xl text-primary"></i>
                  </div>
                </div>
                <h3 className="font-title text-2xl font-light text-center text-low-dark mb-4">Front-end</h3>
                <p className="text-lg text-low-medium text-center leading-relaxed mb-4">
                  Performance e fidelidade. Entregamos interfaces rápidas, responsivas e fiéis ao design.
                </p>
              </div>
              <div className="text-center mt-auto">
                <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
                  Como entregamos
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="font-sans text-lg text-low-medium max-w-2xl mx-auto leading-relaxed mb-8">
              Quando esses três pilares trabalham juntos, sua marca não apenas se destaca — ela <strong className="text-primary">lidera</strong>.
            </p>
            <Button
              href="/agenda"
              variant="primary"
              icon={<i className="fa-regular fa-calendar"></i>}
              className="inline-block"
            >
              Agendar Conversa Estratégica
            </Button>
          </div>
        </div>
      </section>

      {/* Projetos Selecionados / Works */}
      <section id="projetos" className="bg-neutral-900 py-24 px-4 md:px-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="font-title text-4xl md:text-5xl font-light text-cream mb-2">Projetos Selecionados</h2>
            <span className="block w-24 h-1 bg-primary mx-auto rounded mb-6"></span>
          </div>
          <div className="flex flex-col gap-12">
            {projects.map((project, index) => (
              <Card key={index} variant="project" className="flex flex-col md:flex-row items-center bg-neutral-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-10 gap-8 border border-cream/10">
                <div className="w-full md:w-1/2 flex justify-center">
                  <Card.Image src={project.image} alt={project.title} />
                </div>
                <div className="w-full md:w-2/5 flex flex-col justify-center">
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
      </section>

      {/* Principais Serviços / Expertise */}
      <section id="servicos" className="bg-cream py-24 px-4 md:px-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="font-title text-4xl md:text-5xl font-light text-low-dark mb-2">Principais Serviços</h2>
            <span className="block w-24 h-1 bg-primary mx-auto rounded mb-6"></span>
          </div>
          <div className="swiper overflow-visible pb-12">
            <div className="card-wrapper swiper-wrapper">
              <div className="swiper-slide">
                <Card variant="service" className="flex flex-col items-center justify-between bg-white rounded-xl shadow-lg p-6 gap-4 border border-cream/20 h-full">
                  <div className="flex flex-col items-center">
                    <Card.Image src={idvDesigner} alt="Card Designer" className="w-full aspect-video rounded-xl mb-4" />
                    <Card.Badge variant="designer">Identidade Visual</Card.Badge>
                    <Card.Description className="text-lg text-low-medium mb-4 leading-relaxed">
                      Desenvolvo identidades visuais autênticas que traduzem a essência da sua marca. Do conceito ao design final, crio conexões visuais fortes e memoráveis que destacam seu negócio no mercado.
                    </Card.Description>
                  </div>
                  <a href="/servico-identidade-visual" className="mt-auto">
                    <Card.Badge variant="cta">Saiba mais...</Card.Badge>
                  </a>
                </Card>
              </div>
              <div className="swiper-slide">
                <Card variant="service" className="flex flex-col items-center justify-between bg-white rounded-xl shadow-lg p-6 gap-4 border border-cream/20 h-full">
                  <div className="flex flex-col items-center">
                    <Card.Image src={uiDesigner} alt="Card UI designer" className="w-full aspect-video rounded-xl mb-4" />
                    <Card.Badge variant="ui-ux">UI & UX</Card.Badge>
                    <Card.Description className="text-lg text-low-medium mb-4 leading-relaxed">
                      Crio interfaces intuitivas e envolventes, focadas na melhor experiência do usuário. Aliando estética e funcionalidade, entrego designs que encantam visualmente e facilitam a navegação.
                    </Card.Description>
                  </div>
                  <a href="/servico-ui-design" className="mt-auto">
                    <Card.Badge variant="cta">Saiba mais...</Card.Badge>
                  </a>
                </Card>
              </div>
              <div className="swiper-slide">
                <Card variant="service" className="flex flex-col items-center justify-between bg-white rounded-xl shadow-lg p-6 gap-4 border border-cream/20 h-full">
                  <div className="flex flex-col items-center">
                    <Card.Image src={developer} alt="Card Programador" className="w-full aspect-video rounded-xl mb-4" />
                    <Card.Badge variant="developer">Front-End</Card.Badge>
                    <Card.Description className="text-lg text-low-medium mb-4 leading-relaxed">
                      Transformo ideias em sites funcionais com código limpo, performance otimizada e designs que conectam marcas às pessoas.
                    </Card.Description>
                  </div>
                  <a href="/servico-front-end" className="mt-auto">
                    <Card.Badge variant="cta">Saiba mais...</Card.Badge>
                  </a>
                </Card>
              </div>
            </div>
            <div className="swiper-pagination mt-8"></div>
          </div>
        </div>
      </section>

      {/* Sobre / About */}
      <section id="sobre" className="bg-cream py-24 px-4 md:px-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="font-title text-4xl md:text-5xl font-light text-low-dark mb-2">Quem está por trás do Svicero Studio</h2>
            <span className="block w-24 h-1 bg-primary mx-auto rounded mb-6"></span>
          </div>
          <div className="flex flex-col lg:flex-row-reverse gap-12 items-center mb-8">
            <div className="w-full lg:w-2/5 flex justify-center mb-8 lg:mb-0">
              <img src={aboutPhoto} alt="Robson Svicero - Fundador do Svicero Studio" className="w-full h-auto rounded-2xl shadow-lg" />
            </div>
            <div className="w-full lg:w-3/5 text-low-medium">
              <div className="text-about">
                <p className="text-lg leading-relaxed mb-6">O <strong className='text-primary'>Svicero Studio</strong> nasceu da minha trajetória integrando design e desenvolvimento. Eu sou o <strong className='text-primary'>Robson Svicero</strong>, fundador do estúdio e responsável por transformar a estratégia visual da sua marca em uma presença digital completa e de alta performance.</p>
                <p className="text-lg leading-relaxed mb-6">Minha jornada começou no <strong className='text-primary'>design gráfico</strong>, criando identidades visuais que ajudavam marcas a se expressarem com propósito e autenticidade. Com o tempo, percebi que queria ir além da estética — queria entender como as pessoas interagem com o design. Foi aí que mergulhei no universo do <strong className='text-primary'>UI/UX design</strong>, unindo beleza e funcionalidade para criar interfaces que realmente conectam marcas e usuários.</p>
                <p className="text-lg leading-relaxed mb-6">Em seguida, encontrei no <strong className='text-primary'>desenvolvimento front-end</strong> a ponte perfeita entre o design e a tecnologia. Hoje, utilizo HTML, CSS, JavaScript e React para dar vida às criações e garantir que cada detalhe visual funcione de forma fluida e responsiva.</p>
                <p className="text-lg leading-relaxed mb-6">Essa trajetória é a base do Svicero Studio: um estúdio focado em <strong className='text-primary'>simplicidade estratégica</strong>, onde cada projeto integra <strong className='text-primary'>identidade visual</strong>, <strong className='text-primary'>UX/UI</strong> e <strong className='text-primary'>front-end</strong> de forma coesa. Acredito que o design não termina no layout — ele ganha força quando se transforma em uma experiência real, acessível e envolvente.</p>
                <p className="text-lg leading-relaxed mb-6">Quando não estou projetando ou codando, você provavelmente vai me encontrar brincando com minha filha, ouvindo música, assistindo filmes, séries ou animes, ou lendo HQs — paixões que alimentam minha criatividade e mantêm minha mente em constante movimento.</p>
                <p className="text-lg leading-relaxed mb-6"><strong className='text-secondary'>Vamos construir sua autoridade digital juntos?</strong> O Svicero Studio está sempre aberto a novos desafios, colaborações estratégicas e projetos que façam a diferença.</p>
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
                <hr className='my-4 border-[#C1C1C1]'></hr>
          <div className="mt-16">
            {/* Elfsight Google Reviews */}
            <div className="elfsight-app-0ed1853d-fdbc-4203-a528-0b0f618422cd" data-elfsight-app-lazy></div>
          </div>
        </div>
      </section>

      {/* Blog - Últimas Publicações */}
      <section className="bg-cream py-24 px-4 md:px-16">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="font-title text-4xl md:text-5xl font-light text-low-dark mb-2">Blog</h2>
            <span className="block w-24 h-1 bg-primary mx-auto rounded mb-6"></span>
            <p className="text-lg text-low-medium max-w-2xl mx-auto leading-relaxed">
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
      <section id="contato" className="bg-neutral-900 py-24 px-4 md:px-16">
        <div className="max-w-screen-md mx-auto">
          <div className="mb-12 text-center">
            <h2 className="font-title text-3xl md:text-4xl font-light text-cream mb-2">Ficou com dúvida? Mande uma mensagem!</h2>
            <p className="text-base md:text-lg text-cream/60 mx-auto mb-6">Caso tenha ficado com qualquer dúvida basta mandar uma mensagem que entrarei em contato o mais breve possível.</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-neutral-900 rounded-xl shadow-lg p-8">
            <label htmlFor="nome" className="text-cream text-base">Nome*</label>
            <input type="text" name="nome" id="nome" required className="px-4 py-3 rounded-lg bg-neutral-800 border border-cream/20 text-cream text-base focus:border-primary focus:outline-none" />

            <label htmlFor="email" className="text-cream text-base">E-mail*</label>
            <input type="email" name="email" id="email" required className="px-4 py-3 rounded-lg bg-neutral-800 border border-cream/20 text-cream text-base focus:border-primary focus:outline-none" />

            <label htmlFor="whats" className="text-cream text-base">WhatsApp*</label>
            <input type="tel" name="whats" id="whats" required className="px-4 py-3 rounded-lg bg-neutral-800 border border-cream/20 text-cream text-base focus:border-primary focus:outline-none" />

            <label htmlFor="projeto" className="text-cream text-base">Tipo de projeto*</label>
            <select name="projeto" id="projeto" required className="px-4 py-3 rounded-lg bg-neutral-800 border border-cream/20 text-cream text-base focus:border-primary focus:outline-none">
              <option value="">Selecione uma opção</option>
              <option value="Identidade Visual">Identidade Visual</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Webdesign">Webdesign</option>
              <option value="Outros">Outros</option>
            </select>

            <label htmlFor="mensagem" className="text-cream text-base">Mensagem*</label>
            <textarea name="mensagem" id="mensagem" required className="px-4 py-3 rounded-lg bg-neutral-800 border border-cream/20 text-cream text-base focus:border-primary focus:outline-none min-h-[150px] resize-y" />

            <p className='w-full text-left text-cream/60 text-sm'>*campos obrigatórios</p>

            <input type="hidden" name="_subject" value="Novo envio!" />

            <div className='w-full flex justify-center items-center'>
              <Button
                type="submit"
                variant="primary"
                className="w-full md:w-1/2 border-2 hover:border-primary px-8 py-4 text-lg"
                disabled={isSubmitting}
              >{isSubmitting ? 'Enviando...' : 'Enviar Proposta'}</Button>
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
