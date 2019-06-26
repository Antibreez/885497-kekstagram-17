'use strict';

(function () {
  var Effect = window.Effect;
  var Data = window.Data;

  var scaleValueInput = document.querySelector('.scale__control--value');
  var uploadPreviewImage = document.querySelector('.img-upload__preview img');

  window.Scale = {
    value: 100,
    increase: function () {
      if (this.canIncrease()) {
        this.value += Data.ImageScale.STEP;
      }
    },
    decrease: function () {
      if (this.canDecrease()) {
        this.value -= Data.ImageScale.STEP;
      }
    },
    canIncrease: function () {
      return Data.ImageScale.MAX >= this.value + Data.ImageScale.STEP;
    },
    canDecrease: function () {
      return Data.ImageScale.MIN <= this.value - Data.ImageScale.STEP;
    },

    render: function () {
      scaleValueInput.value = Scale.value + '%';
      uploadPreviewImage.style.transform = Effect.scale(Scale.value);
    }
  };
})();
