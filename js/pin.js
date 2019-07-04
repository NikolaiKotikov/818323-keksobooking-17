'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapPins = document.querySelector('.map__pins');
  var pin = document.querySelector('#pin').content;
  /**
 * Подготавливает координаты, для подстановки в значение атрибута src:
 * @param {Number} x
 * @param {Number} y
 * @return {String}
 */
  var printCoordinates = function (x, y) {
    return 'left:' + x + 'px' + ';' + 'top:' + y + 'px' + ';';
  };

  /**
 * функция создания DOM-элемента на основе JS-объекта
 * @param {Object} mapPin
 * @return {*} - возвращает DOM-элемент
 */
  var createMapPin = function (mapPin) {
    var mapPinElement = pin.querySelector('.map__pin').cloneNode(true);
    var img = mapPinElement.querySelector('img');
    var title = document.querySelector('#title').value;
    var locationX = mapPin.location.x - PIN_WIDTH / 2;
    var locationY = mapPin.location.y - PIN_HEIGHT;
    var coordinates = printCoordinates(locationX, locationY);
    var src = mapPin.author.avatar;

    mapPinElement.style = coordinates;
    img.src = src;
    img.alt = title;

    return mapPinElement;
  };

  /**
 * функция заполнения блока DOM-элементами на основе массива JS-объектов
 * @param {Array} mockData
 */
  window.renderMapPin = function (mockData) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < mockData.length; i++) {
      fragment.appendChild(createMapPin(mockData[i]));
    }

    mapPins.appendChild(fragment);
  };
})();
