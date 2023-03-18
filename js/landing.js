class Star {
  constructor(x, y, radius, speed, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.color = color;
  }

  update() {
    this.x -= this.speed;
    if (this.x < 0) {
      this.x = window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      this.speed = Math.random() * 3 + 0.5;
      this.radius = Math.random() * 1.5;
      this.color = this.randomColor();
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  randomColor() {
    const colors = ["#ffffff", "#ffe9c4", "#d4fbff"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const starCount = 200;
const stars = [];

for (let i = 0; i < starCount; i++) {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  const radius = Math.random() * 1.5;
  const speed = Math.random() * 3 + 0.5;
  const color = new Star().randomColor();
  stars.push(new Star(x, y, radius, speed, color));
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const star of stars) {
    star.update();
    star.draw(ctx);
  }
}

animate();
