# 🔐 Guia de Configuração da Autenticação

## ✅ O que foi implementado

Sistema completo de autenticação com:
- 🔑 **Login com Supabase Auth** - Autenticação segura
- 🛡️ **Rota Protegida** - `/admin/projetos` só acessível após login
- 👤 **Gerenciamento de Sessão** - Mantém usuário logado
- 🚪 **Logout** - Botão para sair da conta
- 🔒 **Políticas RLS** - Banco de dados protegido

---

## 🚀 Passos para Ativar a Autenticação

### 1️⃣ Atualizar as Políticas RLS no Supabase

1. Acesse seu projeto no [Supabase](https://supabase.com)
2. Vá em **"SQL Editor"** no menu lateral
3. Abra o arquivo `SUPABASE_RLS_UPDATE.sql` que foi criado
4. Copie todo o conteúdo do arquivo
5. Cole no SQL Editor do Supabase
6. Clique em **"Run"** (ou Ctrl/Cmd + Enter)
7. Você deve ver: "Success. No rows returned"

✅ **Pronto!** Agora apenas usuários autenticados podem criar/editar/excluir projetos.

---

### 2️⃣ Criar Usuário Administrador

#### Opção A: Via Interface do Supabase (Recomendado)

1. No Supabase, vá em **"Authentication"** > **"Users"**
2. Clique em **"Add user"** > **"Create new user"**
3. Preencha:
   - **Email:** seu-email@exemplo.com (use seu email real)
   - **Password:** Crie uma senha forte (mínimo 6 caracteres)
   - **Auto Confirm User:** ✅ Marque esta opção (importante!)
4. Clique em **"Create user"**

✅ **Seu usuário admin foi criado!**

#### Opção B: Via SQL (Alternativa)

Se preferir criar via SQL, vá no SQL Editor e execute:

```sql
-- Criar usuário admin
-- IMPORTANTE: Troque o email e senha pelos seus
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'seu-email@exemplo.com', -- ⚠️ TROQUE PELO SEU EMAIL
  crypt('sua-senha-segura', gen_salt('bf')), -- ⚠️ TROQUE PELA SUA SENHA
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  FALSE,
  ''
);
```

⚠️ **Não esqueça de trocar o email e senha!**

---

### 3️⃣ Testar a Autenticação

1. **Reinicie o servidor de desenvolvimento** (se ainda não reiniciou):
   ```bash
   # Pressione Ctrl + C no terminal
   # Execute novamente:
   npm run dev
   ```

2. **Acesse a página de login:**
   ```
   http://localhost:3000/login
   ```

3. **Faça login com as credenciais criadas:**
   - Email: seu-email@exemplo.com
   - Senha: sua-senha-segura

4. **Você será redirecionado para `/admin/projetos`** ✅

5. **Teste criar um novo projeto** para confirmar que tudo funciona

---

## 🎯 Como Funciona

### Fluxo de Autenticação

```
1. Usuário acessa /admin/projetos
   ↓
2. Sistema verifica se está logado
   ↓
3. SE NÃO logado → Redireciona para /login
   SE logado → Acessa a página admin
   ↓
4. Na página de login, usuário insere email/senha
   ↓
5. Supabase Auth valida as credenciais
   ↓
6. SE válidas → Cria sessão e redireciona para /admin
   SE inválidas → Mostra erro
```

### Proteção do Banco de Dados (RLS)

```
Operação de LEITURA (SELECT):
- ✅ Qualquer pessoa pode ler (pública)
- Usado na Home para exibir projetos

Operações de ESCRITA (INSERT/UPDATE/DELETE):
- 🔒 Apenas usuários autenticados
- Usado no painel admin
```

---

## 🔑 Gerenciamento de Usuários

### Adicionar mais administradores

Repita o **Passo 2** para criar novos usuários com acesso ao painel.

### Remover acesso de um usuário

1. Vá em **"Authentication"** > **"Users"**
2. Encontre o usuário
3. Clique nos **3 pontos** > **"Delete user"**

### Resetar senha de um usuário

1. Vá em **"Authentication"** > **"Users"**
2. Encontre o usuário
3. Clique nos **3 pontos** > **"Send reset password email"**

---

## 🛡️ Segurança em Produção

### ✅ Checklist de Segurança

- [x] Políticas RLS configuradas
- [x] Rota admin protegida
- [x] Autenticação obrigatória para modificações
- [ ] HTTPS habilitado no domínio (fazer no deploy)
- [ ] Senhas fortes para todos os admins
- [ ] `.env` no `.gitignore` (não commitar credenciais)

### Recomendações Adicionais

1. **Use senhas fortes:**
   - Mínimo 12 caracteres
   - Misture letras, números e símbolos
   - Não reutilize senhas

2. **Habilite 2FA (Autenticação de Dois Fatores):**
   - Configure no Supabase para o usuário admin
   - Aumenta significativamente a segurança

3. **Monitore acessos:**
   - Vá em **"Authentication"** > **"Users"**
   - Verifique **"Last Sign In"** regularmente
   - Remova usuários inativos

4. **Configure email de verificação (opcional):**
   - Em **"Authentication"** > **"Email Templates"**
   - Personalize os emails de autenticação

---

## 🐛 Solução de Problemas

### Erro: "Invalid login credentials"
- ✅ Verifique se o email está correto
- ✅ Verifique se a senha está correta
- ✅ Confirme que marcou "Auto Confirm User" ao criar o usuário
- ✅ Se usou SQL, verifique se o usuário foi criado: `SELECT * FROM auth.users;`

### Erro: "Failed to fetch" no login
- ✅ Verifique se as credenciais no `.env` estão corretas
- ✅ Confirme que reiniciou o servidor após editar `.env`
- ✅ Verifique se o projeto Supabase está ativo

### Redirecionado para /login mesmo após fazer login
- ✅ Limpe o cache do navegador (Ctrl + Shift + Delete)
- ✅ Abra uma aba anônima e teste
- ✅ Verifique o Console do navegador (F12) por erros

### Não consigo criar projetos após login
- ✅ Verifique se executou o script `SUPABASE_RLS_UPDATE.sql`
- ✅ Confirme as políticas: `SELECT * FROM pg_policies WHERE tablename = 'projetos';`
- ✅ Veja erros no Console (F12) para mais detalhes

### Sessão expira muito rápido
- Por padrão, a sessão do Supabase dura 1 hora
- Para alterar, vá em **"Authentication"** > **"Settings"**
- Ajuste **"JWT expiry"** (máximo recomendado: 7 dias)

---

## 📂 Arquivos Criados/Modificados

### Novos Arquivos
- `src/contexts/AuthContext.jsx` - Gerenciamento de autenticação
- `src/components/ProtectedRoute.jsx` - Componente de proteção de rotas
- `src/pages/Login.jsx` - Página de login
- `SUPABASE_RLS_UPDATE.sql` - Script de atualização das políticas
- `GUIA_AUTENTICACAO.md` - Este guia

### Arquivos Modificados
- `src/App.jsx` - Adicionado AuthProvider e rota de login
- `src/pages/AdminProjetos.jsx` - Adicionado logout e info do usuário

---

## 🎨 Personalização

### Alterar tempo de sessão
```javascript
// Em src/lib/supabase.js, adicione:
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})
```

### Customizar página de login
Edite `src/pages/Login.jsx` para alterar:
- Cores e estilos
- Logo
- Textos e mensagens
- Campos adicionais

---

## 🚀 Próximos Passos

1. ✅ Executar script SQL de atualização das políticas
2. ✅ Criar usuário administrador
3. ✅ Testar login e criação de projetos
4. 📧 Configurar email de recuperação de senha (opcional)
5. 🔒 Habilitar 2FA para admins (recomendado)
6. 🚀 Fazer deploy do projeto

---

**Pronto!** Seu sistema está seguro e protegido. 🎉

**Dúvidas?** Consulte a [documentação do Supabase Auth](https://supabase.com/docs/guides/auth) ou peça ajuda! 🚀
