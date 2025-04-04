document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");

  includeHTML("partials/primaryNavigation.html", "nav-placeholder", () => {
    setupPrimaryNav?.();
  });
  includeHTML("partials/footer.html", "footer-placeholder");

  loadPage("home");

  function loadPage(pageName) {
    fetch(`partials/${pageName}.html`)
      .then((res) => res.text())
      .then((html) => {
        content.innerHTML = html;
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
