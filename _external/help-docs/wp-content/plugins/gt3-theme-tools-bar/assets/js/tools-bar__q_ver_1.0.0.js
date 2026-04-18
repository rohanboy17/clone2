/**
 * GT3 Theme Tools Bar JavaScript
 *
 * @package Gt3_wize_core
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    var sidebar = document.querySelector('.gt3_tools_bar');
    if (!sidebar) return;

    var element = sidebar.querySelector('.gt3_tools_bar__icon_side_bar');
    var cover = document.querySelector('.gt3_tools_bar__sidebar-cover');
    var isLoaded = 0;

    // Check if animation has already been shown this session
    var hasSeenAnimation = sessionStorage.getItem('gt3_toolbar_shown');

    if (hasSeenAnimation) {
      sidebar.classList.add('no-animation', 'visible');
      sidebar.style.display = '';
    } else {
      window.addEventListener('load', function() {
        setTimeout(function() {
          sidebar.style.display = '';
          sidebar.classList.add('visible');
          sessionStorage.setItem('gt3_toolbar_shown', '1');
        }, 1000);
      });
    }

    /**
     * Toggle toolbar handler
     */
    function toolbarHandler() {
      var isActive = !element.classList.contains('active');
      lazyLoad();

      element.classList.toggle('active', isActive);
      sidebar.classList.toggle('active', isActive);
      document.body.classList.toggle('active_tools_bar_sidebar', isActive);
    }

    /**
     * Lazy load images in sidebar
     */
    function lazyLoad() {
      if (0 !== isLoaded) {
        return;
      }

      isLoaded = -1;
      var imgs = sidebar.querySelectorAll('img[data-src]');

      if (imgs.length) {
        var allImg = imgs.length;

        imgs.forEach(function(img) {
          img.setAttribute('src', img.getAttribute('data-src'));
          img.removeAttribute('data-src');

          img.addEventListener('load', function() {
            --allImg;
            if (!allImg) {
              isLoaded = 1;
              sidebar.classList.add('loaded');
            }
          });
        });
      }
    }

    // Bind click events
    if (element) element.addEventListener('click', toolbarHandler);
    if (cover) cover.addEventListener('click', toolbarHandler);
  });

})();
