'use strict';

(function () {
  var Data = window.Data;
  var Random = window.Random;
  var Sorting = window.Sorting;

  var NAMES = Data.NAMES;
  var COMMENTS = Data.COMMENTS;
  var ImageActivity = Data.ImageActivity;

  var getComment = function () {
    return {
      avatar: 'img/avatar-' + Random.getNum(1, 6) + '.svg',
      massage: Random.getItem(COMMENTS),
      name: Random.getItem(NAMES)
    };
  };

  var getRandomComments = function (min, max) {
    return Sorting.generateArray(Random.getNum(min, max), getComment);
  };

  var getImageData = function (id) {
    console.log(Random.getNum(ImageActivity.Like.MIN, ImageActivity.Like.MAX));

    return {
      url: 'photos/' + id + '.jpg',
      likes: Random.getNum(ImageActivity.Like.MIN, ImageActivity.Like.MAX),
      comments: getRandomComments(ImageActivity.Comment.MIN, ImageActivity.Comment.MAX),
    };
  };

  var getImagesData = function (num) {
    return Sorting.getArray(num).map(getImageData);
  };

  window.Mock = {
    load: getImagesData
  };
})();
