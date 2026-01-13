import React, { useState, useEffect } from 'react';
import logoPreloader from '../images/sviceroStudio.png';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(() => {
    // Verifica se o preloader já foi exibido nesta sessão
    const hasShown = sessionStorage.getItem('preloaderShown');
    return !hasShown;
  });
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!isLoading) return;

    // Marca que o preloader foi exibido
    sessionStorage.setItem('preloaderShown', 'true');

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), 600);
    }, 2400);

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-cream via-white to-cream transition-opacity duration-600 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Círculos de fundo animados */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-96 h-96 bg-primary/5 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
          <div className="absolute w-72 h-72 bg-primary/10 rounded-full animate-ping" style={{ animationDuration: '1.5s', animationDelay: '0.3s' }}></div>
          <div className="absolute w-48 h-48 bg-primary/15 rounded-full animate-ping" style={{ animationDuration: '1s', animationDelay: '0.6s' }}></div>
        </div>

        {/* Logo com animação */}
        <div className="relative z-10 animate-elastic-grow">
          <img 
            src={logoPreloader} 
            alt="Svicero Studio" 
            className="w-64 md:w-80"
            style={{
              filter: 'drop-shadow(0 10px 30px rgba(9, 76, 126, 0.15))'
            }}
          />
        </div>

        {/* Barra de progresso animada */}
        <div className="relative z-10 mt-12 w-64 h-1 bg-primary/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full animate-progress"
            style={{
              backgroundSize: '200% 100%'
            }}
          ></div>
        </div>

        {/* Texto animado */}
        <p className="relative z-10 mt-6 text-primary font-title text-sm tracking-wider animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Carregando experiência...
        </p>
      </div>

      <style>{`
        @keyframes elastic-grow {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          70% {
            transform: scale(1.1);
          }
          85% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-elastic-grow {
          animation: elastic-grow 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
          transform: scale(0);
          opacity: 0;
        }

        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
