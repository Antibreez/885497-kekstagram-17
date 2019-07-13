'use strict';

(function () {
  window.DomUtil = {
    show: function (element) {
      element.classList.remove('hidden');
    },

    hide: function (element) {
      element.classList.add('hidden');
    },

    clear: function (input) {
      input.value = '';
    }
  };
})();
