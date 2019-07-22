'use strict';

(function (EffectLineRect, DomUtil, EventUtil) {
  var showElement = DomUtil.show;
  var hideElement = DomUtil.hide;
  var makeDragStart = EventUtil.make.makeDragStart;

  var effectLevel = document.querySelector('.effect-level');
  var effectLine = effectLevel.querySelector('.effect-level__line');
  var effectPin = effectLine.querySelector('.effect-level__pin');
  var effectDepth = effectLine.querySelector('.effect-level__depth');

  var onPinStartX = function () {
    return effectPin.offsetLeft;
  };

  var canPinMove = function (x) {
    return x >= EffectLineRect.LEFT
      && x <= EffectLineRect.RIGHT;
  };

  var getVolume = function (x) {
    return Math.round(x * 100 / EffectLineRect.RIGHT);
  };

  var Slider = function (onChange) {
    this._onLineClick = this._onLineClick.bind(this);
    this._onPinMoveX = this._onPinMoveX.bind(this);
    this._onPinDrag = makeDragStart(onPinStartX, this._onPinMoveX);

    this.onChange = onChange;
  };

  Slider.prototype.addEventListeners = function () {
    effectLine.addEventListener('click', this._onLineClick);
    effectPin.addEventListener('mousedown', this._onPinDrag);
  };

  Slider.prototype.removeEventListeners = function () {
    effectLine.removeEventListener('click', this._onLineClick);
    effectPin.removeEventListener('mousedown', this._onPinDrag);
  };

  Slider.prototype.show = function () {
    showElement(effectLevel);
  };

  Slider.prototype.hide = function () {
    hideElement(effectLevel);
  };

  Slider.prototype.reset = function () {
    this._moveX(EffectLineRect.RIGHT);
  };

  Slider.prototype._moveX = function (x) {
    effectPin.style.left = x + 'px';
    effectDepth.style.width = x + 'px';
    this.onChange(getVolume(x));
  };

  Slider.prototype._onLineClick = function (evt) {
    if (evt.target !== effectPin) {
      evt.preventDefault();
      this._moveX(evt.offsetX);
    }
  };

  Slider.prototype._onPinMoveX = function (x) {
    return canPinMove(x) && this._moveX(x);
  };

  window.Slider = Slider;
})(
    window.Constants.EffectLineRect,
    window.DomUtil,
    window.EventUtil
);
