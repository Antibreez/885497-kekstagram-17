'use strict';

(function (debounce, FilterBar, Filter, Review) {
  var imagesList = document.querySelector('.pictures');
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
    imagesList.removeChild(image);
  };

  var setImages = function (images) {
    var fragment = document.createDocumentFragment();
    images.forEach(function (image) {
      fragment.appendChild(renderImage(image));
    });

    imagesList.querySelectorAll('.picture').forEach(removeImage);
    imagesList.appendChild(fragment);
  };

  var Gallery = function () {
    this._images = [];
    this._onFilterChange = debounce(this._onFilterChange.bind(this));

    this._filterBar = new FilterBar(this._onFilterChange);
    this._review = new Review();
  };

  Gallery.prototype.add = function (images) {
    this._images = this._images.concat(images);
    this._filterBar.show();
    setImages(this._images);

    this._review.open(this._images[0]);
  };

  Gallery.prototype._makeImageDict = function (images) {
    images.forEach(function (image) {
      this._urlToImages[image.url] = image;
    }.bind(this));
  };

  Gallery.prototype._onFilterChange = function (filter) {
    setImages(Filter[filter](this._images));
  };

  window.Gallery = Gallery;

})(
    window.EventUtil.debounce,
    window.FilterBar,
    window.Filter,
    window.Review
);
