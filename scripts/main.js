/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/scripts/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./source/scripts/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./source/scripts/custom-select.js":
/*!*****************************************!*\
  !*** ./source/scripts/custom-select.js ***!
  \*****************************************/
/*! exports provided: initCustomSelect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initCustomSelect", function() { return initCustomSelect; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CustomSelect = /*#__PURE__*/function () {
  function CustomSelect(target, params) {
    _classCallCheck(this, CustomSelect);

    this._elRoot = typeof target === 'string' ? document.querySelector(target) : target;
    this._params = params || {};
    this._onClickFn = this._onClick.bind(this);

    if (this._params.options) {
      this._elRoot.classList.add(CustomSelect.CLASS_NAME_SELECT);

      this._elRoot.innerHTML = CustomSelect.template(this._params);
    }

    this._elToggle = this._elRoot.querySelector(CustomSelect.SELECTOR_DATA_TOGGLE);

    this._elRoot.addEventListener('click', this._onClickFn);
  }

  _createClass(CustomSelect, [{
    key: "_onClick",
    value: function _onClick(e) {
      var target = e.target;
      var type = target.closest(CustomSelect.SELECTOR_DATA).dataset.select;

      if (type === 'toggle') {
        this.toggle();
      } else if (type === 'option') {
        this._changeValue(target);
      }
    }
  }, {
    key: "_update",
    value: function _update(option) {
      option = option.closest('.select__option');

      var selected = this._elRoot.querySelector(CustomSelect.SELECTOR_OPTION_SELECTED);

      if (selected) {
        selected.classList.remove(CustomSelect.CLASS_NAME_SELECTED);
      }

      option.classList.add(CustomSelect.CLASS_NAME_SELECTED);
      this._elToggle.textContent = option.textContent;
      this._elToggle.value = option.dataset['value'];
      this._elToggle.dataset.index = option.dataset['index'];

      this._elRoot.dispatchEvent(new CustomEvent('select.change'));

      this._params.onSelected ? this._params.onSelected(this, option) : null;
      return option.dataset['value'];
    }
  }, {
    key: "_reset",
    value: function _reset() {
      var selected = this._elRoot.querySelector(CustomSelect.SELECTOR_OPTION_SELECTED);

      if (selected) {
        selected.classList.remove(CustomSelect.CLASS_NAME_SELECTED);
      }

      this._elToggle.textContent = 'Выберите из списка';
      this._elToggle.value = '';
      this._elToggle.dataset.index = -1;

      this._elRoot.dispatchEvent(new CustomEvent('select.change'));

      this._params.onSelected ? this._params.onSelected(this, null) : null;
      return '';
    }
  }, {
    key: "_changeValue",
    value: function _changeValue(option) {
      if (option.classList.contains(CustomSelect.CLASS_NAME_SELECTED)) {
        return;
      }

      this._update(option);

      this.hide();
    }
  }, {
    key: "show",
    value: function show() {
      document.querySelectorAll(CustomSelect.SELECTOR_ACTIVE).forEach(function (select) {
        select.classList.remove(CustomSelect.CLASS_NAME_ACTIVE);
      });

      this._elRoot.classList.add(CustomSelect.CLASS_NAME_ACTIVE);
    }
  }, {
    key: "hide",
    value: function hide() {
      this._elRoot.classList.remove(CustomSelect.CLASS_NAME_ACTIVE);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this._elRoot.classList.contains(CustomSelect.CLASS_NAME_ACTIVE)) {
        this.hide();
      } else {
        this.show();
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._elRoot.removeEventListener('click', this._onClickFn);
    }
  }, {
    key: "value",
    get: function get() {
      return this._elToggle.value;
    },
    set: function set(value) {
      var _this = this;

      var isExists = false;

      this._elRoot.querySelectorAll('.select__option').forEach(function (option) {
        if (option.dataset['value'] === value) {
          isExists = true;
          return _this._update(option);
        }
      });

      if (!isExists) {
        return this._reset();
      }
    }
  }, {
    key: "selectedIndex",
    get: function get() {
      return this._elToggle.dataset['index'];
    },
    set: function set(index) {
      var option = this._elRoot.querySelector(".select__option[data-index=\"".concat(index, "\"]"));

      if (option) {
        return this._update(option);
      }

      return this._reset();
    }
  }]);

  return CustomSelect;
}();

_defineProperty(CustomSelect, "CLASS_NAME_SELECT", 'select');

_defineProperty(CustomSelect, "CLASS_NAME_ACTIVE", 'select_show');

_defineProperty(CustomSelect, "CLASS_NAME_SELECTED", 'select__option_selected');

_defineProperty(CustomSelect, "SELECTOR_ACTIVE", '.select_show');

_defineProperty(CustomSelect, "SELECTOR_DATA", '[data-select]');

_defineProperty(CustomSelect, "SELECTOR_DATA_TOGGLE", '[data-select="toggle"]');

_defineProperty(CustomSelect, "SELECTOR_OPTION_SELECTED", '.select__option_selected');

CustomSelect.template = function (params) {
  var name = params['name'];
  var options = params['options'];
  var targetValue = params['targetValue'];
  var items = [];
  var selectedIndex = -1;
  var selectedValue = '';
  var selectedContent = 'Выберите из списка';
  options.forEach(function (option, index) {
    var selectedClass = '';

    if (option[0] === targetValue) {
      selectedClass = ' select__option_selected';
      selectedIndex = index;
      selectedValue = option[0];
      selectedContent = option[1];
    } // items.push(`<li class="select__option${selectedClass}" data-select="option" data-value="${option[0]}" data-index="${index}">${option[1]}</li>`);

  }); // return `<button type="button" class="select__toggle" name="${name}" value="${selectedValue}" data-select="toggle" data-index="${selectedIndex}">${selectedContent}</button>
  // <div class="select__dropdown">
  //   <ul class="select__options">${items.join('')}</ul>
  // </div>`;
};

document.addEventListener('click', function (e) {
  if (!e.target.closest('.select')) {
    document.querySelectorAll(CustomSelect.SELECTOR_ACTIVE).forEach(function (select) {
      select.classList.remove(CustomSelect.CLASS_NAME_ACTIVE);
    });
  }
});

var initCustomSelect = function initCustomSelect() {
  var customSelect = new CustomSelect('#select');
};



/***/ }),

/***/ "./source/scripts/main.js":
/*!********************************!*\
  !*** ./source/scripts/main.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _custom_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./custom-select */ "./source/scripts/custom-select.js");
/* harmony import */ var _range_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./range-slider */ "./source/scripts/range-slider.js");
/* harmony import */ var _mobile_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mobile-menu */ "./source/scripts/mobile-menu.js");



window.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    Object(_custom_select__WEBPACK_IMPORTED_MODULE_0__["initCustomSelect"])();
    Object(_range_slider__WEBPACK_IMPORTED_MODULE_1__["initRangeSlider"])();
    Object(_mobile_menu__WEBPACK_IMPORTED_MODULE_2__["initMobileMenu"])();
  });
});

/***/ }),

/***/ "./source/scripts/mobile-menu.js":
/*!***************************************!*\
  !*** ./source/scripts/mobile-menu.js ***!
  \***************************************/
/*! exports provided: initMobileMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initMobileMenu", function() { return initMobileMenu; });
var openButton = document.querySelector('.header__btn-burger');
var closeButton = document.querySelector('.header__btn-close');
var mobileMenu = document.querySelector('.header__menu');
var page = document.querySelector('.page');
var breakpoint = window.matchMedia('(min-width:1024px)');
var active = 'active';
var scrollLock = 'scroll-lock';

var openMenu = function openMenu() {
  if (breakpoint.matches) {
    return;
  }

  page.classList.add(scrollLock);
  mobileMenu.classList.add(active);
};

var closeMenu = function closeMenu() {
  page.classList.remove(scrollLock);
  mobileMenu.classList.remove(active);
};

var initMobileMenu = function initMobileMenu() {
  if (!openButton) {
    return;
  }

  openButton.addEventListener('click', function () {
    openMenu();
  });
  closeButton.addEventListener('click', function () {
    closeMenu();
  });
  window.addEventListener('click', function (evt) {
    var isOpenButton = evt.target.closest('.header__btn-burger') === openButton;

    if (evt.target !== mobileMenu && isOpenButton === false && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });
  breakpoint.addListener(closeMenu);
};



/***/ }),

/***/ "./source/scripts/range-slider.js":
/*!****************************************!*\
  !*** ./source/scripts/range-slider.js ***!
  \****************************************/
/*! exports provided: initRangeSlider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initRangeSlider", function() { return initRangeSlider; });
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

/***/ })

/******/ });
//# sourceMappingURL=main.js.map