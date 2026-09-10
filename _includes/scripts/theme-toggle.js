const themeToggle = document.querySelector('[data-theme-toggle]');

if (themeToggle) {
  const icon = themeToggle.querySelector('.theme-toggle-icon');
  const label = themeToggle.querySelector('[data-theme-label]');
  const labels = {
    light: '{{ translations[page.lang].themeToggle.light }}',
    dark: '{{ translations[page.lang].themeToggle.dark }}'
  };

  function updateTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', isDark);
    themeToggle.setAttribute('aria-label', isDark ? labels.dark : labels.light);
    label.textContent = isDark ? labels.dark : labels.light;
    icon.textContent = isDark ? '☀' : '☾';
  }

  updateTheme(document.documentElement.dataset.theme || 'light');
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', nextTheme);
    updateTheme(nextTheme);
  });
}
