document.addEventListener('DOMContentLoaded', function() {
    const timelineEvents = [
        {
            id: 1,
            title: "Seleccionar la tarea a analizar",
            description: "Retirar la barra a esmerilar de la caja alimentadora.",
            image: "../assets/images/ATS/step_1_1.png",
            audio: "../assets/audio/ats/paso1_1.mp3"
        },
        {
            id: 2,
            title: "Seleccionar la tarea a analizar",
            description: "Introducir la barra contra el esmeril para eliminar las rebabas.",
            image: "../assets/images/ATS/step_1_2.png",
            audio: "../assets/audio/ats/paso1_2.mp3"
        },
        {
            id: 3,
            title: "Seleccionar la tarea a analizar",
            description: "Depositar la barra esmerilada en la caja de barras esmeriladas.",
            image: "../assets/images/ATS/step_1_3.png",
            audio: "../assets/audio/ats/paso1_3.mp3"
        },
        {
            id: 4,
            title: "Identificar los posibles exposiciones a pérdidas producto de los peligros existentes",
            description: "Utilizar equipo de protección adecuado para las manos, ojos y pies.",
            image: "../assets/images/ATS/step_2_1.png",
            audio: "../assets/audio/ats/paso2_1.mp3"
        },
        {
            id: 5,
            title: "Identificar los posibles exposiciones a pérdidas producto de los peligros existentes",
            description: "Se utilizará camisa de mangas cortas. Instalar extracción localizada para polvo y guarda sobre el esmeril.",
            image: "../assets/images/ATS/step_2_2.png",
            audio: "../assets/audio/ats/paso2_2.mp3"
        },
        {
            id: 6,
            title: "Identificar los posibles exposiciones a pérdidas producto de los peligros existentes",
            description: "Retirar barras sin rebabas de cajas para evitar acumulación.",
            image: "../assets/images/ATS/step_2_3.png",
            audio: "../assets/audio/ats/paso2_3.mp3"
        },
        {
            id: 7,
            title: "Desarrollar una evaluación de eficiencia",
            description: "Laceraciones en las manos por bordes filosos de caja de metal o de barras de hierro. Contusión en los pies por dejar caer la barra sobre ellos.",
            image: "../assets/images/ATS/step_3_1.png",
            audio: "../assets/audio/ats/paso3_1.mp3"
        },
        {
            id: 8,
            title: "Desarrollar una evaluación de eficiencia",
            description: "Irritación de ojos debido a chispas. Quemaduras por contacto con el esmeril. Rotura del pantalón debido a partes móviles del esmeril. Atrapamiento por no usar guarda.",
            image: "../assets/images/ATS/step_3_2.png",
            audio: "../assets/audio/ats/paso3_2.mp3"
        },
        {
            id: 9,
            title: "Desarrollar una evaluación de eficiencia",
            description: "Laceraciones de manos por bordes filosos de caja de metal o de barras de hierro. Contusión en los pies por dejar caer la barra sobre ellos.",
            image: "../assets/images/ATS/step_3_3.png",
            audio: "../assets/audio/ats/paso3_3.mp3"
        }
    ];

    let currentEventIndex = 0;
    let isPlaying = false;
    let playInterval;

    const timelineContainer = document.querySelector('.timeline-events');
    const progressBar = document.querySelector('.timeline-progress');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const playBtn = document.querySelector('.play-btn');
    const periodImage = document.getElementById('period-image');
    const periodAudio = document.getElementById('period-audio');
    const infoCard = document.querySelector('.info-card');

    // Crear eventos en la línea de tiempo
    timelineEvents.forEach((event, index) => {
        const eventElement = document.createElement('div');
        eventElement.className = 'timeline-event';
        eventElement.setAttribute('data-year', `Paso ${(index % 3) + 1}`);

        eventElement.style.left = `${(index / (timelineEvents.length - 1)) * 100}%`;
        
        eventElement.addEventListener('click', () => {
            currentEventIndex = index;
            updateTimeline();
        });
        
        timelineContainer.appendChild(eventElement);
    });

    function updateTimeline() {
        // Actualizar progreso
        const progress = (currentEventIndex / (timelineEvents.length - 1)) * 100;
        progressBar.style.width = `${progress}%`;

        // Actualizar eventos activos
        const events = document.querySelectorAll('.timeline-event');
        events.forEach((event, index) => {
            event.classList.toggle('active', index === currentEventIndex);
        });

        // Actualizar contenido
        const currentEvent = timelineEvents[currentEventIndex];
        periodImage.src = currentEvent.image;
        periodAudio.src = currentEvent.audio;
        
        // Actualizar información
        infoCard.querySelector('h2').textContent = currentEvent.title;
        infoCard.querySelector('p').textContent = currentEvent.description;

        // Habilitar/deshabilitar botones
        prevBtn.disabled = currentEventIndex === 0;
        nextBtn.disabled = currentEventIndex === timelineEvents.length - 1;
    }

    function playTimeline() {
        if (!isPlaying) {
            isPlaying = true;
            playBtn.textContent = 'Pausar';
            playBtn.classList.add('playing');
            
            playInterval = setInterval(() => {
                if (currentEventIndex < timelineEvents.length - 1) {
                    currentEventIndex++;
                    updateTimeline();
                } else {
                    stopPlayback();
                }
            }, 5000); // Cambiar cada 5 segundos
        } else {
            stopPlayback();
        }
    }

    function stopPlayback() {
        isPlaying = false;
        playBtn.textContent = 'Reproducir';
        playBtn.classList.remove('playing');
        clearInterval(playInterval);
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        if (currentEventIndex > 0) {
            currentEventIndex--;
            updateTimeline();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentEventIndex < timelineEvents.length - 1) {
            currentEventIndex++;
            updateTimeline();
        }
    });

    playBtn.addEventListener('click', playTimeline);

    // Inicializar timeline
    updateTimeline();
}); 