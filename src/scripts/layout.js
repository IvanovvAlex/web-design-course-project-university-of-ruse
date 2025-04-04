document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");

  includeHTML("components/primaryNavigation.html", "nav-placeholder", () => {
    setupPrimaryNav?.();
  });
  includeHTML("components/footer.html", "footer-placeholder");

  loadPage("home");

  function loadPage(pageName) {
    Promise.all([
      fetch(`partials/contents/${pageName}Content.html`).then((res) =>
        res.ok ? res.text() : Promise.reject("Content not found")
      ),
      fetch(`partials/navigations/${pageName}Navigation.html`)
        .then((res) => {
          if (res.ok) return res.text();
          return null; // Navigation is optional
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
  }

  function includeHTML(file, elementId, callback) {
    fetch(file)
      .then((res) => res.text())
      .then((html) => {
        document.getElementById(elementId).innerHTML = html;
        if (callback) callback();
      })
      .catch((err) => {
        console.error(`Грешка при зареждане на ${file}`, err);
      });
  }
});
