'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapPins = document.querySelector('.map__pins');
  var pin = document.querySelector('#pin').content;

  window.pin = {};
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
    mapPinElement.classList.add('created');
    img.src = src;
    img.alt = title;

    return mapPinElement;
  };

  /**
 * функция заполнения блока DOM-элементами на основе массива JS-объектов
 * @param {Array} data
 */
  var renderPins = function (data) {
    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > 5 ? 5 : data.length;
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(createMapPin(data[i]));
    }

    mapPins.appendChild(fragment);
  };

  var removePins = function () {
    var createdElements = document.querySelectorAll('.created');
    createdElements.forEach(function (item) {
      item.remove();
    });
  };

  var updatePins = function (type) {
    var filteredPins = window.pins.filter(function (it) {
      if (type.value === 'any') {
        return true;
      }
      return it.offer.type === type.value;
    });
    removePins();
    renderPins(filteredPins);
  };

  var onSuccessLoad = function (data) {
    window.pins = data;
    renderPins(window.pins);
  };

  window.pin = {
    updatePins: updatePins,
    onSuccessLoad: onSuccessLoad
  };

})();
