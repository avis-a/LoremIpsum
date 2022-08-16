import {initCustomSelect} from './custom-select';
import {initRangeSlider} from './range-slider';
import {initMobileMenu} from './mobile-menu';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    initCustomSelect();
    initRangeSlider();
    initMobileMenu();
  });
});
