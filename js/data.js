'use strict';

(function () {
  window.data = {
    MAP_LEFT_BORDER: 0,
    MAP_RIGHT_BORDER: 1200,
    MAP_TOP_BORDER: 130,
    MAP_BOTTOM_BORDER: 630
  };

  var TYPES = ['palace', 'flat', 'house', 'bungalo'];

  /**
 * Функция для создания временного адреса изображения
 * вида img/avatars/user{{xx}}.png,
 * где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д.
 * @param {Number} number - номер после нуля
 * @return {String}
 */
  var getMockSrc = function (number) {
    return 'img/avatars/user' + '0' + (number + 1) + '.png';
  };


  /**
 * Функция генерирует массив объектов с временными данными для объявлений
 * @param {Number} amount - количество объявлений
 * @return {Array}
 */
  window.generateMockData = function (amount) {
    var mockAdverts = [];

    for (var i = 0; i < amount; i++) {
      var data = {
        author: {avatar: getMockSrc(i)},
        offer: {type: window.tools.getRandomElement(TYPES)},
        location: {
          x: window.tools.getRandomNumber(window.data.MAP_LEFT_BORDER, window.data.MAP_RIGHT_BORDER),
          y: window.tools.getRandomNumber(window.data.MAP_TOP_BORDER, window.data.MAP_BOTTOM_BORDER)
        }
      };

      mockAdverts.push(data);
    }
    return mockAdverts;
  };
})();
