'use strict';

(function () {
  /**
 * Функция, которая возвращает случайное число в заданном диапазоне,
 * ВКЛЮЧАЯ нижнее и верхнее значения.
 * @param {Number} minNumber - нижняя граница диапазона;
 * @param {number} maxNumber - верхняя граница диапазона;
 * @return {number} - возвращает случайное число;
 */
  window.getRandomNumber = function (minNumber, maxNumber) {
    return Math.floor(Math.random() * (maxNumber + 1 - minNumber) + minNumber);
  };

  /**
  * Функция для получения случайного элемента массива;
  * @param {Array} arr - принимает в качестве аргумента массив;
  * @return {Number} - возвращает случайный элемент;
  */
  window.getRandomElement = function (arr) {
    return arr[window.getRandomNumber(0, arr.length - 1)];
  };
})();
