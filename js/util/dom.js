'use strict';

(function () {
  var makeOnMouseDown = function (onMoveX) {
    return function (evt) {
      evt.preventDefault();

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        onMoveX(moveEvt.clientX);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp, {once: true});
    };
  };

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
      },

      make: {
        onMouseDown: makeOnMouseDown
      }
    }
  };

  window.DOM = DOM;
})();
