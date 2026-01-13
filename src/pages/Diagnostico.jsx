import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const Diagnostico = () => {
  return (
    <div className="bg-cream min-h-screen">
      <Header variant="solid" />
      <main className="pt-28">
        <section className="py-24 px-4 md:px-16">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <h1 className="font-title text-4xl md:text-5xl text-primary mb-8">
                Diagnóstico Estratégico
              </h1>
              <p className="font-body text-lg text-secondary mb-12 max-w-3xl">
                Preencha o formulário abaixo para receber seu diagnóstico estratégico personalizado.
              </p>
              <div className="w-full">
                <iframe
                  id="JotFormIFrame-253516622262655"
                  title="Diagnóstico Svicero Studio"
                  onLoad={() => window.parent.scrollTo(0,0)}
                  allowTransparency="true"
                  allow="geolocation; microphone; camera; fullscreen; payment"
                  src="https://form.jotform.com/253516622262655"
                  frameBorder="0"
                  style={{minWidth: '100%', maxWidth: '100%', height: '539px', border: 'none'}}
                  scrolling="no"
                  className="rounded-xl shadow-lg"
                />
                <script src='https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js'></script>
                <script dangerouslySetInnerHTML={{
                  __html: `window.jotformEmbedHandler("iframe[id='JotFormIFrame-253516622262655']", "https://form.jotform.com/")`
                }} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Diagnostico;
