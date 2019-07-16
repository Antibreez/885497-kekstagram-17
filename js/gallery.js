'use strict';

(function (EventUtil, FilterBar, Filter) {
  var imagesList = document.querySelector('.pictures');
  var imageTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderImage = function (image) {
    var item = imageTemplate.cloneNode(true);
    item.querySelector('.picture__img').src = image.url;
    item.querySelector('.picture__comments').textContent = image.comments.length;
    item.querySelector('.picture__likes').textContent = image.likes;

    return item;
  };

  var addImages = function (imagesDict, imagesUrl) {
    var fragment = document.createDocumentFragment();
    imagesUrl.forEach(function (imageUrl) {
      fragment.appendChild(renderImage(imagesDict[imageUrl]));
    });

    imagesList.appendChild(fragment);
  };

  var removeImages = function () {
    var images = imagesList.querySelectorAll('.picture');
    images.forEach(function (element) {
      imagesList.removeChild(element);
    });
  };

  var updateImages = function (imagesDict, imagesUrl) {
    removeImages();
    addImages(imagesDict, imagesUrl);
  };

  var updateImagesWithDebounce = EventUtil.debounce(updateImages);

  var Gallery = function () {
    this._images = [];
    this._urlToImages = {};
    this._onChange = this._onChange.bind(this);
    this._filterBar = new FilterBar(this._onChange);
  };

  Gallery.prototype._makeImageDict = function (images) {
    images.forEach(function (image) {
      this._urlToImages[image.url] = image;
    }.bind(this));
  };

  Gallery.prototype._onChange = function (filter) {
    updateImagesWithDebounce(
        this._urlToImages,
        Filter[filter](this._images)
    );
  };

  Gallery.prototype.add = function (images) {
    images.forEach(function (image) {
      this._images.push(image);
    }.bind(this));

    this._makeImageDict(images);

    this._filterBar.activate();
    addImages(this._urlToImages, Filter.popular(this._images));
  };

  window.Gallery = Gallery;

})(window.EventUtil, window.FilterBar, window.Filter);
