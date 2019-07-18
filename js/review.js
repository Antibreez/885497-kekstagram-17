'use strict';

(function (Random, DomUtil) {
  var imageContainer = document.querySelector('.big-picture');
  var bigImage = imageContainer.querySelector('.big-picture__img img');
  var likes = imageContainer.querySelector('.likes-count');
  var commentsNumber = imageContainer.querySelector('.comments-count');
  var commentList = imageContainer.querySelector('.social__comments');
  var commentItem = commentList.querySelector('.social__comment');
  var description = imageContainer.querySelector('.social__caption');

  var removeComment = function (comment) {
    commentList.removeChild(comment);
  };

  var getAvatarSrc = function () {
    return 'img/avatar-' + Random.getNum(1, 6) + '.svg';
  };

  var renderComment = function (comment) {
    var item = commentItem.cloneNode(true);
    item.querySelector('.social__picture').src = getAvatarSrc();
    item.querySelector('.social__text').textContent = comment.message;

    return item;
  };

  var fillComments = function (image) {
    var fragment = document.createDocumentFragment();

    image.comments.forEach(function (comment) {
      fragment.appendChild(renderComment(comment));
    });

    commentList.querySelectorAll('.social__comment').forEach(removeComment);
    commentList.appendChild(fragment);
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
