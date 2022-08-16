const rangeInput = document.querySelector('input[type="range"]');
const numberInput = document.querySelector('#rangevalue');
const startPosition = 75;

const formatRangeInputValue = (val) => val + '%';

const changeRange = (e) => {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  }

  numberInput.innerHTML = formatRangeInputValue(target.value);
};

export const initRangeSlider = () => {
  rangeInput.value = startPosition;
  numberInput.innerHTML = formatRangeInputValue(rangeInput.value);

  rangeInput.addEventListener('input', changeRange)
}

