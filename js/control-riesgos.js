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
            title: "Identificación de Riesgos",
            audio: "../assets/audio/riesgos-identificacion.mp3",
            transcript: "La identificación de riesgos es el primer paso crucial en el proceso de gestión de riesgos. Implica reconocer y documentar los peligros potenciales en el lugar de trabajo que podrían causar daño a las personas, equipos o al medio ambiente."
        },
        {
            title: "Evaluación de Riesgos",
            audio: "../assets/audio/riesgos-evaluacion.mp3",
            transcript: "Una vez identificados los riesgos, es necesario evaluar su gravedad y probabilidad. Esta evaluación nos permite priorizar los riesgos y determinar qué medidas de control son necesarias para minimizar o eliminar el riesgo."
        },
        {
            title: "Medidas de Control",
            audio: "../assets/audio/riesgos-control.mp3",
            transcript: "Las medidas de control son las acciones que tomamos para eliminar o reducir los riesgos. Estas pueden incluir controles de ingeniería, controles administrativos y el uso de equipos de protección personal (EPP)."
        },
        {
            title: "Monitoreo y Revisión",
            audio: "../assets/audio/riesgos-monitoreo.mp3",
            transcript: "El monitoreo continuo y la revisión regular de las medidas de control son esenciales para asegurar su efectividad. Este proceso nos permite identificar nuevos riesgos y ajustar las medidas de control según sea necesario."
        },
        {
            title: "Mejora Continua",
            audio: "../assets/audio/riesgos-mejora.mp3",
            transcript: "La gestión de riesgos es un proceso de mejora continua. Debemos aprender de las experiencias pasadas, actualizar nuestros procedimientos y mantener un compromiso constante con la seguridad en el trabajo."
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