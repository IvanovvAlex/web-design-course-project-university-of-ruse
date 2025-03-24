document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav.left-nav a");
  const mainContent = document.getElementById("main-content");

  // Define your content here or fetch it from files
  const pages = {
    home: `
            <h2>Welcome to the M4 Rifle Website</h2>
            <p>This is the home page. Click the links to navigate!</p>
        `,
    about: `
            <h2>About the M4 Rifle</h2>
            <p>The M4 is a shorter and lighter variant of the M16A2 assault rifle.</p>
        `,
    gallery: `
            <h2>Gallery</h2>
            <p>Here are some awesome photos of the M4 rifle in action.</p>
        `,
    contact: `
            <h2>Contact Us</h2>
            <p>Phone: 123-456-7890</p>
            <p>Email: info@m4rifle.com</p>
        `,
  };

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const page = link.getAttribute("data-page");

      // Update main content if the page exists
      if (pages[page]) {
        mainContent.innerHTML = pages[page];

        // Optional: update the browser URL (without reload)
        window.history.pushState({ page }, `${page}`, `#${page}`);
      }
    });
  });

  // Handle browser back/forward buttons
  window.addEventListener("popstate", (e) => {
    const page = (e.state && e.state.page) || "home";
    mainContent.innerHTML = pages[page];
  });

  // Optional: load content based on URL hash on first load
  const initialPage = window.location.hash.replace("#", "") || "home";
  if (pages[initialPage]) {
    mainContent.innerHTML = pages[initialPage];
  }
});
