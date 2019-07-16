'use strict';

(function (Random) {
  var getCommentSorting = function (prev, next) {
    return next.comments.length - prev.comments.length;
  };

  var getImagesUrl = function (generator) {
    return function (images) {
      return generator(images).map(function (image) {
        return image.url;
      });
    };
  };

  var getRandom = function (images) {
    return images.slice().sort(Random.getSorting).slice(0, 10);
  };

  var getSorted = function (images) {
    return images.slice().sort(getCommentSorting);
  };

  var getImages = function (images) {
    return images.slice();
  };

  window.Filter = {
    popular: getImagesUrl(getImages),
    discussed: getImagesUrl(getSorted),
    new: getImagesUrl(getRandom)
  };
})(window.Random);
