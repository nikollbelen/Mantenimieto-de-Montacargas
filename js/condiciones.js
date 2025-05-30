document.addEventListener('DOMContentLoaded', function() {
    const audioData = [
        {
            title: "Condiciones de Trabajo - Introducción",
            audio: "../assets/audio/condiciones/intro.mp3",
            transcript: "Bienvenido al módulo de Condiciones de Trabajo. En esta sección, aprenderemos sobre los aspectos fundamentales que debemos considerar para mantener un ambiente de trabajo seguro y eficiente."
        },
        {
            title: "Condiciones Básicas de Seguridad",
            audio: "../assets/audio/condiciones/seguridad.mp3",
            transcript: "Las condiciones básicas de seguridad son esenciales para prevenir accidentes y mantener un entorno de trabajo saludable."
        },
        {
            title: "Mantenimiento y Verificación",
            audio: "../assets/audio/condiciones/mantenimiento.mp3",
            transcript: "El mantenimiento regular y la verificación de las condiciones de trabajo son fundamentales para garantizar la seguridad continua."
        }
    ];

    let currentTrack = 0;
    let wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#4a9eff',
        progressColor: '#1e88e5',
        cursorColor: '#1e88e5',
        barWidth: 3,
        barRadius: 3,
        cursorWidth: 1,
        height: 100,
        barGap: 3
    });

    // Controles
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const volumeControl = document.getElementById('volume');
    const timeDisplay = document.getElementById('time-display');
    const audioTitle = document.getElementById('audio-title');
    const transcriptDiv = document.getElementById('transcript');

    function loadTrack(index) {
        const track = audioData[index];
        wavesurfer.load(track.audio);
        audioTitle.textContent = track.title;
        transcriptDiv.textContent = track.transcript;
        currentTrack = index;
    }

    function updatePlayButton() {
        const icon = playBtn.querySelector('i');
        if (wavesurfer.isPlaying()) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        } else {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    }

    function formatTime(seconds) {
        seconds = Math.floor(seconds);
        const minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Event Listeners
    playBtn.addEventListener('click', () => {
        wavesurfer.playPause();
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

    volumeControl.addEventListener('input', (e) => {
        wavesurfer.setVolume(e.target.value / 100);
    });

    wavesurfer.on('play', updatePlayButton);
    wavesurfer.on('pause', updatePlayButton);

    wavesurfer.on('audioprocess', () => {
        timeDisplay.textContent = `${formatTime(wavesurfer.getCurrentTime())} / ${formatTime(wavesurfer.getDuration())}`;
    });

    wavesurfer.on('ready', () => {
        timeDisplay.textContent = `00:00 / ${formatTime(wavesurfer.getDuration())}`;
        wavesurfer.setVolume(volumeControl.value / 100);
    });

    wavesurfer.on('finish', () => {
        if (currentTrack < audioData.length - 1) {
            loadTrack(currentTrack + 1);
            wavesurfer.play();
        }
    });

    // Cargar la primera pista
    loadTrack(0);
}); 