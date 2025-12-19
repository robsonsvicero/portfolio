
import React from "react";
import logo from "../images/logo_alternativo 1.png";

const Agradecimento = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#f9f4ee] px-2 py-8">
    <div className="max-w-lg w-full bg-white rounded-2xl shadow-md p-8 text-left border border-gray-200" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
      <img
        src={logo}
        alt="Logo Svicero Studio"
        className="mx-auto mb-8 w-40 h-auto"
        style={{ maxWidth: '180px' }}
      />
      <h1 className="text-2xl md:text-2xl font-bold text-gray-900 mb-5 text-center">Obrigado pela conversa e pela confiança!</h1>
      <p className="text-gray-800 mb-4 text-base">
        Foi excelente mergulhar na essência da sua Marca hoje. Agora, vou analisar todos os pontos que discutimos para desenhar a fundação digital que seu negócio merece.
      </p>
      <p className="text-gray-900 font-semibold mb-2 text-base">O que acontece agora?</p>
      <p className="text-gray-800 mb-4 text-base">
        Em até 72 horas, você receberá no seu e-mail (ou WhatsApp) o diagnóstico detalhado da nossa call junto com a proposta estratégica que o Svicero Studio usará para dar vida ao seu projeto.
      </p>
      <p className="text-gray-800 mb-4 text-base">
        Enquanto isso, sinta-se à vontade para rever nosso portfólio ou tirar qualquer dúvida que tenha surgido após nossa conversa.
      </p>
      <p className="text-gray-900 mb-6 text-base">Vamos construir algo sólido juntos.</p>
      <a
        href="/#projetos"
        className="w-full text-center inline-block bg-[#004a77] hover:bg-[#00385a] text-white font-semibold py-3 px-6 rounded-lg shadow transition-colors duration-200"
        style={{ marginTop: '12px' }}
      >
        Enquanto espera, veja nosso portfólio
      </a>
    </div>
  </div>
);

export default Agradecimento;
