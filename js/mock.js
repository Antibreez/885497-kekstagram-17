'use strict';

(function (Random) {
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

  var AvatarId = {
    MIN: 1,
    MAX: 6
  };

  var Image = {
    LIKE: {MIN: 15, MAX: 200},
    COMMENT: {MIN: 0, MAX: 5}
  };

  var generateArray = function (length, generator) {
    return Array(length).fill(null).map(generator);
  };

  var getSortedNumbers = function (num) {
    return generateArray(num, function (_, index) {
      return index + 1;
    }).sort(Random.getSorting);
  };

  var getComment = function () {
    return {
      avatar: 'img/avatar-' + Random.getNum(AvatarId.MIN, AvatarId.MAX) + '.svg',
      massage: Random.getItem(COMMENTS),
      name: Random.getItem(NAMES)
    };
  };

  var getRandomComments = function (min, max) {
    return generateArray(Random.getNum(min, max), getComment);
  };

  var getImageData = function (id) {
    return {
      url: 'photos/' + id + '.jpg',
      likes: Random.getNum(Image.LIKE.MIN, Image.LIKE.MAX),
      comments: getRandomComments(Image.COMMENT.MIN, Image.COMMENT.MAX),
    };
  };

  var getImagesData = function (num) {
    return getSortedNumbers(num || IMAGE_NUM).map(getImageData);
  };

  window.Mock = {
    load: getImagesData
  };
})(window.Random);
