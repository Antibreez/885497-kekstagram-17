'use strict';

(function (Random, DomUtil, EventUtil) {
  var imageContainer = document.querySelector('.big-picture');
  var bigImage = imageContainer.querySelector('.big-picture__img img');
  var likes = imageContainer.querySelector('.likes-count');
  var commentsNumber = imageContainer.querySelector('.comments-count');
  var commentList = imageContainer.querySelector('.social__comments');
  var commentItem = commentList.querySelector('.social__comment');
  var description = imageContainer.querySelector('.social__caption');
  var cancelButton = imageContainer.querySelector('.cancel');

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

  var Review = function () {
    this.open = this.open.bind(this);
    this._close = this._close.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onEnterPress = this._onEnterPress.bind(this);
  };

  Review.prototype.open = function (currentImage) {
    DomUtil.show(imageContainer);
    this._fillImageInfo(currentImage);
    this._addEventListeners();
  };

  Review.prototype._close = function () {
    DomUtil.hide(imageContainer);
    this._removeEventListeners();
  };

  Review.prototype._onEscPress = function (evt) {
    return EventUtil.isEscapeKey(evt) && this._close();
  };

  Review.prototype._onEnterPress = function (evt) {
    return EventUtil.isEnterKey(evt) && this._close();
  };

  Review.prototype._fillImageInfo = function (currentImage) {
    fillComments(currentImage);
    bigImage.src = currentImage.url;
    likes.textContent = currentImage.likes;
    commentsNumber.textContent = currentImage.comments.length;
    description.textContent = currentImage.description;
  };

  Review.prototype._addEventListeners = function () {
    cancelButton.addEventListener('click', this._close);
    cancelButton.addEventListener('keydown', this._onEnterPress);
    document.addEventListener('keydown', this._onEscPress);
  };

  Review.prototype._removeEventListeners = function () {
    cancelButton.removeEventListener('click', this._close);
    cancelButton.removeEventListener('keydown', this._onEnterPress);
    document.removeEventListener('keydown', this._onEscPress);
  };

  window.Review = Review;
})(window.Random, window.DomUtil, window.EventUtil);
