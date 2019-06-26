'use strict';

(function () {
  var DOM = {
    Element: {
      show: function (element) {
        element.classList.remove('hidden');
      },

      hide: function (element) {
        element.classList.add('hidden');
      },

      clear: function (input) {
        input.value = '';
      }
    },

    Event: {
      isEscapeKey: function (evt) {
        return evt.key === 'Esc' || evt.key === 'Escape';
      },

      isEnterKey: function (evt) {
        return evt.key === 'Enter';
      },

      isNotTarget: function (evt, element) {
        return evt.target !== element;
      }
    },
  };

  window.DOM = DOM;
})();
