/**
 * menu.js - Control del menú de navegación móvil y navbar sticky
 * 
 * Gestiona:
 * - Apertura/cierre del menú hamburguesa
 * - Cambio de estilo del header al hacer scroll
 * - Cierre del menú al hacer clic en un enlace
 * - Overlay para el menú móvil
 */

(function () {
  'use strict';

  const header = document.querySelector('.header');
  const toggle = document.querySelector('.header__toggle');
  const nav = document.querySelector('.header__nav');
  const overlay = document.querySelector('.header__overlay');
  const navLinks = document.querySelectorAll('.header__link');

  /**
   * Abre o cierra el menú móvil
   */
  function toggleMenu() {
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  }

  /**
   * Cierra el menú móvil
   */
  function closeMenu() {
    toggle.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Evento para el botón hamburguesa
  if (toggle) {
    toggle.addEventListener('click', toggleMenu);
  }

  // Evento para el overlay
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Cerrar menú al hacer clic en un enlace
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /**
   * Navbar sticky: cambia estilo al hacer scroll
   */
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

})();
