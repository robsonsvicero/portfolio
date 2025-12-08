-- Script para criar a estrutura do Blog no Supabase
-- Execute este script no Supabase SQL Editor

-- Criar tabela de posts do blog
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  resumo TEXT,
  conteudo TEXT NOT NULL,
  imagem_destaque TEXT,
  categoria TEXT,
  data_publicacao DATE NOT NULL,
  autor TEXT DEFAULT 'Robson Svicero',
  publicado BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_publicado ON posts(publicado) WHERE publicado = true;
CREATE INDEX IF NOT EXISTS idx_posts_categoria ON posts(categoria);
CREATE INDEX IF NOT EXISTS idx_posts_data_publicacao ON posts(data_publicacao DESC);

-- Índice composto para busca otimizada de posts publicados ordenados por data
CREATE INDEX IF NOT EXISTS idx_posts_publicado_data ON posts(publicado, data_publicacao DESC) WHERE publicado = true;

-- Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para atualizar updated_at
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Adicionar coluna tags (opcional - para facilitar busca)
ALTER TABLE posts
ADD COLUMN IF NOT EXISTS tags TEXT;

-- Adicionar comentários para documentação
COMMENT ON TABLE posts IS 'Tabela de posts do blog';
COMMENT ON COLUMN posts.titulo IS 'Título do post';
COMMENT ON COLUMN posts.slug IS 'URL amigável do post (único)';
COMMENT ON COLUMN posts.resumo IS 'Resumo/preview do post para listagem';
COMMENT ON COLUMN posts.conteudo IS 'Conteúdo completo do post (suporta Markdown)';
COMMENT ON COLUMN posts.imagem_destaque IS 'URL da imagem de destaque do post';
COMMENT ON COLUMN posts.categoria IS 'Categoria do post (ex: UI/UX Design, Desenvolvimento, Identidade Visual)';
COMMENT ON COLUMN posts.tags IS 'Tags separadas por vírgula para busca (ex: react, design, ui)';
COMMENT ON COLUMN posts.data_publicacao IS 'Data de publicação do post';
COMMENT ON COLUMN posts.autor IS 'Nome do autor do post';
COMMENT ON COLUMN posts.publicado IS 'Se o post está publicado (visível no site)';

-- Habilitar Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Remover policies existentes (se houver)
DROP POLICY IF EXISTS "Posts publicados são visíveis para todos" ON posts;
DROP POLICY IF EXISTS "Usuários autenticados podem ver todos os posts" ON posts;
DROP POLICY IF EXISTS "Usuários autenticados podem criar posts" ON posts;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar posts" ON posts;
DROP POLICY IF EXISTS "Usuários autenticados podem deletar posts" ON posts;

-- Política: Qualquer pessoa pode ler posts publicados
CREATE POLICY "Posts publicados são visíveis para todos"
  ON posts FOR SELECT
  USING (publicado = true);

-- Política: Apenas usuários autenticados podem ver todos os posts (admin)
CREATE POLICY "Usuários autenticados podem ver todos os posts"
  ON posts FOR SELECT
  TO authenticated
  USING (true);

-- Política: Apenas usuários autenticados podem inserir posts
CREATE POLICY "Usuários autenticados podem criar posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Política: Apenas usuários autenticados podem atualizar posts
CREATE POLICY "Usuários autenticados podem atualizar posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política: Apenas usuários autenticados podem deletar posts
CREATE POLICY "Usuários autenticados podem deletar posts"
  ON posts FOR DELETE
  TO authenticated
  USING (true);
