-- Script para adicionar os campos data_projeto e mostrar_home na tabela projetos
-- Execute este script no Supabase SQL Editor

-- Adicionar coluna data_projeto (data de criação do projeto)
ALTER TABLE projetos
ADD COLUMN IF NOT EXISTS data_projeto DATE;

-- Adicionar coluna mostrar_home (controla se o projeto aparece na Home)
ALTER TABLE projetos
ADD COLUMN IF NOT EXISTS mostrar_home BOOLEAN DEFAULT true;

-- Atualizar projetos existentes para terem uma data padrão (data atual)
-- e estarem marcados para aparecer na home
UPDATE projetos
SET 
  data_projeto = CURRENT_DATE,
  mostrar_home = true
WHERE data_projeto IS NULL;

-- Tornar o campo data_projeto obrigatório após preencher dados existentes
ALTER TABLE projetos
ALTER COLUMN data_projeto SET NOT NULL;

-- Comentários nas colunas para documentação
COMMENT ON COLUMN projetos.data_projeto IS 'Data de criação/conclusão do projeto';
COMMENT ON COLUMN projetos.mostrar_home IS 'Define se o projeto deve aparecer na página inicial';

-- Criar índice para melhorar performance nas consultas ordenadas por data
CREATE INDEX IF NOT EXISTS idx_projetos_data_projeto ON projetos(data_projeto DESC);

-- Criar índice para melhorar performance nas consultas filtradas por mostrar_home
CREATE INDEX IF NOT EXISTS idx_projetos_mostrar_home ON projetos(mostrar_home) WHERE mostrar_home = true;
