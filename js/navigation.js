document.addEventListener('DOMContentLoaded', function() {
    // Botón para ir a módulos
    const btnModulos = document.getElementById('btnModulos');
    const btnTimeline = document.getElementById('btnTimeline');
    const btnAudioPlayer = document.getElementById('btnAudioPlayer');
    const btnSeguridad = document.getElementById('btnSeguridad');
    const btnControlRiesgos = document.getElementById('btnControlRiesgos');
    const btnCondiciones = document.getElementById('btnCondiciones');
    const btnPagina17 = document.getElementById('btnPagina17');
    
    if (btnModulos) {
        btnModulos.addEventListener('click', function() {
            window.location.href = 'views/modules.html';
        });
    }
    
    if (btnTimeline) {
        btnTimeline.addEventListener('click', function() {
            window.location.href = 'views/timeline.html';
        });
    }

    if (btnAudioPlayer) {
        btnAudioPlayer.addEventListener('click', function() {
            window.location.href = 'views/audio-player.html';
        });
    }

    if (btnSeguridad) {
        btnSeguridad.addEventListener('click', function() {
            window.location.href = 'views/seguridad.html';
        });
    }

    if (btnControlRiesgos) {
        btnControlRiesgos.addEventListener('click', function() {
            window.location.href = 'views/control-riesgos.html';
        });
    }

    if (btnCondiciones) {
        btnCondiciones.addEventListener('click', function() {
            window.location.href = 'views/condiciones.html';
        });
    }

    if (btnPagina17) {
        btnPagina17.addEventListener('click', function() {
            window.location.href = 'views/pagina17.html';
        });
    }
}); 