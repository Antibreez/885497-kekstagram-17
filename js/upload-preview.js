'use strict';

(function (
    DomUtil,
    EventUtil,
    EffectController,
    UploadForm
) {
  var upload = document.querySelector('.img-upload__overlay');
  var cancelButton = upload.querySelector('#upload-cancel');

  var form = document.querySelector('.img-upload__form');
  var descInput = form.querySelector('.text__description');
  var hashtagInput = form.querySelector('.text__hashtags');

  var UploadPreview = function (onSuccess) {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onEnterPress = this._onEnterPress.bind(this);
    this._onFormSend = this._onFormSend.bind(this);
    this._onSuccess = onSuccess;

    this._effectController = new EffectController();
    this._uploadForm = new UploadForm(this._onFormSend);
  };

  UploadPreview.prototype.open = function () {
    DomUtil.show(upload);
    this._effectController.purge();
    this._addEventListeners();
    this._uploadForm.addEventListeners();
  };

  UploadPreview.prototype.close = function () {
    DomUtil.hide(upload);
    DomUtil.clear(hashtagInput, descInput);
    this._removeEventListeners();
    this._uploadForm.removeEventListeners();
  };

  UploadPreview.prototype._onFormSend = function () {
    this.close();

    if (this._uploadForm.isSuccess) {
      this._onSuccess();
    }
  };

  UploadPreview.prototype._onEscPress = function (evt) {
    return EventUtil.isEscapeKey(evt)
      && EventUtil.isNotTarget(evt, descInput)
      && EventUtil.isNotTarget(evt, hashtagInput)
      && this.close();
  };

  UploadPreview.prototype._onEnterPress = function (evt) {
    return EventUtil.isEnterKey(evt) && this.close();
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
})(
    window.DomUtil,
    window.EventUtil,
    window.EffectController,
    window.UploadForm
);
