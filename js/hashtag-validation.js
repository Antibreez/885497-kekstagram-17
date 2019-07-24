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

  var hasLeadingSymbol = function (tag) {
    return tag.lastIndexOf('#') === 0;
  };

  var isNotUnique = function (tags) {
    tags.forEach(function (tag, idx) {
      return tags.indexOf(tag, idx + 1) > 0;
    });
  };

  var isTooLong = function (tag) {
    return tag.length > HashtagConstrain.MAX_LENGTH;
  };

  var getMessage = function (value) {
    var tags = getSeparateTags(value);

    for (var i = 0; i < tags.length; i++) {
      if (hasNoHash(tags[i])) {
        return ValidationMessage.NO_HASH;
      }

      if (isTooShort(tags[i])) {
        return ValidationMessage.TOO_SHORT;
      }

      if (!hasLeadingSymbol(tags[i])) {
        return ValidationMessage.EXTRA_HASH;
      }

      if (isTooLong(tags[i])) {
        return ValidationMessage.TOO_LONG;
      }
    }

    if (tags.length > HashtagConstrain.MAX_NUMBER) {
      return ValidationMessage.TOO_MANY;
    }

    if (isNotUnique(tags)) {
      return ValidationMessage.NOT_UNIQUE;
    }

    return ValidationMessage.NO_ERRORS;
  };

  window.HashtagValidation = {
    getMessage: getMessage
  };
})(window.Constants.HashtagConstrain);
