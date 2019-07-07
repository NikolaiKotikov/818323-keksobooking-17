'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  var createRequest = function (url, method, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.timeout = 10000;
    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.open(method, url);
    xhr.send();
  };

  window.load = function (onSuccess, onError) {
    createRequest(URL, 'GET', onSuccess, onError);
  };
})();
