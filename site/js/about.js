document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Animate hero content and stats card
    const heroContent = document.querySelector('.hero-content');
    const statsCard = document.querySelector('.stats-card');
    
    setTimeout(() => {
        heroContent.classList.add('animate', 'animate-fadeInUp');
        statsCard.classList.add('animate', 'animate-fadeInRight');
    }, 100);

    // Animate story section
    const storySection = document.querySelector('.story');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('h2').classList.add('animate', 'animate-fadeInUp');
                entry.target.querySelector('.content-card').classList.add('animate', 'animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    observer.observe(storySection);

    // Counter animation
    function animateCounter(elementId, endValue, duration) {
        const element = document.getElementById(elementId);
        const startTime = performance.now();
        const startValue = 0;

        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
                const progress = elapsedTime / duration;
                const currentValue = Math.round(startValue + progress * (endValue - startValue));
                element.textContent = currentValue.toLocaleString() + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = endValue.toLocaleString() + '+';
            }
        }

        requestAnimationFrame(updateCounter);
    }

    animateCounter('serverCount', 50000, 2000);
    animateCounter('userCount', 125000, 2000);

    // Story tabs
    const tabs = [
        { title: 'Our Mission', content: 'At Geneplore AI, our mission is to make artificial intelligence accessible to everyone. We strive to create innovative AI solutions that empower individuals and businesses to achieve more.', icon: 'brain' },
        { title: 'Our Team', content: 'We are a dedicated team of AI enthusiasts, developers, and innovators working together to democratize artificial intelligence and make it accessible through intuitive interfaces.', icon: 'users' },
        { title: 'Our Values', content: 'Innovation, accessibility, and user empowerment drive everything we do. We believe in creating AI solutions that are not just powerful, but also ethical and user-friendly.', icon: 'heart' },
        { title: 'Our Vision', content: 'We envision a future where AI enhances every aspect of daily life, making complex tasks simple and enabling everyone to harness the power of artificial intelligence.', icon: 'eye' },
    ];

    const tabsContainer = document.getElementById('storyTabs');
    const tabContent = document.getElementById('tabContent');

    tabs.forEach((tab, index) => {
        const button = document.createElement('button');
        button.innerHTML = `<i data-lucide="${tab.icon}"></i>${tab.title}`;
        button.addEventListener('click', () => setActiveTab(index));
        tabsContainer.appendChild(button);
    });

    function setActiveTab(index) {
        const buttons = tabsContainer.querySelectorAll('button');
        buttons.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });

        tabContent.innerHTML = `
            <div class="content-header">
                <i data-lucide="${tabs[index].icon}"></i>
                <h3>${tabs[index].title}</h3>
            </div>
            <p>${tabs[index].content}</p>
        `;
        lucide.createIcons();

        // Animate new content
        tabContent.classList.remove('animate-fadeInUp');
        void tabContent.offsetWidth; // Trigger reflow
        tabContent.classList.add('animate-fadeInUp');
    }

    // Set initial active tab
    setActiveTab(0);
});