'use strict';

(function () {
  window.TYPES = ['palace', 'flat', 'house', 'bungalo'];
  window.PRICES = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000',
  };
  window.PIN_WIDTH = 50;
  window.PIN_HEIGHT = 70;
  window.MAIN_PIN_WIDTH = 65;
  window.MAIN_PIN_HEIGHT = 65;
  // значениe PIN_TALE_HEIGHT я рассчитал, исходя из CSS свойств элемента '.map__pin--main::after':
  // top: 100%; border-top-width: 22px; transform: translate(-50%, -6px);
  window.PIN_TALE_HEIGHT = 16;
  // Начальные координаты '.map__pin--main' вынес в константы,
  // т.к. они не меняются при первой активации страницы
  window.MAIN_PIN_START_X = 570;
  window.MAIN_PIN_START_Y = 375;
  window.MAP_LEFT_BORDER = 0;
  window.MAP_RIGHT_BORDER = 1200;
  window.MAP_TOP_BORDER = 130;
  window.MAP_BOTTOM_BORDER = 630;
})();
