-- Tabela de Depoimentos/Reviews
-- Execute este SQL no Supabase SQL Editor

CREATE TABLE IF NOT EXISTS depoimentos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cargo VARCHAR(255),
  empresa VARCHAR(255),
  texto TEXT NOT NULL,
  nota INTEGER DEFAULT 5 CHECK (nota >= 1 AND nota <= 5),
  iniciais VARCHAR(10),
  cor_avatar VARCHAR(50) DEFAULT 'primary',
  ativo BOOLEAN DEFAULT true,
  ordem INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para ordenação
CREATE INDEX idx_depoimentos_ordem ON depoimentos(ordem);
CREATE INDEX idx_depoimentos_ativo ON depoimentos(ativo);

-- Habilitar RLS (Row Level Security)
ALTER TABLE depoimentos ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública (depoimentos ativos)
CREATE POLICY "Depoimentos ativos são públicos" ON depoimentos
  FOR SELECT USING (ativo = true);

-- Política para admin (todas as operações)
CREATE POLICY "Admin pode gerenciar depoimentos" ON depoimentos
  FOR ALL USING (
    auth.role() = 'authenticated'
  );

-- Inserir depoimentos de exemplo
INSERT INTO depoimentos (nome, cargo, empresa, texto, nota, iniciais, cor_avatar, ativo, ordem) VALUES
(
  'Alexandre Ivo',
  'CEO',
  'Alexandre Ivo',
  'Trabalho excepcional! O Robson entendeu perfeitamente a essência da nossa marca e entregou uma identidade visual que superou nossas expectativas. Profissionalismo e criatividade em cada detalhe.',
  5,
  'AI',
  'primary',
  true,
  1
),
(
  'João Batista',
  'Diretor',
  'JB Imóveis',
  'O site ficou incrível! Design moderno, rápido e responsivo. O Svicero Studio entregou exatamente o que precisávamos para posicionar nossa empresa no mercado digital.',
  5,
  'JB',
  'secondary',
  true,
  2
),
(
  'Isaque Moreira',
  'Proprietário',
  'Isaque Móveis',
  'Experiência fantástica do início ao fim. O Robson é extremamente atencioso e dedicado. O resultado final foi um branding completo que realmente representa nossa visão.',
  5,
  'IM',
  'accent',
  true,
  3
);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_depoimentos_updated_at
  BEFORE UPDATE ON depoimentos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
