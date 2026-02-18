const storageKey = "theme";
const toggleButton = document.getElementById("theme-toggle");
const toggleLabel = toggleButton?.querySelector(".toggle-label");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  if (toggleButton) {
    const isDark = theme === "dark";
    toggleButton.setAttribute("aria-pressed", String(isDark));
    if (toggleLabel) {
      toggleLabel.textContent = isDark ? "Dark mode" : "Light mode";
    }
  }
};

const getInitialTheme = () => {
  const stored = localStorage.getItem(storageKey);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return prefersDark.matches ? "dark" : "light";
};

const setTheme = (theme) => {
  applyTheme(theme);
  localStorage.setItem(storageKey, theme);
};

if (toggleButton) {
  applyTheme(getInitialTheme());

  toggleButton.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
  });

  prefersDark.addEventListener("change", (event) => {
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });
}
