// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(n =>
  n.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    navMenu?.classList.remove('active');
  })
);

// Smooth scrolling only for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.backdropFilter = 'blur(10px)';
  } else {
    navbar.style.background = 'var(--accent-white)';
    navbar.style.backdropFilter = 'none';
  }
});

// Active nav link (for single page anchors)
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= (sectionTop - 200)) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// Reveal on scroll
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.service-card, .brand-item, .feature, .review-card');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Contact form validation (kept)
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const phone = document.querySelector('#phone').value.trim();
    const message = document.querySelector('#message').value.trim();
    if (!name || !email || !phone || !message) { alert('Please fill in all fields'); return; }
    if (!isValidEmail(email)) { alert('Please enter a valid email address'); return; }
    if (!isValidPhone(phone)) { alert('Please enter a valid phone number'); return; }
    const submitBtn = document.querySelector('#submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}
function isValidEmail(email){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);}
function isValidPhone(phone){return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s/g,''));}

// Tracking (optional hooks)
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
  link.addEventListener('click', () => console.log('WhatsApp link clicked'));
});
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => console.log('Call link clicked'));
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Page loaded state
window.addEventListener('load', () => document.body.classList.add('loaded'));

// Back to top
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
  position: fixed; bottom: 20px; left: 20px; width: 50px; height: 50px; border-radius: 50%;
  background: var(--primary-color); color: white; border: none; cursor: pointer; display: none;
  align-items: center; justify-content: center; font-size: 1.2rem; transition: all 0.3s ease; z-index: 1000; box-shadow: var(--shadow-hover);
`;
document.body.appendChild(backToTopBtn);
window.addEventListener('scroll', () => backToTopBtn.style.display = (window.scrollY > 300 ? 'flex' : 'none'));
backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
backToTopBtn.addEventListener('mouseenter', () => backToTopBtn.style.transform = 'scale(1.1)');
backToTopBtn.addEventListener('mouseleave', () => backToTopBtn.style.transform = 'scale(1)');

// Gallery filtering (kept if used)
const categoryTabs = document.querySelectorAll('.category-tab');
const galleryItems = document.querySelectorAll('.gallery-item');
categoryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    categoryTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const category = tab.getAttribute('data-category');
    galleryItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      if (category === 'all' || itemCategory === category) {
        item.style.display = 'block';
        item.style.animation = 'fadeIn 0.5s ease-in-out';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Add keyframes for gallery fade-in
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
`;
document.head.appendChild(style);

// NEW: Services Tabs logic
const tabs = document.querySelectorAll('.tabbar .tab');
const panes = document.querySelectorAll('.tabpane');
tabs.forEach((t, i) => {
  t.addEventListener('click', () => {
    tabs.forEach(btn => btn.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));
    t.classList.add('active');
    panes[i].classList.add('active');
    // ARIA
    tabs.forEach(btn => btn.setAttribute('aria-selected', 'false'));
    t.setAttribute('aria-selected', 'true');
  });
});

// NEW: Free Diagnosis button -> WhatsApp prefill
const diagBtn = document.querySelector('#btn-diagnosis');
if (diagBtn) {
  diagBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(
      'https://wa.me/919666984949?text=Hi%20RK%20Repair%20Labs%2C%20can%20I%20get%20a%20FREE%20diagnosis%20for%20my%20device%3F',
      '_blank'
    );
  });
}
