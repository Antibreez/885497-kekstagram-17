'use strict';

(function () {
  window.DomUtil = {
    show: function (element) {
      element.classList.remove('hidden');
    },

    hide: function (element) {
      element.classList.add('hidden');
    },

    clear: function (input) {
      input.value = '';
    },

    makeFragmentRender: function (render) {
      return function (dataList) {
        var fragment = document.createDocumentFragment();
        dataList.forEach(function (data, idx) {
          fragment.appendChild(render(data, idx));
        });

        return fragment;
      };
    }
  };
})();
