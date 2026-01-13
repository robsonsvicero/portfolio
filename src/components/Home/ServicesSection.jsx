import React from 'react';
import Button from '../UI/Button';

const ServicesSection = ({ servicos }) => {
  return (
    <section id="servicos" className="bg-cream py-24 px-4 md:px-16">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-title text-4xl md:text-5xl font-light text-dark-bg mb-4">Nossos Serviços</h2>
          <p className="font-sans text-lg text-low-medium max-w-2xl mx-auto leading-relaxed">
            Soluções completas em design e desenvolvimento web para fortalecer sua presença digital
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicos.map((servico, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={servico.img}
                  alt={servico.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <span className={`inline-block px-4 py-2 rounded-full ${servico.badge.className}`}>
                    {servico.badge.text}
                  </span>
                </div>
                <h3 className="font-title text-xl font-semibold text-dark-bg mb-4 leading-snug">
                  {servico.title}
                </h3>
                <Button href={servico.link} variant="primary" className="w-full">
                  Saiba Mais
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
