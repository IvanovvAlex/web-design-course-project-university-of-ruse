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

      Promise.all([
        fetch(`partials/contents/${page}Content.html`).then((res) =>
          res.ok ? res.text() : Promise.reject("Content not found")
        ),
        fetch(`partials/navigations/${page}Navigation.html`)
          .then((res) => {
            if (res.ok) return res.text();
            return null;
          })
          .catch(() => null),
      ])
        .then(([contentHTML, navHTML]) => {
          const hasNav = navHTML !== null;

          content.innerHTML = `
          <div class="main-wrapper ${hasNav ? "with-nav" : "no-nav"}">
            <div id="main-content">${contentHTML}</div>
            ${hasNav ? `<aside id="side-nav">${navHTML}</aside>` : ""}
          </div>
        `;
        })
        .catch((err) => {
          content.innerHTML = "<p>Грешка при зареждане на съдържанието.</p>";
          console.error(err);
        });
    });
  });
}
