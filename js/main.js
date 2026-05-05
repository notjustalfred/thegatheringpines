// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');
hamburger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Lazy reveal animation — EXCLUDES hero slides so they don't conflict
const revealEls = document.querySelectorAll('.amenity-card, .ideal-card, .gallery-item, .highlight');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// =====================
// HERO SLIDESHOW
// =====================
(function() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  let current = 0;

  // Make sure all slides start hidden via inline style (belt + suspenders)
  slides.forEach((s, i) => {
    s.style.transition = 'opacity 0.9s ease-in-out';
    s.style.opacity = '0';
    s.classList.remove('active');
  });

  // Show first slide immediately
  slides[0].style.opacity = '1';
  slides[0].classList.add('active');

  function nextSlide() {
    // Fade out current
    slides[current].style.opacity = '0';
    slides[current].classList.remove('active');

    // Advance index
    current = (current + 1) % slides.length;

    // Fade in next
    slides[current].style.opacity = '1';
    slides[current].classList.add('active');
  }

  // Cycle every 2 seconds
  setInterval(nextSlide, 2000);
})();

// =====================
// AMENITY PHOTO PREVIEW
// =====================
(function() {
  const cards = document.querySelectorAll('.amenity-card[data-photo]');
  cards.forEach(card => {
    const src = card.getAttribute('data-photo');
    const alt = card.querySelector('h3') ? card.querySelector('h3').textContent : '';

    const preview = document.createElement('div');
    preview.className = 'amenity-preview';
    preview.innerHTML = `<img src="${src}" alt="${alt}" loading="lazy" /><div class="amenity-preview-overlay"></div>`;
    card.insertBefore(preview, card.firstChild);

    // Touch support for mobile
    card.addEventListener('touchstart', () => {
      card.classList.toggle('preview-active');
    }, { passive: true });
  });
})();
