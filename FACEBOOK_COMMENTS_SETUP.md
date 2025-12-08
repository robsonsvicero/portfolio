# Configuração do Facebook Comments

## 📋 Passo a Passo para Configurar

### 1️⃣ Criar Facebook App (5 minutos)

1. Acesse: https://developers.facebook.com/apps
2. Clique em **"Criar App"**
3. Selecione **"Nenhum"** ou **"Consumidor"** como tipo
4. Preencha:
   - **Nome do App**: "Robson Svicero Blog"
   - **E-mail de contato**: seu e-mail
5. Clique em **"Criar App"**

### 2️⃣ Obter o App ID

1. No painel do app, copie o **App ID** (número no topo)
2. Exemplo: `123456789012345`

### 3️⃣ Configurar Domínios

1. No menu lateral, vá em **"Configurações" → "Básico"**
2. Role até **"Domínios do App"**
3. Adicione: `robsonsvicero.com.br`
4. Clique em **"Salvar Alterações"**

### 4️⃣ Ativar o Produto "Comentários"

1. No menu lateral, clique em **"Adicionar Produto"**
2. Procure por **"Comentários"** e clique em **"Configurar"**
3. Ou simplesmente pule esta etapa - o plugin já funciona sem isso

### 5️⃣ Atualizar o Código

Substitua `YOUR_APP_ID` em **2 lugares** pelo seu App ID real:

**Arquivo 1: `index.html` (linha ~8)**
```html
<meta property="fb:app_id" content="123456789012345">
```

**Arquivo 2: `src/pages/BlogPost.jsx` (linha ~22)**
```javascript
appId: '123456789012345',
```

### 6️⃣ Moderar Comentários

1. Acesse: https://developers.facebook.com/tools/comments/
2. Cole a URL do post: `https://robsonsvicero.com.br/blog/nome-do-post`
3. Você verá todos os comentários e poderá:
   - ✅ Aprovar
   - ❌ Excluir
   - 🚫 Bloquear usuários
   - ⚙️ Configurar moderação automática

### 7️⃣ Configurações Adicionais (Opcional)

**Receber notificações:**
1. No painel do App → **Configurações → Básico**
2. Adicione seu e-mail em **"E-mail de contato"**
3. Ative notificações no Facebook

**Moderação automática:**
1. Acesse: https://developers.facebook.com/tools/comments/
2. Vá em **"Configurações"**
3. Ative:
   - Filtro de palavras ofensivas
   - Bloqueio de spam
   - Moderação prévia (se preferir aprovar antes de publicar)

## ✨ Recursos Configurados

✅ Widget de comentários integrado
✅ 5 comentários por página (pode aumentar editando `data-numposts`)
✅ Design responsivo
✅ Tema claro (light)
✅ Ordenação cronológica reversa (mais recentes primeiro)
✅ Ícone de comentários no título
✅ URL única por post

## 🎨 Personalizar Aparência

Para alterar o número de comentários visíveis, edite em `BlogPost.jsx`:
```jsx
data-numposts="10"  // Mostrar 10 comentários
```

Para tema escuro:
```jsx
data-colorscheme="dark"
```

## 🔒 Privacidade

- Usuários precisam estar logados no Facebook para comentar
- Comentários são públicos e aparecem no Facebook do usuário
- Você pode deletar qualquer comentário
- Sistema anti-spam integrado

## 📱 Teste

1. Faça deploy do site
2. Acesse um post do blog
3. Role até a seção de comentários
4. Faça login no Facebook
5. Deixe um comentário de teste

## ⚠️ Importante

- Substitua `YOUR_APP_ID` pelo ID real antes do deploy
- Configure o domínio correto no Facebook Developers
- Para desenvolvimento local, use `localhost` nos domínios do app

## 🆘 Problemas Comuns

**Comentários não aparecem:**
- Verifique se o App ID está correto
- Confirme que o domínio está configurado no Facebook
- Limpe o cache do navegador

**Erro "App ID inválido":**
- Certifique-se de copiar apenas os números do App ID
- Não use aspas extras no código

**Widget não carrega:**
- Verifique sua conexão com internet
- Teste em navegador anônimo
- Aguarde alguns segundos após a página carregar

---

✅ **Tudo pronto!** Seu blog agora tem comentários do Facebook integrados! 🎉
