'use strict';

(function (backend, DOM, UploadPreview) {
  var uploadFileInput = document.querySelector('#upload-file');
  var effectLevelContainer = document.querySelector('.effect-level');

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

  var addImages = function (target, images) {
    var fragment = document.createDocumentFragment();
    images.forEach(function (image) {
      fragment.appendChild(renderImage(image));
    });

    target.appendChild(fragment);
  };

  var uploadPreview = new UploadPreview();

  var onFileUploadChange = function () {
    uploadPreview.open();
  };

  uploadFileInput.addEventListener('change', onFileUploadChange);

  var addUsersPictures = function (pictures) {
    addImages(imagesList, pictures);
  };

  backend.load(addUsersPictures);

  DOM.Element.hide(effectLevelContainer);
})(window.backend, window.DOM, window.UploadPreview);
