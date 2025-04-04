document.addEventListener("DOMContentLoaded", () => {
  const contentContainer = document.getElementById("content");

  const observer = new MutationObserver(() => {
    const form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const responseMsg = document.getElementById("responseMsg");

        if (!name || !email || !message) {
          responseMsg.textContent = "Моля, попълнете всички полета.";
          responseMsg.style.color = "red";
          responseMsg.classList.remove("hidden");
          return;
        }

        if (!validateEmail(email)) {
          responseMsg.textContent = "Моля, въведете валиден имейл адрес.";
          responseMsg.style.color = "red";
          responseMsg.classList.remove("hidden");
          return;
        }

        responseMsg.textContent = "Благодарим ви! Ще се свържем с вас скоро.";
        responseMsg.style.color = "green";
        responseMsg.classList.remove("hidden");

        form.reset();
      });

      observer.disconnect();
    }
  });

  observer.observe(contentContainer, { childList: true, subtree: true });
});

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}
