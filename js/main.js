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

var ImageScale = {
  STEP: 25,
  MIN: 25,
  MAX: 100
};

var EditState = {
  selectedFilter: 'none',
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
var imageEffects = imageEditingContainer.querySelector('.img-upload__effects');

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

var isEnterKey = function (evt) {
  return evt.key === 'Enter';
};

var onEscapePress = function (evt) {
  return isEscapeKey(evt) && closeImageEditing();
};

var openImageEditing = function () {
  showElement(imageEditingContainer);
  document.addEventListener('keydown', onEscapePress);
};

var clearInput = function (input) {
  input.value = '';
};

var closeImageEditing = function () {
  clearInput(uploadFileInput);
  hideElement(imageEditingContainer);
  document.removeEventListener('keydown', onEscapePress);
};

var onFileUploadChange = function () {
  openImageEditing();
};

var onImageUploadCancelClick = function () {
  closeImageEditing();
};

var onImageUploadCancelPress = function (evt) {
  return isEnterKey(evt) && closeImageEditing();
};

var makeEffect = function (name, formula) {
  return function (value) {
    return name + '(' + formula(value) + ')';
  };
};

var getDecimal = function (value) {
  return Math.round(value) / 100;
};

var getPercent = function (value) {
  return Math.round(value) + '%';
};

var getPixels = function (value) {
  return Math.round(value * 3) / 100 + 'px';
};

var getBrightnessNumber = function (value) {
  return Math.round(value * 2) / 100 + 1;
};

var Effect = {
  scale: makeEffect('scale', getDecimal),
  chrome: makeEffect('grayscale', getDecimal),
  sepia: makeEffect('sepia', getDecimal),
  marvin: makeEffect('invert', getPercent),
  phobos: makeEffect('blur', getPixels),
  heat: makeEffect('brightness', getBrightnessNumber)
};

var getScaleDecrease = function (value) {
  var newValue = value - ImageScale.STEP;
  return (newValue > ImageScale.MIN) ? newValue : ImageScale.MIN;
};

var getScaleIncrease = function (value) {
  var newValue = value + ImageScale.STEP;
  return (newValue < ImageScale.MAX) ? newValue : ImageScale.MAX;
};

var onScaleControlClick = function (controlValue) {
  return function () {
    var value = parseInt(scaleControlValueInput.value.slice(0, -1), 10);
    var newValue = controlValue(value);
    scaleControlValueInput.value = newValue + '%';
    uploadPreviewImage.style.transform = Effect.scale(newValue);
  };
};

var hideEffect = function () {
  uploadPreviewImage.className = '';
  hideElement(effectLevelContainer);
  uploadPreviewImage.style.filter = '';
};

var addEffect = function (effect) {
  uploadPreviewImage.classList.add('effects__preview--' + effect);
  showElement(effectLevelContainer);
  EditState.selectedFilter = effect;
};

var onChangeEffect = function (evt) {
  hideEffect();
  if (evt.target.value !== 'none') {
    addEffect(evt.target.value);
  }
};

var onEffectPinClick = function () {
  var effectValue = effectLevelPinElement.offsetLeft * 100 / 455;
  uploadPreviewImage.style.filter = Effect[EditState.selectedFilter](effectValue);
};

uploadFileInput.addEventListener('change', onFileUploadChange);
uploadCancelButton.addEventListener('click', onImageUploadCancelClick);
uploadCancelButton.addEventListener('keydown', onImageUploadCancelPress);

scaleControlSmallerButton.addEventListener('click', onScaleControlClick(getScaleDecrease));
scaleControlBiggerButton.addEventListener('click', onScaleControlClick(getScaleIncrease));

imageEffects.addEventListener('change', onChangeEffect);

effectLevelPinElement.addEventListener('mouseup', onEffectPinClick);

addImages(imagesList, getImagesData(IMAGE_NUM));
hideElement(effectLevelContainer);
