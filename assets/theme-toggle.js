(function () {
  var button = document.querySelector(".theme-toggle");

  if (!button) {
    return;
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem("theme");
    } catch (error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      return;
    }
  }

  function getTheme() {
    return document.documentElement.getAttribute("data-theme") || getSystemTheme();
  }

  function setTheme(theme, persist) {
    document.documentElement.setAttribute("data-theme", theme);
    button.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    button.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");

    var text = button.querySelector(".theme-toggle-text");
    if (text) {
      text.textContent = theme === "light" ? "Light" : "Dark";
    }

    if (persist) {
      storeTheme(theme);
    }
  }

  setTheme(getTheme(), false);

  button.addEventListener("click", function () {
    setTheme(getTheme() === "light" ? "dark" : "light", true);
  });

  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", function () {
    if (!getStoredTheme()) {
      setTheme(getSystemTheme(), false);
    }
  });
}());
