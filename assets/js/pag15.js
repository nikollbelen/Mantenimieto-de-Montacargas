document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        
        button.addEventListener('click', () => {
            // Cerrar todos los otros acordeones
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar el estado del acordeón actual
            item.classList.toggle('active');
            
            // Actualizar el ícono más/menos
            const plusIcon = button.querySelector('.plus-icon');
            if (item.classList.contains('active')) {
                plusIcon.textContent = '−';
            } else {
                plusIcon.textContent = '+';
            }
        });
    });
}); 