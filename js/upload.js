'use strict';

(function (DomUtil, UploadPreview) {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadFileInput = document.querySelector('#upload-file');
  var uploadFileControl = document.querySelector('.img-upload__control');

  var onUploadSuccess = function () {
    DomUtil.hide(uploadFileControl);
  };

  var isImage = function (file) {
    var fileName = file.name.toLowerCase();

    return FILE_TYPES.indexOf(fileName.split('.').pop()) !== -1;
  };

  var Upload = function () {
    this._onLoad = this._onLoad.bind(this);
    this._onChange = this._onChange.bind(this);

    this._uploadPreview = new UploadPreview(onUploadSuccess);
  };

  Upload.prototype.addEventListeners = function () {
    uploadFileInput.addEventListener('change', this._onChange);
  };

  Upload.prototype._onChange = function () {
    var file = uploadFileInput.files[0];

    if (isImage(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', this._onLoad(reader));

      reader.readAsDataURL(file);
    }
  };

  Upload.prototype._onLoad = function (reader) {
    var open = this._uploadPreview.open;

    return function () {
      open(reader.result);
    };
  };

  window.Upload = Upload;
})(window.DomUtil, window.UploadPreview);
