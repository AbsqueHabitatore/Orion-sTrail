window.addEventListener("load", () => {
  const stars = document.querySelector("#stars");
  const music = document.querySelector("#music");

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
