document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('model-search');
    const modelCards = document.querySelectorAll('.model-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let currentCategory = 'all';

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        filterModels(searchTerm, currentCategory);
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.dataset.category;
            currentCategory = category;
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterModels(searchInput.value.toLowerCase(), category);
        });
    });

    function filterModels(searchTerm, category) {
        modelCards.forEach(card => {
            const modelName = card.querySelector('.model-name').textContent.toLowerCase();
            const modelDescription = card.querySelector('.model-description').textContent.toLowerCase();
            const modelCategory = card.dataset.category;

            const matchesSearch = modelName.includes(searchTerm) || modelDescription.includes(searchTerm);
            const matchesCategory = category === 'all' || modelCategory === category;

            if (matchesSearch && matchesCategory) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }
});