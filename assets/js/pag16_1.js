document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-content');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentSlide = 0;
    const totalSlides = 6; // Total number of slides

    // Clear existing content
    carousel.innerHTML = '';

    // Create all slides dynamically
    for (let i = 1; i <= totalSlides; i++) {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.style.display = 'none';
        const img = document.createElement('img');
        img.src = `../assets/images/condiciones/${i}.png`;
        img.alt = `Imagen ${i}`;
        slide.appendChild(img);
        carousel.appendChild(slide);
    }

    // Get all slides after creation
    const slides = document.querySelectorAll('.carousel-slide');

    // Function to update slide display
    function showSlide(n) {
        // Ensure n is within bounds
        n = ((n % totalSlides) + totalSlides) % totalSlides;

        // Hide all slides
        slides.forEach(slide => slide.style.display = 'none');
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));

        // Show current slide and activate corresponding dot
        slides[n].style.display = 'block';
        dots[n].classList.add('active');
        currentSlide = n;
    }

    // Event listeners for next/prev buttons
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Show initial slide
    showSlide(0);

    // Auto advance slides every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}); 