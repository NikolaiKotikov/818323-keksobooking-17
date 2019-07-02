'use strict';

(function () {

  var deps = {
    tools: {
      getRandomElement: window.getRandomElement,
      getRandomNumber: window.getRandomNumber
    },
    globs: {
      TYPES: window.TYPES,
      MAP_LEFT_BORDER: window.MAP_LEFT_BORDER,
      MAP_RIGHT_BORDER: window.MAP_RIGHT_BORDER,
      MAP_TOP_BORDER: window.MAP_TOP_BORDER,
      MAP_BOTTOM_BORDER: window.MAP_BOTTOM_BORDER
    }
  };

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
        offer: {type: deps.tools.getRandomElement(deps.globs.TYPES)},
        location: {
          x: deps.tools.getRandomNumber(deps.globs.MAP_LEFT_BORDER, deps.globs.MAP_RIGHT_BORDER),
          y: deps.tools.getRandomNumber(deps.globs.MAP_TOP_BORDER, deps.globs.MAP_BOTTOM_BORDER)
        }
      };

      mockAdverts.push(data);
    }
    return mockAdverts;
  };
})();
