/* ==========================================================================
   ZERO.CINCO CREATIVE STUDIO - MAIN JAVASCRIPT
   Theme Switcher (Light/Dark), Phone Simulator, Counters & Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 0. THEME SWITCHER (Light / Dark Mode with LocalStorage)
  const themeToggle = document.getElementById('themeToggle');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  const savedTheme = localStorage.getItem('zerocinco-theme') || 'dark';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('zerocinco-theme', theme);
    
    // Update mobile text if present
    document.querySelectorAll('.theme-text-status').forEach(el => {
      el.textContent = theme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
    });
  }

  applyTheme(savedTheme);

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
  }

  // 1. STICKY NAVBAR SCROLL
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. MOBILE MENU TOGGLE
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('open'));
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') navMenu.classList.remove('open');
    });
  }

  // 3. SCROLLSPY ACTIVE NAVIGATION DOT
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // 4. FAQ ACCORDION
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });

  // 5. CONTACT FORM SUBMISSION TO WHATSAPP
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName').value;
      const eventType = document.getElementById('clientEventType').value;
      const details = document.getElementById('clientDetails').value;

      const text = `Olá, equipe ZERO.CINCO!%0A%0A*Novo Contato via Site:*%0A• Nome/Responsável: ${name}%0A• Ocasião/Evento: ${eventType}%0A• Mensagem/Briefing: ${details}%0A%0AGostaria de verificar disponibilidade na agenda!`;
      
      window.open(`https://wa.me/5511999999999?text=${text}`, '_blank');
    });
  }
});
