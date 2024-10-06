
document.addEventListener('DOMContentLoaded', function () {
  const carouselContainer = document.querySelector('.carousel-container');
  if (!carouselContainer) return; // Exit if carousel container doesn't exist

  const carousel = carouselContainer.querySelector('.carousel');
  const carouselItems = carousel.querySelectorAll('.carousel-item');
  const prevButton = carouselContainer.querySelector('.carousel-button.prev');
  const nextButton = carouselContainer.querySelector('.carousel-button.next');
  const dotsContainer = carouselContainer.querySelector('.carousel-dots');

  let currentIndex = 0;
  const totalItems = carouselItems.length;

  // Create dot indicators
  carouselItems.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('carousel-dot');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.carousel-dot');

  function updateCarousel() {
    carouselItems.forEach((item, index) => {
      item.style.display = index === currentIndex ? 'block' : 'none';
    });
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  }

  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);

  // Initialize the carousel
  updateCarousel();

  // Optional: Auto-play functionality
  let intervalId;
  function startAutoPlay() {
    intervalId = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }

  function stopAutoPlay() {
    clearInterval(intervalId);
  }

  carouselContainer.addEventListener('mouseenter', stopAutoPlay);
  carouselContainer.addEventListener('mouseleave', startAutoPlay);

  startAutoPlay(); // Start auto-play by default
});

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.animate-on-scroll');
  const stats = document.querySelectorAll('.stat-number');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCount(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  stats.forEach(stat => statObserver.observe(stat));

  function animateCount(element, target) {
    let current = 0;
    const duration = 800;
    const step = target / (duration / 16);
    const isPercentage = element.closest('.stat-item').querySelector('.stat-label').textContent.toLowerCase().includes('rate');
    const needsPlus = !isPercentage && target > 100;

    function updateCount() {
      current += step;
      if (current < target) {
        if (needsPlus) {
          element.textContent = Math.floor(current).toLocaleString() + '+';
        } else if (isPercentage) {
          element.textContent = Math.min(Math.floor(current), target) + '%';
        } else {
          element.textContent = Math.floor(current).toLocaleString();
        }
        requestAnimationFrame(updateCount);
      } else {
        if (needsPlus) {
          element.textContent = (target === 50000 ? target : target.toLocaleString()) + '+';
        } else if (isPercentage) {
          element.textContent = target + '%';
        } else {
          element.textContent = target.toLocaleString();
        }
      }
    }

    updateCount();
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const themeSwitch = document.getElementById('theme-switch');
  const currentTheme = localStorage.getItem('theme') || 'light';

  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeSwitch.checked = true;
  }

  themeSwitch.addEventListener('change', function () {
    if (this.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const heroCarousel = document.querySelector('.slideshow');
  if (!heroCarousel) return; // Exit if hero carousel doesn't exist

  const slides = heroCarousel.querySelectorAll('.slide');
  const totalSlides = slides.length;
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function startCarousel() {
    showSlide(currentSlide); // Show the first slide
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }

  startCarousel();
});