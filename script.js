const roles = [
  "Game Developer (Prime, In Progress)",
  "3D Modeler (Prime, In Progress)",
  "Full Stack Developer (In Progress)",
  "Problem Solver"
];

let index = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing-text");

function typeRole() {
  if (!typingElement) return;
  if (charIndex < roles[index].length) {
    typingElement.innerHTML += roles[index].charAt(charIndex);
    charIndex++;
    setTimeout(typeRole, 80);
  } else {
    setTimeout(eraseRole, 1500);
  }
}

function eraseRole() {
  if (!typingElement) return;
  if (charIndex > 0) {
    typingElement.innerHTML = roles[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseRole, 40);
  } else {
    index = (index + 1) % roles.length;
    setTimeout(typeRole, 200);
  }
}
if (typingElement) typeRole();

// Theme handling with persistence
function getSavedTheme() {
  try { return localStorage.getItem("theme"); } catch (e) { return null; }
}

function saveTheme(value) {
  try { localStorage.setItem("theme", value); } catch (e) {}
}

function applyThemeToTopBtn(btn, isDark) {
  if (!btn) return;
  btn.style.background = isDark ? "#2b4d31" : "#386641";
  btn.style.color = "#ffffff";
}

function setTheme(isDark) {
  document.body.classList.toggle("dark-theme", isDark);
  const toggle = document.getElementById("themeToggle");
  if (toggle) toggle.textContent = isDark ? "☀️" : "🌙";
  saveTheme(isDark ? "dark" : "light");
  applyThemeToTopBtn(document.getElementById("topBtn"), isDark);
}

function initTheme() {
  const saved = getSavedTheme();
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved ? saved === "dark" : prefersDark;
  setTheme(isDark);
}

function toggleTheme() {
  const isDark = !document.body.classList.contains("dark-theme");
  setTheme(isDark);
}

document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.addEventListener("click", toggleTheme);
  }
});

// Scroll-to-top button
let topBtn = document.createElement("button");
topBtn.innerHTML = "↑";
topBtn.id = "topBtn";
topBtn.style.display = "none";
topBtn.style.position = "fixed";
topBtn.style.bottom = "20px";
topBtn.style.right = "20px";
topBtn.style.background = "#386641";
topBtn.style.color = "white";
topBtn.style.border = "none";
topBtn.style.padding = "10px 15px";
topBtn.style.borderRadius = "50%";
topBtn.style.fontSize = "20px";
topBtn.style.cursor = "pointer";
document.body.appendChild(topBtn);

window.addEventListener("scroll", function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
