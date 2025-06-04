document.addEventListener('DOMContentLoaded', function() {
    // Obtener el nombre del archivo HTML actual
    const currentPage = window.location.pathname.split('/').pop().split('.')[0];
    
    // Crear el elemento de audio
    const audio = new Audio(`../assets/audio/${currentPage}.wav`);
    
    // Configurar el audio
    audio.preload = 'auto';
    
    // Intentar reproducir el audio automáticamente
    audio.play().catch(function(error) {
        console.log("Error reproduciendo el audio:", error);
        // Si falla la reproducción automática, usar el método de interacción del usuario
        document.addEventListener('click', playAudio);
        document.addEventListener('keydown', playAudio);
    });
    
    // Función de respaldo para reproducir el audio si falla la reproducción automática
    function playAudio() {
        audio.play().catch(function(error) {
            console.log("Error reproduciendo el audio:", error);
        });
        // Remover los event listeners después de la primera interacción
        document.removeEventListener('click', playAudio);
        document.removeEventListener('keydown', playAudio);
    }
}); 