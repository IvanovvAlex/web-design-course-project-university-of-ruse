function setupPrimaryNav() {
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");

  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      const content = document.getElementById("content");

      fetch(`partials/${page}.html`)
        .then((res) => res.text())
        .then((html) => {
          content.innerHTML = html;
        })
        .catch((err) => {
          content.innerHTML = "<p>Грешка при зареждане на съдържанието.</p>";
          console.error(err);
        });
    });
  });
}
