document.addEventListener('DOMContentLoaded', function() {
    // Obtener todas las tarjetas
    const flipCards = document.querySelectorAll('.flip-card');
    
    // Agregar eventos de accesibilidad para teclado
    flipCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.querySelector('.flip-card-inner').style.transform = 
                    this.querySelector('.flip-card-inner').style.transform === 'rotateY(180deg)' 
                        ? 'rotateY(0deg)' 
                        : 'rotateY(180deg)';
            }
        });
    });
}); 