  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Verifica se já existe tema salvo
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    body.classList.remove('dark', 'light');
    body.classList.add(savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
  }

  // Alternar tema ao clicar
  themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('dark');

    body.classList.toggle('dark', !isDark);
    body.classList.toggle('light', isDark);

    const currentTheme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);

    themeToggle.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
  });
