# 📦 Configuração do Sistema de Projetos com Supabase

## 🎯 O que foi implementado

Sistema completo de gerenciamento de projetos com:
- **Banco de dados Supabase** para armazenar projetos
- **Página de Admin** (`/admin/projetos`) para cadastrar/editar/excluir projetos
- **Integração na Home** que busca projetos do banco automaticamente
- **Fallback** com projetos estáticos caso o banco esteja indisponível

---

## 🚀 Passo a Passo para Configurar

### 1️⃣ Criar conta no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Clique em **"Start your project"**
3. Faça login com GitHub ou email
4. Crie um novo projeto:
   - **Name:** Svicero Portfolio (ou nome de sua preferência)
   - **Database Password:** Escolha uma senha forte e **guarde-a**
   - **Region:** South America (São Paulo) para melhor performance
   - Clique em **"Create new project"**
5. Aguarde 2-3 minutos até o projeto ser provisionado

---

### 2️⃣ Criar a tabela de projetos

1. No painel do Supabase, vá em **"SQL Editor"** (ícone de banco de dados no menu lateral)
2. Clique em **"+ New query"**
3. Cole o código SQL abaixo:

```sql
-- Criar tabela projetos
CREATE TABLE projetos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  imagem_url TEXT NOT NULL,
  link TEXT NOT NULL,
  button_text TEXT DEFAULT 'Ver Projeto',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE projetos ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir leitura pública
CREATE POLICY "Permitir leitura pública de projetos"
ON projetos FOR SELECT
TO public
USING (true);

-- Criar política para permitir inserção, atualização e exclusão (admin)
-- ATENÇÃO: Esta política permite operações sem autenticação
-- Em produção, você deve adicionar autenticação adequada
CREATE POLICY "Permitir todas operações em projetos"
ON projetos FOR ALL
TO public
USING (true)
WITH CHECK (true);
```

4. Clique em **"Run"** (ou pressione Ctrl/Cmd + Enter)
5. Você verá a mensagem "Success. No rows returned"

---

### 3️⃣ Configurar as credenciais no projeto

1. No Supabase, vá em **"Settings"** > **"API"**
2. Copie os valores de:
   - **Project URL** (algo como `https://xxxxx.supabase.co`)
   - **anon public** key (chave longa começando com `eyJ...`)

3. Abra o arquivo `.env` na raiz do projeto
4. Cole as credenciais:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anon_aqui
```

5. **IMPORTANTE:** Reinicie o servidor de desenvolvimento após salvar o `.env`
   - No terminal, pressione `Ctrl + C` para parar
   - Execute `npm run dev` novamente

---

### 4️⃣ Adicionar projetos iniciais (opcional)

Se quiser migrar os projetos existentes para o banco:

1. Vá em **"SQL Editor"** no Supabase
2. Cole este SQL para adicionar os projetos atuais:

```sql
INSERT INTO projetos (titulo, descricao, imagem_url, link, button_text)
VALUES 
  (
    'PowerBrain',
    'Desenvolvimento da identidade visual e do site institucional da PowerBrain, empresa de tecnologia que aplica IoT no setor de energia elétrica. A marca traduz inovação e confiabilidade com um visual tecnológico e contemporâneo.',
    'https://i.imgur.com/4E7IbfZ.png',
    'https://powerbrainbr.com',
    'Visite o site'
  ),
  (
    'Sacada Classz',
    'Criação da identidade visual e desenvolvimento de site one-page para a Sacada Classz, especializada em fechamento de sacadas, guarda-corpos e vidraçarias. O design minimalista valoriza transparência, leveza e sofisticação.',
    'https://i.imgur.com/KTuUPjb.png',
    'https://sacadaclassz.com.br/',
    'Visite o site'
  ),
  (
    'Isaque Móveis',
    'Criação da identidade visual para a loja Isaque Móveis. A marca equilibra solidez e elegância, reforçando a essência artesanal e a qualidade presente em cada peça.',
    'https://i.imgur.com/vmqGJpA.png',
    'https://www.behance.net/gallery/188436653/Isaque-Moveis',
    'Visite o projeto de IDV'
  ),
  (
    'Universal Music',
    'Projeto de UX Design voltado à modernização da experiência de navegação no site da Universal Music Store. A proposta trouxe fluidez, clareza e uma interface mais alinhada à linguagem contemporânea da marca.',
    'https://i.imgur.com/9HD6iQf.png',
    'https://www.behance.net/gallery/174232557/Universal-Music',
    'Visite o projeto de UX'
  );
```

3. Clique em **"Run"**

---

## 🎨 Como usar a página de Admin

### Acessar o painel
Navegue para: `http://localhost:3000/admin/projetos`

### Adicionar novo projeto
1. Preencha o formulário com:
   - **Título:** Nome do projeto
   - **Descrição:** Texto descritivo do projeto
   - **URL da Imagem:** Link da imagem (pode usar Behance, Imgur, etc.)
   - **Link do Projeto:** URL do projeto/Behance/site
   - **Texto do Botão:** Texto que aparecerá no botão (ex: "Ver Projeto")
2. Clique em **"Criar Projeto"**
3. O projeto aparecerá automaticamente na Home

### Editar projeto
1. Na lista de projetos, clique em **"Editar"**
2. O formulário será preenchido com os dados atuais
3. Faça as alterações desejadas
4. Clique em **"Atualizar"**

### Excluir projeto
1. Clique em **"Excluir"**
2. Confirme a exclusão
3. O projeto será removido da Home automaticamente

---

## 📝 Estrutura do Banco de Dados

### Tabela: `projetos`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | ID único gerado automaticamente |
| `titulo` | TEXT | Título do projeto |
| `descricao` | TEXT | Descrição completa do projeto |
| `imagem_url` | TEXT | URL da imagem de capa |
| `link` | TEXT | Link do projeto |
| `button_text` | TEXT | Texto do botão CTA |
| `created_at` | TIMESTAMP | Data de criação automática |

---

## 🔒 Segurança (Importante para produção)

✅ **AUTENTICAÇÃO IMPLEMENTADA!** O sistema agora possui login e proteção completa.

### 🔐 Sistema de Autenticação Ativo

O projeto já inclui:
- ✅ **Login obrigatório** para acessar `/admin/projetos`
- ✅ **Proteção de rotas** com verificação de autenticação
- ✅ **Políticas RLS** prontas para serem aplicadas
- ✅ **Gerenciamento de sessão** automático

### 📋 Próximos Passos para Segurança

Para ativar completamente a segurança, siga o **GUIA_AUTENTICACAO.md**:

1. **Atualizar políticas RLS** (script SQL fornecido)
2. **Criar usuário administrador** no Supabase
3. **Testar o login** em `/login`

👉 **Leia o arquivo `GUIA_AUTENTICACAO.md` para instruções completas passo a passo.**

---

## 🐛 Solução de Problemas

### "Failed to fetch" ou erros de conexão
- Verifique se as credenciais no `.env` estão corretas
- Confirme que reiniciou o servidor após editar o `.env`
- Verifique se o projeto Supabase está ativo

### Projetos não aparecem na Home
- Verifique se há projetos cadastrados no banco (SQL Editor > `SELECT * FROM projetos;`)
- Abra o Console do navegador (F12) e veja se há erros
- Confirme que as políticas RLS estão configuradas corretamente

### Não consigo adicionar projetos no admin
- Verifique as políticas RLS no Supabase
- Confirme que a política de INSERT/UPDATE/DELETE está ativa
- Veja os erros no Console do navegador (F12)

---

## 📦 Arquivos Criados

- `src/lib/supabase.js` - Cliente Supabase
- `src/pages/AdminProjetos.jsx` - Página de administração
- `.env` - Variáveis de ambiente (credenciais)
- `.env.example` - Exemplo de configuração

---

## 🎯 Próximos Passos Recomendados

1. ✅ Configurar Supabase e adicionar credenciais
2. ✅ Testar criação de projetos no admin
3. ✅ Verificar se projetos aparecem na Home
4. 🔒 Implementar autenticação (para produção)
5. 📸 Configurar upload de imagens no Supabase Storage (opcional)
6. 🚀 Deploy do projeto

---

**Dúvidas?** Consulte a [documentação do Supabase](https://supabase.com/docs) ou peça ajuda! 🚀
