/**
 * Formata uma data ISO para o formato brasileiro (dd de mês de yyyy)
 * @param {string} dateString - String de data no formato ISO
 * @returns {string} Data formatada ou string vazia se inválida
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  // Se receber apenas YYYY-MM-DD, constrói a data em horário local
  // Também normaliza ISO midnight UTC (ex: 2026-01-16T00:00:00Z) para data local
  let date;
  const dateOnlyMatch = /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  const midnightUtcMatch = /^\d{4}-\d{2}-\d{2}T00:00:00(?:\.000)?Z$/.test(dateString);

  if (dateOnlyMatch || midnightUtcMatch) {
    // Para ambos os casos, usamos os componentes de data e construímos em horário local
    const [y, m, d] = dateString.slice(0, 10).split('-').map(Number);
    date = new Date(y, m - 1, d);
  } else {
    date = new Date(dateString);
  }

  // Verifica se a data é válida
  if (isNaN(date.getTime())) return '';
  
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
