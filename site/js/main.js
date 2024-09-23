document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('video-modal');
  const video = document.getElementById('modal-video');
  const closeModal = document.getElementById('close-modal');

  // Check if the video has been played before
  if (!sessionStorage.getItem('videoPlayed')) {
    modal.style.display = 'block'; // Show the modal
  }

  // When the video ends
  video.onended = function () {
    modal.style.display = 'none'; // Hide the modal
    sessionStorage.setItem('videoPlayed', 'true'); // Set session storage
  };

  // Close the modal when the close button is clicked
  closeModal.onclick = function () {
    modal.style.display = 'none';
    sessionStorage.setItem('videoPlayed', 'true'); // Set session storage
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

// Variables to keep track of the current slide
let carouselIndex = 0;
const totalSlides = carouselItems.length;

// Function to update the carousel display
function updateCarousel() {
  // Remove 'active' class from all items
  carouselItems.forEach((item, index) => {
    item.classList.remove('active');
    dotsContainer.children[index].classList.remove('active');
  });

  // Add 'active' class to the current item and corresponding dot
  carouselItems[carouselIndex].classList.add('active');
  dotsContainer.children[carouselIndex].classList.add('active');
}

// Function to display the next slide
function nextSlide() {
  carouselIndex = (carouselIndex + 1) % totalSlides;
  updateCarousel();
}

// Function to display the previous slide
function prevSlide() {
  carouselIndex = (carouselIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

// Function to create navigation dots
function createDots() {
  carouselItems.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('carousel-dot');
    if (index === carouselIndex) {
      dot.classList.add('active');
    }
    dot.addEventListener('click', () => {
      carouselIndex = index;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  });
}

// Initialize carousel
createDots();
updateCarousel();

// Event listeners for navigation buttons
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

let autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds

// Pause auto-play on mouse enter, resume on mouse leave
carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
carouselContainer.addEventListener('mouseleave', () => {
  autoPlayInterval = setInterval(nextSlide, 3000);
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