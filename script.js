// 自动更新页脚年份
document.getElementById("year").textContent = new Date().getFullYear();

// ============ 深浅色主题切换 ============
const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");
const STORAGE_KEY = "theme";

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
  } else {
    root.removeAttribute("data-theme");
  }
}

let theme = getInitialTheme();
applyTheme(theme);

toggle.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  applyTheme(theme);
  localStorage.setItem(STORAGE_KEY, theme);
});

// ============ 滚动进入视口动画 ============
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".section").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});
