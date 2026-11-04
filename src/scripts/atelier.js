/**
 * The Digital Atelier — Core Lightweight JavaScript
 * Client runtime: < 5 KB. Zero external runtime dependencies.
 * Recruiter drawer, smooth anchor navigation, scroll observer, accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
  initRecruiterDrawer();
  initScrollReveals();
  initSectionTransitions();
  initCinematicPassages();
  initAnchorNavigation();
  initMobileNavigation();
  initSectionIndicator();
  initCaseStudyNavigation();
  initProjectCardDepth();
  initScrollDepth();
  initHeroDepthScene();
});

/* --------------------------------------------------------------------------
   1. Recruiter Quick-View Slide-Over Drawer
   -------------------------------------------------------------------------- */
function initRecruiterDrawer() {
  const drawer = document.getElementById('recruiter-drawer');
  const backdrop = document.getElementById('recruiter-backdrop');
  const openButtons = document.querySelectorAll('[data-open-recruiter]');
  const closeButtons = document.querySelectorAll('[data-close-recruiter]');

  if (!drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for keyboard accessibility
    const firstFocusable = drawer.querySelector('button, [href], input, select, textarea, [tabindex="0"]');
    if (firstFocusable) firstFocusable.focus();
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openDrawer();
  }));

  closeButtons.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    closeDrawer();
  }));

  backdrop.addEventListener('click', closeDrawer);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   2. Scroll Reveal Observer
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const reveals = [...document.querySelectorAll('.reveal-on-scroll')]
    .filter(el => !el.closest('[data-section-motion]'));
  if (!reveals.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-visible'));
    return;
  }

  reveals.forEach(el => el.classList.add('reveal-pending'));
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -48px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   2b. Editorial section transitions inspired by the supplied reference
   -------------------------------------------------------------------------- */
function initSectionTransitions() {
  const panels = document.querySelectorAll('[data-transition-panel]');
  if (!panels.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    panels.forEach(panel => panel.classList.add('is-transitioned'));
    return;
  }

  document.documentElement.classList.add('has-cinematic-transitions');
  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-transitioned');
      activeObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

  panels.forEach(panel => observer.observe(panel));
}

/* Particle trails travel between artwork anchors as the reader crosses sections. */
function initCinematicPassages() {
  const sections = [...document.querySelectorAll('[data-section-motion]')];
  const layer = document.querySelector('[data-cinematic-transition]');
  const canvas = layer?.querySelector('[data-transition-particles]');
  if (!sections.length || !layer || !canvas) return;

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionPreference.matches || !('IntersectionObserver' in window)) return;

  const context = canvas.getContext('2d', { alpha: true });
  let activeIndex = -1;
  let lastSection = null;
  let previousScrollY = window.scrollY;
  let particleFrame = 0;
  let burstStartedAt = 0;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let pixelRatio = 1;
  let palette = { rgb: '169, 119, 137', accent: '#aa7489' };
  let particles = [];
  let fromPoint = { x: 0, y: 0 };
  let toPoint = { x: 0, y: 0 };

  const palettes = {
    name: { rgb: '197, 143, 125', accent: '#c58f7d' },
    editorial: { rgb: '176, 132, 156', accent: '#b0849c' },
    gallery: { rgb: '158, 124, 169', accent: '#9e7ca9' },
    constellation: { rgb: '139, 124, 174', accent: '#8b7cae' },
    credentials: { rgb: '192, 157, 111', accent: '#c09d6f' },
    document: { rgb: '169, 126, 139', accent: '#a97e8b' },
    transmission: { rgb: '113, 153, 151', accent: '#719997' }
  };

  function resizeCanvas() {
    pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = Math.round(canvasWidth * pixelRatio);
    canvas.height = Math.round(canvasHeight * pixelRatio);
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    context?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  const clampPoint = point => ({
    x: Math.max(20, Math.min(canvasWidth - 20, point.x)),
    y: Math.max(18, Math.min(canvasHeight - 18, point.y))
  });

  function anchorFor(section) {
    const selectors = {
      name: '.visual-stage',
      editorial: '.academics-card, .bio-card',
      gallery: '.project-card .project-artwork, .project-card',
      constellation: '.analytics-artwork, .skill-cat-card',
      credentials: '.certification-artwork, .cert-card',
      document: '.resume-card',
      transmission: '.contact-artwork, .contact-channel-card'
    };
    const target = section.querySelector(selectors[section.dataset.sectionMotion] || '.room-header');
    const rect = target?.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height) return { x: canvasWidth * .5, y: canvasHeight * .56 };
    return clampPoint({ x: rect.left + rect.width * .5, y: rect.top + rect.height * .5 });
  }

  function makeParticles() {
    const count = window.innerWidth < 700 ? 96 : 220;
    const dx = toPoint.x - fromPoint.x;
    const dy = toPoint.y - fromPoint.y;
    const length = Math.max(1, Math.hypot(dx, dy));
    const normal = { x: -dy / length, y: dx / length };
    particles = Array.from({ length: count }, (_, i) => {
      return {
        start: clampPoint({ x: fromPoint.x + normal.x * (Math.random() - .5) * 190, y: fromPoint.y + normal.y * (Math.random() - .5) * 190 }),
        end: clampPoint({ x: toPoint.x + normal.x * (Math.random() - .5) * 170, y: toPoint.y + normal.y * (Math.random() - .5) * 170 }),
        delay: Math.random() * .24,
        radius: 0.65 + Math.random() * (i % 13 === 0 ? 2.1 : 1.15),
        phase: Math.random() * Math.PI * 2,
        drift: (Math.random() - .5) * 58,
        normal
      };
    });
  }

  function drawParticles(now) {
    if (!context) return;
    const progress = Math.min(1, (now - burstStartedAt) / 1080);
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    if (progress >= 1) {
      particleFrame = 0;
      layer.classList.remove('is-active');
      return;
    }

    const points = [];
    const dx = toPoint.x - fromPoint.x;
    const dy = toPoint.y - fromPoint.y;
    const length = Math.max(1, Math.hypot(dx, dy));
    const normal = { x: -dy / length, y: dx / length };
    const ribbonAlpha = Math.sin(progress * Math.PI) * .24;
    context.lineCap = 'round';
    context.shadowColor = palette.accent;
    context.shadowBlur = 18;
    for (const offset of [-34, 0, 34]) {
      context.beginPath();
      context.moveTo(fromPoint.x + normal.x * offset, fromPoint.y + normal.y * offset);
      context.bezierCurveTo(
        fromPoint.x + dx * .28 + normal.x * (offset + 46),
        fromPoint.y + dy * .22 + normal.y * (offset + 46),
        fromPoint.x + dx * .74 + normal.x * (offset - 42),
        fromPoint.y + dy * .78 + normal.y * (offset - 42),
        toPoint.x + normal.x * offset * .22,
        toPoint.y + normal.y * offset * .22
      );
      context.strokeStyle = `rgba(${palette.rgb}, ${ribbonAlpha * (offset === 0 ? 1 : .52)})`;
      context.lineWidth = offset === 0 ? 1.35 : .72;
      context.stroke();
    }
    context.shadowBlur = 0;
    for (const particle of particles) {
      const local = Math.max(0, Math.min(1, (progress - particle.delay) / (1 - particle.delay * .65)));
      const eased = local * local * (3 - 2 * local);
      const envelope = Math.sin(local * Math.PI);
      const bow = Math.sin(local * Math.PI) * particle.drift;
      const x = particle.start.x + (particle.end.x - particle.start.x) * eased + particle.normal.x * bow + Math.sin(progress * 8 + particle.phase) * 2.4;
      const y = particle.start.y + (particle.end.y - particle.start.y) * eased + particle.normal.y * bow + Math.cos(progress * 7 + particle.phase) * 2.4;
      const alpha = envelope * (0.42 + particle.radius * .14);
      points.push({ x, y, alpha, radius: particle.radius });
      const tailLength = 7 + particle.radius * 7;
      context.beginPath();
      context.moveTo(x - dx / length * tailLength, y - dy / length * tailLength);
      context.lineTo(x, y);
      context.strokeStyle = `rgba(${palette.rgb}, ${alpha * .32})`;
      context.lineWidth = Math.max(.45, particle.radius * .72);
      context.stroke();
      context.beginPath();
      context.fillStyle = `rgba(${palette.rgb}, ${alpha})`;
      context.arc(x, y, particle.radius, 0, Math.PI * 2);
      context.shadowColor = palette.accent;
      context.shadowBlur = particle.radius > 2 ? 11 : 5;
      context.fill();
    }
    context.shadowBlur = 0;

    context.lineWidth = .8;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < Math.min(i + 7, points.length); j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const distance = Math.hypot(dx, dy);
        if (distance > 42) continue;
        context.beginPath();
        context.strokeStyle = `rgba(${palette.rgb}, ${(1 - distance / 42) * .12 * Math.sin(progress * Math.PI)})`;
        context.moveTo(points[i].x, points[i].y);
        context.lineTo(points[j].x, points[j].y);
        context.stroke();
      }
    }
    particleFrame = requestAnimationFrame(drawParticles);
  }

  function playPassage(section, index) {
    if (index === activeIndex) return;
    activeIndex = index;
    if (index === 0) { lastSection = section; return; }
    const previousSection = lastSection || sections[index - 1];
    const direction = window.scrollY >= previousScrollY ? 1 : -1;
    previousScrollY = window.scrollY;
    fromPoint = anchorFor(previousSection);
    toPoint = anchorFor(section);
    lastSection = section;
    if (direction > 0 && fromPoint.y < 24) fromPoint.y = 28;
    if (direction < 0 && fromPoint.y > canvasHeight - 24) fromPoint.y = canvasHeight - 28;
    palette = palettes[section.dataset.sectionMotion] || palettes.editorial;
    layer.style.setProperty('--transition-accent', palette.accent);
    layer.classList.remove('is-active');
    void layer.offsetWidth;
    layer.classList.add('is-active');
    if (context) {
      if (particleFrame) cancelAnimationFrame(particleFrame);
      resizeCanvas();
      fromPoint = clampPoint(fromPoint);
      toPoint = clampPoint(toPoint);
      makeParticles();
      burstStartedAt = performance.now();
      particleFrame = requestAnimationFrame(drawParticles);
    }
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const section = entry.target.closest('[data-section-motion]');
      if (section) playPassage(section, sections.indexOf(section));
    });
  }, { threshold: 0, rootMargin: '-20% 0px -30% 0px' });

  sections.forEach(section => {
    const heading = section.querySelector('.hero-name, .room-header h2, h1, h2');
    if (heading) observer.observe(heading);
  });
}

/* Scroll-linked card depth keeps the project gallery moving with the reader. */
function initScrollDepth() {
  const cards = [...document.querySelectorAll('.project-card')];
  if (!cards.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let frame = 0;

  const updateDepth = () => {
    frame = 0;
    const viewportCenter = window.innerHeight * 0.5;
    const span = Math.max(window.innerHeight * 0.85, 1);
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.bottom < -120 || rect.top > window.innerHeight + 120) return;
      const offset = Math.max(-1, Math.min(1, (rect.top + rect.height * 0.5 - viewportCenter) / span));
      card.style.setProperty('--scroll-card-tilt', `${(offset * 7).toFixed(2)}deg`);
      card.style.setProperty('--scroll-card-lift', `${(Math.abs(offset) * 14).toFixed(1)}px`);
      card.style.setProperty('--scroll-card-scale', `${(1 - Math.abs(offset) * 0.025).toFixed(3)}`);
    });
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(updateDepth); };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  schedule();
}

/* --------------------------------------------------------------------------
   3. Smooth Anchor Navigation with Offset
   -------------------------------------------------------------------------- */
function initAnchorNavigation() {
  document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const targetUrl = new URL(link.href, window.location.href);
      if (targetUrl.origin !== window.location.origin || targetUrl.pathname !== window.location.pathname || !targetUrl.hash) return;
      const targetEl = document.getElementById(decodeURIComponent(targetUrl.hash.slice(1)));
      if (!targetEl) return;
      event.preventDefault();
      const top = targetEl.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      history.replaceState(null, '', targetUrl.hash);
    });
  });
}


/* --------------------------------------------------------------------------
   4. Responsive, keyboard-friendly primary navigation
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('primary-navigation');
  if (!toggle || !menu) return;

  const setOpen = (open, returnFocus = false) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (!open && returnFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false, true)));
  document.addEventListener('click', event => {
    if (menu.classList.contains('is-open') && !menu.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false, true);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1040 && menu.classList.contains('is-open')) setOpen(false);
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   5. Active-section navigation indicator
   -------------------------------------------------------------------------- */
function initSectionIndicator() {
  const nav = document.querySelector('.nav-links');
  const indicator = nav?.querySelector('.nav-indicator');
  if (!nav || !indicator || !('IntersectionObserver' in window)) return;

  const links = [...nav.querySelectorAll('.nav-item[href*="#"]')];
  const targets = links.map(link => {
    const id = link.getAttribute('href').split('#').pop();
    return { link, section: document.getElementById(id) };
  }).filter(item => item.section);
  if (!targets.length) return;

  const activate = (target) => {
    targets.forEach(item => {
      const active = item === target;
      item.link.toggleAttribute('aria-current', active);
      if (active) item.link.setAttribute('aria-current', 'location');
    });
    const navRect = nav.getBoundingClientRect();
    const linkRect = target.link.getBoundingClientRect();
    nav.style.setProperty('--indicator-x', `${linkRect.left - navRect.left}px`);
    nav.style.setProperty('--indicator-width', `${linkRect.width}px`);
    indicator.classList.add('is-active');
  };

  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) {
      const target = targets.find(item => item.section === visible.target);
      if (target) activate(target);
    }
  }, { rootMargin: '-24% 0px -62% 0px', threshold: [0, 0.15, 0.4] });
  targets.forEach(item => observer.observe(item.section));
  window.addEventListener('resize', () => {
    const active = targets.find(item => item.link.getAttribute('aria-current') === 'location');
    if (active) activate(active);
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   6. Case-study table of contents and previous/next navigation
   -------------------------------------------------------------------------- */
function initCaseStudyNavigation() {
  const container = document.querySelector('.case-study-container');
  if (!container) return;
  const sections = [...container.querySelectorAll('.cs-section')];
  const breadcrumb = container.querySelector('.back-nav');
  if (!sections.length || !breadcrumb) return;

  const toc = document.createElement('nav');
  toc.className = 'case-section-nav';
  toc.setAttribute('aria-label', 'Case study sections');
  const label = document.createElement('span');
  label.className = 'case-section-nav-label';
  label.textContent = 'On this page';
  const list = document.createElement('div');
  list.className = 'case-section-links';
  sections.forEach((section, index) => {
    if (!section.id) section.id = `case-section-${index + 1}`;
    const heading = section.querySelector('h2');
    if (!heading) return;
    const link = document.createElement('a');
    link.className = 'case-section-link';
    link.href = `#${section.id}`;
    link.textContent = heading.textContent.replace(/^\s*\d+\.\s*/, '').trim();
    list.append(link);
  });
  toc.append(label, list);
  breadcrumb.after(toc);

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      list.querySelectorAll('a').forEach(link => {
        const active = link.hash === `#${visible.target.id}`;
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-25% 0px -65% 0px', threshold: [0, 0.2, 0.5] });
    sections.forEach(section => observer.observe(section));
  }

  const projects = [
    ['terraseg-ai', 'TerraSeg AI'],
    ['aquaguard-ai', 'AquaGuard AI'],
    ['hospital-management-system', 'Hospital Management System'],
    ['ai-planning-search', 'AI Planning & Search']
  ];
  const currentIndex = projects.findIndex(([slug]) => location.pathname.includes(`/projects/${slug}`));
  if (currentIndex < 0) return;
  const pagination = document.createElement('nav');
  pagination.className = 'case-pagination';
  pagination.setAttribute('aria-label', 'Browse project case studies');
  const previous = projects[currentIndex - 1];
  const next = projects[currentIndex + 1];
  const makeLink = (project, direction) => {
    if (!project) return null;
    const link = document.createElement('a');
    link.className = `case-page-link case-page-${direction}`;
    link.href = `${document.body.dataset.base || '/'}projects/${project[0]}/`;
    link.innerHTML = `<span>${direction === 'previous' ? 'Previous case study' : 'Next case study'}</span><strong>${project[1]}</strong>`;
    return link;
  };
  if (previous) pagination.append(makeLink(previous, 'previous'));
  const all = document.createElement('a');
  all.className = 'case-all-link';
  all.href = `${document.body.dataset.base || '/'}#projects`;
  all.textContent = 'All projects';
  pagination.append(all);
  if (next) pagination.append(makeLink(next, 'next'));
  container.querySelector('.cs-content-grid')?.after(pagination);
}

/* --------------------------------------------------------------------------
   7. Fine-pointer project-card depth, disabled on touch and reduced motion
   -------------------------------------------------------------------------- */
function initProjectCardDepth() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--card-tilt-x', `${(x * 3.2).toFixed(2)}deg`);
      card.style.setProperty('--card-tilt-y', `${(-y * 2.4).toFixed(2)}deg`);
    }, { passive: true });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--card-tilt-x');
      card.style.removeProperty('--card-tilt-y');
    }, { passive: true });
  });
}


/* --------------------------------------------------------------------------
   8. Hero depth scene, fine pointers only
   -------------------------------------------------------------------------- */
function initHeroDepthScene() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('[data-depth-scene]').forEach(scene => {
    let frame = 0;
    let tiltX = 0;
    let tiltY = 0;
    const applyTilt = () => {
      scene.style.setProperty('--scene-tilt-x', `${tiltX.toFixed(2)}deg`);
      scene.style.setProperty('--scene-tilt-y', `${tiltY.toFixed(2)}deg`);
      frame = 0;
    };
    scene.addEventListener('pointermove', event => {
      const rect = scene.getBoundingClientRect();
      tiltX = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
      tiltY = -((event.clientY - rect.top) / rect.height - 0.5) * 6;
      if (!frame) frame = requestAnimationFrame(applyTilt);
    }, { passive: true });
    scene.addEventListener('pointerleave', () => {
      tiltX = 0;
      tiltY = 0;
      if (!frame) frame = requestAnimationFrame(applyTilt);
    }, { passive: true });
  });
}
