'use strict';

(function (DOM, EffectController) {
  var upload = document.querySelector('.img-upload__overlay');
  var cancelButton = upload.querySelector('#upload-cancel');

  var descInput = upload.querySelector('.text__description');

  var UploadPreview = function () {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onEnterPress = this._onEnterPress.bind(this);

    this._effectController = new EffectController();
  };

  UploadPreview.prototype.open = function () {
    DOM.Element.show(upload);
    this._effectController.purge();
    this._addEventListeners();
  };

  UploadPreview.prototype.close = function () {
    DOM.Element.hide(upload);
    this._removeEventListeners();
  };

  UploadPreview.prototype._onEscPress = function (evt) {
    return DOM.Event.isEscapeKey(evt)
      && DOM.Event.isNotTarget(evt, descInput)
      && this.close();
  };

  UploadPreview.prototype._onEnterPress = function (evt) {
    return DOM.Event.isEnterKey(evt) && this.close();
  };

  UploadPreview.prototype._addEventListeners = function () {
    document.addEventListener('keydown', this._onEscPress);
    cancelButton.addEventListener('keydown', this._onEscPress);
    cancelButton.addEventListener('click', this.close);
    this._effectController.addEventListeners();
  };

  UploadPreview.prototype._removeEventListeners = function () {
    document.removeEventListener('keydown', this._onEscPress);
    cancelButton.removeEventListener('keydown', this._onEscPress);
    cancelButton.removeEventListener('click', this.close);
    this._effectController.removeEventListeners();
  };

  window.UploadPreview = UploadPreview;
})(window.DOM, window.EffectController);
