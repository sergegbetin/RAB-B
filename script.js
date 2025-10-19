'use strict';

// Année dynamique
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Scroll reveal simple
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.style.transition = 'all .7s cubic-bezier(.2,.8,.2,1)';
      e.target.style.transform = 'translateY(0)';
      e.target.style.opacity = '1';
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.15 });

for (const el of revealEls) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  io.observe(el);
}

// Navigation active on scroll (basic)
const sections = document.querySelectorAll('section[id]');
const links = Array.from(document.querySelectorAll('header nav a')).filter(a => a.getAttribute('href')?.startsWith('#'));

function setActiveLink() {
  let current = '';
  sections.forEach(sec => {
    const top = window.scrollY + 120;
    if (top >= sec.offsetTop && top < sec.offsetTop + sec.offsetHeight) {
      current = `#${sec.id}`;
    }
  });
  links.forEach(a => {
    if (a.getAttribute('href') === current) {
      a.classList.add('text-brand-teal');
    } else {
      a.classList.remove('text-brand-teal');
    }
  });
}
window.addEventListener('scroll', setActiveLink);
setActiveLink();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (!id || id.length <= 1) return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Fade-in on scroll for sections (lightweight; complements [data-reveal])
(function(){
  const secObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn .8s ease-in forwards';
        secObserver.unobserve(entry.target);
      }
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('section').forEach(sec => secObserver.observe(sec));
})();

// Newsletter form
(function(){
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const email = (input?.value || '').trim();
    if (!email) return;
    alert('Merci pour votre inscription à la newsletter !');
    form.reset();
  });
})();

// Adhesion modal (Adhérer / Soutenir / S'engager)
(function(){
  const modal = document.getElementById('adhesionModal');
  if (!modal) return;

  const tabButtons = () => Array.from(modal.querySelectorAll('.tab-btn'));
  const panels = () => Array.from(modal.querySelectorAll('[data-tab-panel]'));

  function openModal(defaultTab){
    modal.classList.remove('hidden');
    switchTab(defaultTab || 'adherer');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function switchTab(tab){
    panels().forEach(p => {
      p.classList.toggle('hidden', p.getAttribute('data-tab-panel') !== tab);
    });
    tabButtons().forEach(b => {
      const active = b.getAttribute('data-tab') === tab;
      b.classList.toggle('bg-brand-light', active);
      b.classList.toggle('text-brand-teal', active);
      b.classList.toggle('hover:bg-gray-100', !active);
    });
  }

  // Open triggers
  document.querySelectorAll('[data-open-modal="adhesion"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = btn.getAttribute('data-modal-tab');
      openModal(tab);
    });
  });

  // Close triggers
  modal.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });

  // Tab buttons
  tabButtons().forEach(b => {
    b.addEventListener('click', () => switchTab(b.getAttribute('data-tab')));
  });

  // Simple submit handlers
  const forms = ['form-adherer','form-soutenir','form-sengager']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  forms.forEach(f => {
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Merci, votre formulaire a été soumis. Nous vous contacterons très vite.');
      closeModal();
      f.reset();
    });
  });
})();
