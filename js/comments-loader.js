'use strict';

(function (
    isHidden,
    hideElement,
    showElement,
    isEnterKey
) {
  var commentsLoaderButton = document.querySelector('.comments-loader');

  var CommentsLoader = function (addComments) {
    this.groups = [];
    this._counter = 0;
    this._addComments = addComments;
    this._load = this._load.bind(this);
    this._onEnterPress = this._onEnterPress.bind(this);
  };

  CommentsLoader.prototype.setGroups = function (comments) {
    for (var i = 0; i < comments.length; i += 5) {
      this.groups.push(comments.slice(i, i + 5));
    }
  };

  CommentsLoader.prototype.getGroup = function () {
    var group = this.groups[this._counter];

    if (this._isLastGroup()) {
      this._onAllCommentsShown();
    }

    return group;
  };

  CommentsLoader.prototype.onClose = function () {
    if (isHidden(commentsLoaderButton)) {
      showElement(commentsLoaderButton);
    }
  };

  CommentsLoader.prototype.addEventListeners = function () {
    commentsLoaderButton.addEventListener('click', this._load);
    commentsLoaderButton.addEventListener('keydown', this._onEnterPress);
  };

  CommentsLoader.prototype.removeEventListeners = function () {
    commentsLoaderButton.removeEventListener('click', this._load);
    commentsLoaderButton.removeEventListener('keydown', this._onEnterPress);
  };

  CommentsLoader.prototype._onEnterPress = function (evt) {
    return isEnterKey(evt) && this._load();
  };

  CommentsLoader.prototype._canLoadMore = function () {
    return this._counter < this.groups.length;
  };

  CommentsLoader.prototype._isLastGroup = function () {
    return this._counter === this.groups.length - 1;
  };

  CommentsLoader.prototype._load = function () {
    this._counter++;

    return this._canLoadMore()
      && this._addComments(this.getGroup());
  };

  CommentsLoader.prototype._onAllCommentsShown = function () {
    this._reset();

    hideElement(commentsLoaderButton);
    this.removeEventListeners();
  };

  CommentsLoader.prototype._reset = function () {
    this.groups = [];
    this._counter = 0;
  };

  window.CommentsLoader = CommentsLoader;
})(
    window.DomUtil.isHidden,
    window.DomUtil.hide,
    window.DomUtil.show,
    window.EventUtil.isEnterKey
);
