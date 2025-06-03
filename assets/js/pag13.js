document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add fade-in animation for content
    const content = document.querySelector('.content');
    if (content) {
        content.style.opacity = '0';
        content.style.transition = 'opacity 0.5s ease-in-out';
        
        // Trigger animation after a short delay
        setTimeout(() => {
            content.style.opacity = '1';
        }, 100);
    }

    // Optional: Add parallax effect to background image
    const backgroundImage = document.querySelector('.background-image');
    if (backgroundImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            backgroundImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
}); 