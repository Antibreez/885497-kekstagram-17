'use strict';

(function (DOM, EffectChange, Scale, EffectLevel) {
  var makeOnMouseDown = DOM.Event.make.onMouseDown;

  var uploadFileInput = document.querySelector('#upload-file');

  var imageContainer = document.querySelector('.img-upload__overlay');
  var uploadCancelButton = imageContainer.querySelector('#upload-cancel');

  var scaleDownButton = imageContainer.querySelector('.scale__control--smaller');
  var scaleUpButton = imageContainer.querySelector('.scale__control--bigger');

  var effectLine = imageContainer.querySelector('.effect-level__line');
  var effectPin = imageContainer.querySelector('.effect-level__pin');
  var effectDepth = imageContainer.querySelector('.effect-level__depth');

  var imageEffects = imageContainer.querySelector('.img-upload__effects');

  var imageDescriptionInput = imageContainer.querySelector('.text__description');

  var onChangeEffect = function (evt) {
    EffectChange.control.select(evt.target.value);
    EffectChange.render();
    EffectLevel.reset();
    EffectLevel.calc();
  };

  var onScaleUpClick = function () {
    Scale.increase();
    Scale.render();
  };

  var onScaleDownClick = function () {
    Scale.decrease();
    Scale.render();
  };

  var onEffectLineDown = function (evt) {
    evt.preventDefault();
    EffectLevel.dragged = false;

    var onEffectLineUp = function () {
      if (!EffectLevel.dragged && (evt.target !== effectPin)) {
        effectPin.style.left = evt.offsetX + 'px';
        effectDepth.style.width = evt.offsetX + 'px';
        EffectLevel.calc();
      }

      effectLine.removeEventListener('mouseup', onEffectLineUp);
    };

    effectLine.addEventListener('mouseup', onEffectLineUp);
  };

  var onEffectPinMouseDown = function (evt) {
    EffectLevel.Start.setX(evt);
    EffectLevel.Start.setOffset();
  };

  var onEffectPinMouseMove = function (x, y, moveEvt) {
    window.requestAnimationFrame(function () {
      if (EffectLevel.isInRange.min(moveEvt) && EffectLevel.isInRange.max(moveEvt)) {
        effectPin.style.left = effectPin.offsetLeft - x + 'px';
        effectDepth.style.width = effectPin.offsetLeft - x + 'px';
      } else if (!EffectLevel.isInRange.min(moveEvt)) {
        effectPin.style.left = EffectLevel.Range.MIN;
        effectDepth.style.width = EffectLevel.Range.MIN;
      } else if (!EffectLevel.isInRange.max(moveEvt)) {
        effectPin.style.left = EffectLevel.Range.MAX + 'px';
        effectDepth.style.width = EffectLevel.Range.MAX + 'px';
      }

      EffectLevel.calc();
      EffectLevel.dragged = true;
    });
  };

  var onEffectPinMouseUp = function () {
    effectPin.addEventListener('click', function (evt) {
      evt.preventDefault();
    }, {once: true});
  };

  var UploadPreview = function () {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onEnterPress = this._onEnterPress.bind(this);
    this._onMouseDown = this._onMouseDown.bind(this);
  };

  UploadPreview.prototype.open = function () {
    DOM.Element.show(imageContainer);
    this._addEventListeners();
  };

  UploadPreview.prototype.close = function () {
    DOM.Element.hide(imageContainer);
    DOM.Element.clear(uploadFileInput);
    this._removeEventListeners();
    EffectChange.reset();
  };

  UploadPreview.prototype._onEscPress = function (evt) {
    return DOM.Event.isEscapeKey(evt)
      && DOM.Event.isNotTarget(evt, imageDescriptionInput)
      && this.close();
  };

  UploadPreview.prototype._onEnterPress = function (evt) {
    return DOM.Event.isEnterKey(evt) && this.close();
  };

  UploadPreview.prototype._onMouseDown = makeOnMouseDown(onEffectPinMouseDown, onEffectPinMouseMove, onEffectPinMouseUp);

  UploadPreview.prototype._addEventListeners = function () {
    document.addEventListener('keydown', this._onEscPress);

    effectPin.addEventListener('mousedown', this._onMouseDown);
    uploadCancelButton.addEventListener('keydown', this._onEscPress);
    uploadCancelButton.addEventListener('click', this.close);
    imageEffects.addEventListener('change', onChangeEffect);
    scaleDownButton.addEventListener('click', onScaleDownClick);
    scaleUpButton.addEventListener('click', onScaleUpClick);
    effectLine.addEventListener('mousedown', onEffectLineDown);
  };

  UploadPreview.prototype._removeEventListeners = function () {
    document.removeEventListener('keydown', this._onEscPress);

    effectPin.removeEventListener('mousedown', this._onMouseDown);
    uploadCancelButton.removeEventListener('keydown', this._onEscPress);
    uploadCancelButton.removeEventListener('click', this.close);
    imageEffects.removeEventListener('change', onChangeEffect);
    scaleDownButton.removeEventListener('click', onScaleDownClick);
    scaleUpButton.removeEventListener('click', onScaleUpClick);
    effectLine.removeEventListener('mousedown', onEffectLineDown);
  };

  window.UploadPreview = UploadPreview;
})(window.DOM, window.EffectChange, window.Scale, window.EffectLevel);
