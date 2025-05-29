document.addEventListener('DOMContentLoaded', function() {
    // Crear el elemento de audio
    const backgroundAudio = new Audio('../assets/audio/audio2.mp3');
    backgroundAudio.play().catch(error => {
        console.log("Error al reproducir el audio:", error);
    });

    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        card.addEventListener('click', function() {
            // Detener el audio cuando se hace clic en cualquier módulo
            backgroundAudio.pause();
            backgroundAudio.currentTime = 0;

            // Navegar al módulo correspondiente
            const moduleNumber = this.getAttribute('data-module');
            window.location.href = `module${moduleNumber}.html`;
        });
    });
}); 