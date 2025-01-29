function toggleTheme() {
    let theme = document.getElementById('theme');

    if (theme.getAttribute('href') == 'light.css') {
        theme.setAttribute('href', 'dark.css');
    } else {
        theme.setAttribute('href', 'light.css');
    }

    let img = document.getElementById('img');

    if (img.getAttribute('src') == 'images/logo-light.png') {
        img.setAttribute('src', 'images/logo-dark.png');
    } else {
        img.setAttribute('src', 'images/logo-light.png');
    }
}