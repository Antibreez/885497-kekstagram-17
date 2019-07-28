'use strict';

(function (DomUtil, backend, UploadPreview, Gallery) {
  var uploadFileInput = document.querySelector('#upload-file');
  var uploadFileControl = document.querySelector('.img-upload__control');

  var onUploadSuccess = function () {
    DomUtil.hide(uploadFileControl);
  };

  var uploadPreview = new UploadPreview(onUploadSuccess);
  var gallery = new Gallery();

  var onFileUploadChange = function () {
    uploadPreview.open();
  };

  var onImagesLoad = function (images) {
    gallery.add(images);
  };

  backend.load(onImagesLoad);
  uploadFileInput.addEventListener('change', onFileUploadChange);
})(
    window.DomUtil,
    window.backend,
    window.UploadPreview,
    window.Gallery
);
