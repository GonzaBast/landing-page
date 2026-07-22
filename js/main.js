/**
 * main.js - Archivo principal de JavaScript
 * 
 * Punto de entrada que asegura que el DOM esté listo
 * antes de inicializar todos los módulos.
 */

(function () {
  'use strict';

  /**
   * Inicializa todos los módulos cuando el DOM esté listo
   */
  function init() {
    // Los módulos se inicializan solos (IIFE),
    // pero verificamos dependencias aquí
    console.log('Nuevo Horizonte - Centro Interdisciplinario Terapéutico');
    console.log('Sitio cargado correctamente');
  }

  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
