import {closeModal} from './utils.js';
import {effects} from './data.js';

const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;

const defaultEfect = {
  min: 0,
  max: 10,
  start: 10,
  step: 1,
  filter: 'none',
  unit: '',
};

const button = document.querySelector('.img-upload__cancel');
const overlay = document.querySelector('.img-upload__overlay');
const scale = document.querySelector('.img-upload__scale');

//Img transformation
const controlSmaller = scale.querySelector('.scale__control--smaller');
const controlBigger = scale.querySelector('.scale__control--bigger');
const scaleValue = scale.querySelector('.scale__control--value');
const picture = document.querySelector('.img-upload__preview > img');

const scaleControlHandler = (evt) => {
  const value = parseInt(scaleValue.value, 10);
  if (evt.target === controlSmaller) {
    scaleValue.value = value > MIN_SCALE_VALUE ? `${value - SCALE_STEP}%` : `${MIN_SCALE_VALUE}%`;
  }
  if (evt.target === controlBigger) {
    scaleValue.value = value < MAX_SCALE_VALUE ? `${value + SCALE_STEP}%` : `${MAX_SCALE_VALUE}%`;
  }
  picture.style.transform = `scale(${parseInt(scaleValue.value, 10)/100})`;
};
//effects
const effectsList = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: defaultEfect['min'],
    max: defaultEfect['max'],
  },
  start: defaultEfect['start'],
  step: defaultEfect['step'],
});

const sliderControl = document.querySelector('.img-upload__effect-level');
sliderControl.classList.add('hidden');
effectsList.addEventListener('change', (evt) => {

  const effectControl = evt.target.value;
  if (effectControl === 'none')  {
    sliderControl.classList.add('hidden');
    picture.style.filter = 'none';
  } else {
    sliderControl.classList.remove('hidden');

    picture.classList = '';
    picture.classList.add(`effects__preview--${effectControl}`);
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: effects[effectControl]['min'],
        max: effects[effectControl]['max'],
      },
      start: effects[effectControl]['start'],
      step: effects[effectControl]['step'],
    });
    sliderElement.noUiSlider.on('update', () => {
      picture.style.filter = `${effects[effectControl]['filter']}(${sliderElement.noUiSlider.get()}${effects[effectControl]['unit']})`;
    });
  }
});

const loadImg = () => {
  const loadPicture = document.querySelector('#upload-file');
  loadPicture.addEventListener('change', () => {
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    scaleValue.value = `${DEFAULT_SCALE_VALUE}%`;
    scale.addEventListener('click', scaleControlHandler);
    closeModal(button, overlay);
  });
};

export {loadImg, scaleControlHandler};
