'use strict';

(function () {

  var deps = {
    globs: {
      PRICES: window.PRICES
    }
  };

  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  /**
 * Добавляет или убирает аттрибут 'disabled' у дочерних элементов формы
 * @param {*} form DOM элемент, где форма является родительским элементом,
 *                 а поля ввода, либо 'fieldset' - его прямыми потомками
 * @param {Boolean} flag значение 'true' добавляет атрибут, 'false' удаляет его
 */
  window.changeAccessibility = function (form, flag) {
    for (var i = 0; i < form.children.length; i++) {
      form.children[i].disabled = flag;
    }
  };

  window.changeAccessibility(adForm, true);
  window.changeAccessibility(mapFilters, true);

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
  window.changePrice = function () {
    price.setAttribute('min', deps.globs.PRICES[type.value]);
    price.setAttribute('placeholder', deps.globs.PRICES[type.value]);
  };

  timeIn.addEventListener('change', function () {
    synchronizeSelects(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    synchronizeSelects(timeOut, timeIn);
  });

  type.addEventListener('change', function () {
    window.changePrice();
  });
})();
