'use strict';

(function (Effect, Constants) {
  var scaleInput = document.querySelector('.scale__control--value');
  var uploadPreviewImage = document.querySelector('.img-upload__preview img');

  window.Scale = {
    value: 100,
    increase: function () {
      if (this.canIncrease()) {
        this.value += Constants.ImageScale.STEP;
      }
    },
    decrease: function () {
      if (this.canDecrease()) {
        this.value -= Constants.ImageScale.STEP;
      }
    },
    canIncrease: function () {
      return Constants.ImageScale.MAX >= this.value + Constants.ImageScale.STEP;
    },
    canDecrease: function () {
      return Constants.ImageScale.MIN <= this.value - Constants.ImageScale.STEP;
    },

    render: function () {
      scaleInput.value = this.value + '%';
      uploadPreviewImage.style.transform = EffectLevel.Effect.scale(this.value);
    }
  };
})(window.Effect, window.Constants);
