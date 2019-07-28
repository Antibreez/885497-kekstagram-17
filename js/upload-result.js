'use strict';

(function (EventUtil) {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var setUploadResult = function (template) {
    main.appendChild(template.cloneNode(true));
  };

  var getMessageSection = function () {
    return main.querySelector('.success')
      || main.querySelector('.error');
  };

  var removeUploadResult = function () {
    main.removeChild(getMessageSection());
  };

  var UploadResult = function (submit) {
    this._onEscPress = this._onEscPress.bind(this);
    this._onOuterClick = this._onOuterClick.bind(this);
    this._onTryAgainClick = this._onTryAgainClick.bind(this);
    this._hide = this._hide.bind(this);
    this._submit = submit;
    this._isSuccess = true;
  };

  UploadResult.prototype.onSuccess = function () {
    this._show(successTemplate);
    this._addEventListeners();
    this._addSuccessEventListeners();
  };

  UploadResult.prototype.onError = function () {
    this._show(errorTemplate);
    this._addEventListeners();
    this._addErrorEventListeners();
    this._isSuccess = false;
  };

  UploadResult.prototype._show = function (template) {
    setUploadResult(template);
  };

  UploadResult.prototype._hide = function () {
    removeUploadResult();
    this._removeEventListeners();
  };

  UploadResult.prototype._addEventListeners = function () {
    document.addEventListener('keydown', this._onEscPress);
    document.addEventListener('click', this._onOuterClick);
  };

  UploadResult.prototype._addSuccessEventListeners = function () {
    this._successButton = main.querySelector('.success__button');
    this._successButton.addEventListener('click', this._hide);
  };

  UploadResult.prototype._addErrorEventListeners = function () {
    this._errorButtons = main.querySelectorAll('.error__button');
    this._errorButtons[0].addEventListener('click', this._onTryAgainClick);
    this._errorButtons[1].addEventListener('click', this._hide);
  };

  UploadResult.prototype._removeEventListeners = function () {
    document.removeEventListener('keydown', this._onEscPress);
    document.removeEventListener('click', this._onOuterClick);

    return this._isSuccess
      ? this._removeSuccessEventListeners()
      : this._removeErrorEventListeners();
  };

  UploadResult.prototype._removeSuccessEventListeners = function () {
    this._successButton.removeEventListener('click', this._hide);
  };

  UploadResult.prototype._removeErrorEventListeners = function () {
    this._errorButtons[0].addEventListener('click', this._onTryAgainClick);
    this._errorButtons[1].addEventListener('click', this._hide);
  };

  UploadResult.prototype._onTryAgainClick = function () {
    this._hide();
    this._submit();
  };

  UploadResult.prototype._onEscPress = function (evt) {
    return EventUtil.isEscapeKey(evt)
      && this._hide();
  };

  UploadResult.prototype._onOuterClick = function (evt) {
    var isScreenArea = ['error', 'success'].indexOf(evt.target.className) > -1;
    return isScreenArea && this._hide();
  };

  window.UploadResult = UploadResult;
})(window.EventUtil);
