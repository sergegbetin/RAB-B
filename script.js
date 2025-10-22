// RAD-B - Script principal
// Gestion des interactions et formulaires

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ RAD-B: Site chargé avec succès');

  // ==========================================
  // FORMULAIRE NEWSLETTER
  // ==========================================
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const submitBtn = newsletterForm.querySelector('button[type="submit"]');
      const email = emailInput.value;
      
      // Animation du bouton pendant l'envoi
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Envoi en cours...';
      submitBtn.disabled = true;
      
      // Simulation d'envoi (remplacez par votre API)
      setTimeout(() => {
        // Succès
        submitBtn.textContent = '✓ Inscrit !';
        submitBtn.classList.add('bg-green-500');
        
        // Message de confirmation
        alert(`✅ Merci pour votre inscription !\n\nVotre email (${email}) a été enregistré avec succès.\n\nVous recevrez prochainement nos actualités.`);
        
        // Réinitialisation
        setTimeout(() => {
          newsletterForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('bg-green-500');
        }, 2000);
      }, 1000);
    });
  }

  // ==========================================
  // SMOOTH SCROLL pour les ancres
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!' || href.length <= 1) return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==========================================
  // ANIMATIONS AU SCROLL (optionnel)
  // ==========================================
  const fadeElements = document.querySelectorAll('[data-reveal]');
  
  if (fadeElements.length > 0) {
    const revealOnScroll = () => {
      fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.85;
        
        if (isVisible && !el.classList.contains('fade-in')) {
          el.classList.add('fade-in');
        }
      });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Vérification initiale
  }

  // ==========================================
  // HEADER - ombre au scroll
  // ==========================================
  const header = document.querySelector('header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) {
        header.classList.add('shadow-lg');
      } else {
        header.classList.remove('shadow-lg');
      }
    });
  }

  console.log('✅ RAD-B: Tous les scripts sont actifs');
});
