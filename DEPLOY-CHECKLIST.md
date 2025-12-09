# Checklist de Deploy - Hostinger

## Antes do Deploy

- [ ] Build executado com sucesso (`npm run build`)
- [ ] Arquivos verificados na pasta `dist/`
- [ ] Backup do site antigo baixado da Hostinger
- [ ] ZIP criado (ou pasta dist/ pronta)

## Durante o Deploy

### Opção 1: Via File Manager
- [ ] Acessar Hostinger > Gerenciador de Arquivos
- [ ] Navegar até `public_html/`
- [ ] Deletar todos os arquivos antigos
- [ ] Upload do conteúdo da pasta `dist/` (não a pasta dist, mas o conteúdo)
- [ ] Verificar estrutura:
  - [ ] `index.html` na raiz
  - [ ] Pasta `assets/`
  - [ ] Pasta `src/images/`
  - [ ] `.htaccess`
  - [ ] `robots.txt`
  - [ ] `sitemap.xml`
  - [ ] `google95aa56d6d8b038b2.html`

### Opção 2: Via FTP (FileZilla)
- [ ] Conectar via FTP (dados em Hospedagem > FTP)
- [ ] Navegar até `public_html/`
- [ ] Deletar todos os arquivos antigos
- [ ] Arrastar conteúdo da pasta `dist/` para `public_html/`
- [ ] Aguardar upload completo

## Após o Deploy

### Testes de Funcionamento
- [ ] Limpar cache do navegador (Ctrl + Shift + Delete)
- [ ] Testar rotas:
  - [ ] https://svicerostudio.com.br/
  - [ ] https://svicerostudio.com.br/agenda
  - [ ] https://svicerostudio.com.br/servico-front-end
  - [ ] https://svicerostudio.com.br/servico-ui-design
  - [ ] https://svicerostudio.com.br/servico-identidade-visual
- [ ] Testar página 404 (URL inexistente)
- [ ] Verificar carregamento de imagens
- [ ] Testar formulário de contato
- [ ] Verificar links externos (Behance, WhatsApp, etc)
- [ ] Testar botões e navegação
- [ ] Testar em mobile (responsivo)

### Verificações Técnicas
- [ ] SSL ativo (https://)
- [ ] Favicon aparecendo
- [ ] Console sem erros (F12)
- [ ] Google Search Console funcionando
- [ ] Sitemap.xml acessível
- [ ] Robots.txt acessível

### Performance
- [ ] Velocidade de carregamento OK
- [ ] Imagens WebP carregando
- [ ] Sem erros 404 no console
- [ ] Fontes carregando corretamente

## Problemas Comuns

### Página em branco
- Abrir console (F12) e verificar erros
- Verificar se index.html está na raiz do public_html/
- Limpar cache do navegador

### Erro 404 nas rotas
- Verificar se .htaccess foi enviado
- Verificar se mod_rewrite está ativo no servidor
- Testar abrir .htaccess pelo File Manager

### Imagens não carregam
- Verificar se pasta src/images/ foi enviada
- Verificar permissões das pastas (755)
- Verificar caminhos no console (F12)

### Formulário não funciona
- Verificar se Formspree está ativo
- Testar envio de email
- Verificar spam

## Contatos de Suporte

- **Hostinger Suporte**: https://www.hostinger.com.br/contato
- **Chat ao Vivo**: Disponível no painel da Hostinger
- **Base de Conhecimento**: https://support.hostinger.com/pt-BR/

---

**Data do Deploy**: __________
**Hora**: __________
**Status**: [ ] Sucesso  [ ] Problemas  [ ] Rollback necessário
**Notas**: _______________________________________________
