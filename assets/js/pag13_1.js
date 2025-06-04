document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.querySelector('.cards-container');
    const cards = document.querySelectorAll('.card');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentPage = 0;
    let cardsPerPage = getCardsPerPage();
    let totalPages = Math.ceil(cards.length / cardsPerPage);
    
    function getCardsPerPage() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1400) return 2;
        return 4;
    }
    
    function updateDots() {
        // Limpiar dots existentes
        dotsContainer.innerHTML = '';
        // Crear nuevos dots basados en el total de páginas actual
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === currentPage) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentPage = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    function updateCarousel() {
        // Asegurar que currentPage es válido con el nuevo totalPages
        currentPage = Math.min(currentPage, totalPages - 1);
        
        // Show/hide cards based on current page
        cards.forEach((card, index) => {
            const startIdx = currentPage * cardsPerPage;
            const endIdx = startIdx + cardsPerPage;
            
            if (index >= startIdx && index < endIdx) {
                card.style.display = 'flex';
                card.style.opacity = '1';
                card.style.visibility = 'visible';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.visibility = 'hidden';
            }
        });
        
        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
        
        // Update buttons
        prevBtn.style.opacity = currentPage === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentPage === totalPages - 1 ? '0.5' : '1';
        prevBtn.style.cursor = currentPage === 0 ? 'not-allowed' : 'pointer';
        nextBtn.style.cursor = currentPage === totalPages - 1 ? 'not-allowed' : 'pointer';
    }
    
    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateCarousel();
        }
    });
    
    // Add touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    cardsContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    cardsContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentPage < totalPages - 1) {
                // Swipe left
                currentPage++;
            } else if (diff < 0 && currentPage > 0) {
                // Swipe right
                currentPage--;
            }
            updateCarousel();
        }
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentPage > 0) {
            currentPage--;
            updateCarousel();
        } else if (e.key === 'ArrowRight' && currentPage < totalPages - 1) {
            currentPage++;
            updateCarousel();
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newCardsPerPage = getCardsPerPage();
            if (newCardsPerPage !== cardsPerPage) {
                cardsPerPage = newCardsPerPage;
                totalPages = Math.ceil(cards.length / cardsPerPage);
                updateDots();
                updateCarousel();
            }
        }, 250);
    });

    // Inicialización
    // Ocultar todas las cards inicialmente
    cards.forEach(card => {
        card.style.display = 'none';
        card.style.opacity = '0';
        card.style.visibility = 'hidden';
    });
    
    // Inicializar dots y carrusel
    updateDots();
    updateCarousel();
}); 