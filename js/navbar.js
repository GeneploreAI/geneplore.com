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

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded');

    const darkModeToggleNavbar = document.getElementById('darkModeToggleNavbar');
    const darkModeToggleOffcanvas = document.getElementById('darkModeToggleOffcanvas');

    console.log('Navbar toggle:', darkModeToggleNavbar);
    console.log('Offcanvas toggle:', darkModeToggleOffcanvas);

    function toggleDarkMode() {
        console.log('Toggle function called');
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        console.log('Dark mode:', isDarkMode);
    }

    if (darkModeToggleNavbar) {
        darkModeToggleNavbar.addEventListener('change', toggleDarkMode);
    }

    if (darkModeToggleOffcanvas) {
        darkModeToggleOffcanvas.addEventListener('change', toggleDarkMode);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const darkModeToggle = document.getElementById('darkModeToggle', 'darkModeToggle2');

    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', null);
        }
    });
});

