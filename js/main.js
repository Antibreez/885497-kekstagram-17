'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var NAMES = [
  'Иван',
  'Антон',
  'Мария',
  'Дарт Вейдер',
  'Виктор',
  'Юлия',
  'Вольдемар',
  'Цезарь'
];

var IMAGE_NUM = 25;

var Like = {
  MIN: 15,
  MAX: 200,
};

var Comment = {
  MIN: 0,
  MAX: 5,
};

var Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100
};

var uploadFileInput = document.querySelector('#upload-file');
var imageEditingContainer = document.querySelector('.img-upload__overlay');
var uploadCancelButton = imageEditingContainer.querySelector('#upload-cancel');
var scaleControlSmallerButton = imageEditingContainer.querySelector('.scale__control--smaller');
var scaleControlBiggerButton = imageEditingContainer.querySelector('.scale__control--bigger');
var scaleControlValueInput = imageEditingContainer.querySelector('.scale__control--value');
var uploadPreviewImage = imageEditingContainer.querySelector('.img-upload__preview img');
var effectLevelContainer = imageEditingContainer.querySelector('.effect-level');
var effectLevelPinElement = effectLevelContainer.querySelector('.effect-level__pin');
var effectsRadioInput = imageEditingContainer.querySelectorAll('.effects__radio');

var getRandomSorting = function () {
  return Math.random() - 0.5;
};

var generateArray = function (length, generator) {
  return Array(length).fill(null).map(generator);
};

var getSortedNumbers = function (num) {
  return generateArray(num, function (_, index) {
    return index + 1;
  }).sort(getRandomSorting);
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getComment = function () {
  return {
    avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
    massage: getRandomItem(COMMENTS),
    name: getRandomItem(NAMES)
  };
};

var getRandomComments = function (min, max) {
  return generateArray(getRandomNumber(min, max), getComment);
};

var getImageData = function (id) {
  return {
    url: 'photos/' + id + '.jpg',
    likes: getRandomNumber(Like.MIN, Like.MAX),
    comments: getRandomComments(Comment.MIN, Comment.MAX),
  };
};

var getImagesData = function (num) {
  return getSortedNumbers(num).map(getImageData);
};

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

var showElement = function (element) {
  element.classList.remove('hidden');
};

var hideElement = function (element) {
  element.classList.add('hidden');
};

var isEscapeKey = function (evt) {
  return evt.key === 'Esc' || evt.key === 'Escape';
};

var onEscapePress = function (evt) {
  return isEscapeKey(evt) && closeImageEditing();
};

var openImageEditing = function () {
  showElement(imageEditingContainer);
  document.addEventListener('keydown', onEscapePress);
};

var closeImageEditing = function () {
  hideElement(imageEditingContainer);
  document.removeEventListener('keydown', onEscapePress);
  uploadFileInput.value = null;
};

var onFileUploadChange = function () {
  openImageEditing();
};

var onImageUploadCancelClick = function () {
  closeImageEditing();
};

var onImageUploadCancelPress = function (evt) {
  if (evt.key === 'Enter') {
    closeImageEditing();
  }
};

var getScaleDecrease = function (value) {
  var newValue = value - Scale.STEP;
  return (newValue > Scale.MIN) ? newValue : Scale.MIN;
};

var getScaleIncrease = function (value) {
  var newValue = value + Scale.STEP;
  return (newValue < Scale.MAX) ? newValue : Scale.MAX;
};

var onScaleControlSmallerClick = function () {
  var value = parseInt(scaleControlValueInput.value.slice(0, -1), 10);
  var newValue = getScaleDecrease(value);
  scaleControlValueInput.value = newValue + '%';
  uploadPreviewImage.style.transform = 'scale(' + (newValue / 100) + ')';
};

var onScaleControlBiggerClick = function () {
  var value = parseInt(scaleControlValueInput.value.slice(0, -1), 10);
  var newValue = getScaleIncrease(value);
  scaleControlValueInput.value = newValue + '%';
  uploadPreviewImage.style.transform = 'scale(' + (newValue / 100) + ')';
};

var onEffectButtonClick = function (thumbnail, image) {
  thumbnail.addEventListener('click', function () {
    image.className = '';
    hideElement(effectLevelContainer);
    uploadPreviewImage.style.filter = '';
    if (thumbnail.value !== 'none') {
      image.classList.add('effects__preview--' + thumbnail.value);
      showElement(effectLevelContainer);
    }
  });
};

var isContainsClass = function (classValue, item) {
  return item.classList.contains(classValue);
};

var onEffectPinClick = function () {
  var effectValue = effectLevelPinElement.offsetLeft * 100 / 455;

  if (isContainsClass('effects__preview--chrome', uploadPreviewImage)) {
    uploadPreviewImage.style.filter = 'grayscale(' + (effectValue / 100) + ')';
  }

  if (isContainsClass('effects__preview--sepia', uploadPreviewImage)) {
    uploadPreviewImage.style.filter = 'sepia(' + (effectValue / 100) + ')';
  }

  if (isContainsClass('effects__preview--marvin', uploadPreviewImage)) {
    uploadPreviewImage.style.filter = 'invert(' + effectValue + '%)';
  }

  if (isContainsClass('effects__preview--phobos', uploadPreviewImage)) {
    uploadPreviewImage.style.filter = 'blur(' + (effectValue * 3 / 100) + 'px)';
  }

  if (isContainsClass('effects__preview--heat', uploadPreviewImage)) {
    uploadPreviewImage.style.filter = 'brightness(' + ((effectValue * 2 / 100) + 1) + ')';
  }
};

uploadFileInput.addEventListener('change', onFileUploadChange);
uploadCancelButton.addEventListener('click', onImageUploadCancelClick);
uploadCancelButton.addEventListener('keydown', onImageUploadCancelPress);

scaleControlSmallerButton.addEventListener('click', onScaleControlSmallerClick);
scaleControlBiggerButton.addEventListener('click', onScaleControlBiggerClick);

for (var i = 0; i < effectsRadioInput.length; i++) {
  onEffectButtonClick(effectsRadioInput[i], uploadPreviewImage);
}

effectLevelPinElement.addEventListener('mouseup', onEffectPinClick);

addImages(imagesList, getImagesData(IMAGE_NUM));
hideElement(effectLevelContainer);
