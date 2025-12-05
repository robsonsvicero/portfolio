-- ================================================
-- POLÍTICAS DE SEGURANÇA RLS (ROW LEVEL SECURITY)
-- Execute este script no SQL Editor do Supabase
-- ================================================

-- 1. Remover a política antiga que permitia operações públicas
DROP POLICY IF EXISTS "Permitir todas operações em projetos" ON projetos;

-- 2. Criar política para permitir leitura pública (qualquer pessoa pode ver os projetos)
-- Esta política já deve existir, mas garantimos que está ativa
DROP POLICY IF EXISTS "Permitir leitura pública de projetos" ON projetos;
CREATE POLICY "Permitir leitura pública de projetos"
ON projetos FOR SELECT
TO public
USING (true);

-- 3. Criar políticas para operações autenticadas (apenas usuários logados podem modificar)
-- INSERT: Permitir criação de novos projetos
CREATE POLICY "Permitir inserção para usuários autenticados"
ON projetos FOR INSERT
TO authenticated
WITH CHECK (true);

-- UPDATE: Permitir atualização de projetos
CREATE POLICY "Permitir atualização para usuários autenticados"
ON projetos FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- DELETE: Permitir exclusão de projetos
CREATE POLICY "Permitir exclusão para usuários autenticados"
ON projetos FOR DELETE
TO authenticated
USING (true);

-- ================================================
-- VERIFICAR POLÍTICAS ATIVAS
-- ================================================
-- Execute a query abaixo para confirmar que as políticas foram criadas corretamente:
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'projetos';

-- ================================================
-- RESULTADO ESPERADO
-- ================================================
-- Você deve ver 4 políticas:
-- 1. Permitir leitura pública de projetos (SELECT, public)
-- 2. Permitir inserção para usuários autenticados (INSERT, authenticated)
-- 3. Permitir atualização para usuários autenticados (UPDATE, authenticated)
-- 4. Permitir exclusão para usuários autenticados (DELETE, authenticated)
