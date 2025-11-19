# 🎨 Robson Svicero - Portfólio Profissional

Portfólio profissional desenvolvido com React, apresentando serviços de Design UI/UX, Identidade Visual e Desenvolvimento Front-End.

![Preview do Projeto](https://robsonsvicero.com.br/src/images/robsonsvicero.webp)

## 🚀 Tecnologias

- **React 18.2.0** - Biblioteca JavaScript para interfaces
- **Vite 5.0.0** - Build tool rápido
- **React Router DOM 6.x** - Navegação client-side
- **Tailwind CSS 3.4.15** - Framework CSS utility-first
- **Swiper 11.0.0** - Carrossel de serviços
- **Font Awesome 6.5.1** - Ícones
- **Formspree** - Processamento de formulários
- **Google Calendar** - Integração de agendamento

## ✨ Funcionalidades

- 🎯 Navegação fluida com React Router (SPA)
- 📱 Design 100% responsivo
- 🎨 Tema customizado com Tailwind CSS
- 📧 Formulário de contato funcional
- 📅 Página de agendamento integrada
- 🖼️ Galeria de projetos
- 🎠 Carrossel de serviços
- 🌐 SEO otimizado
- ⚡ Imagens otimizadas em WebP
- 🎭 Animações suaves
- 📄 Página 404 customizada

## 📂 Estrutura do Projeto

```
robson-svicero/
├── public/               # Arquivos estáticos
│   ├── .htaccess        # Configuração Apache
│   ├── robots.txt       # SEO
│   └── sitemap.xml      # Mapa do site
├── src/
│   ├── components/      # Componentes reutilizáveis
│   │   ├── Layout/      # Header e Footer
│   │   └── UI/          # Button e Card
│   ├── images/          # Imagens (WebP otimizadas)
│   ├── pages/           # Páginas da aplicação
│   │   ├── Home.jsx
│   │   ├── Schedule.jsx
│   │   ├── ServiceFrontEnd.jsx
│   │   ├── ServiceIdentidadeVisual.jsx
│   │   ├── ServiceUIUXDesign.jsx
│   │   └── NotFound.jsx
│   ├── styles/          # Estilos globais
│   ├── App.jsx          # Configuração de rotas
│   └── main.jsx         # Entry point
├── index.html           # HTML principal
├── tailwind.config.js   # Configuração Tailwind
├── vite.config.js       # Configuração Vite
└── package.json         # Dependências
```

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/robsonsvicero/portfolio.git
cd portfolio
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:3000
```

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 🚀 Deploy

### Hostinger (Recomendado)

1. Execute o script de deploy:
```bash
.\deploy-hostinger.ps1
```

2. Faça upload do conteúdo da pasta `dist/` para `public_html/` via:
   - File Manager da Hostinger
   - FTP (FileZilla)

3. Siga o checklist em `DEPLOY-CHECKLIST.md`

### Outros Hosts

O projeto é compatível com qualquer host que suporte:
- Arquivos estáticos
- Mod_rewrite (Apache) ou configuração similar (Nginx)

## 🎨 Personalização

### Cores do Tema

Edite `tailwind.config.js`:

```js
colors: {
  primary: '#094C7E',    // Azul principal
  secondary: '#800020',  // Bordô
  cream: '#FFF8F0',      // Creme
  'dark-bg': '#050505',  // Fundo escuro
}
```

### Fontes

Configuradas no `tailwind.config.js`:
- **Inter** - Corpo do texto
- **Outfit** - Títulos

## 📧 Contato

- **Website**: [robsonsvicero.com.br](https://robsonsvicero.com.br)
- **LinkedIn**: [/in/robsonsvicero](https://www.linkedin.com/in/robsonsvicero/)
- **GitHub**: [/robsonsvicero](https://github.com/robsonsvicero)
- **Behance**: [/robsonsvicero](https://www.behance.net/robsonsvicero)
- **Email**: contato@robsonsvicero.com.br

## 📄 Licença

© 2025 Robson Svicero. Todos os direitos reservados.

---

Desenvolvido com 💙 em São Paulo
