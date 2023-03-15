// Add event listener to the document
document.addEventListener("click", () => {
  // Play the music element
  const music = document.querySelector("#music");
  music.play();

  // Hide the preloader
  const preloader = document.querySelector("#preloader");
  preloader.style.display = "none";

  // Enable pointer-events on the stars element
  const stars = document.querySelector("#stars");
  stars.style.pointerEvents = "auto";
});

// Add the event listener to the window for the load event
window.addEventListener("load", () => {
  class Star {
    constructor(x, y, radius, speed) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.speed = speed;
    }

    update() {
      this.x -= this.speed;
      if (this.x < 0) {
        this.x = window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.speed = Math.random() * 3 + 0.5;
        this.radius = Math.random() * 1.5;
      }
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    }
  }

  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const starCount = 200;
  const stars = [];

  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const radius = Math.random() * 1.5;
    const speed = Math.random() * 3 + 0.5;
    stars.push(new Star(x, y, radius, speed));
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
});

// starfield
