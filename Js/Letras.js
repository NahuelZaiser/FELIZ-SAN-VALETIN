const lines = document.querySelectorAll('.line');

// Configuración de la animación
const animationDuration = 11; // Duración de la animación en segundos
const animationDelay = 1; // Retraso entre renglones en segundos

// Aplicar estilos dinámicamente
lines.forEach((line, index) => {
    line.style.setProperty('--animation-duration', `${animationDuration}s`);
    line.style.setProperty('--animation-delay', `${animationDelay}s`);
    line.style.setProperty('--line-index', index);
});

function adjustFontSize() {
    const container = document.querySelector('.container');
    const maxWidth = container.offsetWidth;
    const maxHeight = container.offsetHeight;

    // Si necesitas volver a obtener las líneas, usa otro nombre, por ejemplo, 'localLines'
    const localLines = document.querySelectorAll('.line');
    localLines.forEach(line => {
        let fontSize = 20;
        line.style.fontSize = `${fontSize}px`;
        while ((line.offsetWidth > maxWidth || line.offsetHeight > maxHeight) && fontSize > 5) {
            fontSize--;
            line.style.fontSize = `${fontSize}px`;
        }
    });
}

// Ajusta el tamaño de la fuente al cargar la página y al redimensionar la ventana
window.addEventListener('load', adjustFontSize);
window.addEventListener('resize', adjustFontSize);

