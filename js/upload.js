'use strict';

(function (DomUtil, UploadPreview) {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadFileInput = document.querySelector('#upload-file');
  var uploadFileControl = document.querySelector('.img-upload__control');

  var onUploadSuccess = function () {
    DomUtil.hide(uploadFileControl);
  };

  var getFileExt = function (filename) {
    var dot = filename.lastIndexOf('.') + 1;
    return dot > 0 ? filename.slice(dot) : '';
  };

  var isValidImage = function (file) {
    var ext = getFileExt(file.name).toLowerCase();
    return FILE_TYPES.indexOf(ext) > -1;
  };

  var Upload = function () {
    this._onChange = this._onChange.bind(this);

    this._uploadPreview = new UploadPreview(onUploadSuccess);
  };

  Upload.prototype.addEventListeners = function () {
    uploadFileInput.addEventListener('change', this._onChange);
  };

  Upload.prototype._onChange = function () {
    var file = uploadFileInput.files[0];

    if (isValidImage(file)) {
      this._uploadPreview.open(file);
    }
  };

  window.Upload = Upload;
})(window.DomUtil, window.UploadPreview);
