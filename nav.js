document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".navbar nav a");
  const path = window.location.pathname.split("/").pop();
  links.forEach(link => {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
