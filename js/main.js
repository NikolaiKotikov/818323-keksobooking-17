'use strict';

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pin = document.querySelector('#pin').content;

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

var getMockSrc = function (number) {
  return 'img/avatars/user' + '0' + (number + 1) + '.png';
};

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomNumber = function (minNumber, maxNumber) {
  return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
};

var generateMockData = function (amount) {
  var mockAdverts = [];
  for (var i = 0; i < amount; i++) {
    var data = {};

    data.author = {avatar: getMockSrc(i)};
    data.offer = {type: getRandomElement(TYPES)};
    data.location = {x: getRandomNumber(0, 1200), y: getRandomNumber(130, 630)};

    mockAdverts.push(data);
  }
  return mockAdverts;
};

var renderMapPin = function (object) {
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

var createMapPins = function () {
  var fragment = document.createDocumentFragment();
  var mockData = generateMockData(8);
  for (var i = 0; i < mockData.length; i++) {
    fragment.appendChild(renderMapPin(mockData[i]));
  }
  mapPins.appendChild(fragment);
};

createMapPins();

// Это временно:
map.classList.remove('map--faded');
