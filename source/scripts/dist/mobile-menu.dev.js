"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initMobileMenu = void 0;
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

exports.initMobileMenu = initMobileMenu;