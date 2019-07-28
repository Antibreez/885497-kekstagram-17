'use strict';

(function (backend, UploadResult, validateHashtags) {
  var form = document.querySelector('.img-upload__form');
  var hashtagInput = form.querySelector('.text__hashtags');

  var UploadForm = function (onSend) {
    this.data = {};
    this.isSuccess = true;
    this._onSubmit = this._onSubmit.bind(this);
    this._onSend = onSend;
    this._onSuccess = this._onSuccess.bind(this);
    this._onError = this._onError.bind(this);
    this._submit = this._submit.bind(this);

    this._uploadResult = new UploadResult(this._submit);
  };

  UploadForm.prototype._onInput = function () {
    hashtagInput.setCustomValidity('');
  };

  UploadForm.prototype._onSuccess = function () {
    this._onSend();
    this._uploadResult.onSuccess();
  };

  UploadForm.prototype._onError = function () {
    this.isSuccess = false;
    this._onSend();
    this._uploadResult.onError();
  };

  UploadForm.prototype._submit = function () {
    backend.save(this.data, this._onSuccess, this._onError);
  };

  UploadForm.prototype._onSubmit = function (evt) {
    evt.preventDefault();

    var errorMessage = validateHashtags(hashtagInput.value);
    if (errorMessage.length === 0) {
      this.data = new FormData(form);
      this._submit();
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
