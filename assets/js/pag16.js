document.addEventListener('DOMContentLoaded', async () => {
    // Variables globales
    let currentSectionIndex = 0;
    let currentImageIndex = 0;
    let contentData = null;
    
    // Elementos del DOM
    const sectionTitle = document.getElementById('sectionTitle');
    const conditionsList = document.getElementById('conditionsList');
    const carouselContent = document.getElementById('carouselContent');
    const carouselDots = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const nextSectionBtn = document.getElementById('nextSectionBtn');

    // Cargar datos del JSON
    try {
        const response = await fetch('../assets/data/pagina16_content.json');
        contentData = await response.json();
        updateContent();
        updateCarousel();
    } catch (error) {
        console.error('Error cargando el contenido:', error);
    }

    // Función para actualizar el contenido de la sección
    function updateContent() {
        const currentSection = contentData.sections[currentSectionIndex];
        
        // Actualizar título
        sectionTitle.textContent = currentSection.title;
        
        // Actualizar lista de condiciones
        conditionsList.innerHTML = currentSection.conditions
            .map(condition => `<li>${condition}</li>`)
            .join('');
        
        // Actualizar carrusel
        currentImageIndex = 0;
        updateCarousel();
    }

    // Función para actualizar el carrusel
    function updateCarousel() {
        const currentSection = contentData.sections[currentSectionIndex];
        
        // Actualizar imagen
        carouselContent.innerHTML = `
            <div class="carousel-slide">
                <img src="${currentSection.images[currentImageIndex]}" alt="Imagen ${currentImageIndex + 1}">
            </div>
        `;
        
        // Actualizar dots
        carouselDots.innerHTML = currentSection.images
            .map((_, index) => `
                <span class="dot ${index === currentImageIndex ? 'active' : ''}"></span>
            `)
            .join('');
        
        // Agregar eventos a los dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentImageIndex = index;
                updateCarousel();
            });
        });
    }

    // Evento para el botón de siguiente sección
    nextSectionBtn.addEventListener('click', () => {
        currentSectionIndex = (currentSectionIndex + 1) % contentData.sections.length;
        updateContent();
    });

    // Eventos para los botones del carrusel
    prevBtn.addEventListener('click', () => {
        const currentSection = contentData.sections[currentSectionIndex];
        currentImageIndex = (currentImageIndex - 1 + currentSection.images.length) % currentSection.images.length;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        const currentSection = contentData.sections[currentSectionIndex];
        currentImageIndex = (currentImageIndex + 1) % currentSection.images.length;
        updateCarousel();
    });
}); 