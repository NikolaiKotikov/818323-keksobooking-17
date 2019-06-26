'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAP_LEFT_BORDER = 0;
var MAP_RIGHT_BORDER = 1200;
var MAP_TOP_BORDER = 130;
var MAP_BOTTOM_BORDER = 630;

var mapPins = document.querySelector('.map__pins');
var pin = document.querySelector('#pin').content;
var forms = document.querySelectorAll('form');
var mapPinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
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
      location: {x: getRandomNumber(MAP_LEFT_BORDER, MAP_RIGHT_BORDER), y: getRandomNumber(MAP_TOP_BORDER, MAP_BOTTOM_BORDER)}
    };

    mockAdverts.push(data);
  }
  return mockAdverts;
};

/**
 * функция создания DOM-элемента на основе JS-объекта
 * @param {Object} object
 * @return {*} - возвращает DOM-элемент
 */
var createMapPin = function (object) {
  var mapPinElement = pin.querySelector('.map__pin').cloneNode(true);
  var img = mapPinElement.querySelector('img');
  var title = document.querySelector('#title').value;
  var locationX = object.location.x - PIN_WIDTH / 2;
  var locationY = object.location.y - PIN_HEIGHT;
  var coordinates = 'left:' + locationX + 'px' + ';' + 'top:' + locationY + 'px' + ';';
  var src = object.author.avatar;

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
 * Добавляет или убирает аттрибут 'disabled' у дочерних элементов форм
 * @param {Array} arr псевдомассив со всеми найденными формами
 * @param {Boolean} flag значение 'true' добавляет атрибут, 'false' удаляет его
 */
var changeAccessibility = function (arr, flag) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      arr[i][j].disabled = flag;
    }
  }
};

/**
 * Переводит страницу в активное состояние
 */
var activatePage = function () {
  changeAccessibility(forms, false);
  renderMapPin(generatedData);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
};

changeAccessibility(forms, true);
mapPinMain.addEventListener('click', function () {
  activatePage();
});

address.value = mapPinMain.style.left.slice(0, 3) + ',' + mapPinMain.style.top.slice(0, 3);
