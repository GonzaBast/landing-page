/**
 * faq.js - Acordeón de preguntas frecuentes
 * 
 * Gestiona:
 * - Apertura/cierre de cada item del acordeón
 * - Animación suave de expansión
 * - Cierre de otros items al abrir uno nuevo
 */

(function () {
  'use strict';

  var faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq__question');

    if (!question) return;

    question.addEventListener('click', function () {
      var isActive = item.classList.contains('active');

      // Cerrar todos los items
      faqItems.forEach(function (otherItem) {
        otherItem.classList.remove('active');
      });

      // Si no estaba activo, lo activamos
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

})();
