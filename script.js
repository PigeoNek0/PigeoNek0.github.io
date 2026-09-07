// 自动更新页脚年份
document.getElementById("year").textContent = new Date().getFullYear();

// ============ 深浅色主题切换 ============
const root = document.documentElement;
const toggle = document.getElementById("theme-toggle");
const STORAGE_KEY = "theme";

// 私有/无痕模式下 localStorage 可能抛错，统一做安全读写
const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      /* 存储失败时忽略，主题仍可正常切换 */
    }
  },
};

function getInitialTheme() {
  const stored = storage.get(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
  } else {
    root.removeAttribute("data-theme");
  }
  toggle.setAttribute("aria-pressed", String(theme === "dark"));
}

let theme = getInitialTheme();
applyTheme(theme);

toggle.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  applyTheme(theme);
  storage.set(STORAGE_KEY, theme);
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
