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

