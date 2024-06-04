function updateButton({ buttonEl, isLight }) {
    buttonEl.classList = isLight
      ? "header__themeToggle"
      : "header__themeToggle header__themeToggle--dark";
  
    const newAriaLabel = isLight ? "Change to dark theme" : "Change to light theme";
  
    buttonEl.setAttribute("aria-label", newAriaLabel);
  }
  
  function calculateSettingAsThemeString({ localStorageTheme, systemSettingLight }) {
    if (localStorageTheme !== null) {
      return localStorageTheme;
    }
  
    if (systemSettingLight.matches) {
      return "light";
    }
  
    return "dark";
  }
  
  function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
  }
  
  const button = document.querySelector("[data-theme-toggle]");
  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingLight = window.matchMedia("(prefers-color-scheme: light)");
  
  let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingLight });
  
  // update on page load
  updateButton({ buttonEl: button, isLight: currentThemeSetting === "light" });
  updateThemeOnHtmlEl({ theme: currentThemeSetting });
  
  // update on theme button click
  button.addEventListener("click", () => {
    const newTheme = currentThemeSetting === "light" ? "dark" : "light";
  
    localStorage.setItem("theme", newTheme);
    updateButton({ buttonEl: button, isLight: newTheme === "light" });
    updateThemeOnHtmlEl({ theme: newTheme });
  
    currentThemeSetting = newTheme;
  });