'use strict';

(function (HashtagConstrain) {
  var ValidationMessage = {
    NO_ERRORS: '',
    NO_HASH: 'Хеш-тег должен начинаться с символа #(решётка)',
    TOO_SHORT: 'Хеш-тег не может состоять только из одной решётки',
    EXTRA_HASH: 'Хеш-теги должны разделяться пробелом',
    NOT_UNIQUE: 'Один и тот же хэш-тег не может быть использован дважды',
    TOO_MANY: 'Допускается указывать не более пяти хеш-тегов',
    TOO_LONG: 'Максимальная длина одного хэш-тега 20 символов'
  };

  var emptyStringFilter = function (str) {
    return str.length > 0;
  };

  var getSeparateTags = function (str) {
    return str
      .toLowerCase()
      .replace(/,/g, '')
      .split(' ')
      .filter(emptyStringFilter);
  };

  var hasNoHash = function (tag) {
    return tag[0] !== '#';
  };

  var isTooShort = function (tag) {
    return tag.length === 1;
  };

  var hasManyHashSymbols = function (tag) {
    return tag.lastIndexOf('#') > 0;
  };

  var isTooLong = function (tag) {
    return tag.length > HashtagConstrain.MAX_LENGTH;
  };

  var getMessage = function (value) {
    var tags = getSeparateTags(value);

    if (tags.length > HashtagConstrain.MAX_NUMBER) {
      return ValidationMessage.TOO_MANY;
    }

    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i];

      if (hasNoHash(tag)) {
        return ValidationMessage.NO_HASH;
      }

      if (isTooShort(tag)) {
        return ValidationMessage.TOO_SHORT;
      }

      if (hasManyHashSymbols(tag)) {
        return ValidationMessage.EXTRA_HASH;
      }

      if (tags.indexOf(tag, i + 1) > 0) {
        return ValidationMessage.NOT_UNIQUE;
      }

      if (isTooLong(tag)) {
        return ValidationMessage.TOO_LONG;
      }
    }

    return ValidationMessage.NO_ERRORS;
  };

  window.HashtagValidation = {
    getMessage: getMessage
  };
})(window.Constants.HashtagConstrain);
