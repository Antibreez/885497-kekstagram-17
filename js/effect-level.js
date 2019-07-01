'use strict';

(function (EffectChange) {
  var uploadPreviewImage = document.querySelector('.img-upload__preview img');

  var effectLevelContainer = document.querySelector('.effect-level');
  var effectLine = effectLevelContainer.querySelector('.effect-level__line');
  var effectPin = effectLevelContainer.querySelector('.effect-level__pin');
  var effectDepth = effectLevelContainer.querySelector('.effect-level__depth');

  var paddingLeft = window.getComputedStyle(effectLine).left;
  var paddingRight = window.getComputedStyle(effectLine).right;
  var width = window.getComputedStyle(effectLevelContainer).width;

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

  var Effect = {
    scale: makeEffect('scale', getDecimal),
    chrome: makeEffect('grayscale', getDecimal),
    sepia: makeEffect('sepia', getDecimal),
    marvin: makeEffect('invert', getPercent),
    phobos: makeEffect('blur', getPixel),
    heat: makeEffect('brightness', getBrightness)
  };

  var getNum = function (str) {
    return +str.slice(0, -2);
  };

  var getEffectValue = function (num) {
    return effectPin.offsetLeft * 100 / num;
  };

  window.EffectLevel = {
    Range: {
      MIN: 0,
      MAX: getNum(width) - getNum(paddingLeft) - getNum(paddingRight),
    },

    Start: {
      x: 'none',

      offset: 'none',

      setX: function (evt) {
        this.x = evt.clientX;
      },

      setOffset: function () {
        this.offset = effectPin.offsetLeft;
      }
    },

    isInRange: {
      min: function (moveEvt) {
        return (EffectLevel.Start.x - moveEvt.clientX) <= EffectLevel.Start.offset;
      },

      max: function (moveEvt) {
        return (moveEvt.clientX - EffectLevel.Start.x) <= (EffectLevel.Range.MAX - EffectLevel.Start.offset);
      }
    },

    calc: function () {
      uploadPreviewImage.style.filter = Effect[EffectChange.control.selected](getEffectValue(this.Range.MAX));
    },

    reset: function () {
      effectPin.style.left = this.Range.MAX + 'px';
      effectDepth.style.width = this.Range.MAX + 'px';
    },

    dragged: false
  };
})(window.EffectChange);
