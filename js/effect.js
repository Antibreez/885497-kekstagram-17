'use strict';

(function () {
  var makeFilter = function (name, formula) {
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
    return Math.round(value * 3) / 100 + 'px';
  };

  var getBrightness = function (value) {
    return Math.round(value * 2) / 100 + 1;
  };

  var getPurge = function () {
    return '';
  };

  window.Effect = {
    scale: makeFilter('scale', getDecimal),
    chrome: makeFilter('grayscale', getDecimal),
    sepia: makeFilter('sepia', getDecimal),
    marvin: makeFilter('invert', getPercent),
    phobos: makeFilter('blur', getPixel),
    heat: makeFilter('brightness', getBrightness),
    none: getPurge,
  };
})();
