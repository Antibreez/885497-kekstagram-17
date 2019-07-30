'use strict';

(function (
    Random,
    isHidden,
    makeFragmentRender,
    hideElement,
    showElement,
    isEnterKey
) {
  var commentList = document.querySelector('.social__comments');
  var commentItem = commentList.querySelector('.social__comment');
  var commentLoaderButton = document.querySelector('.comments-loader');

  var counter = document.querySelector('.social__comment-count');

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

  var getCommentFragment = makeFragmentRender(renderComment);

  var changeCounter = function () {
    var newCount = commentList.children.length;
    var counterWords = counter.textContent.split(' ');

    counterWords.splice(0, 1, newCount);

    counter.textContent = counterWords.join(' ');
  };

  var addComments = function (comments) {
    commentList.appendChild(getCommentFragment(comments));
    changeCounter();
  };

  var CommentLoader = function () {
    this._groups = [];
    this._counter = -1;
    this.load = this.load.bind(this);
    this._onEnterPress = this._onEnterPress.bind(this);
  };

  CommentLoader.prototype.start = function (comments) {
    commentList.querySelectorAll('.social__comment').forEach(removeComment);

    this._reset();

    for (var i = 0; i < comments.length; i += 5) {
      this._groups.push(comments.slice(i, i + 5));
    }
  };

  CommentLoader.prototype.load = function () {
    this._counter++;

    return this._canLoadMore()
      && addComments(this._getGroup());
  };

  CommentLoader.prototype.showLoaderButton = function () {
    if (isHidden(commentLoaderButton)) {
      showElement(commentLoaderButton);
    }
  };

  CommentLoader.prototype.addEventListeners = function () {
    commentLoaderButton.addEventListener('click', this.load);
    commentLoaderButton.addEventListener('keydown', this._onEnterPress);
  };

  CommentLoader.prototype.removeEventListeners = function () {
    commentLoaderButton.removeEventListener('click', this.load);
    commentLoaderButton.removeEventListener('keydown', this._onEnterPress);
  };

  CommentLoader.prototype._getGroup = function () {
    var group = this._groups[this._counter];

    if (this._isLastGroup()) {
      this._done();
    }

    return group;
  };

  CommentLoader.prototype._onEnterPress = function (evt) {
    return isEnterKey(evt) && this.load();
  };

  CommentLoader.prototype._canLoadMore = function () {
    return this._counter < this._groups.length;
  };

  CommentLoader.prototype._isLastGroup = function () {
    return this._counter === this._groups.length - 1;
  };

  CommentLoader.prototype._done = function () {
    hideElement(commentLoaderButton);
  };

  CommentLoader.prototype._reset = function () {
    this._groups = [];
    this._counter = -1;
  };

  window.CommentLoader = CommentLoader;
})(
    window.Random,
    window.DomUtil.isHidden,
    window.DomUtil.makeFragmentRender,
    window.DomUtil.hide,
    window.DomUtil.show,
    window.EventUtil.isEnterKey
);
