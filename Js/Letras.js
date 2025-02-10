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
    const lines = document.querySelectorAll('.line');
    const maxWidth = container.offsetWidth; // Ancho del contenedor
    const maxHeight = container.offsetHeight; // Alto del contenedor

    lines.forEach(line => {
        let fontSize = 30; // Tamaño inicial de la fuente
        line.style.fontSize = `${fontSize}px`;

        // Reduce el tamaño de la fuente hasta que el texto quepa en el contenedor
        while (line.offsetWidth > maxWidth || line.offsetHeight > maxHeight) {
            fontSize--;
            line.style.fontSize = `${fontSize}px`;
        }
    });
}

// Ajusta el tamaño de la fuente al cargar la página y al redimensionar la ventana
window.addEventListener('load', adjustFontSize);
window.addEventListener('resize', adjustFontSize);

