// Theme Toggle Function
function toggleTheme() {
  document.body.classList.toggle("dark");

  // Change button emoji
  const btn = document.querySelector(".theme-toggle");
  if (document.body.classList.contains("dark")) {
    btn.textContent = "☀️";
  } else {
    btn.textContent = "🌙";
  }
}
