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

var Data = {
  IMAGES: 25,
  COMMENTS_MAX: 5,
  LIKES_MIN: 15,
  LIKES_MAX: 200,
};

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

var getCommentData = function () {
  return {
    avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
    massage: getRandomItem(COMMENTS),
    name: getRandomItem(NAMES)
  };
};

var getRandomComments = function (min, max) {
  return generateArray(getRandomNumber(min, max), getCommentData);
};

var makeImageData = function (id) {
  return {
    url: 'photos/' + id + '.jpg',
    likes: getRandomNumber(Data.LIKES_MIN, Data.LIKES_MAX),
    comments: getRandomComments(0, Data.COMMENTS_MAX),
  };
};

var getImagesData = function (num) {
  return getSortedNumbers(num).map(makeImageData);
};

var imagesData = getImagesData(Data.IMAGES);

var imagesList = document.querySelector('.pictures');
var imageTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var renderImage = function (image) {
  var imageItem = imageTemplate.cloneNode(true);
  imageItem.querySelector('.picture__img').src = image.url;
  imageItem.querySelector('.picture__comments').textContent = image.comments.length;
  imageItem.querySelector('.picture__likes').textContent = image.likes;

  return imageItem;
};

var addImages = function (target, images) {
  var fragment = document.createDocumentFragment();
  images.forEach(function (element) {
    fragment.appendChild(renderImage(element));
  });

  target.appendChild(fragment);
};

addImages(imagesList, imagesData);
