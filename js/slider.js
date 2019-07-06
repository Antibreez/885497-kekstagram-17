'use strict';

(function (DOM) {
  var showElement = DOM.Element.show;
  var hideElement = DOM.Element.hide;
  var makeOnMouseDown = DOM.Event.make.onMouseDown;

  var effectLevel = document.querySelector('.effect-level');
  var effectLine = effectLevel.querySelector('.effect-level__line');
  var effectPin = effectLine.querySelector('.effect-level__pin');
  var effectDepth = effectLine.querySelector('.effect-level__depth');

  var getPosition = function (element) {
    return element.getBoundingClientRect().left;
  };

  var PressOffset = {
    value: 0,
    getOffset: function (evt) {
      this.value = evt.clientX - getPosition(evt.target);
    }
  };

  var getMoveOffset = function (moveEvt) {
    return moveEvt.clientX - PressOffset.value;
  };

  var getEffectVolume = function (num) {
    return Math.round(effectPin.offsetLeft * 100 / num);
  };

  var renderPin = function (value) {
    effectPin.style.left = value + 'px';
    effectDepth.style.width = value + 'px';
  };

  var Slider = function (onChange, constrains) {
    this._onPinMouseDown = this._onPinMouseDown.bind(this);
    this._onPinMouseMove = this._onPinMouseMove.bind(this);
    this._onLineClick = this._onLineClick.bind(this);

    this.onChange = onChange;
    this._constrains = constrains;
  };

  Slider.prototype._onLineClick = function (evt) {
    if (this._inMinRange(evt) && this._inMaxRange(evt)) {
      renderPin(evt.clientX - getPosition(effectLine));
      this.onChange(getEffectVolume(this._constrains.RANGE));
    } else if (!this._inMinRange(evt)) {
      renderPin(this._constrains.Position.MIN);
    } else if (!this._inMaxRange(evt)) {
      renderPin(this._constrains.Position.MAX);
    }

    this.onChange(getEffectVolume(this._constrains.RANGE));
  };

  Slider.prototype._onPinMouseDown = function (evt) {
    PressOffset.getOffset(evt);
  };

  Slider.prototype._onPinMouseMove = function (x, y, moveEvt) {
    window.requestAnimationFrame(function () {
      if (this._canDecrease(moveEvt) && this._canIncrease(moveEvt)) {
        renderPin(effectPin.offsetLeft - x);
      } else if (!this._canDecrease(moveEvt)) {
        renderPin(this._constrains.Position.MIN);
      } else if (!this._canIncrease(moveEvt)) {
        renderPin(this._constrains.Position.MAX);
      }
    }.bind(this));

    this.onChange(getEffectVolume(this._constrains.RANGE));
  };

  Slider.prototype.addEventListeners = function () {
    effectPin.addEventListener(
        'mousedown',
        makeOnMouseDown(this._onPinMouseDown, this._onPinMouseMove)
    );
    effectLine.addEventListener('click', this._onLineClick);
  };

  Slider.prototype.removeEventListeners = function () {
    effectPin.removeEventListener(
        'mousedown',
        makeOnMouseDown(this._onPinMouseDown, this._onPinMouseMove)
    );
    effectLine.removeEventListener('click', this._onLineClick);
  };

  Slider.prototype.show = function () {
    showElement(effectLevel);
  };

  Slider.prototype.hide = function () {
    hideElement(effectLevel);
  };

  Slider.prototype._canDecrease = function (moveEvt) {
    return getMoveOffset(moveEvt) >= getPosition(effectLine);
  };

  Slider.prototype._canIncrease = function (moveEvt) {
    return getMoveOffset(moveEvt)
      <= getPosition(effectLine) + this._constrains.LINE_WIDTH - this._constrains.PIN_WIDTH;
  };

  Slider.prototype._inMinRange = function (evt) {
    return evt.clientX >= (getPosition(effectLine) + this._constrains.Position.MIN);
  };

  Slider.prototype._inMaxRange = function (evt) {
    return evt.clientX <= (getPosition(effectLine) + this._constrains.Position.MAX);
  };

  Slider.prototype.reset = function () {
    renderPin(this._constrains.Position.MAX);
  };

  window.Slider = Slider;
})(window.DOM);
