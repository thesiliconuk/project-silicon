function setTheme(theme) {
    let header = document.getElementById('header-css');
    header.setAttribute('href', `styles/${theme}/header.css`);

    let text = document.getElementById('text-css');
    text.setAttribute('href', `styles/${theme}/text.css`);

    let img = document.getElementById('img');
    img.setAttribute('src', `images/logo-${theme}.png`);

    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    let themeToggle = localStorage.getItem('theme')
    if (themeToggle === 'light') {
        themeToggle = 'dark';
    } else if (themeToggle === 'dark') {
        themeToggle = 'light';
    } else {
        themeToggle = 'light';
    }
    setTheme(themeToggle);
}
function onLoadFunctions() {
    let themeOnLoad = localStorage.getItem('theme');
    if (themeOnLoad !== 'light' && themeOnLoad !== 'dark') {
        themeOnLoad = 'light';
    }
    setTheme(themeOnLoad);
}

window.onload = onLoadFunctions;