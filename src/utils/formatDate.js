/**
 * Formata uma data ISO para o formato brasileiro (dd de mês de yyyy)
 * @param {string} dateString - String de data no formato ISO
 * @returns {string} Data formatada ou string vazia se inválida
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  // Verifica se a data é válida
  if (isNaN(date.getTime())) return '';
  
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
