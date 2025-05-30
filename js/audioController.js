// Función para inicializar y reproducir el audio de fondo
function initBackgroundAudio() {
    // Intentar reproducir inmediatamente cuando el documento esté listo
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            const audio = document.getElementById('bgAudio');
            // Establecer el volumen (valor entre 0.0 y 1.0)
            audio.volume = 0.5; // 50% del volumen máximo
            
            // Configurar el audio para reproducción automática
            audio.muted = false;
            audio.autoplay = true;
            
            // Forzar la reproducción
            const playAttempt = setInterval(() => {
                audio.play()
                    .then(() => {
                        console.log("Audio reproduciendo correctamente");
                        clearInterval(playAttempt);
                    })
                    .catch(error => {
                        console.log("Reintentando reproducción automática...");
                    });
            }, 200);

            // Limpiar el intervalo después de 3 segundos si no se logró reproducir
            setTimeout(() => {
                clearInterval(playAttempt);
            }, 3000);
        }, 1000);
    });
}

// Inicializar el audio cuando se carga el script
initBackgroundAudio(); 