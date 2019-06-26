'use strict';

(function () {
  var DOM = window.DOM;

  var uploadPreviewImage = document.querySelector('.img-upload__preview img');
  var effectLevelContainer = document.querySelector('.effect-level');

  var removeEffect = function () {
    uploadPreviewImage.className = '';
    uploadPreviewImage.style.filter = '';
  };

  var addEffect = function (effect) {
    uploadPreviewImage.className = 'effects__preview--' + effect;
  };

  // var renderEffect = function () {
  //   removeEffect();

  //   if (!EffectControl.hasEffect()) {
  //     hideElement(effectLevelContainer);
  //     return;
  //   }

  //   addEffect(EffectControl.selected);
  //   showElement(effectLevelContainer);
  // };

  window.EffectChange = {
    Control: {
      selected: 'none',
      select: function (effect) {
        this.selected = effect;
      },
      hasEffect: function () {
        return this.selected !== 'none';
      }
    },

    Render: function () {
      removeEffect();

      if (!this.Control.hasEffect()) {
        DOM.Element.hide(effectLevelContainer);
        return;
      }

      addEffect(this.Control.selected);
      DOM.Element.show(effectLevelContainer);
    }
  };
})();
