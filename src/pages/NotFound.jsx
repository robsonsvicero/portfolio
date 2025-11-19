import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <main className="not-found-page">
      <div className="animation">
        <dotlottie-player
          src="https://lottie.host/c5c7d9c3-2055-48a0-8b03-074d8fd2cca7/gpseOTw4K0.lottie"
          background="transparent"
          speed="1"
          style={{ width: '600px', height: '600px' }}
          loop
          autoplay
        ></dotlottie-player>
      </div>
      <p>Oops! A página que você procura não existe.</p>
      <button id="backHome" onClick={handleBackHome}>
        Voltar para a página inicial
      </button>
    </main>
  );
};

export default NotFound;
