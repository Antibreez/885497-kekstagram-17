'use strict';

(function (
  debounce,
  isEnterKey,
  FilterBar,
  Filter,
  Review,
) {
  var imageList = document.querySelector('.pictures');
  var imageTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderImage = function (image, id) {
    var node = imageTemplate.cloneNode(true);
    node.querySelector('.picture__img').src = image.url;
    node.querySelector('.picture__likes').textContent = image.likes;
    node.querySelector('.picture__comments').textContent = image.comments.length;
    node.dataset.id = id;

    return node;
  };

  var removeImage = function (image) {
    imageList.removeChild(image);
  };

  var setImages = function (images) {
    var fragment = document.createDocumentFragment();
    images.forEach(function (image, index) {
      fragment.appendChild(renderImage(image, index));
    });

    imageList.querySelectorAll('.picture').forEach(removeImage);
    imageList.appendChild(fragment);
  };

  var isPicture = function (element) {
    return element.classList.contains('picture');
  };

  var Gallery = function () {
    this._images = [];
    this._onFilterChange = debounce(this._onFilterChange.bind(this));
    this._onImagesClick = this._onImagesClick.bind(this);
    this._onImageEnterPress = this._onImageEnterPress.bind(this);

    this._filterBar = new FilterBar(this._onFilterChange);
    this._review = new Review();

    this._addEventListeners();
  };

  Gallery.prototype.add = function (images) {
    this._images = this._images.concat(images);
    this._filterBar.show();
    setImages(this._images);
  };

  Gallery.prototype.preview = function (id) {
    this._review.show(this._images[id]);
  };

  Gallery.prototype._addEventListeners = function () {
    imageList.addEventListener('click', this._onImagesClick);
    imageList.addEventListener('keydown', this._onImageEnterPress);
  };

  Gallery.prototype._onFilterChange = function (filter) {
    setImages(Filter[filter](this._images));
  };

  Gallery.prototype._onImagesClick = function (evt) {
    var element = evt.target.parentElement;
    return isPicture(element)
      && this.preview(element.dataset.id);
  };

  Gallery.prototype._onImageEnterPress = function (evt) {
    return isEnterKey(evt)
      && isPicture(evt.target)
      && this.preview(evt.target.dataset.id);
  };

  window.Gallery = Gallery;
})(
  window.EventUtil.debounce,
  window.EventUtil.isEnterKey,
  window.FilterBar,
  window.Filter,
  window.Review
);
