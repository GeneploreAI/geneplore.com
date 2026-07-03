document.addEventListener('DOMContentLoaded', () => {
  setupSlideshow();
  setupCarousel();
  setupScrollAnimations();
});

function setupSlideshow() {
  const slideshow = document.querySelector('.slideshow');
  if (!slideshow) return;

  const slides = slideshow.querySelectorAll('.slide');
  if (!slides.length) return;

  let currentIndex = 0;

  function showNextSlide() {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  }

  setInterval(showNextSlide, 5000);
}

function setupCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const items = carousel.querySelectorAll('.carousel-item');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  const dotsContainer = document.querySelector('.carousel-dots');
  if (!items.length || !prevButton || !nextButton || !dotsContainer) return;

  let currentIndex = 0;

  items.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    items[currentIndex].classList.remove('active');
    dotsContainer.children[currentIndex].classList.remove('active');
    currentIndex = index;
    items[currentIndex].classList.add('active');
    dotsContainer.children[currentIndex].classList.add('active');
  }

  function nextSlide() {
    goToSlide((currentIndex + 1) % items.length);
  }

  function prevSlide() {
    goToSlide((currentIndex - 1 + items.length) % items.length);
  }

  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);

  setInterval(nextSlide, 5000);
}

function setupScrollAnimations() {
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
    const duration = 1000;
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
          element.textContent = target.toLocaleString() + '+';
        } else if (isPercentage) {
          element.textContent = target + '%';
        } else {
          element.textContent = target.toLocaleString();
        }
      }
    }

    updateCount();
  }
}