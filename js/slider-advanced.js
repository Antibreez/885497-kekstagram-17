// 'use strict';

// (function (EventUtil, Slider) {
//   var effectLevel = document.querySelector('.effect-level');
//   var effectLine = effectLevel.querySelector('.effect-level__line');
//   var effectPin = effectLine.querySelector('.effect-level__pin');

//   var getPinRect = function () {
//     return effectPin.getBoundingClientRect();
//   };

//   var SliderAdvanced = function (onChange) {
//     this._onKeyDown = this._onKeyDown.bind(this);
//     this._onPinFocus = this._onPinFocus.bind(this);
//     this._onPinBlur = this._onPinBlur.bind(this);
//   };

//   SliderAdvanced.prototype.__proto__ = Slider.prototype;

//   console.log(SliderAdvanced.hide);


//   SliderAdvanced.prototype.addEventListeners = function () {
//     this._addEventListeners();
//     effectPin.addEventListener('focus', this._onPinFocus);
//     effectPin.addEventListener('blur', this._onPinBlur);
//   };
//   SliderAdvanced.prototype.removeEventListeners = function () {
//     this._removeEventListeners();
//     effectPin.removeEventListener('focus', this._onPinFocus);
//     effectPin.removeEventListener('blur', this._onPinBlur);
//   };

//   SliderAdvanced.prototype._onPinFocus = function () {
//     effectPin.addEventListener('keydown', this._onKeyDown);
//   };

//   SliderAdvanced.prototype._onPinBlur = function () {
//     effectPin.removeEventListener('keydown', this._onKeyDown);
//   };

//   SliderAdvanced.prototype._onKeyDown = function (evt) {
//     if (EventUtil.isLeftKey(evt)) {
//       var shift = getShift(getPinRect() - 5);
//     } else if (EventUtil.isRightKey(evt)) {
//       var shift = getShift(getPinRect() + 5);
//     } else {
//       return;
//     }

//     return this._canMove(shift) && this._moveX(shift);
//   };

//   window.SliderAdvanced = SliderAdvanced;
// })(window.EventUtil, window.Slider);
