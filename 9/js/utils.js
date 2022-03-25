import {scaleControlHandler} from './upload-img-form.js';
import {buttons} from './data.js';

const LAST_DIGITS = 2;
const PLURAL_CONTROL = '1';
const SINGLE_DIGIT = 1;
const DEFAULT_SCALE = 1;

const getRandomInt = (min, max) => {
  if (min > max) {[min, max] = [max, min];}
  return Math.floor((Math.random() * (max - min + 1) + min));
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const closeModal = (button, overlay) => {
  const description = document.querySelector('.text__description');
  const hashtag = document.querySelector('.text__hashtags');
  const commentField = document.querySelector('.social__footer-text');
  const uploadPicture = document.querySelector('.img-upload__preview > img');
  const originalFilter = document.querySelector('#effect-none');

  const closeModalHandler = (evt) => {
    const hideModal = () => {
      const scale = document.querySelector('.img-upload__scale');
      const textError = document.querySelector('.img-upload__error');
      if (textError) {textError.textContent = '';}
      uploadPicture.style.transform = `scale(${DEFAULT_SCALE})`;
      uploadPicture.style.filter = 'none';
      originalFilter.checked = 'true';
      overlay.classList.add('hidden');
      document.querySelector('.img-upload__form').reset();
      document.querySelector('body').classList.remove('modal-open');
      button.removeEventListener('click', closeModalHandler);
      document.removeEventListener('keyup', closeModalHandler);
      scale.removeEventListener('click', scaleControlHandler);
    };

    if (evt.target === button && (evt.pointerId >= buttons.anyClick || evt.key === buttons.enter)) {hideModal();}
    if (evt.target === description || evt.target === hashtag || evt.target === commentField) {
      if (evt.pointerId === buttons.click) {hideModal();}
    } else {
      if (evt.key === buttons.escape || evt.pointerId === buttons.click) {hideModal();}
    }
  };

  button.addEventListener('click', closeModalHandler);
  document.addEventListener('keyup', closeModalHandler);
};

const numDecline = (num,  genitiveSingular, genitivePlural) => {
  const str = num.toString();
  const lastSymbol = str.slice(-1);
  let penultSymbol = '';

  if (str.length > SINGLE_DIGIT) {
    penultSymbol =str.slice(str.length - LAST_DIGITS, -1);
    return penultSymbol !== PLURAL_CONTROL && lastSymbol === PLURAL_CONTROL ?  genitiveSingular : genitivePlural;
  }

  return lastSymbol === PLURAL_CONTROL ? genitiveSingular :genitivePlural;

};

export {getRandomInt, shuffleArray, closeModal, numDecline};
