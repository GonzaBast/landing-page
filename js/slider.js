/**
 * slider.js - Slider automático de testimonios
 * 
 * Gestiona:
 * - Carrusel de testimonios con auto-play
 * - Navegación por botones anterior/siguiente
 * - Indicadores de posición (dots)
 * - Pausa al hacer hover
 */

(function () {
  'use strict';

  var track = document.querySelector('.testimonials__track');
  var slides = document.querySelectorAll('.testimonials__slide');
  var prevBtn = document.querySelector('.testimonials__btn--prev');
  var nextBtn = document.querySelector('.testimonials__btn--next');
  var dotsContainer = document.querySelector('.testimonials__dots');

  if (!track || slides.length === 0) return;

  var currentIndex = 0;
  var totalSlides = slides.length;
  var autoplayInterval = null;

  /**
   * Crea los dots indicadores
   */
  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';

    for (var i = 0; i < totalSlides; i++) {
      var dot = document.createElement('button');
      dot.classList.add('testimonials__dot');
      dot.setAttribute('aria-label', 'Ir al testimonio ' + (i + 1));
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', function (index) {
        return function () {
          goToSlide(index);
          resetAutoplay();
        };
      }(i));
      dotsContainer.appendChild(dot);
    }
  }

  /**
   * Navega a un slide específico
   */
  function goToSlide(index) {
    currentIndex = index;
    var offset = -currentIndex * 100;
    track.style.transform = 'translateX(' + offset + '%)';

    // Actualizar dots activos
    var dots = document.querySelectorAll('.testimonials__dot');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  /**
   * Va al slide siguiente
   */
  function nextSlide() {
    var next = (currentIndex + 1) % totalSlides;
    goToSlide(next);
  }

  /**
   * Va al slide anterior
   */
  function prevSlide() {
    var prev = (currentIndex - 1 + totalSlides) % totalSlides;
    goToSlide(prev);
  }

  /**
   * Inicia autoplay
   */
  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  /**
   * Detiene autoplay
   */
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  /**
   * Reinicia autoplay (usado tras navegación manual)
   */
  function resetAutoplay() {
    startAutoplay();
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener('click', function () { nextSlide(); resetAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', function () { prevSlide(); resetAutoplay(); });

  // Pausar al hacer hover sobre el slider
  var slider = document.querySelector('.testimonials__slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
  }

  // Iniciar
  createDots();
  startAutoplay();

})();
