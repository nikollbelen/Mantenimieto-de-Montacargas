document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.querySelector('.cards-container');
    const cards = document.querySelectorAll('.card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentPage = 0;
    const cardsPerPage = getCardsPerPage();
    const totalPages = Math.ceil(cards.length / cardsPerPage);
    
    function getCardsPerPage() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1400) return 2;
        return 4;
    }
    
    // Initialize
    updateCarousel();
    
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
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentPage = index;
            updateCarousel();
        });
    });
    
    function updateCarousel() {
        // Show/hide cards based on current page
        cards.forEach((card, index) => {
            const startIdx = currentPage * cardsPerPage;
            const endIdx = startIdx + cardsPerPage;
            
            if (index >= startIdx && index < endIdx) {
                card.style.display = 'flex';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
        
        // Update buttons
        prevBtn.style.opacity = currentPage === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentPage === totalPages - 1 ? '0.5' : '1';
        prevBtn.style.cursor = currentPage === 0 ? 'not-allowed' : 'pointer';
        nextBtn.style.cursor = currentPage === totalPages - 1 ? 'not-allowed' : 'pointer';
    }
    
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
                location.reload();
            }
        }, 250);
    });
}); 