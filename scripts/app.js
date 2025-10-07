// Handle theme
function getTheme() {
    let theme = localStorage.getItem('SelectedTheme')?.replaceAll('"', '')?.trim()?.toLowerCase() ?? '';

    if (theme !== 'dark' && theme !== 'light') {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    return theme;
}

function toggleTheme() {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('SelectedTheme', newTheme);
    document.documentElement.classList.remove(currentTheme);
    document.documentElement.classList.add(newTheme);
}

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', toggleTheme);

// Handle copyright year
document.getElementById('year').textContent = new Date().getFullYear();
