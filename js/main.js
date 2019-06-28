'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PRICES = {
  bungalo: '0',
  flat: '1000',
  house: '5000',
  palace: '10000',
};
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
// значениe PIN_TALE_HEIGHT я рассчитал, исходя из CSS свойств элемента '.map__pin--main::after':
// top: 100%; border-top-width: 22px; transform: translate(-50%, -6px);
var PIN_TALE_HEIGHT = 16;
// Начальные координаты '.map__pin--main' вынес в константы,
// т.к. они не меняются при первой активации страницы
var MAIN_PIN_START_X = 570;
var MAIN_PIN_START_Y = 375;
var MAP_LEFT_BORDER = 0;
var MAP_RIGHT_BORDER = 1200;
var MAP_TOP_BORDER = 130;
var MAP_BOTTOM_BORDER = 630;

var mapPins = document.querySelector('.map__pins');
var pin = document.querySelector('#pin').content;
var mapPinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var address = document.querySelector('#address');

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
 * Функция, которая возвращает случайное число в заданном диапазоне,
 * ВКЛЮЧАЯ нижнее и верхнее значения.
 * @param {Number} minNumber - нижняя граница диапазона;
 * @param {number} maxNumber - верхняя граница диапазона;
 * @return {number} - возвращает случайное число;
 */
var getRandomNumber = function (minNumber, maxNumber) {
  return Math.floor(Math.random() * (maxNumber + 1 - minNumber) + minNumber);
};

/**
 * Функция для получения случайного элемента массива;
 * @param {Array} arr - принимает в качестве аргумента массив;
 * @return {Number} - возвращает случайный элемент;
 */
var getRandomElement = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

/**
 * Функция генерирует массив объектов с временными данными для объявлений
 * @param {Number} amount - количество объявлений
 * @return {Array}
 */
var generateMockData = function (amount) {
  var mockAdverts = [];

  for (var i = 0; i < amount; i++) {
    var data = {
      author: {avatar: getMockSrc(i)},
      offer: {type: getRandomElement(TYPES)},
      location: {
        x: getRandomNumber(MAP_LEFT_BORDER, MAP_RIGHT_BORDER),
        y: getRandomNumber(MAP_TOP_BORDER, MAP_BOTTOM_BORDER)
      }
    };

    mockAdverts.push(data);
  }
  return mockAdverts;
};

/**
 * Подготавливает координаты, для подстановки в значение атрибута style
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
var renderMapPin = function (mockData) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < mockData.length; i++) {
    fragment.appendChild(createMapPin(mockData[i]));
  }

  mapPins.appendChild(fragment);
};

var generatedData = generateMockData(8);


/**
 * Добавляет или убирает аттрибут 'disabled' у дочерних элементов формы
 * @param {*} form DOM элемент, где форма является родительским элементом,
 *                 а поля ввода, либо 'fieldset' - его прямыми потомками
 * @param {Boolean} flag значение 'true' добавляет атрибут, 'false' удаляет его
 */
var changeAccessibility = function (form, flag) {
  for (var i = 0; i < form.children.length; i++) {
    form.children[i].disabled = flag;
  }
};

/**
 * Переводит страницу в активное состояние
 */
var activatePage = function () {
  changeAccessibility(adForm, false);
  changeAccessibility(mapFilters, false);
  renderMapPin(generatedData);
  changePrice();
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
  var coordinateX = MAIN_PIN_WIDTH / 2 + x;
  var coordinateY = MAIN_PIN_HEIGHT + PIN_TALE_HEIGHT + y;
  return [coordinateX, coordinateY];
};

changeAccessibility(adForm, true);
changeAccessibility(mapFilters, true);
mapPinMain.addEventListener('click', function () {
  activatePage();
});

var needlePointСoordinates = getNeedlePointСoordinates(MAIN_PIN_START_X, MAIN_PIN_START_Y);
address.value = Math.round(needlePointСoordinates[0]) + ', ' + Math.round(needlePointСoordinates[1]);

// Задание 8
var type = document.querySelector('#type');
var price = document.querySelector('#price');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

/**
 * Синхронизирует поля firstSelect и secondSelect:
 * при изменении значения поля firstSelect
 * в поле secondSelect выделяется соответствующее ему значение
 * @param {*} firstSelect DOM элемент, поле select
 * @param {*} secondSelect DOM элемент, поле select
 */
var synchronizeSelects = function (firstSelect, secondSelect) {
  var currentVal = firstSelect.value;
  for (var i = 0; i < secondSelect.children.length; i++) {
    if (currentVal === secondSelect.children[i].value) {
      secondSelect.children[i].selected = true;
    }
  }
};

/**
 * связывает поля «Тип жилья» и «Цена за ночь»:
 * при изменении значения в поле «Тип жилья»,
 * меняются значения атрибутов 'min' и 'placeholder';
 * зависимость значений хранится в 'PRICES'
 */
var changePrice = function () {
  price.setAttribute('min', PRICES[type.value]);
  price.setAttribute('placeholder', PRICES[type.value]);
};

timeIn.addEventListener('change', function () {
  synchronizeSelects(timeIn, timeOut);
});

timeOut.addEventListener('change', function () {
  synchronizeSelects(timeOut, timeIn);
});

type.addEventListener('change', function () {
  changePrice();
});
