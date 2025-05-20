document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const offcanvasMenu = document.querySelector('.offcanvas-menu');
    const closeMenu = document.querySelector('.close-menu');
    const offcanvasOverlay = document.querySelector('.offcanvas-overlay');

    function openMenu() {
        offcanvasMenu.classList.add('active');
        offcanvasOverlay.classList.add('active');
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

document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggleNavbar = document.getElementById('darkModeToggleNavbar');
    const darkModeToggleOffcanvas = document.getElementById('darkModeToggleOffcanvas');

    // --- Load dark mode preference ---
    const darkModePref = localStorage.getItem('darkMode');
    if (darkModePref === 'enabled') {
        document.body.classList.add('dark-mode');
        if (darkModeToggleNavbar) darkModeToggleNavbar.checked = true;
        if (darkModeToggleOffcanvas) darkModeToggleOffcanvas.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        if (darkModeToggleNavbar) darkModeToggleNavbar.checked = false;
        if (darkModeToggleOffcanvas) darkModeToggleOffcanvas.checked = false;
    }

    function setDarkMode(enabled) {
        if (enabled) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
            if (darkModeToggleNavbar) darkModeToggleNavbar.checked = true;
            if (darkModeToggleOffcanvas) darkModeToggleOffcanvas.checked = true;
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
            if (darkModeToggleNavbar) darkModeToggleNavbar.checked = false;
            if (darkModeToggleOffcanvas) darkModeToggleOffcanvas.checked = false;
        }
    }

    function toggleDarkMode() {
        setDarkMode(!document.body.classList.contains('dark-mode'));
    }

    if (darkModeToggleNavbar) {
        darkModeToggleNavbar.addEventListener('change', toggleDarkMode);
    }
    if (darkModeToggleOffcanvas) {
        darkModeToggleOffcanvas.addEventListener('change', toggleDarkMode);
    }
});