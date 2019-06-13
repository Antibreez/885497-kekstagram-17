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

addImages(imagesList, getImagesData(IMAGE_NUM));
