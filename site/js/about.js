document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.pagination__button');
    const contentItems = document.querySelectorAll('.content-item');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');

            buttons.forEach(btn => btn.classList.remove('active'));
            contentItems.forEach(item => item.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
});