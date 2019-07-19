'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');

  housingType.addEventListener('change', function () {
    window.pin.updatePins(housingType);
  });
})();
