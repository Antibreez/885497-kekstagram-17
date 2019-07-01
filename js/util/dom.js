'use strict';

(function () {
  var makeOnMouseDown = function (onDown, onMove, onUp) {
    return function (evt) {
      evt.preventDefault();

      var start = {x: evt.clientX, y: evt.clientY};

      onDown(evt);

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        if (onMove) {
          onMove(
              start.x - moveEvt.clientX,
              start.y - moveEvt.clientY,
              moveEvt
          );
        }

        start.x = moveEvt.clientX;
        start.y = moveEvt.clientY;
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        return onUp && onUp(upEvt);
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
