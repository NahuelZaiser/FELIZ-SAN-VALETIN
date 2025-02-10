// Elemento contenedor compartido
const container = document.getElementById('container');

/* ============================================================
   IMPLEMENTACIÓN "FIREWORK2" (FUEGO ARTIFICIAL CLÁSICO)
   ============================================================ */
   
class Firework {
  constructor(x, targetY) {
    this.x = x;
    this.targetY = targetY;
    this.reset();
  }

  reset() {

    const minHeight = window.innerHeight * 0.6;
    const maxHeight = window.innerHeight * 0.2;
    this.targetY = Math.random() * (maxHeight - minHeight) + minHeight;

    this.y = window.innerHeight;
    this.speed = -10;
    this.particles = [];
    this.exploded = false;

    this.rocket = document.createElement('div');
    this.rocket.className = 'rocket';
    container.appendChild(this.rocket);

    this.trailParticles = [];
    this.color = this.getRandomColor();

    this.rocket.style.background = this.color;
    this.rocket.style.boxShadow = `0 0 10px ${this.color}`;
  }

  update() {
    if (!this.exploded && this.y > this.targetY) {
      this.y += this.speed;
      this.rocket.style.transform = `translate(${this.x}px, ${this.y}px)`;

      // Usamos la versión de TrailParticle para Firework
      this.trailParticles.push(new FireworkTrailParticle(this.x, this.y, this.color));
      this.trailParticles = this.trailParticles.filter(particle => particle.update());

      return true;
    } else if (!this.exploded) {
      this.explode();
      this.rocket.remove();
      this.clearTrail();
      this.exploded = true;
      return true;
    }

    return this.updateParticles();
  }

  explode() {
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const speed = Math.random() * 4 + 4;
      this.particles.push(new Particle(this.x, this.y, this.color, angle, speed));
    }
  }

  updateParticles() {
    this.particles = this.particles.filter(particle => particle.update());
    return this.particles.length > 0;
  }

  clearTrail() {
    this.trailParticles.forEach(particle => particle.remove());
    this.trailParticles = [];
  }

  getRandomColor() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff66b2'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

// Renombramos la TrailParticle de la primera implementación para evitar conflictos
class FireworkTrailParticle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 1;
    this.opacity = 1;
    this.color = color;

    this.element = document.createElement('div');
    this.element.className = 'spark';
    container.appendChild(this.element);

    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;
    this.element.style.background = this.color;
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }

  update() {
    this.opacity -= 0.05;
    this.element.style.opacity = this.opacity;

    if (this.opacity <= 0) {
      this.remove();
      return false;
    }
    return true;
  }

  remove() {
    this.element.remove();
  }
}

class Particle {
  constructor(x, y, color, angle, speed) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.angle = angle;
    this.speed = speed;
    this.gravity = 0.05;
    this.life = 100;
    this.maxLife = 100;
    this.element = document.createElement('div');
    this.element.className = 'particle';
    this.updateColor();
    container.appendChild(this.element);

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
  }

  updateColor() {
    this.element.style.background = this.color;
    this.element.style.boxShadow = `0 0 10px ${this.color}`;
  }

  update() {
    if (this.life <= 0) {
      this.element.remove();
      return false;
    }

    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    this.element.style.opacity = this.life / this.maxLife;

    this.life -= 1;
    return true;
  }
}

function createStars() {
  const starCount = 100;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * window.innerHeight + 'px';
    container.appendChild(star);
  }
}

function launchFireworks() {
  const fireworkCount = Math.floor(Math.random() * 3) + 5; // Lanzar entre 4 y 5 cohetes
  let fireworks = [];
  for (let i = 0; i < fireworkCount; i++) {
    const xPosition = Math.random() * (window.innerWidth * 0.9 - window.innerWidth * 0.1) + window.innerWidth * 0.1;
    const explosionHeight = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7];
    const randomHeight = explosionHeight[Math.floor(Math.random() * explosionHeight.length)] * window.innerHeight;
    fireworks.push(new Firework(xPosition, randomHeight));
  }

  function animate() {
    let activeFireworks = fireworks.filter(fw => fw.update());
    if (activeFireworks.length > 0) {
      requestAnimationFrame(animate);
    } else {
      setTimeout(launchFireworks, Math.random() * 1000 + 500);
    }
  }
  // Lanzar la animación con un pequeño retardo
  setTimeout(() => {
    animate();
  }, Math.random() * 300 + 200);
}

container.addEventListener('click', () => {
  launchFireworks();
});


/* ============================================================
   IMPLEMENTACIÓN "ROCKET HEART" (FUEGO ARTIFICIAL CON FORMA DE CORAZÓN)
   ============================================================ */

class Rocket {
  constructor(x, y, targetX, targetY) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.speed = 5;
    this.size = 4;
    this.color = 'rgba(255, 0, 0, 0.9)'; // Color rojo
    this.trailParticles = [];

    // Crear elemento visual
    this.element = document.createElement('div');
    this.element.className = 'rocket';
    container.appendChild(this.element);

    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;
    this.element.style.background = this.color;
    this.element.style.boxShadow = `0 0 6px 2px rgba(255, 0, 0, 0.6)`;
  }
  
  update() {
    // Mover el cohete hacia el objetivo
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > this.speed) {
      this.x += (dx / distance) * this.speed;
      this.y += (dy / distance) * this.speed;
    } else {
      this.x = this.targetX;
      this.y = this.targetY;
    }

    // Actualizar posición
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;

    // Crear partículas de la cola con la TrailParticle propia para Rocket
    this.trailParticles.push(new RocketTrailParticle(this.x, this.y));
    this.trailParticles = this.trailParticles.filter(particle => particle.update());

    // Retornar true si el cohete ha llegado al objetivo
    return distance <= this.speed;
  }
  
  remove() {
    this.element.remove();
    this.trailParticles.forEach(particle => particle.remove());
  }
}

// Renombramos la TrailParticle de la segunda implementación
class RocketTrailParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 2 + 1;
    this.opacity = 1;
    this.color = 'rgba(255, 100, 100, 0.9)'; // Color rojo claro

    this.element = document.createElement('div');
    this.element.className = 'spark';
    container.appendChild(this.element);

    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;
    this.element.style.background = this.color;
    this.element.style.boxShadow = `0 0 4px 1px rgba(255, 100, 100, 0.6)`;
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }

  update() {
    this.opacity -= 0.05; // Desvanecimiento rápido
    this.element.style.opacity = this.opacity;

    if (this.opacity <= 0) {
      this.remove();
      return false;
    }
    return true;
  }

  remove() {
    this.element.remove();
  }
}

class HeartParticle {
  constructor(x, y, finalX, finalY) {
    this.x = x;
    this.y = y;
    this.finalX = finalX;
    this.finalY = finalY;
    this.initialX = x;
    this.initialY = y;

    this.size = 2 + Math.random() * 3;
    this.sparkleRate = Math.random() * 0.1 + 0.05;
    this.lastSparkle = Date.now();
    this.expandProgress = 0;
    this.fadeProgress = 1; // Controla el desvanecimiento
    this.color = {
      r: 255,
      g: Math.floor(Math.random() * 50) + 20,
      b: Math.floor(Math.random() * 50) + 20
    };

    this.element = document.createElement('div');
    this.element.className = 'particle';
    container.appendChild(this.element);

    this.element.style.width = `${this.size}px`;
    this.element.style.height = `${this.size}px`;
    this.updateColor();
  }

  updateColor() {
    const intensity = 0.7 + Math.random() * 0.3;
    const r = Math.floor(this.color.r * intensity);
    const g = Math.floor(this.color.g * intensity);
    const b = Math.floor(this.color.b * intensity);
    const blur = Math.random() * 2 + 4;
    this.element.style.background = `rgb(${r}, ${g}, ${b})`;
    this.element.style.boxShadow = `0 0 ${blur}px ${blur / 2}px rgb(${r}, ${g}, ${b})`;
    this.element.style.opacity = this.fadeProgress; // Aplicar desvanecimiento
  }

  update(expansionSpeed) {
    // Expansión infinita: no hay límite para expandProgress
    this.expandProgress += expansionSpeed;

    // Efecto de parpadeo
    if (Date.now() - this.lastSparkle > 1000 * this.sparkleRate) {
      this.updateColor();
      this.lastSparkle = Date.now();
    }

    // Calcular posición actual sin rebote
    const ease = this.expandProgress; // Progreso lineal
    const dx = this.finalX - this.initialX;
    const dy = this.finalY - this.initialY;

    // Mover la partícula hacia su posición final
    this.x = this.initialX + dx * ease;
    this.y = this.initialY + dy * ease;

    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;

    // Desvanecer partícula lentamente
    this.fadeProgress -= 0.007;
    if (this.fadeProgress <= 0) {
      this.remove();
      return false;
    }

    return true;
  }

  remove() {
    this.element.remove();
  }
}

class HeartFirework {
  constructor(startX) {
    this.particles = [];
    this.rocket = null;
    this.isExploded = false;
    this.startX = startX;
    this.createRocket();
  }

  createRocket() {
    const startY = window.innerHeight;
    const targetX = this.startX;
    const targetY = window.innerHeight / 5;
    this.rocket = new Rocket(this.startX, startY, targetX, targetY);
  }

  explode() {
    this.createHeartParticles();
    this.rocket.remove();
    this.isExploded = true;
  }

  createHeartParticles() {
    const centerX = this.startX;
    const centerY = window.innerHeight / 5;
    const scale = Math.min(window.innerWidth, window.innerHeight) * 0.2;

    // Crear partículas para el contorno del corazón
    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * Math.PI * 2;
      const [heartX, heartY] = this.getHeartPosition(angle);
      const finalX = centerX + heartX * scale;
      const finalY = centerY + heartY * scale;
      this.particles.push(new HeartParticle(centerX, centerY, finalX, finalY));
    }
    // Partículas de relleno
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radiusScale = Math.random() * 0.8 + 0.2;
      const [heartX, heartY] = this.getHeartPosition(angle);
      const finalX = centerX + heartX * scale * radiusScale;
      const finalY = centerY + heartY * scale * radiusScale;
      this.particles.push(new HeartParticle(centerX, centerY, finalX, finalY));
    }
  }

  getHeartPosition(angle) {
    // Ecuación paramétrica del corazón
    const t = angle;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return [x / 16, y / 16];
  }

  update() {
    if (!this.isExploded) {
      const hasReachedTarget = this.rocket.update();
      if (hasReachedTarget) {
        this.explode();
      }
    } else {
      this.particles = this.particles.filter(particle => particle.update(0.1));
      if (this.particles.length === 0) {
        this.reset();
      }
    }
  }

  reset() {
    this.particles.forEach(particle => particle.remove());
    this.particles = [];
    this.isExploded = false;
    this.createRocket();
  }
}

let currentSide = 'left'; // Alterna entre 'left' y 'right'
let isAnimating = false;

function launchFireworkSequence() {
  if (isAnimating) return;
  
  isAnimating = true;
  const screenWidth = window.innerWidth;
  const startX = currentSide === 'left' ? screenWidth * 0.2 : screenWidth * 0.8;
  const firework = new HeartFirework(startX);

  function animate() {
    if (!firework.isExploded) {
      const hasReachedTarget = firework.rocket.update();
      if (hasReachedTarget) {
        firework.explode();
      }
      requestAnimationFrame(animate);
    } else {
      const particlesActive = firework.particles.some(p => p.fadeProgress > 0);
      if (particlesActive) {
        firework.particles = firework.particles.filter(p => p.update(0.01));
        requestAnimationFrame(animate);
      } else {
        isAnimating = false;
        currentSide = currentSide === 'left' ? 'right' : 'left';
        setTimeout(launchFireworkSequence, 1000);
      }
    }
  }
  
  animate();
}

/* ============================================================
   INICIALIZACIÓN UNIFICADA (SE INICIA AL CARGAR LA PÁGINA)
   ============================================================ */

// Se espera 10 segundos (puedes ajustar este retardo) y luego se inician:
// - Las estrellas de fondo
// - La secuencia de fuegos artificiales clásicos (Firework2)
// - La secuencia de "rocket heart"
window.addEventListener('load', () => {
  // Inicia Rocket Heart después de 3 segundos
  setTimeout(() => {
    container.classList.remove('paused');
    launchFireworkSequence();
  }, 9000);

  // Inicia las otras secuencias (por ejemplo, estrellas y fuegos clásicos) después de 10 segundos
  setTimeout(() => {
    createStars();
    launchFireworks();
  }, 10000);
});
