'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_START_X = 570;
  var MAIN_PIN_START_Y = 375;
  var PIN_TALE_HEIGHT = 16;
  var MAP_LEFT_BORDER = 0;
  var MAP_RIGHT_BORDER = 1200;
  var MAP_TOP_BORDER = 130;
  var MAP_BOTTOM_BORDER = 630;

  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var address = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var maxLeftCoord = MAP_LEFT_BORDER - MAIN_PIN_WIDTH / 2;
  var maxRightCoord = MAP_RIGHT_BORDER - MAIN_PIN_WIDTH / 2;
  var maxTopCoord = MAP_TOP_BORDER - MAIN_PIN_HEIGHT - PIN_TALE_HEIGHT;
  var maxBottomCoord = MAP_BOTTOM_BORDER - MAIN_PIN_HEIGHT - PIN_TALE_HEIGHT;
  var onErrorLoad = function () {
    var error = document.querySelector('#error').content;
    var main = document.querySelector('main');
    main.appendChild(error);
  };

  /**
 * Переводит страницу в активное состояние
 */
  var activatePage = function () {
    window.form.changeAccessibility(adForm, false);
    window.form.changeAccessibility(mapFilters, false);
    window.load(window.pin.onSuccessLoad, onErrorLoad);
    window.form.changePrice();
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };

  /**
 * Рассчитывает координаты острия метки на основании размеров элемента '.map__pin--main'
 * @param {Number} x
 * @param {Number} y
 * @return {Array} - возвращает массив вида [x, y] c пересчитанными координатами
 */
  var getPoint = function (x, y) {
    var coordinateX = MAIN_PIN_WIDTH / 2 + x;
    var coordinateY = MAIN_PIN_HEIGHT + PIN_TALE_HEIGHT + y;
    return [coordinateX, coordinateY];
  };

  var printCoords = function (x, y) {
    var pointCoords = getPoint(x, y);
    address.value = Math.round(pointCoords[0]) + ', ' + Math.round(pointCoords[1]);
  };

  printCoords(MAIN_PIN_START_X, MAIN_PIN_START_Y);

  /**
 * Координаты относительно страницы
 * @param {*} elem DOM элемент, координаты которого нужно вычислить
 * @return {Object} координаты в формате {top: x, left: y}
 */
  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };

    /**
   * Ограничивает переданный аргумент заданными значениями
   * @param {Number} argument - значение, которое необходимо ограничить
   * @param {Number} minValue - минимальное значение
   * @param {Number} maxValue - максимальное значение
   * @return {Number} возвращает аргумент, значение которого находится в заданном диапазоне
   */

  var restrictCoords = function (argument, minValue, maxValue) {
    if (argument <= minValue) {
      argument = minValue;
    } else if (argument >= maxValue) {
      argument = maxValue;
    }

    return argument;
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var pinCoords = getCoords(mapPinMain);
    var mapCoords = getCoords(map);
    var pinCoordX = pinCoords.left - mapCoords.left;

    var shift = { // сдвиг курсора относительно элемента
      x: evt.clientX - pinCoordX,
      y: evt.clientY - pinCoords.top
    };

    var onMouseMove = function (moveEvt) {

      var currentX = moveEvt.clientX - shift.x;
      var currentY = moveEvt.clientY - shift.y;

      var restrictedX = restrictCoords(currentX, maxLeftCoord, maxRightCoord);
      var restrictedY = restrictCoords(currentY, maxTopCoord, maxBottomCoord);

      mapPinMain.style.left = restrictedX + 'px';
      mapPinMain.style.top = restrictedY + 'px';

      printCoords(restrictedX, restrictedY);

      if (pinCoordX !== currentX || pinCoords.top !== currentY) {
        if (map.classList.contains('map--faded')) {
          activatePage();
        }
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
