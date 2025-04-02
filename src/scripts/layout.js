document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");

  loadPage("home");

  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      loadPage(page);
    });
  });

  function loadPage(pageName) {
    fetch(`pages/${pageName}.html`)
      .then((res) => res.text())
      .then((html) => {
        content.innerHTML = html;
      })
      .catch((err) => {
        content.innerHTML = "<p>Грешка при зареждане на съдържанието.</p>";
        console.error(err);
      });
  }
});
