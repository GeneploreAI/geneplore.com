document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.accordion-item');
    const navLinks = document.querySelectorAll('.tos-nav a');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const currentlyActiveItem = document.querySelector('.accordion-item.active');
            if (currentlyActiveItem && currentlyActiveItem !== item) {
                currentlyActiveItem.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetAccordionItem = document.querySelector(targetId).closest('.accordion-item');

            const currentlyActiveItem = document.querySelector('.accordion-item.active');
            if (currentlyActiveItem) {
                currentlyActiveItem.classList.remove('active');
            }
            targetAccordionItem.classList.add('active');

            targetAccordionItem.scrollIntoView({ behavior: 'smooth', block: 'start' });

            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });

    window.addEventListener('scroll', function () {
        let current = '';
        accordionItems.forEach(item => {
            const sectionTop = item.offsetTop;
            if (window.scrollY >= sectionTop - 100) {
                current = item.querySelector('.accordion-header').id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});