'use strict';

(function (backend, DomUtil, UploadPreview, Random) {
  var uploadFileInput = document.querySelector('#upload-file');
  var effectLevelContainer = document.querySelector('.effect-level');

  var imagesFilter = document.querySelector('.img-filters');
  var filtersForm = imagesFilter.querySelector('.img-filters__form');
  var filtersButtons = imagesFilter.querySelectorAll('.img-filters__button');
  var popularButton = filtersForm.querySelector('#filter-popular');
  var newButton = filtersForm.querySelector('#filter-new');
  var discussedButton = filtersForm.querySelector('#filter-discussed');

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

  var Pictures = {
    default: [],
    sorted: [],
    random: []
  };

  var getRandomImages = function (images) {
    return images.reduce(function (shuffled, element, index) {
      shuffled.splice(Random.getNum(0, index), 0, element);
      return shuffled;
    }, []);
  };

  var getCommentsSorting = function (prev, next) {
    return next.comments.length - prev.comments.length;
  };

  var removeImages = function (target) {
    var images = target.querySelectorAll('.picture');
    images.forEach(function (element) {
      target.removeChild(element);
    });
  };

  var updateImages = function (images) {
    removeImages(imagesList);
    addImages(imagesList, images);
  };

  var lastTimeOut;

  var debouncedUpdate = function (images) {
    if (lastTimeOut) {
      window.clearTimeout(lastTimeOut);
    }
    lastTimeOut = window.setTimeout(function () {
      updateImages(images);
    }, 700);
  };

  var clearClass = function () {
    filtersButtons.forEach(function (element) {
      element.classList.remove('img-filters__button--active');
    });
  };

  var onButtonClick = function (evt) {
    if (!evt.target.classList.contains('img-filters__button--active')) {
      clearClass();
      evt.target.classList.add('img-filters__button--active');
    }
  };

  var onDiscussedClick = function (evt) {
    onButtonClick(evt);
    debouncedUpdate(Pictures.sorted);
  };

  var onNewClick = function (evt) {
    onButtonClick(evt);
    Pictures.random = getRandomImages(Pictures.sorted).slice(0, 10);
    debouncedUpdate(Pictures.random);
  };

  var onPopularClick = function (evt) {
    onButtonClick(evt);
    debouncedUpdate(Pictures.default);
  };

  var onSucsess = function (images) {
    imagesFilter.classList.remove('img-filters--inactive');

    Pictures.default = images;
    Pictures.sorted = images.slice().sort(getCommentsSorting);

    popularButton.addEventListener('click', onPopularClick);
    newButton.addEventListener('click', onNewClick);
    discussedButton.addEventListener('click', onDiscussedClick);

    addImages(imagesList, images);
  };

  backend.load(onSucsess);

  DomUtil.hide(effectLevelContainer);
})(window.backend, window.DomUtil, window.UploadPreview, window.Random);
