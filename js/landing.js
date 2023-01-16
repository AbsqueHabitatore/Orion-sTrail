// Create a preloader element
const preloader = document.createElement("div");
preloader.id = "preloader";

// Add event listener to the preloader
preloader.addEventListener("click", () => {
  // Play the music element
  const music = document.querySelector("#music");
  music.play();

  // Hide the preloader
  preloader.style.display = "none";
});

// Append the preloader to the body
document.body.appendChild(preloader);

// Add the event listener to the window for the load event
window.addEventListener("load", () => {
  const stars = document.querySelector("#stars");

  for (let i = 0; i < 250; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    stars.appendChild(star);
  }

  setInterval(() => {
    for (let i = 0; i < stars.children.length; i++) {
      stars.children[i].style.opacity = Math.random();
    }
  }, 100);
});
