document.addEventListener('DOMContentLoaded', function() {
    const periodImage = document.querySelector('#period-image');
    const periodAudio = document.querySelector('#period-audio');
    const timelineEvents = document.querySelector('.timeline-events');
    const timelineProgress = document.querySelector('.timeline-progress');
    const infoCard = document.querySelector('.info-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const playBtn = document.querySelector('.play-btn');

    // Datos de la línea de tiempo
    const timelineData = [
        {
            year: '1950',
            title: 'Primeros Actuadores Neumáticos',
            description: 'Los primeros actuadores neumáticos industriales comenzaron a utilizarse en la automatización de procesos simples. Eran dispositivos básicos que convertían la energía del aire comprimido en movimiento lineal.',
            image: '../assets/images/actuador-1950.png',
            audio: '../assets/audio/actuador-1950.mp3',
            progress: 0
        },
        {
            year: '1960',
            title: 'Introducción de Doble Efecto',
            description: 'Se desarrollan los cilindros de doble efecto, permitiendo el control del movimiento en ambas direcciones. Esto amplió significativamente las aplicaciones en la industria.',
            image: '../assets/images/actuador-1960.png',
            audio: '../assets/audio/actuador-1960.mp3',
            progress: 25
        },
        {
            year: '1970',
            title: 'Mejoras en Amortiguación',
            description: 'Se implementan sistemas de amortiguación en los extremos de los cilindros, reduciendo el impacto y aumentando la vida útil de los componentes.',
            image: '../assets/images/actuador-1970.png',
            audio: '../assets/audio/actuador-1970.mp3',
            progress: 50
        },
        {
            year: '1980',
            title: 'Actuadores Especializados',
            description: 'Desarrollo de actuadores especializados como los de doble vástago y multiposición, adaptados a necesidades específicas de la industria.',
            image: '../assets/images/actuador-1980.png',
            audio: '../assets/audio/actuador-1980.mp3',
            progress: 75
        },
        {
            year: '1990',
            title: 'Integración Electrónica',
            description: 'Incorporación de sensores y controles electrónicos, permitiendo una mayor precisión y monitoreo del movimiento.',
            image: '../assets/images/actuador-1990.png',
            audio: '../assets/audio/actuador-1990.mp3',
            progress: 100
        }
    ];

    let currentEventIndex = 0;
    let isPlaying = false;
    let playInterval;

    // Crear eventos en la línea de tiempo
    function createTimelineEvents() {
        timelineData.forEach((event, index) => {
            const eventElement = document.createElement('div');
            eventElement.className = 'timeline-event';
            eventElement.setAttribute('data-year', event.year);
            eventElement.style.left = `${event.progress}%`;
            eventElement.addEventListener('click', () => updateEvent(index));
            timelineEvents.appendChild(eventElement);
        });
    }

    // Actualizar la información, imagen y audio
    function updateEvent(index) {
        currentEventIndex = index;
        const event = timelineData[index];

        // Detener el audio actual si está reproduciéndose
        periodAudio.pause();
        periodAudio.currentTime = 0;

        // Actualizar eventos activos
        document.querySelectorAll('.timeline-event').forEach((el, i) => {
            el.classList.toggle('active', i === index);
        });

        // Actualizar barra de progreso
        timelineProgress.style.width = `${event.progress}%`;

        // Actualizar información
        infoCard.innerHTML = `
            <h2>${event.title}</h2>
            <p>${event.description}</p>
            <div class="audio-section">
                <audio id="period-audio" controls>
                    <source src="${event.audio}" type="audio/mpeg">
                    Tu navegador no soporta el elemento de audio.
                </audio>
            </div>
        `;

        // Actualizar referencia al nuevo elemento de audio
        periodAudio = document.querySelector('#period-audio');

        // Actualizar imagen con efecto de fade
        periodImage.style.opacity = '0';
        setTimeout(() => {
            periodImage.src = event.image;
            periodImage.style.opacity = '1';
        }, 300);
    }

    // Controles de navegación
    prevBtn.addEventListener('click', () => {
        if (currentEventIndex > 0) {
            updateEvent(currentEventIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentEventIndex < timelineData.length - 1) {
            updateEvent(currentEventIndex + 1);
        }
    });

    // Control de reproducción automática
    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playBtn.classList.toggle('playing');
        playBtn.textContent = isPlaying ? 'Pausar' : 'Reproducir';

        if (isPlaying) {
            playInterval = setInterval(() => {
                if (currentEventIndex < timelineData.length - 1) {
                    updateEvent(currentEventIndex + 1);
                } else {
                    updateEvent(0);
                }
            }, 3000);
        } else {
            clearInterval(playInterval);
        }
    });

    // Inicialización
    createTimelineEvents();
    updateEvent(0);

    // Agregar transición suave a la imagen
    periodImage.style.transition = 'opacity var(--transition-normal)';
}); 