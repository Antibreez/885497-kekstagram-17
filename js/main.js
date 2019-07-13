'use strict';

(function (backend, DomUtil, UploadPreview, Random, GalleryController) {
  var uploadFileInput = document.querySelector('#upload-file');
  var effectLevelContainer = document.querySelector('.effect-level');

  var uploadPreview = new UploadPreview();

  var onFileUploadChange = function () {
    uploadPreview.open();
  };

  var onSucsess = function (images) {
    GalleryController.onLoad(images);
    GalleryController.makeCollection(images);
    GalleryController.addEventListener();
  };

  backend.load(onSucsess);

  DomUtil.hide(effectLevelContainer);

  uploadFileInput.addEventListener('change', onFileUploadChange);
})(
    window.backend,
    window.DomUtil,
    window.UploadPreview,
    window.Random,
    window.GalleryController
);
