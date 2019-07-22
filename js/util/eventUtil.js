'use strict';

(function () {
  var DEBOUNCE_DELAY = 500;

  var makeDragStart = function (onStartX, onMoveX) {
    return function (evt) {
      evt.preventDefault();
      var startX = onStartX(evt) || 0;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        onMoveX(startX + moveEvt.clientX - evt.clientX);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp, {once: true});
    };
  };

  window.EventUtil = {
    isEscapeKey: function (evt) {
      return evt.key === 'Esc' || evt.key === 'Escape';
    },

    isEnterKey: function (evt) {
      return evt.key === 'Enter';
    },

    isLeftKey: function (evt) {
      return evt.key === 'Left' || evt.key === 'ArrowLeft';
    },

    isRightKey: function (evt) {
      return evt.key === 'Right' || evt.key === 'ArrowRight';
    },

    isNotTarget: function (evt, element) {
      return evt.target !== element;
    },

    make: {
      makeDragStart: makeDragStart
    },

    debounce: function (onDelay, delay) {
      var timeoutId = 0;
      return function () {
        var params = arguments;

        if (timeoutId > 0) {
          clearTimeout(timeoutId);
        }

        var onTimeout = function () {
          onDelay.apply(null, params);
        };

        timeoutId = setTimeout(onTimeout, delay || DEBOUNCE_DELAY);
      };
    }
  };
})();
