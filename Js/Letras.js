let textLines = document.querySelectorAll('.line');

const animationDuration = 11;
const animationDelay = 1;    

textLines.forEach((line, index) => {
    line.style.setProperty('--animation-duration', `${animationDuration}s`);
    line.style.setProperty('--animation-delay', `${animationDelay}s`);
    line.style.setProperty('--line-index', index);
});

function adjustFontSize() {
    const localContainer = document.querySelector('.text-overlay');
    if (!localContainer) {
        console.error("El contenedor '.text-overlay' no se encontró en el DOM.");
        return;
    }
    const maxWidth = localContainer.offsetWidth;
    const maxHeight = localContainer.offsetHeight;

    textLines.forEach(line => {
        let fontSize = 30;
        line.style.fontSize = `${fontSize}px`;
        while ((line.offsetWidth > maxWidth || line.offsetHeight > maxHeight) && fontSize > 5) {
            fontSize--;
            line.style.fontSize = `${fontSize}px`;
        }
    });
}

window.addEventListener('load', adjustFontSize);
window.addEventListener('resize', adjustFontSize);
