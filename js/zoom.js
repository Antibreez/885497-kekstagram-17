'use strict';

(function () {
  var scaleInput = document.querySelector('.scale__control--value');
  var scaleUpButton = document.querySelector('.scale__control--bigger');
  var scaleDownButton = document.querySelector('.scale__control--smaller');

  var Zoom = function (onScale, constrains) {
    this._scale = constrains.MAX;
    this._onUpClick = this._onUpClick.bind(this);
    this._onDownClick = this._onDownClick.bind(this);

    this.onScale = onScale;
    this._constrains = constrains;
  };

  Zoom.prototype.addEventListeners = function () {
    scaleUpButton.addEventListener('click', this._onUpClick);
    scaleDownButton.addEventListener('click', this._onDownClick);
  };

  Zoom.prototype.removeEventListeners = function () {
    scaleUpButton.removeEventListener('click', this._onUpClick);
    scaleDownButton.removeEventListener('click', this._onDownClick);
  };

  Zoom.prototype._onUpClick = function () {
    if (this._canIncrease()) {
      scaleInput.value = this._scale += this._constrains.STEP;
      this.onScale(this._scale);
    }
  };

  Zoom.prototype._onDownClick = function () {
    if (this._canDecrease()) {
      scaleInput.value = this._scale -= this._constrains.STEP;
      this.onScale(this._scale);
    }
  };

  Zoom.prototype._canIncrease = function () {
    return this._constrains.MAX >= this._scale + this._constrains.STEP;
  };

  Zoom.prototype._canDecrease = function () {
    return this._constrains.MIN <= this._scale - this._constrains.STEP;
  };

  Zoom.prototype.reset = function () {
    this.onScale(this._constrains.MAX);
  };

  window.Zoom = Zoom;
})();
