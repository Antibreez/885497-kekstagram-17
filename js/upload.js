'use strict';

(function () {
  var DOM = window.DOM;
  var EffectChange = window.EffectChange;
  var Scale = window.Scale;

  var uploadFileInput = document.querySelector('#upload-file');

  var imageEditingContainer = document.querySelector('.img-upload__overlay');
  var uploadCancelButton = imageEditingContainer.querySelector('#upload-cancel');

  var scaleDownButton = imageEditingContainer.querySelector('.scale__control--smaller');
  var scaleUpButton = imageEditingContainer.querySelector('.scale__control--bigger');

  var imageEffects = imageEditingContainer.querySelector('.img-upload__effects');

  var imageDescriptionInput = imageEditingContainer.querySelector('.text__description');

  var onChangeEffect = function (evt) {
    EffectChange.Control.select(evt.target.value);
    EffectChange.Render();
  };

  var onScaleUpClick = function () {
    Scale.increase();
    Scale.render();
  };

  var onScaleDownClick = function () {
    Scale.decrease();
    Scale.render();
  };

  function Upload() {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onEnterPress = this._onEnterPress.bind(this);
  };

  Upload.prototype.open = function () {
    DOM.Element.show(imageEditingContainer);
    this._addEventListeners();
  };

  Upload.prototype.close = function () {
    DOM.Element.hide(imageEditingContainer);
    DOM.Element.clear(uploadFileInput);
    this._removeEventListeners();
  };

  Upload.prototype._onEscPress = function (evt) {
    return DOM.Event.isEscapeKey(evt)
      && DOM.Event.isNotTarget(evt, imageDescriptionInput)
      && this.close();
  };

  Upload.prototype._onEnterPress = function (evt) {
    return DOM.Event.isEnterKey(evt) && this.close();
  };

  Upload.prototype._addEventListeners = function () {
    document.addEventListener('keydown', this._onEscPress);

    uploadCancelButton.addEventListener('keydown', this._onEscPress);
    uploadCancelButton.addEventListener('click', this.close);
    imageEffects.addEventListener('change', onChangeEffect);
    scaleDownButton.addEventListener('click', onScaleDownClick);
    scaleUpButton.addEventListener('click', onScaleUpClick);
  };

  Upload.prototype._removeEventListeners = function () {
    document.removeEventListener('keydown', this._onEscPress);

    uploadCancelButton.removeEventListener('keydown', this._onEscPress);
    uploadCancelButton.removeEventListener('click', this.close);
    imageEffects.removeEventListener('change', onChangeEffect);
    scaleDownButton.removeEventListener('click', onScaleDownClick);
    scaleUpButton.removeEventListener('click', onScaleUpClick);
  };

  window.Upload = Upload;
})();
