function toggleTheme() {
    let theme = document.getElementById('header-css');

    if (theme.getAttribute('href') == 'styles/light/header.css') {
        theme.setAttribute('href', 'styles/dark/header.css');
    } else {
        theme.setAttribute('href', 'styles/light/header.css');
    }

    let text = document.getElementById('text-css');

    if (text.getAttribute('href') == 'styles/light/text.css') {
        text.setAttribute('href', 'styles/dark/text.css');
    } else {
        text.setAttribute('href', 'styles/light/text.css');
    }

    let img = document.getElementById('img');

    if (img.getAttribute('src') == 'images/logo-light.png') {
        img.setAttribute('src', 'images/logo-dark.png');
    } else {
        img.setAttribute('src', 'images/logo-light.png');
    }
}