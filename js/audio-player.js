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
            audio: "../assets/audio/pagina11.wav",
            transcript: "Aplicar procedimientos de seguridad industrial y prácticas preventivas para minimizar los riesgos durante las tareas de mantenimiento del montacargas, de acuerdo con los lineamientos de Anglo American Quellaveco y normativas vigentes"
        }
    ];

    let currentTrack = 0;
    let isPlaying = false;
    let hasPlayedOnce = false;

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
        
        // Reproducir automáticamente solo la primera vez que se carga
        if (!hasPlayedOnce) {
            wavesurfer.play();
            isPlaying = true;
            updatePlayButton();
            hasPlayedOnce = true;
        }
    });

    wavesurfer.on('audioprocess', () => {
        const currentTime = wavesurfer.getCurrentTime();
        const duration = wavesurfer.getDuration();
        timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    });

    wavesurfer.on('finish', () => {
        isPlaying = false;
        updatePlayButton();
    });

    // Error handling
    wavesurfer.on('error', (err) => {
        console.error('Error al cargar el audio:', err);
        alert('Error al cargar el audio. Por favor, intente nuevamente.');
    });

    // Cargar primera pista
    loadTrack(0);
}); 