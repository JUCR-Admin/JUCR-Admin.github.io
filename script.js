const canvas = document.getElementById("constellation");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 100;

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    radius: Math.random() * 1.5 + 0.5
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let s of stars) {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }

  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  for (let s of stars) {
    s.x += s.vx;
    s.y += s.vy;

    if (s.x < 0 || s.x > canvas.width) s.vx *= -1;
    if (s.y < 0 || s.y > canvas.height) s.vy *= -1;
  }

  drawStars();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
