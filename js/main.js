'use strict';

(function (backend, UploadPreview, Gallery) {
  var uploadFileInput = document.querySelector('#upload-file');

  var uploadPreview = new UploadPreview();
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
    window.backend,
    window.UploadPreview,
    window.Gallery
);
