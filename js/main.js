/**
 * Mani Electricals & Hardwares - Global Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management
  const currentTheme = localStorage.getItem('mani_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = active === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('mani_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    if (sunIcon && moonIcon) {
      if (theme === 'light') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
    }
  }

  // 2. Navbar Scroll & Active State
  const navbar = document.querySelector('.navbar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (navbar) {
      if (y > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (scrollTopBtn) {
      if (y > 450) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    // Scrollspy for active nav link on index.html
    if (sections.length > 0 && navLinks.length > 0) {
      let currentSection = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        if (y >= top && y < top + height) {
          currentSection = sec.getAttribute('id');
        }
      });

      if (currentSection) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href') || '';
          if (href === `#${currentSection}` || href.endsWith(`#${currentSection}`)) {
            link.classList.add('active');
          } else if (href.startsWith('#') || href.includes('index.html#')) {
            link.classList.remove('active');
          }
        });
      }
    }
  }, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Smooth scroll for hash links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  });

  // 3. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobileToggleBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileCloseBtn');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  }

  // Close mobile menu on clicking any link
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // 4. Contact Form Handler (Send via WhatsApp)
  const contactForm = document.getElementById('contactForm');
  if (contactForm && window.ManiData?.business) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value.trim() || '';
      const phone = document.getElementById('contactPhone')?.value.trim() || '';
      const message = document.getElementById('contactMessage')?.value.trim() || '';

      const fullMessage = `Hi, I'm ${name}.\nMy contact number: ${phone}\n\n${message}`;
      const url = window.ManiData.business.whatsappUrl(fullMessage);
      window.open(url, '_blank');
    });
  }

  // 5. Scroll Fade-Up Animations
  const fadeElems = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && fadeElems.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeElems.forEach(el => observer.observe(el));
  } else {
    fadeElems.forEach(el => el.classList.add('visible'));
  }

  // 6. Dynamic Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 7. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
