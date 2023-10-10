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

  distort() {
    this.x += this.speed * 20;
    this.radius += 1;
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

let eyeOpen = false;
let eyeOpenRate = 0.02;
let eyeRadius = 0;
let pupilRadius = 0;
let textOpacity = 1;

function drawEye() {
  // Draw the white part of the eye
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, eyeRadius, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fill();

  // Draw the iris
  if (eyeOpen) {
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      eyeRadius * 0.7,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "rgba(255,0,0,0.9)"; // Changed color to red
    ctx.fill();
  }

  // Draw the pupil
  if (eyeOpen) {
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      eyeRadius * 0.3,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "black";
    ctx.fill();
  }

  // Draw the text
  if (eyeOpen) {
    ctx.font = "50px 'Courier New', monospace";
    ctx.fillStyle = `rgba(255, 255, 255, ${textOpacity})`; // Added fading effect to text
    ctx.textAlign = "center";
    ctx.fillText(
      "I see you",
      canvas.width / 2,
      canvas.height / 2 + eyeRadius + 80
    );
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const star of stars) {
    star.update();
    star.draw(ctx);
  }

  drawEye();

  if (!eyeOpen) {
    eyeRadius += eyeOpenRate;
    if (eyeRadius > 50) {
      eyeOpen = true;

      // Distort stars and start disappearing sequence
      for (const star of stars) {
        star.distort();
      }
      setTimeout(() => {
        eyeOpen = false;
        textOpacity = 0;
      }, 5000);
    }
  }
}

animate();
