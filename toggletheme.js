function setTheme(theme) {
    let header = document.getElementById('header-css');
    if (header) {
        header.setAttribute('href', `/styles/${theme}/header.css`);
    }

    let text = document.getElementById('text-css');
    if (text) {
        text.setAttribute('href', `/styles/${theme}/text.css`);
    }

    let articlelist = document.getElementById('articlelist-css');
    if (articlelist) {
        articlelist.setAttribute('href', `/styles/${theme}/articlelist.css`);
    }

    let img = document.getElementById('img');
    if (img) {
        img.setAttribute('src', `/images/logo-${theme}.png`);
    }

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
    
(function () {
    let themeOnLoad = localStorage.getItem('theme');
    console.log('onLoadFunctions called, theme:', themeOnLoad);
    if (themeOnLoad !== 'light' && themeOnLoad !== 'dark') {
        themeOnLoad = 'light';
    }
    window.addEventListener('load', function() {
        setTheme(themeOnLoad);
    });
})();
