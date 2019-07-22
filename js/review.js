'use strict';

(function (
    Random,
    showElement,
    hideElement,
    isEscapeKey,
    isEnterKey
) {
  var imageContainer = document.querySelector('.big-picture');
  var bigImage = imageContainer.querySelector('.big-picture__img img');
  var likeCount = imageContainer.querySelector('.likes-count');
  var commentCount = imageContainer.querySelector('.comments-count');
  var commentList = imageContainer.querySelector('.social__comments');
  var commentItem = commentList.querySelector('.social__comment');
  var description = imageContainer.querySelector('.social__caption');
  var cancelButton = imageContainer.querySelector('.cancel');

  var getAvatarSrc = function () {
    return 'img/avatar-' + Random.getNum(1, 6) + '.svg';
  };

  var renderComment = function (comment) {
    var item = commentItem.cloneNode(true);
    item.querySelector('.social__picture').src = getAvatarSrc();
    item.querySelector('.social__text').textContent = comment.message;

    return item;
  };

  var removeComment = function (comment) {
    commentList.removeChild(comment);
  };

  var setComments = function (comments) {
    var fragment = document.createDocumentFragment();
    comments.forEach(function (comment) {
      fragment.appendChild(renderComment(comment));
    });

    commentList.querySelectorAll('.social__comment').forEach(removeComment);
    commentList.appendChild(fragment);
  };

  var Review = function () {
    this._close = this._close.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onEnterPress = this._onEnterPress.bind(this);
  };

  Review.prototype.show = function (image) {
    this._addEventListeners();
    this._update(image);
    showElement(imageContainer);
  };

  Review.prototype._close = function () {
    hideElement(imageContainer);
    this._removeEventListeners();
  };

  Review.prototype._update = function (image) {
    bigImage.src = image.url;
    likeCount.textContent = image.likes;
    description.textContent = image.description;
    commentCount.textContent = image.comments.length;
    setComments(image.comments);
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

  Review.prototype._onEscPress = function (evt) {
    return isEscapeKey(evt) && this._close();
  };

  Review.prototype._onEnterPress = function (evt) {
    return isEnterKey(evt) && this._close();
  };

  window.Review = Review;
})(
    window.Random,
    window.DomUtil.show,
    window.DomUtil.hide,
    window.EventUtil.isEscapeKey,
    window.EventUtil.isEnterKey
);
