'use strict';

(function (DOM) {
  var uploadPreviewImage = document.querySelector('.img-upload__preview img');
  var effectLevelContainer = document.querySelector('.effect-level');

  var removeEffect = function () {
    uploadPreviewImage.className = '';
    uploadPreviewImage.style.filter = '';
  };

  var addEffect = function (effect) {
    uploadPreviewImage.className = 'effects__preview--' + effect;
  };

  window.EffectChange = {
    control: {
      selected: 'none',
      select: function (effect) {
        this.selected = effect;
      },
      hasEffect: function () {
        return this.selected !== 'none';
      }
    },

    render: function () {
      removeEffect();

      if (!this.control.hasEffect()) {
        DOM.Element.hide(effectLevelContainer);
        return;
      }

      addEffect(this.control.selected);
      DOM.Element.show(effectLevelContainer);
    },

    reset: function () {
      this.control.selected = 'none';
      this.render();
    }
  };
})(window.DOM);
