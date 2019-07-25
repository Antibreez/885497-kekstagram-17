'use strict';

(function (
    backend,
    DomUtil,
    EventUtil,
    EffectController,
    validateHashtags,
    UploadResult
) {
  var upload = document.querySelector('.img-upload__overlay');
  var cancelButton = upload.querySelector('#upload-cancel');

  var form = document.querySelector('.img-upload__form');
  var descInput = form.querySelector('.text__description');
  var hashtagInput = form.querySelector('.text__hashtags');

  var UploadPreview = function () {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onEnterPress = this._onEnterPress.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onSuccess = this._onSuccess.bind(this);
    this._onError = this._onError.bind(this);

    this._effectController = new EffectController();
    this._uploadResult = new UploadResult();
  };

  UploadPreview.prototype.open = function () {
    DomUtil.show(upload);
    this._effectController.purge();
    this._addEventListeners();
  };

  UploadPreview.prototype.close = function () {
    DomUtil.hide(upload);
    DomUtil.clear(hashtagInput, descInput);
    this._removeEventListeners();
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

  UploadPreview.prototype._onInput = function () {
    hashtagInput.setCustomValidity('');
  };

  UploadPreview.prototype._onSuccess = function () {
    this.close();
    this._uploadResult.openSuccess();
  };

  UploadPreview.prototype._onError = function () {
    this.close();
    this._uploadResult.openError();
  };

  UploadPreview.prototype._onSubmit = function (evt) {
    evt.preventDefault();

    var errorMessage = validateHashtags(hashtagInput.value);
    if (errorMessage.length === 0) {
      backend.save(new FormData(form), this._onSuccess, this._onError);
    }

    hashtagInput.setCustomValidity(errorMessage);
    hashtagInput.reportValidity();
  };

  UploadPreview.prototype._addEventListeners = function () {
    document.addEventListener('keydown', this._onEscPress);
    cancelButton.addEventListener('keydown', this._onEscPress);
    cancelButton.addEventListener('click', this.close);
    form.addEventListener('submit', this._onSubmit);
    hashtagInput.addEventListener('input', this._onInput);
    this._effectController.addEventListeners();
  };

  UploadPreview.prototype._removeEventListeners = function () {
    document.removeEventListener('keydown', this._onEscPress);
    cancelButton.removeEventListener('keydown', this._onEscPress);
    cancelButton.removeEventListener('click', this.close);
    form.removeEventListener('submit', this._onSubmit);
    hashtagInput.removeEventListener('input', this._onInput);
    this._effectController.removeEventListeners();
  };

  window.UploadPreview = UploadPreview;
})(
    window.backend,
    window.DomUtil,
    window.EventUtil,
    window.EffectController,
    window.HashtagValidation.getMessage,
    window.UploadResult
);
