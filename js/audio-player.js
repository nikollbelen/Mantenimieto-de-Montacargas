document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const volumeSlider = document.getElementById('volume');
    const timeDisplay = document.getElementById('time-display');
    const audioTitle = document.getElementById('audio-title');
    const transcriptDiv = document.getElementById('transcript');

    // Datos de audio
    const audioData = [
        {
            title: "Seguridad en tareas de mantenimiento",
            audio: "../assets/audio/objetivo.wav",
            transcript: "Aplicar procedimientos de seguridad industrial y prácticas preventivas para minimizar los riesgos durante las tareas de mantenimiento del montacargas, de acuerdo con los lineamientos de Anglo American Quellaveco y normativas vigentes"
        },
        {
            title: "Introducción de Doble Efecto (1960)",
            audio: "../assets/audio/actuador-1960.mp3",
            transcript: "La década de 1960 trajo consigo una innovación significativa: los cilindros de doble efecto. Esta tecnología permitió el control preciso del movimiento en ambas direcciones, expandiendo significativamente las aplicaciones en la industria y mejorando la eficiencia de los procesos automatizados."
        },
        {
            title: "Mejoras en Amortiguación (1970)",
            audio: "../assets/audio/actuador-1970.mp3",
            transcript: "Durante los años 70, el foco estuvo en la implementación de sistemas de amortiguación en los extremos de los cilindros. Esta mejora fue crucial para reducir el impacto y aumentar la vida útil de los componentes, resultando en operaciones más suaves y confiables."
        },
        {
            title: "Actuadores Especializados (1980)",
            audio: "../assets/audio/actuador-1980.mp3",
            transcript: "Los años 80 fueron testigos del desarrollo de actuadores altamente especializados. La introducción de variantes como los actuadores de doble vástago y multiposición permitió abordar necesidades específicas de la industria, aumentando la versatilidad de los sistemas neumáticos."
        },
        {
            title: "Integración Electrónica (1990)",
            audio: "../assets/audio/actuador-1990.mp3",
            transcript: "La década de 1990 marcó un punto de inflexión con la incorporación de sensores y controles electrónicos. Esta integración permitió una mayor precisión en el control del movimiento y facilitó el monitoreo en tiempo real del funcionamiento de los actuadores."
        }
    ];

    let currentTrack = 0;
    let isPlaying = false;

    // Inicializar WaveSurfer
    const wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#4a9eff',
        progressColor: '#1976d2',
        cursorColor: '#fff',
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 1,
        height: 100,
        barGap: 3,
        responsive: true,
        normalize: true
    });

    // Cargar audio inicial
    function loadTrack(index) {
        currentTrack = index;
        const event = audioData[index];
        
        // Actualizar título y transcripción
        audioTitle.textContent = event.title;
        transcriptDiv.textContent = event.transcript;
        
        // Detener reproducción actual si existe
        if (wavesurfer.isPlaying()) {
            wavesurfer.stop();
        }
        
        // Cargar y preparar nuevo audio
        wavesurfer.load(event.audio);
        isPlaying = false;
        updatePlayButton();

        // Actualizar estado de los botones de navegación
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === audioData.length - 1;
    }

    // Actualizar botón de reproducción
    function updatePlayButton() {
        const icon = playBtn.querySelector('i');
        icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }

    // Formatear tiempo
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Event Listeners
    playBtn.addEventListener('click', () => {
        wavesurfer.playPause();
        isPlaying = !isPlaying;
        updatePlayButton();
    });

    prevBtn.addEventListener('click', () => {
        if (currentTrack > 0) {
            loadTrack(currentTrack - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentTrack < audioData.length - 1) {
            loadTrack(currentTrack + 1);
        }
    });

    volumeSlider.addEventListener('input', (e) => {
        wavesurfer.setVolume(e.target.value / 100);
    });

    // WaveSurfer events
    wavesurfer.on('ready', () => {
        wavesurfer.setVolume(volumeSlider.value / 100);
        timeDisplay.textContent = `00:00 / ${formatTime(wavesurfer.getDuration())}`;
    });

    wavesurfer.on('audioprocess', () => {
        const currentTime = wavesurfer.getCurrentTime();
        const duration = wavesurfer.getDuration();
        timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    });

    wavesurfer.on('finish', () => {
        isPlaying = false;
        updatePlayButton();
        
        // Reproducir siguiente pista automáticamente si existe
        if (currentTrack < audioData.length - 1) {
            loadTrack(currentTrack + 1);
            setTimeout(() => {
                wavesurfer.play();
                isPlaying = true;
                updatePlayButton();
            }, 1000);
        }
    });

    // Error handling
    wavesurfer.on('error', (err) => {
        console.error('Error al cargar el audio:', err);
        alert('Error al cargar el audio. Por favor, intente nuevamente.');
    });

    // Cargar primera pista
    loadTrack(0);
}); 