'use strict';

(function (DOM) {
  var showElement = DOM.Element.show;
  var hideElement = DOM.Element.hide;
  var makeOnMouseDown = DOM.Event.make.onMouseDown;

  var effectLevel = document.querySelector('.effect-level');
  var effectLine = effectLevel.querySelector('.effect-level__line');
  var effectPin = effectLine.querySelector('.effect-level__pin');
  var effectDepth = effectLine.querySelector('.effect-level__depth');

  var getLineRect = function () {
    return effectLine.getBoundingClientRect();
  };

  var getShift = function (x) {
    var rect = getLineRect();
    return {
      x: x,
      offset: x - rect.left,
      range: rect.width,
      left: rect.left,
      right: rect.right,
    };
  };

  var getDefaultShift = function () {
    var width = getLineRect().width;
    return {
      offset: width,
      range: width,
    };
  };

  var canMove = function (shift) {
    return Math.min(shift.x, shift.offset, shift.left) >= 0
      && Math.min(shift.x, shift.offset, shift.right) <= shift.range;
  };

  var getVolume = function (shift) {
    return Math.round(shift.offset * 100 / shift.range);
  };

  var Slider = function (onChange) {
    this._onPinMouseMove = this._onPinMouseMove.bind(this);
    this._onLineClick = this._onLineClick.bind(this);
    this._onMouseDown = makeOnMouseDown(this._onPinMouseMove);

    this.onChange = onChange;
  };

  Slider.prototype.addEventListeners = function () {
    effectPin.addEventListener('mousedown', this._onMouseDown);
    effectLine.addEventListener('click', this._onLineClick);
  };

  Slider.prototype.removeEventListeners = function () {
    effectPin.removeEventListener('mousedown', this._onMouseDown);
    effectLine.removeEventListener('click', this._onLineClick);
  };

  Slider.prototype.show = function () {
    showElement(effectLevel);
  };

  Slider.prototype.hide = function () {
    hideElement(effectLevel);
  };

  Slider.prototype.reset = function () {
    this._moveX(getDefaultShift());
  };

  Slider.prototype._moveX = function (shift) {
    effectPin.style.left = shift.offset + 'px';
    effectDepth.style.width = shift.offset + 'px';
    this.onChange(getVolume(shift));
  };

  Slider.prototype._onLineClick = function (evt) {
    evt.preventDefault();
    this._moveX(getShift(evt.clientX));
  };

  Slider.prototype._onPinMouseMove = function (x) {
    var shift = getShift(x)
    return canMove(shift) && this._moveX(shift);
  };

  window.Slider = Slider;
})(window.DOM);
