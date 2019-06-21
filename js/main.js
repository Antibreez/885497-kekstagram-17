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

var uploadFileInput = document.querySelector('#upload-file');
var imageEditingContainer = document.querySelector('.img-upload__overlay');
var uploadCancelButton = imageEditingContainer.querySelector('#upload-cancel');
var scaleDownButton = imageEditingContainer.querySelector('.scale__control--smaller');
var scaleUpButton = imageEditingContainer.querySelector('.scale__control--bigger');
var scaleValueInput = imageEditingContainer.querySelector('.scale__control--value');
var uploadPreviewImage = imageEditingContainer.querySelector('.img-upload__preview img');
var effectLevelContainer = imageEditingContainer.querySelector('.effect-level');
var effectLevelPinElement = effectLevelContainer.querySelector('.effect-level__pin');
var imageEffects = imageEditingContainer.querySelector('.img-upload__effects');
var imageDescriptionInput = imageEditingContainer.querySelector('.text__description');

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

var onUploadCancelClick = function () {
  closeImageEditing();
};

var onUploadCancelPress = function (evt) {
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

var getPixel = function (value) {
  return (Math.round(value * 3) / 100) + 'px';
};

var getBrightness = function (value) {
  return (Math.round(value * 2) / 100) + 1;
};

var Effect = {
  scale: makeEffect('scale', getDecimal),
  chrome: makeEffect('grayscale', getDecimal),
  sepia: makeEffect('sepia', getDecimal),
  marvin: makeEffect('invert', getPercent),
  phobos: makeEffect('blur', getPixel),
  heat: makeEffect('brightness', getBrightness)
};

var Scale = {
  value: 100,
  increase: function () {
    if (this.canIncrease()) {
      this.value += ImageScale.STEP;
    }
  },
  decrease: function () {
    if (this.canDecrease()) {
      this.value -= ImageScale.STEP;
    }
  },
  canIncrease: function () {
    return ImageScale.MAX >= this.value + ImageScale.STEP;
  },
  canDecrease: function () {
    return ImageScale.MIN <= this.value - ImageScale.STEP;
  },
};

var renderScale = function () {
  scaleValueInput.value = Scale.value + '%';
  uploadPreviewImage.style.transform = Effect.scale(Scale.value);
};

var onScaleUpClick = function () {
  Scale.increase();
  renderScale();
};

var onScaleDownClick = function () {
  Scale.decrease();
  renderScale();
};

var EffectControl = {
  selected: 'none',
  select: function (effect) {
    this.selected = effect;
  },
  hasEffect: function () {
    return this.selected !== 'none';
  },
};

var removeEffect = function () {
  uploadPreviewImage.className = '';
  uploadPreviewImage.style.filter = '';
};

var addEffect = function (effect) {
  uploadPreviewImage.className = 'effects__preview--' + effect;
};

var renderEffect = function () {
  removeEffect();

  if (!EffectControl.hasEffect()) {
    hideElement(effectLevelContainer);
    return;
  }

  addEffect(EffectControl.selected);
  showElement(effectLevelContainer);
};

var onChangeEffect = function (evt) {
  EffectControl.select(evt.target.value);
  renderEffect();
};

var onEffectPinClick = function () {
  var effectValue = effectLevelPinElement.offsetLeft * 100 / 455;
  uploadPreviewImage.style.filter = Effect[EffectControl.selected](effectValue);
};

uploadFileInput.addEventListener('change', onFileUploadChange);
uploadCancelButton.addEventListener('click', onUploadCancelClick);
uploadCancelButton.addEventListener('keydown', onUploadCancelPress);
scaleDownButton.addEventListener('click', onScaleDownClick);
scaleUpButton.addEventListener('click', onScaleUpClick);
imageEffects.addEventListener('change', onChangeEffect);
effectLevelPinElement.addEventListener('mouseup', onEffectPinClick);

imageDescriptionInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onEscapePress);
});
imageDescriptionInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onEscapePress);
});

addImages(imagesList, getImagesData(IMAGE_NUM));
hideElement(effectLevelContainer);
