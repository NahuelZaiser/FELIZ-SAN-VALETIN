onload = () => {
  document.body.classList.remove("container");
};

// Selecciona el contenedor de la flor
const flowerContainer = document.querySelector('.flowers');

// Función para reducir el tamaño de la flor
function shrinkFlower() {
  flowerContainer.classList.add('shrink-flower'); // Aplica la clase que reduce el tamaño
}

// Detecta cuando la animación de crecimiento termina
flowerContainer.addEventListener('animationend', (event) => {
  if (event.animationName === 'grow-ans' || event.animationName === 'blooming-flower') {
    // Retrasa la reducción por 5 segundos (5000 milisegundos)
    setTimeout(shrinkFlower, 5000);
  }
});

// Función para pausar todas las animaciones y transiciones (se ejecuta al cargar)
function pauseAnimations() {
  if (document.getElementById("pauseAnimationsStyle")) return;
  const styleEl = document.createElement("style");
  styleEl.id = "pauseAnimationsStyle";
  styleEl.innerHTML = `
    * {
      animation-play-state: paused !important;
      transition: none !important;
    }
  `;
  document.head.appendChild(styleEl);
  console.log("Todas las animaciones han sido pausadas.");
}

// Función para reanudar las animaciones (elimina la regla inyectada)
function resumeAnimations() {
  const styleEl = document.getElementById("pauseAnimationsStyle");
  if (styleEl) {
    styleEl.parentNode.removeChild(styleEl);
    console.log("Las animaciones se han reanudado.");
  }
}

// Función para ajustar el posicionamiento de las flores
function adjustFlowerPosition() {
  const flowerContainer = document.querySelector('.flowers');
  if (flowerContainer) {
    // Mueve el contenedor de flores un poco hacia la izquierda
    flowerContainer.style.position = 'center';
  }
}

// Pausamos las animaciones en cuanto se carga el DOM
document.addEventListener("DOMContentLoaded", function () {
  pauseAnimations();

  // Configuramos el evento del botón "Aceptar" del modal
  const btnAceptar = document.getElementById("aceptar");
  btnAceptar.addEventListener("click", function () {
    // Reanuda las animaciones
    resumeAnimations();

    // Oculta el modal
    document.getElementById("miModal").style.display = "none";

    // Ajusta el posicionamiento de las flores
    adjustFlowerPosition();
  });
});

// Ajustar el posicionamiento de las flores al cargar la página y al redimensionar la ventana
window.addEventListener('load', adjustFlowerPosition);
window.addEventListener('resize', adjustFlowerPosition);