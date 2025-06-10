const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let currentColor = 'rgb(248, 196, 194)';
const colors = [
 
  
  'rgb(210, 71, 241)',    
  'rgb(218, 163, 240)',   
  'rgb(231, 40, 199)'    
];

const shapes = ['circle', 'triangle', 'square', 'rectangle'];

function init() {
  resize();
  createParticles(100);
  animate();
  setInterval(changeColor, 1500); // troca a cor
}

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

function createParticles(num) {
  particles = [];
  for (let i = 0; i < num; i++) {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size = Math.random() * 2.5 + 5;
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      size: size,
      shape: shape,
      rotation: Math.random() * 360
    });
  }
}

function drawParticle(p) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation * Math.PI / 180);
  ctx.beginPath();

  switch (p.shape) {
    case 'circle':
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      break;
    case 'triangle':
      ctx.moveTo(0, -p.size);
      ctx.lineTo(-p.size, p.size);
      ctx.lineTo(p.size, p.size);
      ctx.closePath();
      break;
    case 'square':
      ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size);
      break;
    case 'rectangle':
      ctx.rect(-p.size / 1.5, -p.size / 2, p.size * 1.5, p.size);
      break;
  }

  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = currentColor;
  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0) p.x = width;
    else if (p.x > width) p.x = 0;

    if (p.y < 0) p.y = height;
    else if (p.y > height) p.y = 0;

    drawParticle(p);
  });

  requestAnimationFrame(animate);
}

function changeColor() {
  let newColor;
  do {
    newColor = colors[Math.floor(Math.random() * colors.length)];
  } while (newColor === currentColor);
  currentColor = newColor;
}

window.addEventListener('resize', resize);
init();

  const itens = document.querySelectorAll('.carousel-item');

  itens.forEach((item) => {
    const tooltip = item.querySelector('.tooltip-text');

    // Verifica o link para personalizar a mensagem
    const link = item.querySelector('a')?.href;

    let texto = 'Clique aqui';
    if (link.includes('linkedin')) texto = 'Veja meu LinkedIn';
    else if (link.includes('github')) texto = 'Acesse meu GitHub';
    else if (link.includes('insta')) texto = 'Me siga no Instagram';
    else if (link.includes('wa.me')) texto = 'Fale comigo no WhatsApp';

    item.addEventListener('mouseover', () => {
      tooltip.textContent = texto;
      tooltip.style.display = 'block';
    });

    item.addEventListener('mouseout', () => {
      tooltip.style.display = 'none';
    });
  });