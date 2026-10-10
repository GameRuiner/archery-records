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
    themeToggle.setAttribute('aria-label', isDark ? labels.light : labels.dark);
    label.textContent = isDark ? labels.light : labels.dark;
    icon.textContent = isDark ? '☀' : '☾';
  }

  updateTheme(document.documentElement.dataset.theme ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    updateTheme(nextTheme);
    try { localStorage.setItem('theme', nextTheme); } catch {}
  });
}
