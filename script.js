// ============================================================
// Maxwell Pepper Books — Script
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll behavior ────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ── Active nav link ───────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Mobile menu ───────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Book filter ───────────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const bookCards  = document.querySelectorAll('[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      bookCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
          card.style.animation = 'fadeUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ── Search ────────────────────────────────────────────────
  const searchInput = document.getElementById('book-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      bookCards.forEach(card => {
        const title = card.querySelector('.book-title')?.textContent.toLowerCase() || '';
        const cat   = card.querySelector('.book-category')?.textContent.toLowerCase() || '';
        card.style.display = (!q || title.includes(q) || cat.includes(q)) ? '' : 'none';
      });
    });
  }

  // ── FAQ accordion ─────────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const toggle = q.querySelector('.faq-toggle');
      const isOpen = answer?.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
      document.querySelectorAll('.faq-toggle').forEach(t => t.classList.remove('open'));
      // Open clicked
      if (!isOpen && answer) {
        answer.classList.add('open');
        if (toggle) toggle.classList.add('open');
      }
    });
  });

  // ── Email subscribe ───────────────────────────────────────
  document.querySelectorAll('.email-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('.email-input');
      if (!input?.value) return;
      showNotification('🎉 You\'re subscribed! Check your email.');
      input.value = '';
    });
  });

  // ── Notification helper ───────────────────────────────────
  function showNotification(msg) {
    let notif = document.getElementById('notification');
    if (!notif) {
      notif = document.createElement('div');
      notif.id = 'notification';
      notif.className = 'notification';
      notif.innerHTML = `<div class="notification-inner"><span class="notification-icon">✦</span><span id="notif-msg"></span></div>`;
      document.body.appendChild(notif);
    }
    document.getElementById('notif-msg').textContent = msg;
    notif.classList.add('show');
    setTimeout(() => notif.classList.remove('show'), 3500);
  }

  // ── Smooth scroll ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Intersection Observer for animations ──────────────────
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.book-card, .cat-card, .trust-card, .blog-card, .shop-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

});
