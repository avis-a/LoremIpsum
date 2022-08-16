"use strict";

var _customSelect = require("./custom-select");

var _rangeSlider = require("./range-slider");

var _mobileMenu = require("./mobile-menu");

window.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    (0, _customSelect.initCustomSelect)();
    (0, _rangeSlider.initRangeSlider)();
    (0, _mobileMenu.initMobileMenu)();
  });
});