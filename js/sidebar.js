// Referencias a elementos del DOM
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-btn');
const dropdownBtns = document.querySelectorAll('.dropdown-btn');
// Inicializar la app cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initSidebar);

function initSidebar() {
    // Configurar el evento de toggle del sidebar
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            toggleSidebar(sidebar);
        });
    }

    // Configurar los eventos para todos los botones desplegables
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            handleSubmenuToggle(this, sidebar);
        });
    });
}

// Función para abrir/cerrar el sidebar
function toggleSidebar(sidebarElement) {
    if (!sidebarElement) return;
    
    sidebarElement.classList.toggle("close");

    // Cerrar todos los submenús cuando se cierra el sidebar
    if (sidebarElement.classList.contains("close")) {
        closeAllSubmenus();
    }
    else {
        // Abrir automáticamente el primer menú padre al expandir el sidebar
        const firstDropdownBtn = document.querySelector('.dropdown-btn[data-level="1"]');
        if (firstDropdownBtn) {
            const submenu = firstDropdownBtn.nextElementSibling;
            if (submenu && submenu.classList.contains('sub-menu')) {
                submenu.classList.add('show');
                firstDropdownBtn.classList.add('active');
            }
        }
        // Solo cuando se abre el sidebar, resaltar y mostrar menús activos
        highlightActiveMenu();
    }
}

// Función para manejar el clic en un botón de submenú
function handleSubmenuToggle(button, sidebar) {
    // Si el sidebar está cerrado, abrirlo primero
    if (sidebar.classList.contains("close")) {
        sidebar.classList.remove("close");
    }

    // Obtener el submenú asociado al botón
    const submenu = button.nextElementSibling;

    // Si no hay submenú (es un enlace final), simplemente retornar
    if (!submenu || !submenu.classList.contains("sub-menu")) {
        return;
    }

    // Obtener el nivel de profundidad
    const level = button.getAttribute('data-level');

    // Si el submenú se está abriendo, asegurarse de que su contenido tenga altura
    if (!submenu.classList.contains('show')) {
        // Asegurarse de que los elementos dentro del submenú tengan altura suficiente
        const submenuContent = submenu.querySelector('div') || submenu;
        if (submenuContent) {
            submenuContent.style.height = 'auto';
        }
    }

    // Alternar visibilidad del submenú actual
    submenu.classList.toggle("show");
    button.classList.toggle("active");
}

// Función para cerrar todos los submenús
function closeAllSubmenus() {
    const openMenus = document.querySelectorAll(".sub-menu.show");
    const activeButtons = document.querySelectorAll(".dropdown-btn.active");

    openMenus.forEach(menu => menu.classList.remove("show"));
    activeButtons.forEach(btn => btn.classList.remove("active"));
}

function initializeMenu() {
    // Esperar a que el menú dinámico se cargue completamente
    setTimeout(() => {
        // Seleccionar elementos dentro del menú cargado dinámicamente
        const sidebar = document.getElementById("sidebar");
        const toggleBtn = document.getElementById("toggle-btn");
        const dropdownBtns = document.querySelectorAll(".dropdown-btn");

        // Verificar que los elementos existen antes de asignar eventos
        if (!sidebar || !toggleBtn || dropdownBtns.length === 0) {
            console.error("No se encontraron elementos del menú. Verifica el HTML.");
            return;
        }

        // Asignar evento para el botón de toggle del sidebar
        toggleBtn.addEventListener("click", function() {
            toggleSidebar(sidebar);
        });

        // Asignar eventos a los botones de submenú
        dropdownBtns.forEach(btn => {
            btn.addEventListener("click", function() {
                handleSubmenuToggle(this, sidebar);
            });
        });

        console.log("Eventos del menú asignados correctamente.");
    }, 100); // Esperar 100ms para asegurar que el HTML esté cargado
}

// Agregar estilos CSS para el menú activo
const style = document.createElement('style');
style.textContent = `
    .menu-link.active {
        background-color: #0062ff;
        color: white !important;
        font-weight: bold !important;
    }
    .menu-link.active h4 {
        color: white !important;
    }
`;
document.head.appendChild(style);

function highlightActiveMenu() {
    const iframe = document.getElementById("iframe-content");
    if (!iframe) return;

    const currentPath = iframe.src.split("/views/").pop();
    const links = document.querySelectorAll(".menu-link");

    // Remover clase activa de todos los enlaces
    links.forEach(link => link.classList.remove("active"));

    // Encontrar y activar el enlace correspondiente
    links.forEach(link => {
        const onclickAttr = link.getAttribute("onclick");
        if (onclickAttr) {
            const match = onclickAttr.match(/cambiarContenido\('views\/([^']+)'\)/);
            if (match && match[1] === currentPath) {
                // Activar el enlace
                link.classList.add("active");

                // Expandir los menús padres
                let parent = link.closest(".sub-menu");
                while (parent) {
                    parent.classList.add("show");
                    const parentBtn = parent.previousElementSibling;
                    if (parentBtn && parentBtn.classList.contains("dropdown-btn")) {
                        parentBtn.classList.add("active");
                    }
                    parent = parent.parentElement.closest(".sub-menu");
                }

                // Asegurar que el sidebar esté abierto
                const sidebar = document.getElementById("sidebar");
                if (sidebar.classList.contains("close")) {
                    sidebar.classList.remove("close");
                }

                // Hacer scroll al elemento activo
                setTimeout(() => {
                    link.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        }
    });
}

// Llamar a highlightActiveMenu cuando cambie el contenido del iframe
const iframe = document.getElementById("iframe-content");
if (iframe) {
    iframe.addEventListener("load", highlightActiveMenu);
}

// También llamar a highlightActiveMenu cuando se cargue la página
document.addEventListener("DOMContentLoaded", highlightActiveMenu);

// Cargar el menú dinámicamente y volver a asignar los eventos
//document.addEventListener("DOMContentLoaded", function () {
//    fetch("sidebar.html") 
//        .then(response => response.text())
//        .then(data => {
//            document.getElementById("menu-container").innerHTML = data;
//            initializeMenu(); // Reasignar eventos

//            const sidebar = document.getElementById("sidebar");
//            if (sidebar) {
//                sidebar.style.maxHeight = "100vh"; 
//                sidebar.style.overflowY = "auto"; // Reforzar el scroll
//            }
            // initializeLessonProgress();
//            highlightActiveMenu();
            // startVideoAtSecond();
//        })
//        .catch(error => console.error("Error al cargar el menú:", error));        
//});

//manejo de la posicion para el boton volver
document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.querySelector('.back-page-btn');
    const sidebar = document.getElementById('sidebar');
    

    // Escuchar cambios en el estado del sidebar
    sidebar.addEventListener('transitionend', function() {
        backButton.style.left = `calc(${sidebar.offsetWidth}px)`; 
    });


    //const toggleButton = document.querySelector('#sidebar-toggle-button');
    //toggleButton.addEventListener('click', function() {
    //    sidebar.classList.toggle('close'); 
    //    backButton.style.left = `calc(${sidebar.offsetWidth}px)`; 
    //});
});

// Obtén el elemento por su ID específico
const videoPlayer = document.getElementById('videoplayer');
        
// Deshabilita el menú contextual (clic derecho)
// videoPlayer.addEventListener('contextmenu', function(e) {
//    e.preventDefault();
//    return false;
//});

// Opcional: Deshabilitar atajos de teclado como Ctrl+S
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        return false;
    }
});

function cambiarContenido(pagina) {
    const iframe = document.getElementById("iframe-content");
    
    // Verificar si la página existe antes de cargarla
    fetch(pagina)
        .then(response => {
            if (!response.ok) {
                throw new Error('Página no encontrada');
            }
            return response;
        })
        .then(() => {
            iframe.src = pagina;
            // Actualizar el progreso del SCORM
            const paginaRelativa = pagina.replace('views/', '');
            if (window.ScormManager) {
                window.ScormManager.guardarProgreso(paginaRelativa);
            }
        })
        .catch(() => {
            iframe.src = 'views/error404.html';
        });
}