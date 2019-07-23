'use strict';

(function (HashtagConstrain) {
  var ValidationMessage = {
    NO_ERRORS: 'none',
    NO_HASH: 'Хеш-тег должен начинаться с символа #(решётка)',
    TOO_SHORT: 'Хеш-тег не может состоять только из одной решётки',
    NO_SPACE: 'Хеш-теги должны разделяться пробелом',
    NOT_UNIQUE: 'Один и тот же хэш-тег не может быть использован дважды',
    TOO_MANY: 'Допускается указывать не более пяти хеш-тегов',
    TOO_LONG: 'Максимальная длина одного хэш-тега 20 символов'
  };

  var removeEmptyValue = function (hashtag) {
    return hashtag !== '';
  };

  var makeToLowerCase = function (hashtag) {
    return hashtag.toLowerCase();
  };

  var getHashtags = function (value) {
    return value.split(' ').filter(removeEmptyValue).map(makeToLowerCase);
  };

  var hasNoHash = function (hashtag) {
    return hashtag[0] !== '#';
  };

  var isToShort = function (hashtag) {
    return hashtag.length === 1;
  };

  var hasNoSpace = function (hashtag) {
    return hashtag.slice(1, hashtag.length).indexOf('#') !== -1;
  };

  var isNotUnique = function (hashtags) {
    var obj = {};

    hashtags.forEach(function (hashtag) {
      obj[hashtag] = true;
    });

    return hashtags.length !== Object.keys(obj).length;
  };

  var isTooLong = function (hashtag) {
    return hashtag.length > HashtagConstrain.MAX_LENGTH;
  };

  var getValidationMessage = function (hashtagInput) {
    var hashtags = getHashtags(hashtagInput.value);

    if (hashtags.some(hasNoHash)) {
      return ValidationMessage.NO_HASH;
    } else if (hashtags.some(isToShort)) {
      return ValidationMessage.TOO_SHORT;
    } else if (hashtags.some(hasNoSpace)) {
      return ValidationMessage.NO_SPACE;
    } else if (isNotUnique(hashtags)) {
      return ValidationMessage.NOT_UNIQUE;
    } else if (hashtags.length > HashtagConstrain.MAX_NUMBER) {
      return ValidationMessage.TOO_MANY;
    } else if (hashtags.some(isTooLong)) {
      return ValidationMessage.TOO_LONG;
    } else {
      return ValidationMessage.NO_ERRORS;
    }
  };

  window.HashtagValidation = {
    getMessage: getValidationMessage
  };
})(window.Constants.HashtagConstrain);
