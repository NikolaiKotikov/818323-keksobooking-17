'use strict';

(function () {

  var deps = {
    globs: {
      MAIN_PIN_WIDTH: window.MAIN_PIN_WIDTH,
      MAIN_PIN_HEIGHT: window.MAIN_PIN_HEIGHT,
      PIN_TALE_HEIGHT: window.PIN_TALE_HEIGHT,
      MAP_LEFT_BORDER: window.MAP_LEFT_BORDER,
      MAP_RIGHT_BORDER: window.MAP_RIGHT_BORDER,
      MAP_TOP_BORDER: window.MAP_TOP_BORDER,
      MAP_BOTTOM_BORDER: window.MAP_BOTTOM_BORDER,
      MAIN_PIN_START_X: window.MAIN_PIN_START_X,
      MAIN_PIN_START_Y: window.MAIN_PIN_START_Y
    },
    form: {
      changeAccessibility: window.changeAccessibility,
      changePrice: window.changePrice
    },
    pin: {
      renderMapPin: window.renderMapPin
    },
    data: {
      generateMockData: window.generateMockData
    }
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var address = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');

  var generatedData = deps.data.generateMockData(8);

  /**
 * Переводит страницу в активное состояние
 */
  var activatePage = function () {
    deps.form.changeAccessibility(adForm, false);
    deps.form.changeAccessibility(mapFilters, false);
    deps.pin.renderMapPin(generatedData);
    deps.form.changePrice();
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };

  /**
 * Рассчитывает координаты острия метки на основании размеров элемента '.map__pin--main'
 * @param {Number} x
 * @param {Number} y
 * @return {Array} - возвращает массив вида [x, y] c пересчитанными координатами
 */
  var getNeedlePointСoordinates = function (x, y) {
    var coordinateX = deps.globs.MAIN_PIN_WIDTH / 2 + x;
    var coordinateY = deps.globs.MAIN_PIN_HEIGHT + deps.globs.PIN_TALE_HEIGHT + y;
    return [coordinateX, coordinateY];
  };

  var needlePointСoordinates = getNeedlePointСoordinates(deps.globs.MAIN_PIN_START_X, deps.globs.MAIN_PIN_START_Y);
  address.value = Math.round(needlePointСoordinates[0]) + ', ' + Math.round(needlePointСoordinates[1]);

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
   * Ограничивает текущие координаты размерами карты
   * @param {Number} x
   * @param {Number} y
   * @return {Object} возвращает объект с ограниченными координатами
   */

  var restrictCoords = function (x, y) {
    if (x <= deps.globs.MAP_LEFT_BORDER - deps.globs.MAIN_PIN_WIDTH / 2) {
      x = deps.globs.MAP_LEFT_BORDER - deps.globs.MAIN_PIN_WIDTH / 2;
    } else if (x >= deps.globs.MAP_RIGHT_BORDER - deps.globs.MAIN_PIN_WIDTH / 2) {
      x = deps.globs.MAP_RIGHT_BORDER - deps.globs.MAIN_PIN_WIDTH / 2;
    } else {
      x = x;
    }

    if (y + deps.globs.MAIN_PIN_HEIGHT + deps.globs.PIN_TALE_HEIGHT <= deps.globs.MAP_TOP_BORDER) {
      y = deps.globs.MAP_TOP_BORDER - deps.globs.MAIN_PIN_HEIGHT - deps.globs.PIN_TALE_HEIGHT;
    } else if (y + deps.globs.MAIN_PIN_HEIGHT + deps.globs.PIN_TALE_HEIGHT >= deps.globs.MAP_BOTTOM_BORDER) {
      y = deps.globs.MAP_BOTTOM_BORDER - deps.globs.MAIN_PIN_HEIGHT - deps.globs.PIN_TALE_HEIGHT;
    } else {
      y = y;
    }
    return {
      restrictedX: x,
      restrictedY: y
    };
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

      var restrictedCoords = restrictCoords(currentX, currentY);

      mapPinMain.style.left = restrictedCoords.restrictedX + 'px';
      mapPinMain.style.top = restrictedCoords.restrictedY + 'px';

      needlePointСoordinates = getNeedlePointСoordinates(restrictedCoords.restrictedX, restrictedCoords.restrictedY);
      address.value = Math.round(needlePointСoordinates[0]) + ', ' + Math.round(needlePointСoordinates[1]);

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
