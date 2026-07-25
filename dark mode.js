
const use_theme = 'user-theme'; //save the theme

function applyTheme(theme) {
  if (theme === 'dark') {
   document.documentElement.setAttribute('dark-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('dark-theme');
  }
} //check whether theme is dark, if yes then change everything to dark-thme

const savedTheme = localStorage.getItem(use_theme);
const darktheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (darktheme ? 'dark' : 'light');

applyTheme(initialTheme); // load page wiht light thme

window.addEventListener('storage', (e) => {
  if (e.key === use_theme) {
    applyTheme(e.newValue);
  }
}); //sync

function toggle() {
    
  const currentTheme = document.documentElement..getAttribute('dark-theme') === 'dark' ? 'dark' : 'light';
  const newtheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  localStorage.setItem(use_theme, newtheme);
  applyTheme(newtheme);
   
}
