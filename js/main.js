(function () {
  'use strict';

  const C = typeof ER11_CONFIG !== 'undefined' ? ER11_CONFIG : {};

  /* Preloader */
  const preloader = document.getElementById('preloader');
  const preloaderFill = document.getElementById('preloaderFill');
  const preloaderPct = document.getElementById('preloaderPct');
  let loadProgress = 0;
  let progressTimer;

  function setPreloaderProgress(value) {
    loadProgress = Math.min(100, Math.max(0, value));
    if (preloaderFill) preloaderFill.style.width = loadProgress + '%';
    if (preloaderPct) preloaderPct.textContent = Math.round(loadProgress);
  }

  function finishPreloader() {
    clearInterval(progressTimer);
    setPreloaderProgress(100);
    setTimeout(function () {
      if (preloader) preloader.classList.add('loaded');
      document.body.style.overflow = '';
    }, 450);
  }

  if (preloader) {
    document.body.style.overflow = 'hidden';
    setPreloaderProgress(8);
    progressTimer = setInterval(function () {
      if (loadProgress < 88) {
        setPreloaderProgress(loadProgress + (loadProgress < 40 ? 4 : 2));
      }
    }, 120);

    window.addEventListener('load', finishPreloader);
    setTimeout(finishPreloader, 4000);
  }

  /* Header scroll */
  const header = document.getElementById('header');
  if (header) {
    const onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 60);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Mobile nav */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  let overlay = document.querySelector('.nav-overlay');

  if (!overlay) {
    overlay = document.createElement('button');
    overlay.className = 'nav-overlay';
    overlay.setAttribute('aria-label', 'Close menu');
    overlay.type = 'button';
    document.body.appendChild(overlay);
  }

  function closeNav() {
    if (toggle) toggle.classList.remove('active');
    if (nav) nav.classList.remove('active');
    if (header) header.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    document.querySelectorAll('.has-mega.open').forEach(function (el) { el.classList.remove('open'); });
  }

  function openNav() {
    if (toggle) toggle.classList.add('active');
    if (nav) nav.classList.add('active');
    if (header) header.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.contains('active') ? closeNav() : openNav();
    });
    overlay.addEventListener('click', closeNav);
    nav.querySelectorAll('a:not(.mega-trigger)').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1200) closeNav(); });
  }

  document.querySelectorAll('.mega-trigger').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth < 1200) {
        e.preventDefault();
        link.closest('.has-mega').classList.toggle('open');
      }
    });
  });

  /* Active page */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a[data-page]').forEach(function (a) {
    if (a.getAttribute('data-page') === page) a.classList.add('active');
  });

  /* Counters */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const start = performance.now();
    const duration = 2000;
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counterObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        animateCounter(e.target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('[data-count]').forEach(function (el) { counterObs.observe(el); });

  /* FAQ */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      const item = q.parentElement;
      const a = item.querySelector('.faq-a');
      const open = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(function (f) {
        f.classList.remove('active');
        f.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!open) {
        item.classList.add('active');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* Lazy images */
  document.querySelectorAll('img:not([loading])').forEach(function (img, i) {
    if (!img.closest('.hero, .page-hero')) img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });

  /* AOS */
  if (typeof AOS !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    AOS.init({ duration: 800, once: true, offset: 80, easing: 'ease-out-cubic' });
  } else {
    document.querySelectorAll('[data-aos]').forEach(function (el) {
      el.removeAttribute('data-aos');
      el.removeAttribute('data-aos-delay');
    });
  }

  /* Ensure image containers stay visible after animations */
  window.addEventListener('load', function () {
    document.querySelectorAll('.split-img, .sub-split-img, .project-card, .industry-card, .team-card, .service-card-img').forEach(function (el) {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
    });
    document.querySelectorAll('.split-img img, .sub-split-img img, .project-card img, .industry-card img, .team-card img, .service-card-img img').forEach(function (img) {
      img.style.opacity = '1';
      img.style.visibility = 'visible';
    });
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  });

  /* GSAP */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-badge, .hero h1, .hero-lead, .hero-actions', {
      opacity: 0,
      y: 32,
      duration: 1,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.2,
      clearProps: 'opacity,transform'
    });

    if (document.querySelector('.hero-media img')) {
      gsap.fromTo('.hero-media img',
        { scale: 1.12 },
        { scale: 1.06, duration: 2.2, ease: 'power2.out' }
      );
    }

    document.querySelectorAll('.reveal-up').forEach(function (el) {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
          toggleActions: 'play none none none'
        },
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        immediateRender: false
      });
    });

    ScrollTrigger.refresh();
  }

  /* Render services grid */
  function renderServices(containerId, services, cols) {
    const el = document.getElementById(containerId);
    if (!el || !services) return;
    services.forEach(function (s, i) {
      const col = document.createElement('div');
      col.className = cols || 'col-12 col-md-6 col-lg-3';
      const href = s.link || 'services.html#' + s.id;
      col.innerHTML =
        '<article class="service-card">' +
          '<div class="service-card-img"><img src="' + s.image + '" alt="' + s.title + '" loading="lazy">' +
          '<span class="service-card-num">' + String(i + 1).padStart(2, '0') + '</span>' +
          '<div class="service-card-icon"><i class="fas ' + s.icon + '"></i></div></div>' +
          '<div class="service-card-body">' +
            '<h3>' + s.title + '</h3>' +
            '<p>' + s.shortDesc + '</p>' +
            '<a href="' + href + '" class="service-link">Explore Service <i class="fas fa-arrow-right"></i></a>' +
          '</div></article>';
      el.appendChild(col);
    });
  }

  if (typeof ER11_SERVICES !== 'undefined') {
    renderServices('services-grid', ER11_SERVICES);
    renderServices('services-page-grid', ER11_SERVICES, 'col-12 col-lg-6');
  }

  /* Building sub-services */
  const subContainer = document.getElementById('building-sub-services');
  if (subContainer && typeof BUILDING_SUB_SERVICES !== 'undefined') {
    BUILDING_SUB_SERVICES.forEach(function (s, i) {
      const block = document.createElement('section');
      block.className = 'sub-service';
      block.id = s.id;
      const rev = i % 2 === 1 ? ' reverse' : '';
      block.innerHTML =
        '<div class="container">' +
          '<div class="sub-split' + rev + '">' +
            '<div class="sub-split-img"><img src="' + s.image + '" alt="' + s.title + '"></div>' +
            '<div>' +
              '<div class="sub-icon"><i class="fas ' + s.icon + '"></i></div>' +
              '<span class="label">0' + (i + 1) + '</span>' +
              '<h2 class="title" style="font-size:clamp(1.5rem,3vw,2rem);">' + s.title + '</h2>' +
              '<p style="margin-bottom:1rem;">' + s.description + '</p>' +
              '<h5 style="margin-bottom:0.75rem;color:var(--primary);">Key Benefits</h5>' +
              '<ul class="benefits">' + s.benefits.map(function (b) {
                return '<li><i class="fas fa-check"></i> ' + b + '</li>';
              }).join('') + '</ul>' +
              '<h5 style="margin:1rem 0 0.75rem;color:var(--primary);">Applications</h5>' +
              '<div class="tags">' + s.applications.map(function (a) {
                return '<span>' + a + '</span>';
              }).join('') + '</div>' +
              '<a href="contact.html" class="btn btn-gold btn-sm">Request Quote <i class="fas fa-arrow-right"></i></a>' +
            '</div></div></div>';
      subContainer.appendChild(block);
    });
  }

  /* Contact form */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent';
      btn.disabled = true;
      setTimeout(function () { btn.innerHTML = orig; btn.disabled = false; form.reset(); }, 3000);
    });
  }

  /* Career form */
  const careerForm = document.getElementById('careerForm');
  if (careerForm) {
    careerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thank you! Your application has been submitted. Our HR team will contact you shortly.');
      careerForm.reset();
    });
  }

  /* Project filters */
  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('btn-gold');
        b.classList.add('btn-outline-dark');
      });
      btn.classList.add('btn-gold');
      btn.classList.remove('btn-outline-dark');
      const cat = btn.getAttribute('data-filter');
      document.querySelectorAll('.project-item').forEach(function (item) {
        item.style.display = (cat === 'all' || item.getAttribute('data-cat') === cat) ? '' : 'none';
      });
    });
  });

  /* Swiper */
  if (typeof Swiper !== 'undefined') {
    if (document.querySelector('.testimonials-swiper')) {
      new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: { delay: 5000 },
        pagination: { el: '.testimonials-swiper .swiper-pagination', clickable: true },
        breakpoints: { 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }
      });
    }
    if (document.querySelector('.clients-swiper')) {
      new Swiper('.clients-swiper', {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 2500 },
        breakpoints: { 576: { slidesPerView: 3 }, 992: { slidesPerView: 5 } }
      });
    }
  }

  /* Inject contact links */
  document.querySelectorAll('[data-phone]').forEach(function (el) {
    el.href = 'tel:' + el.getAttribute('data-phone').replace(/\s/g, '');
  });
  document.querySelectorAll('[data-email]').forEach(function (el) {
    el.href = 'mailto:' + el.getAttribute('data-email');
  });
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    el.href = 'https://wa.me/' + el.getAttribute('data-wa');
  });
})();
