/**
 * scroll.js - Animaciones al hacer scroll y contador
 * 
 * Gestiona:
 * - IntersectionObserver para animaciones fade-in
 * - Contador numérico animado en estadísticas
 * - Scroll suave al hacer clic en enlaces internos
 */

(function () {
  'use strict';

  /* ========================================
     INTERSECTION OBSERVER - Animaciones fade-in
     ======================================== */

  var fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    // Fallback: mostrar todos los elementos si no hay soporte
    fadeElements.forEach(function (el) {
      el.classList.add('appear');
    });
  }

  /* ========================================
     CONTADOR ANIMADO - Estadísticas
     ======================================== */

  var statNumbers = document.querySelectorAll('.stats__number');
  var counted = false;

  /**
   * Anima el conteo de un elemento numérico
   */
  function animateCounter(element) {
    var target = parseInt(element.getAttribute('data-count'), 10);
    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var current = Math.floor(progress * target);
      element.textContent = (element.dataset.suffix || '') + current + (element.dataset.after || '');
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = (element.dataset.suffix || '') + target + (element.dataset.after || '');
      }
    }

    requestAnimationFrame(step);
  }

  /**
   * Inicia los contadores si son visibles
   */
  function startCounters(entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !counted) {
        counted = true;
        statNumbers.forEach(animateCounter);
      }
    });
  }

  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    var statsSection = document.querySelector('.stats');
    if (statsSection) {
      var counterObserver = new IntersectionObserver(startCounters, { threshold: 0.3 });
      counterObserver.observe(statsSection);
    } else {
      // Si no hay sección stats, contar inmediatamente
      statNumbers.forEach(animateCounter);
    }
  } else if (statNumbers.length > 0) {
    statNumbers.forEach(animateCounter);
  }

  /* ========================================
     SCROLL SUAVE - Enlaces de anclaje
     ======================================== */

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        var headerOffset = 80;
        var elementPosition = targetElement.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

})();
