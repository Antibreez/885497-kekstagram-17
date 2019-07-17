'use strict';

(function (Random, DomUtil) {
  var imageContainer = document.querySelector('.big-picture');
  var bigImage = imageContainer.querySelector('.big-picture__img img');
  var likes = imageContainer.querySelector('.likes-count');
  var commentsNumber = imageContainer.querySelector('.comments-count');
  var commentsList = imageContainer.querySelector('.social__comments');
  var commentItem = commentsList.querySelector('.social__comment');
  var description = imageContainer.querySelector('.social__caption');

  var removeComments = function () {
    var comments = commentsList.querySelectorAll('.social__comment');

    comments.forEach(function (element) {
      commentsList.removeChild(element);
    });
  };

  var makeComment = function (comment) {
    var item = commentItem.cloneNode(true);
    item.querySelector('.social__picture')
      .src = 'img/avatar-' + Random.getNum(1, 6) + '.svg';
    item.querySelector('.social__text')
      .textContent = comment.message;

    return item;
  };

  var fillComments = function (image) {
    removeComments();

    var fragment = document.createDocumentFragment();

    image.comments.forEach(function (comment) {
      fragment.appendChild(makeComment(comment));
    });

    commentsList.appendChild(fragment);
  };

  var Review = function () {};

  Review.prototype.open = function (currentImage) {
    DomUtil.show(imageContainer);
    this._fillImageInfo(currentImage);
  };

  Review.prototype._fillImageInfo = function (currentImage) {

    fillComments(currentImage);
    bigImage.src = currentImage.url;
    likes.textContent = currentImage.likes;
    commentsNumber.textContent = currentImage.comments.length;
    description.textContent = currentImage.description;
  };

  window.Review = Review;
})(window.Random, window.DomUtil);
