function verificarLarguraDaTela() {
    const link = document.getElementById('p-link');
    
    if (window.innerWidth <= 768) {
        // Se a largura da tela for menor ou igual a 768px, alterar target para _self
        link.setAttribute('target', '_self');
    } else {
        // Se a largura da tela for maior que 768px, manter _blank
        link.setAttribute('target', '_blank');
    }
}

// Executa a função ao carregar a página
verificarLarguraDaTela();

// Executa a função sempre que a janela for redimensionada
window.addEventListener('resize', verificarLarguraDaTela);
