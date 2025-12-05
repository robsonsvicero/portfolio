import React from 'react';
import { useNavigate } from 'react-router-dom';
// ...removido import CSS, migrando para Tailwind

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-cream px-4 py-24 text-center">
      <div className="flex justify-center mb-8">
        <dotlottie-player
          src="https://lottie.host/c5c7d9c3-2055-48a0-8b03-074d8fd2cca7/gpseOTw4K0.lottie"
          background="transparent"
          speed="1"
          style={{ width: '300px', height: '300px' }}
          loop
          autoplay
        ></dotlottie-player>
      </div>
      <p className="font-title text-2xl md:text-3xl text-primary font-semibold mb-6">Oops! A página que você procura não existe.</p>
      <button
        onClick={handleBackHome}
        className="inline-block mt-4 px-8 py-3 bg-primary text-cream font-title text-lg rounded-lg shadow-md hover:scale-105 hover:bg-secondary transition-all duration-300"
      >Voltar para a página inicial</button>
    </main>
  );
};

export default NotFound;
