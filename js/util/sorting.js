'use strict';

(function () {
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

  window.Sorting = {
    getNum: getRandomSorting,
    generateArray: generateArray,
    getArray: getSortedNumbers
  };
})();
