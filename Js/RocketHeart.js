class Rocket {
  constructor(x, y, targetX, targetY) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.speed = 2;
    this.size = 4;
    this.color = 'rgba(255, 0, 0, 0.9)'; // Color rojo
    this.trailParticles = []; // Partículas de la cola

    // Crear elemento visual
    this.element = document.createElement('div');
    this.element.className = 'rocket';
    container.appendChild(this.element);

    // Establecer tamaño y color inicial
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
  
      // Crear partículas de la cola
      this.trailParticles.push(new TrailParticle(this.x, this.y));
      this.trailParticles = this.trailParticles.filter(particle => particle.update());
  
      // Retornar true si el cohete ha llegado al objetivo
      return distance <= this.speed;
    }
  
    remove() {
      this.element.remove();
      this.trailParticles.forEach(particle => particle.remove());
    }
  }
  
  class TrailParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 2 + 1;
      this.opacity = 1;
      this.color = 'rgba(255, 100, 100, 0.9)'; // Color rojo claro
  
      // Crear elemento visual
      this.element = document.createElement('div');
      this.element.className = 'spark';
      container.appendChild(this.element);
  
      // Establecer tamaño y color inicial
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

      
  
      // Características de la partícula
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
  
      // Crear elemento visual
      this.element = document.createElement('div');
      this.element.className = 'particle';
      container.appendChild(this.element);
  
      // Establecer tamaño inicial
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
      const ease = this.expandProgress; // Usar progreso lineal
      const dx = this.finalX - this.initialX;
      const dy = this.finalY - this.initialY;
  
      // Mover la partícula en la dirección de su posición final
      this.x = this.initialX + dx * ease;
      this.y = this.initialY + dy * ease;
  
      // Actualizar posición
      this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  
      // Desvanecer partícula
      this.fadeProgress -= 0.007; // Desvanecimiento lento
      if (this.fadeProgress <= 0) {
        this.remove();
        return false; // Indicar que la partícula debe ser eliminada
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
      this.startX = startX; // ✔️ Asignar a propiedad
      this.createRocket();
    }
  
    createRocket() {
      const startY = window.innerHeight; // Parte inferior
      const targetX = this.startX; // Misma X (movimiento vertical)
      const targetY = window.innerHeight / 2; // Mitad de la altura
      this.rocket = new Rocket(this.startX, startY, targetX, targetY);
    }
  
    explode() {
      this.createHeartParticles();
      this.rocket.remove();
      this.isExploded = true;
    }
  
    createHeartParticles() {
      const centerX = this.startX; // Usar la posición X del cohete
        const centerY = window.innerHeight / 2; // Mitad de la altura
        const scale = Math.min(window.innerWidth, window.innerHeight) * 0.1; // Escala reducida

        // Crear partículas (mismo código pero con nuevo centro)
        for (let i = 0; i < 180; i++) {
            const angle = (i / 180) * Math.PI * 2;
            const [heartX, heartY] = this.getHeartPosition(angle);
            
            const finalX = centerX + heartX * scale;
            const finalY = centerY + heartY * scale;
            
            this.particles.push(new HeartParticle(centerX, centerY, finalX, finalY));
        }
        
        // Partículas de relleno (similar ajuste)
        for (let i = 0; i < 200; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radiusScale = Math.random() * 0.8 + 0.2;
            const [heartX, heartY] = this.getHeartPosition(angle);
            
            const finalX = centerX + heartX * scale * radiusScale;
            const finalY = centerY + heartY * scale * radiusScale;
            
            this.particles.push(new HeartParticle(centerX, centerY, finalX, finalY));
        }
    }
  
    getHeartPosition(angle) {
      // Ecuación paramétrica mejorada del corazón
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
        this.particles = this.particles.filter(particle => particle.update(0.01)); // Expansión lenta
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
  
  // Variables de control
let currentSide = 'left'; // 'left' o 'right'
let isAnimating = false;

function launchFireworkSequence() {
  if (isAnimating) return;
  
  isAnimating = true;
  const screenWidth = window.innerWidth;
  const startX = currentSide === 'left' ? 
      screenWidth * 0.2 : // 20% izquierdo
      screenWidth * 0.8;  // 80% derecho

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
// Iniciar la secuencia
launchFireworkSequence();