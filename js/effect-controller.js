'use strict';

(function (ImageScale, SliderData, Zoom, Slider, Effect) {
  var previewImage = document.querySelector('.img-upload__preview img');
  var effectFields = document.querySelector('.img-upload__effects');
  var effectNone = effectFields.querySelector('#effect-none');

  var EffectController = function () {
    this._effect = 'none';
    this._onEffectChange = this._onEffectChange.bind(this);
    this._onZoomChange = this._onZoomChange.bind(this);
    this._onSliderChange = this._onSliderChange.bind(this);

    this._zoom = new Zoom(this._onZoomChange, ImageScale);
    this._slider = new Slider(this._onSliderChange, SliderData);
  };

  EffectController.prototype.addEventListeners = function () {
    effectFields.addEventListener('change', this._onEffectChange);
    this._zoom.addEventListeners();
    this._slider.addEventListeners();
  };

  EffectController.prototype.removeEventListeners = function () {
    effectFields.removeEventListener('change', this._onEffectChange);
    this._zoom.removeEventListeners();
    this._slider.removeEventListeners();
  };

  EffectController.prototype.purge = function () {
    this._effect = 'none';
    this._applyEffect();
    this._zoom.reset();

    effectNone.checked = true;
  };

  EffectController.prototype._getEffectClass = function () {
    return this._effect === 'none' ? '' : 'effects__preview--' + this._effect;
  };

  EffectController.prototype._applyEffect = function () {
    previewImage.style.filter = '';
    previewImage.className = this._getEffectClass();

    if (this._effect === 'none') {
      this._slider.hide();
    } else {
      this._slider.show();
    }
  };

  EffectController.prototype._onEffectChange = function (evt) {
    this._effect = evt.target.value;
    this._applyEffect();
    this._slider.reset();
  };

  EffectController.prototype._onZoomChange = function (scale) {
    previewImage.style.transform = Effect.scale(scale);
  };

  EffectController.prototype._onSliderChange = function (volume) {
    // volume = 0..100 (%)
    previewImage.style.filter = Effect[this._effect](volume);
  };

  window.EffectController = EffectController;
})(
    window.Constants.ImageScale,
    window.Constants.SliderData,
    window.Zoom, window.Slider,
    window.Effect
);
