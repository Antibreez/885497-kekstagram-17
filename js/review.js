'use strict';

(function (
    showElement,
    hideElement,
    isEscapeKey,
    isEnterKey,
    CommentLoader
) {
  var imageContainer = document.querySelector('.big-picture');
  var bigImage = imageContainer.querySelector('.big-picture__img img');
  var likeCount = imageContainer.querySelector('.likes-count');

  var commentCounter = imageContainer.querySelector('.social__comment-count');
  var commentCounterContent = commentCounter.innerHTML;
  var commentCounterTotal = commentCounter.querySelector('.comments-count');

  var description = imageContainer.querySelector('.social__caption');
  var cancelButton = imageContainer.querySelector('.cancel');

  var commentCounterReset = function () {
    commentCounter.innerHTML = commentCounterContent;
    commentCounterTotal = commentCounter.querySelector('.comments-count');
  };

  var Review = function () {
    this._close = this._close.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onEnterPress = this._onEnterPress.bind(this);

    this._commentLoader = new CommentLoader();
  };

  Review.prototype.show = function (image) {
    this._addEventListeners();
    this._commentLoader.start(image.comments);
    this._update(image);
    showElement(imageContainer);
  };

  Review.prototype._close = function () {
    commentCounterReset();
    this._commentLoader.showLoaderButton();
    hideElement(imageContainer);
    this._removeEventListeners();
  };

  Review.prototype._update = function (image) {
    bigImage.src = image.url;
    likeCount.textContent = image.likes;
    description.textContent = image.description;
    commentCounterTotal.textContent = image.comments.length;
    this._commentLoader.load();
  };

  Review.prototype._addEventListeners = function () {
    this._commentLoader.addEventListeners();
    cancelButton.addEventListener('click', this._close);
    cancelButton.addEventListener('keydown', this._onEnterPress);
    document.addEventListener('keydown', this._onEscPress);
  };

  Review.prototype._removeEventListeners = function () {
    this._commentLoader.removeEventListeners();
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
    window.DomUtil.show,
    window.DomUtil.hide,
    window.EventUtil.isEscapeKey,
    window.EventUtil.isEnterKey,
    window.CommentLoader
);
