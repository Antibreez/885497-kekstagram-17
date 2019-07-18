'use strict';

(function (Random) {
  var getCommentSorting = function (prev, next) {
    return next.comments.length - prev.comments.length;
  };

  var getRandom = function (images) {
    return images.slice().sort(Random.getSorting).slice(0, 10);
  };

  var getSorted = function (images) {
    return images.slice().sort(getCommentSorting);
  };

  var getImages = function (images) {
    return images;
  };

  window.Filter = {
    discussed: getSorted,
    new: getRandom,
    popular: getImages
  };
})(window.Random);
