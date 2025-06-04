// Todas las páginas en orden secuencial
const pageSequence = [
    'views/modules.html',
    'views/module1.html',
    'views/pagina11.html',
    'views/pagina12.html',
    'views/pagina13.html',
    'views/pagina14.html',
    'views/pagina15.html',
    'views/pagina16.html',
    'views/pagina17.html',
    'views/pagina18.html',
    'views/module2.html',
    'views/pagina21.html',
    'views/pagina22.html',
    'views/pagina23.html',
    'views/pagina24.html',
    'views/pagina25.html',
    'views/pagina26.html',
    'views/pagina27.html',
    'views/pagina28.html',
    'views/pagina29.html',
    'views/pagina210.html',
    'views/pagina211.html',
    'views/pagina212.html',
    'views/pagina213.html',
    'views/pagina214.html',
    'views/pagina215.html',
    'views/pagina216.html',
    'views/pagina217.html',
    'views/pagina218.html',
    'views/module3.html',
    'views/pagina31.html',
    'views/pagina32.html',
    'views/pagina33.html',
    'views/pagina34.html',
    'views/pagina35.html',
    'views/pagina36.html',
    'views/pagina371.html',
    'views/pagina372.html',
    'views/pagina373.html',
    'views/pagina374.html',
    'views/pagina375.html',
    'views/pagina376.html',
    'views/pagina377.html',
    'views/pagina378.html',
    'views/pagina381.html',
    'views/pagina382.html',
    'views/pagina383.html',
    'views/pagina384.html',
    'views/pagina385.html',
    'views/pagina386.html',
    'views/pagina387.html',
    'views/pagina388.html',
    'views/pagina389.html',
    'views/pagina391.html',
    'views/pagina392.html',
    'views/pagina393.html',
    'views/pagina394.html',
    'views/pagina395.html',
    'views/pagina396.html',
    'views/pagina397.html',
    'views/pagina398.html',
    'views/pagina399.html',
    'views/pagina3101.html',
    'views/pagina3102.html',
    'views/pagina3103.html',
    'views/pagina3104.html',
    'views/pagina3105.html',
    'views/pagina3106.html',
    'views/pagina3107.html',
    'views/pagina3108.html',
    'views/pagina3109.html',
    'views/pagina3111.html',
    'views/pagina3112.html',
    'views/module4.html',
    'views/pagina41.html',
    'views/pagina42.html',
    'views/pagina43.html',
    'views/pagina44.html',
    'views/pagina45.html',
    'views/pagina46.html',
    'views/pagina47.html',
    'views/pagina481.html',
    'views/pagina482.html',
    'views/pagina483.html',
    'views/pagina484.html',
    'views/pagina485.html',
    'views/pagina486.html',
    'views/pagina487.html',
    'views/pagina49.html',
    'views/pagina410.html'
];

let currentPageInfo1 = {
    currentPage: null,
    nextPage: null,
    prevPage: null
};
let urlObjeto = null;
let pathname = null;
let currentIndex = null;
let currentPage = null;

function nextPage() {
    urlObjeto = new URL(iframe.src);
    pathname = urlObjeto.pathname;
    currentIndex = null;
    if (pathname.startsWith('/')) {
        pathname = pathname.substring(1);
    }
    if (pathname == "views/error404.html") {
        currentIndex = pageSequence.indexOf(currentPage);
        currentPageInfo1 = {
            currentPage: currentPage,
            nextPage: pageSequence[currentIndex + 1],
            prevPage: pageSequence[currentIndex - 1]
        };
    } else {
        currentIndex = pageSequence.indexOf(pathname);
        currentPageInfo1 = {
            currentPage: pathname,
            nextPage: pageSequence[currentIndex + 1],
            prevPage: pageSequence[currentIndex - 1]
        };
    }
    currentPage = currentPageInfo1.nextPage;
    cambiarContenido(currentPageInfo1.nextPage);
}

function beforePage() {
    urlObjeto = new URL(iframe.src);
    pathname = urlObjeto.pathname;
    currentIndex = null;
    if (pathname.startsWith('/')) {
        pathname = pathname.substring(1);
    }
    if (pathname == "views/error404.html") {
        currentIndex = pageSequence.indexOf(currentPage);
        currentPageInfo1 = {
            currentPage: currentPage,
            nextPage: pageSequence[currentIndex + 1],
            prevPage: pageSequence[currentIndex - 1]
        };
        currentPage = currentPageInfo1.prevPage;
        cambiarContenido(currentPageInfo1.prevPage);
    } else if (pathname == "views/modules.html") {
        window.location.href = "index.html";
    } else {
        currentIndex = pageSequence.indexOf(pathname);
        currentPageInfo1 = {
            currentPage: pathname,
            nextPage: pageSequence[currentIndex + 1],
            prevPage: pageSequence[currentIndex - 1]
        };
        currentPage = currentPageInfo1.prevPage;
        cambiarContenido(currentPageInfo1.prevPage);
    }
}

function cambiarContenido(pagina) {
    // Verificar si la página existe
    fetch(pagina)
        .then(response => {
            if (!response.ok) {
                throw new Error('Página no encontrada');
            }
            // Si la página existe, actualizar el iframe y el currentPageInfo
            iframe.src = pagina;

            // Actualizar el progreso del SCORM si está disponible
            if (typeof ScormManager !== 'undefined') {
                const paginaRelativa = pagina.replace('views/', '');
                ScormManager.guardarProgreso(paginaRelativa);
            }

            // Llamar a highlightActiveMenu después de cambiar la página
            setTimeout(() => {
                if (typeof highlightActiveMenu === 'function') {
                    highlightActiveMenu();
                }
            }, 100);
        })
        .catch(() => {
            // Si la página no existe, mostrar la página de error 404
            iframe.src = 'views/error404.html';
        });
}

// Inicializar SCORM y actualizar la barra de progreso
document.addEventListener('DOMContentLoaded', function () {
    // Inicializar SCORM si está disponible
    if (typeof ScormManager !== 'undefined') {
        ScormManager.init();

        // Cargar el progreso guardado
        const progreso = ScormManager.cargarProgreso();
        if (progreso && progreso.ultimaPagina) {
            cambiarContenido('views/' + progreso.ultimaPagina);
        }

        // Actualizar barra de progreso
        const porcentaje = progreso && progreso.score ? parseInt(progreso.score) : 0;
        const barra = document.getElementById("progreso-barra");
        const texto = document.getElementById("progreso-texto");

        if (barra && texto) {
            barra.style.width = porcentaje + "%";
            texto.textContent = porcentaje + "%";
        }
    }
});

// Event listeners para botones de navegación
document.addEventListener('DOMContentLoaded', function () {
    const btnModulos = document.getElementById('btnModulos');
    const btnTimeline = document.getElementById('btnTimeline');
    const btnAudioPlayer = document.getElementById('btnAudioPlayer');
    const btnSeguridad = document.getElementById('btnSeguridad');
    const btnControlRiesgos = document.getElementById('btnControlRiesgos');
    const btnCondiciones = document.getElementById('btnCondiciones');
    const btnPagina17 = document.getElementById('btnPagina17');

    if (btnModulos) {
        btnModulos.addEventListener('click', function () {
            window.location.href = 'sidebar.html';
        });
    }
}); 