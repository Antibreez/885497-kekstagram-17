'use strict';

(function (EventUtil, FilterBar, Filter, Review) {
  var debounce = EventUtil.debounce;
  var imageList = document.querySelector('.pictures');
  var imageTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderImage = function (image) {
    var node = imageTemplate.cloneNode(true);
    node.querySelector('.picture__img').src = image.url;
    node.querySelector('.picture__comments').textContent = image.comments.length;
    node.querySelector('.picture__likes').textContent = image.likes;

    return node;
  };

  var removeImage = function (image) {
    imageList.removeChild(image);
  };

  var setImages = function (images) {
    var fragment = document.createDocumentFragment();
    images.forEach(function (image) {
      fragment.appendChild(renderImage(image));
    });

    imageList.querySelectorAll('.picture').forEach(removeImage);
    imageList.appendChild(fragment);
  };

  var setImageSrc = function (image) {
    return image.src.slice(34);
  };

  var isImageClass = function (image) {
    return image && (image.className === 'picture__img');
  };

  var Gallery = function () {
    this._images = [];
    this._urlToImages = {};
    this._onFilterChange = debounce(this._onFilterChange.bind(this));
    this._onImagesClick = this._onImagesClick.bind(this);
    this._onImageEnterPress = this._onImageEnterPress.bind(this);

    this._filterBar = new FilterBar(this._onFilterChange);
    this._review = new Review();
  };

  Gallery.prototype.add = function (images) {
    this._images = this._images.concat(images);

    this._images.forEach(function (image) {
      this._urlToImages[image.url] = image;
    }.bind(this));

    this._filterBar.show();
    setImages(this._images);

    this._addEventListeners();
  };

  Gallery.prototype._addEventListeners = function () {
    imageList.addEventListener('click', this._onImagesClick);
    imageList.addEventListener('keydown', this._onImageEnterPress);
  };

  Gallery.prototype._makeImageDict = function (images) {
    images.forEach(function (image) {
      this._urlToImages[image.url] = image;
    }.bind(this));
  };

  Gallery.prototype._onFilterChange = function (filter) {
    setImages(Filter[filter](this._images));
  };

  Gallery.prototype._onImagesClick = function (evt) {
    if (isImageClass(evt.target)) {
      var src = setImageSrc(evt.target);
    } else {
      return;
    }

    this._review.open(this._urlToImages[src]);
  };

  Gallery.prototype._onImageEnterPress = function (evt) {
    if (isImageClass(evt.target.children[0]) && EventUtil.isEnterKey(evt)) {
      var src = setImageSrc(evt.target.children[0]);
    } else {
      return;
    }

    this._review.open(this._urlToImages[src]);
  };

  window.Gallery = Gallery;

})(
    window.EventUtil,
    window.FilterBar,
    window.Filter,
    window.Review
);
