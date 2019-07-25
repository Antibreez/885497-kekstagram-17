'use strict';

(function (EventUtil) {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var setUploadResult = function (template) {
    main.appendChild(template.cloneNode(true));
  };

  var removeUploadResult = function () {
    main.removeChild(main.lastChild);
  };

  var getCloseButtons = function (resultName) {
    return main.querySelectorAll('.' + resultName + '__button');
  };

  var UploadResult = function () {
    this._close = this._close.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onOuterClick = this._onOuterClick.bind(this);
  };

  UploadResult.prototype.openSuccess = function () {
    setUploadResult(successTemplate);
    this._addEventListeners('success');
  };

  UploadResult.prototype.openError = function () {
    setUploadResult(errorTemplate);
    this._addEventListeners('error');
  };

  UploadResult.prototype._close = function (resultName) {
    removeUploadResult();
    this._removeEventListeners(resultName);
  };

  UploadResult.prototype._onOuterClick = function (resultName) {
    return function (evt) {
      return evt.target.className === resultName
        && this._close(resultName);
    }.bind(this);
  };

  UploadResult.prototype._onEscPress = function (resultName) {
    return function (evt) {
      return EventUtil.isEscapeKey(evt)
      && this._close(resultName);
    }.bind(this);
  };

  UploadResult.prototype._onCloseClick = function (resultName) {
    return function () {
      this._close(resultName);
    }.bind(this);
  };

  UploadResult.prototype._addEventListeners = function (resultName) {
    document.addEventListener('keydown', this._onEscPress(resultName));

    getCloseButtons(resultName).forEach(function (button) {
      button.addEventListener('click', this._onCloseClick(resultName));
    }.bind(this));

    document.addEventListener('click', this._onOuterClick(resultName));
  };

  UploadResult.prototype._removeEventListeners = function (resultName) {
    document.removeEventListener('keydown', this._onEscPress(resultName));

    getCloseButtons(resultName).forEach(function (button) {
      button.removeEventListener('click', this._close);
    }.bind(this));

    document.removeEventListener('click', this._onOuterClick(resultName));
  };

  window.UploadResult = UploadResult;
})(window.EventUtil);
