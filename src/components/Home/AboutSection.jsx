import React from 'react';
import aboutPhoto from '../../images/about-photo.png';

const AboutSection = () => {
  return (
    <section id="sobre" className="bg-low-dark py-24 px-4 md:px-16">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texto */}
          <div>
            <h2 className="font-title text-4xl md:text-5xl font-light text-cream mb-8">Sobre Mim</h2>
            <div className="space-y-6 text-cream/90 leading-relaxed">
              <p className="font-sans text-lg">
                Sou <strong className="text-cream">Robson Svicero</strong>, designer e desenvolvedor front-end especializado em criar experiências digitais que combinam estética, funcionalidade e estratégia.
              </p>
              <p className="font-sans text-lg">
                Acredito que design vai além da estética — é sobre resolver problemas, criar conexões e gerar resultados. Cada projeto é uma oportunidade de transformar ideias em soluções digitais que impactam negócios e pessoas.
              </p>
              <p className="font-sans text-lg">
                Trabalho com marcas que buscam se destacar no digital através de identidades visuais autênticas, interfaces intuitivas e sites otimizados que convertem visitantes em clientes.
              </p>
            </div>
          </div>

          {/* Imagem */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={aboutPhoto}
                  alt="Robson Svicero"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decoração */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/20 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
