
const use_theme = 'user-theme';

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

const savedTheme = localStorage.getItem(use_theme);
const darktheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (darktheme ? 'dark' : 'light');

applyTheme(initialTheme);

window.addEventListener('storage', (e) => {
  if (e.key === use_theme) {
    applyTheme(e.newValue);
  }
});

function toggle() {
    
  const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const newtheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  localStorage.setItem(use_theme, newtheme);
  applyTheme(newtheme);
   
}
