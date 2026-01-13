import React from 'react';
import Button from '../components/UI/Button';

const NotFound = () => {
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
      <Button
        href="/"
        variant="secondary"
        className="w-full text-center"
      >
        Voltar para a página inicial
      </Button>
    </main>
  );
};

export default NotFound;
