"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initRangeSlider = void 0;
var rangeInput = document.querySelector('input[type="range"]');
var numberInput = document.querySelector('#rangevalue');
var startPosition = 75;

var formatRangeInputValue = function formatRangeInputValue(val) {
  return val + '%';
};

var changeRange = function changeRange(e) {
  var target = e.target;

  if (e.target.type !== 'range') {
    target = document.getElementById('range');
  }

  numberInput.innerHTML = formatRangeInputValue(target.value);
};

var initRangeSlider = function initRangeSlider() {
  rangeInput.value = startPosition;
  numberInput.innerHTML = formatRangeInputValue(rangeInput.value);
  rangeInput.addEventListener('input', changeRange);
};

exports.initRangeSlider = initRangeSlider;