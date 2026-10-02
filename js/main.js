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



  // 2. MOBILE MENU TOGGLE
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      navMenu.classList.toggle('active', isOpen);
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navMenu.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if ((navMenu.classList.contains('open') || navMenu.classList.contains('active')) && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        navMenu.classList.remove('active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navMenu.classList.remove('open');
        navMenu.classList.remove('active');
      }
    });
  }

  // 3. SCROLLSPY ACTIVE NAVIGATION DOT
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    if (scrollY < 100) {
      navLinks.forEach((link, idx) => {
        if (link.getAttribute('href') === '#hero' || idx === 0) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
      return;
    }

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

  // Inicializa o item ativo no carregamento inicial
  highlightNavOnScroll();

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        highlightNavOnScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // Nota: O cabeçalho (.site-header) permanece permanentemente fixo no topo (position: fixed !important; top: 0;)
  // sem qualquer alteração de classe ou transform ao rolar a página.


  // 5. CONTACT FORM SUBMISSION TO WHATSAPP
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName').value;
      const eventType = document.getElementById('clientEventType').value;
      const details = document.getElementById('clientDetails').value;

      const text = `Olá, equipe ZERO.CINCO!%0A%0A*Novo Contato via Site:*%0A• Nome/Responsável: ${name}%0A• Ocasião/Evento: ${eventType}%0A• Mensagem/Briefing: ${details}%0A%0AGostaria de verificar disponibilidade na agenda!`;

      window.open(`https://wa.me/5585999616570?text=${text}`, '_blank');
    });
  }
});

