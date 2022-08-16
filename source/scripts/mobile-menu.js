const openButton = document.querySelector('.header__btn-burger');
const closeButton = document.querySelector('.header__btn-close');
const mobileMenu = document.querySelector('.header__menu');
const page = document.querySelector('.page');
const breakpoint = window.matchMedia('(min-width:1024px)');
const active = 'active';
const scrollLock = 'scroll-lock';

const openMenu = () => {
  if (breakpoint.matches) {
    return;
  }

  page.classList.add(scrollLock);
  mobileMenu.classList.add(active);
};

const closeMenu = () => {
  page.classList.remove(scrollLock);
  mobileMenu.classList.remove(active);

};

const initMobileMenu = () => {
  if (!openButton) {
    return;
  }

  openButton.addEventListener('click', () => {
    openMenu();
  });

  closeButton.addEventListener('click', () => {
    closeMenu();
  });

  window.addEventListener('click', (evt) => {
    let isOpenButton = evt.target.closest('.header__btn-burger') === openButton;
    if (evt.target !== mobileMenu && isOpenButton === false && mobileMenu.classList.contains('active')) {

      closeMenu();
    }
  });

  breakpoint.addListener(closeMenu);
};

export {initMobileMenu};
