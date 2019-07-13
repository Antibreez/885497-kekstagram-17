'use strict';

(function (EventUtil) {
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

  var addImages = function (images) {
    var fragment = document.createDocumentFragment();
    images.forEach(function (image) {
      fragment.appendChild(renderImage(image));
    });

    imagesList.appendChild(fragment);
  };

  var removeImages = function () {
    var images = imagesList.querySelectorAll('.picture');
    images.forEach(function (element) {
      imagesList.removeChild(element);
    });
  };

  var updateGallery = function (images) {
    removeImages();
    addImages(images);
  };

  var updateGalleryWithDebounce = EventUtil.debounce(updateGallery);

  window.RenderGallery = {
    add: addImages,
    update: updateGalleryWithDebounce
  };
})(window.EventUtil);
