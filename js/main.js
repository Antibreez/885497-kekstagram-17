'use strict';

var USERS_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var USERS_NAMES = [
  'Иван',
  'Антон',
  'Мария',
  'Дарт Вейдер',
  'Виктор',
  'Юлия',
  'Вольдемар',
  'Цезарь'
];

var imagesQuantity = 25;
var likesMin = 15;
var likesMax = 200;
var commentsMax = 5;

var getRandomSorting = function () {
  return Math.random() - 0.5;
};

var getArrayOfNumbers = function (number) {
  return Array(number).fill(1).map(function (num, index) {
    return num + index;
  });
};

var getSortedNumbers = function (number) {
  return getArrayOfNumbers(number).sort(getRandomSorting);
};

var imagesNumbers = getSortedNumbers(imagesQuantity);

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getCommentData = function () {
  return {
    avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
    massage: getRandomItem(USERS_COMMENTS),
    name: getRandomItem(USERS_NAMES)
  };
};

var getImageData = function () {
  return {
    url: 'photos/' + imagesNumbers.pop() + '.jpg',
    likes: getRandomNumber(likesMin, likesMax),
    comments: Array(getRandomNumber(0, commentsMax)).fill(null).map(getCommentData)
  };
};

var imagesData = Array(imagesQuantity).fill(null).map(getImageData);

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
