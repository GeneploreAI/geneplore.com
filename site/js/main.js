document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('video-modal');
  const video = document.getElementById('modal-video');

  // Check if the video has been played before
  if (!sessionStorage.getItem('videoPlayed')) {
    modal.style.display = 'block'; // Show the modal
    document.body.style.overflow = 'hidden';
  }

  // When the video ends
  video.onended = function () {
    modal.style.display = 'none'; // Hide the modal
    sessionStorage.setItem('videoPlayed', 'true'); // Set session storage
    document.body.style.overflow = 'visible';
  };

  // Close the modal if the user clicks outside of the modal content
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      sessionStorage.setItem('videoPlayed', 'true'); // Set session storage
    }
  };
});

const carouselContainer = document.querySelector('.carousel-container');
const carousel = carouselContainer.querySelector('.carousel');
const carouselItems = carousel.querySelectorAll('.carousel-item');
const prevButton = carouselContainer.querySelector('.carousel-button.prev');
const nextButton = carouselContainer.querySelector('.carousel-button.next');
const dotsContainer = carouselContainer.querySelector('.carousel-dots');

  document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
  const slides = document.querySelectorAll('.slideshow .slide');
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
    }

  setInterval(nextSlide, 3000); // Change slide every 3 seconds
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