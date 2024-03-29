'use strict';

(function () {
  var getRandomSorting = function () {
    return Math.random() - 0.5;
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomItem = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  window.Random = {
    getNum: getRandomNumber,
    getItem: getRandomItem,
    getSorting: getRandomSorting,
  };
})();
