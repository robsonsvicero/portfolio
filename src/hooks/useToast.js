import { useState, useCallback } from 'react';

/**
 * Hook customizado para gerenciar notificações toast
 * @returns {Object} Estado e funções do toast
 */
export const useToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // 'success' | 'error' | 'warning' | 'info'

  /**
   * Exibe uma notificação toast
   * @param {string} message - Mensagem a ser exibida
   * @param {string} type - Tipo do toast (success, error, warning, info)
   * @param {number} duration - Duração em ms (padrão: 3000)
   */
  const showToastMessage = useCallback((message, type = 'success', duration = 3000) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, duration);
  }, []);

  /**
   * Fecha o toast manualmente
   */
  const hideToast = useCallback(() => {
    setShowToast(false);
  }, []);

  return {
    showToast,
    toastMessage,
    toastType,
    showToastMessage,
    hideToast
  };
};
