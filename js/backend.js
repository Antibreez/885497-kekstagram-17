'use strict';

(function () {
  var Url = {
    GET: 'https://js.dump.academy/kekstagram/data',
    POST: 'https://js.dump.academy/kekstagram'
  };

  var Method = {
    GET: 'GET',
    POST: 'POST'
  };

  var TIMEOUT = 10000;

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.timeout = TIMEOUT;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status < 200 || xhr.status > 300) {
        onError('Данные не загрузились. Причина: ' + xhr.status + ' ' + xhr.statusText);
        return;
      }

      onLoad(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var removeMessage = function (element) {
    element.remove();
  };

  var onAnyError = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
    window.setTimeout(removeMessage, 2000, node);
  };

  window.backend = {
    load: function (onLoad, onError) {
      var req = createRequest(onLoad, onError || onAnyError);
      req.open(Method.GET, Url.GET);
      req.send();
    },

    save: function (data, onLoad, onError) {
      var req = createRequest(onLoad, onError);
      req.open(Method.POST, Url.POST);
      req.send(data);
    }
  };
})();
