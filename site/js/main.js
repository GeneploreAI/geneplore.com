document.addEventListener('DOMContentLoaded', function () {
  const introModal = document.getElementById('introModal');
  const introVideo = document.getElementById('introVideo');
  if (!localStorage.getItem('introSeen')) {
    introModal.style.display = 'block';
    introVideo.play();

    introVideo.addEventListener('ended', function () {
      introModal.style.display = 'none';
      localStorage.setItem('introSeen', 'true');
    });
  }
});

 document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelector('.dots');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  let currentSlide = 0;

  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dots.appendChild(dot);
  });

  function setupSlideshow() {
    const slideshow = document.querySelector('.slideshow');
    const slides = slideshow.querySelectorAll('.slide');
    let currentIndex = 0;

    function showNextSlide() {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
    }


    setInterval(showNextSlide, 5000);
}

document.addEventListener('DOMContentLoaded', setupSlideshow);

  const carousel = document.querySelector('.carousel');
  const items = carousel.querySelectorAll('.carousel-item');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  const dotsContainer = document.querySelector('.carousel-dots');
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

function setupSlideshow() {
    const slideshow = document.querySelector('.slideshow');
    const slides = slideshow.querySelectorAll('.slide');
    let currentIndex = 0;

    function showNextSlide() {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
    }

    setInterval(showNextSlide, 5000);
}

document.addEventListener('DOMContentLoaded', setupSlideshow);

function setupCarousel() {
    const carousel = document.querySelector('.carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');
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

    // Auto-rotate every 5 seconds
    setInterval(nextSlide, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    setupSlideshow();
    setupCarousel();
});
