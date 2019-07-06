'use strict';

(function () {
  var makeEffect = function (name, formula) {
    return function (value) {
      return name + '(' + formula(value) + ')';
    };
  };

  var getDecimal = function (value) {
    return Math.round(value) / 100;
  };

  var getPercent = function (value) {
    return Math.round(value) + '%';
  };

  var getPixel = function (value) {
    return (Math.round(value * 3) / 100) + 'px';
  };

  var getBrightness = function (value) {
    return (Math.round(value * 2) / 100) + 1;
  };

  window.Effect = {
    scale: makeEffect('scale', getDecimal),
    chrome: makeEffect('grayscale', getDecimal),
    sepia: makeEffect('sepia', getDecimal),
    marvin: makeEffect('invert', getPercent),
    phobos: makeEffect('blur', getPixel),
    heat: makeEffect('brightness', getBrightness)
  };
})();
