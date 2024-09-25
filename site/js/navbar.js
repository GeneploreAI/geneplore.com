document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const offcanvasMenu = document.querySelector('.offcanvas-menu');
    const closeMenu = document.querySelector('.close-menu');
    const offcanvasOverlay = document.querySelector('.offcanvas-overlay');

    function openMenu() {
        offcanvasMenu.classList.add('active');
        offcanvasOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenuFunc() {
        offcanvasMenu.classList.remove('active');
        offcanvasOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuFunc);
    offcanvasOverlay.addEventListener('click', closeMenuFunc);

    const offcanvasLinks = document.querySelectorAll('.offcanvas-nav-links a');
    offcanvasLinks.forEach(link => {
        link.addEventListener('click', closeMenuFunc);
    });
});

const themeSwitch = document.getElementById('theme-switch');
const themeSwitch2 = document.getElementById('theme-switch2');

themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// Load Theme Preference on Page Load
window.addEventListener('load', () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        themeSwitch.checked = true;
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

themeSwitch2.addEventListener('change', () => {
    if (themeSwitch2.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// Load Theme Preference on Page Load
window.addEventListener('load', () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        themeSwitch2.checked = true;
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});