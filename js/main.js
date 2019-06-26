'use strict';

(function () {
  var DOM = window.DOM;
  var Mock = window.Mock;
  var Upload = window.Upload;
  var Data = window.Data;

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

  var UploadPopup = new Upload();

  var onFileUploadChange = function () {
    UploadPopup.open();
  };

  uploadFileInput.addEventListener('change', onFileUploadChange);

  addImages(imagesList, Mock.load(Data.IMAGE_NUM));
  DOM.Element.hide(effectLevelContainer);
})();
