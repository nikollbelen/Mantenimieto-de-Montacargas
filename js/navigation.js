document.addEventListener('DOMContentLoaded', function() {
    // Botón para ir a módulos
    const btnModulos = document.getElementById('btnModulos');
    if (btnModulos) {
        btnModulos.addEventListener('click', function() {
            window.location.href = 'views/modules.html';
        });
    }
}); 