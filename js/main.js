'use strict';

(function (backend, Gallery, Upload) {
  var gallery = new Gallery();
  var upload = new Upload();

  var onImagesLoad = function (images) {
    gallery.add(images);
  };

  backend.load(onImagesLoad);
  upload.addEventListeners();
})(
    window.backend,
    window.Gallery,
    window.Upload
);
