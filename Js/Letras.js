const lines = document.querySelectorAll('.line');

// Configuración de la animación
const animationDuration = 11; // Duración en segundos
const animationDelay = 1;     // Retraso en segundos

// Aplicar estilos dinámicamente
lines.forEach((line, index) => {
    line.style.setProperty('--animation-duration', `${animationDuration}s`);
    line.style.setProperty('--animation-delay', `${animationDelay}s`);
    line.style.setProperty('--line-index', index);
});

function adjustFontSize() {
    const container = document.querySelector('.container');
    if (!container) {
        console.error("El contenedor '.container' no se encontró en el DOM.");
        return;
    }
    const maxWidth = container.offsetWidth; // Ancho del contenedor
    const maxHeight = container.offsetHeight; // Alto del contenedor

    // Usamos la variable 'lines' global, sin volver a declararla
    lines.forEach(line => {
        let fontSize = 10; // Tamaño inicial
        line.style.fontSize = `${fontSize}px`;

        // Evitar bucle infinito: establece un límite mínimo
        while ((line.offsetWidth > maxWidth || line.offsetHeight > maxHeight) && fontSize > 5) {
            fontSize--;
            line.style.fontSize = `${fontSize}px`;
        }
    });
}

// Ajusta el tamaño de la fuente al cargar la página y al redimensionar la ventana
window.addEventListener('load', adjustFontSize);
window.addEventListener('resize', adjustFontSize);
