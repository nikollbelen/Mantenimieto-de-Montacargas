document.addEventListener('DOMContentLoaded', function() {
    // Get the current page name from the URL
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    
    // Create audio element
    const backgroundAudio = new Audio(`../assets/audio/${currentPage}.wav`);
    
    // Set audio properties
    backgroundAudio.volume = 0.5;
    backgroundAudio.loop = false;
    
    // Play audio when page loads
    backgroundAudio.play().catch(error => {
        console.log("Error al reproducir el audio:", error);
    });

    // Add event listener for page visibility change
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            backgroundAudio.pause();
        } else {
            backgroundAudio.play().catch(error => {
                console.log("Error al reanudar el audio:", error);
            });
        }
    });

    // Clean up when leaving the page
    window.addEventListener('beforeunload', function() {
        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;
    });
}); 