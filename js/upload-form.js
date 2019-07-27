'use strict';

(function (backend, UploadResult, validateHashtags) {
  var form = document.querySelector('.img-upload__form');
  var hashtagInput = form.querySelector('.text__hashtags');

  var UploadForm = function (onResult) {
    this._onSubmit = this._onSubmit.bind(this);
    this._onResult = onResult;
    this._onSuccess = this._onSuccess.bind(this);
    this._onError = this._onError.bind(this);
    this._sendForm = this._sendForm.bind(this);

    this._uploadResult = new UploadResult(this._sendForm);
  };

  UploadForm.prototype._onInput = function () {
    hashtagInput.setCustomValidity('');
  };

  UploadForm.prototype._onSuccess = function () {
    this._onResult();
    this._uploadResult.onSuccess();
  };

  UploadForm.prototype._onError = function () {
    this._onResult();
    this._uploadResult.onError();
  };

  UploadForm.prototype._sendForm = function (data) {
    backend.save(data, this._onSuccess, this._onError);
  };

  UploadForm.prototype._onSubmit = function (evt) {
    evt.preventDefault();
    var data = new FormData(form);

    var errorMessage = validateHashtags(hashtagInput.value);
    if (errorMessage.length === 0) {
      this._sendForm(data);
    }

    hashtagInput.setCustomValidity(errorMessage);
    hashtagInput.reportValidity();
  };

  UploadForm.prototype.addEventListeners = function () {
    form.addEventListener('submit', this._onSubmit);
    hashtagInput.addEventListener('input', this._onInput);
  };

  UploadForm.prototype.removeEventListeners = function () {
    form.removeEventListener('submit', this._onSubmit);
    hashtagInput.removeEventListener('input', this._onInput);
  };

  window.UploadForm = UploadForm;
})(
    window.backend,
    window.UploadResult,
    window.HashtagValidation.getMessage
);
