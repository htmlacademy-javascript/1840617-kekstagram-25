import {Buttons, body} from './data.js';
import {
  modalKeyupHandler,
  cancelButtonClickHandler,
  clickLoadMessagesHandler
} from './big-picture.js';
import {
  modalUploadKeyupHandler,
  cancelUploadButtonClickHandler
} from './upload-img-form.js';


const LAST_DIGITS = 2;
const PLURAL_CONTROL = '1';
const SINGLE_DIGIT = 1;
const DELAY = 500;

const overlayElement = document.querySelector('.big-picture');
const cancelButtonElement = overlayElement.querySelector('.big-picture__cancel');
const loadMessageButtonElement = overlayElement.querySelector('.social__comments-loader');

const overlayUpload = document.querySelector('.img-upload__overlay');
const cancelUploadButtonElement = overlayUpload.querySelector('.cancel');

const closePreview = () => {

  cancelButtonElement.removeEventListener('click', cancelButtonClickHandler);
  document.removeEventListener('keyup', modalKeyupHandler);
  loadMessageButtonElement.removeEventListener('click', clickLoadMessagesHandler);

  overlayElement.classList.add('hidden');
  body.classList.remove('modal-open');

};

const killUploadHandlers = () => {

  document.removeEventListener('keyup', modalUploadKeyupHandler);
  cancelUploadButtonElement.removeEventListener('click', cancelUploadButtonClickHandler);

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


const isClick = (evt) => evt.pointerId >= Buttons.ANYCLICK;


const isEsc = (evt) => evt.key === Buttons.ESCAPE;


const closeOnCancelButton = (evt, cb) => {
  if (isClick(evt)) {
    cb();
  }
};


const closeOnEsc = (evt, cb) => {
  if(isEsc(evt)) {
    cb();
  }
};


const debounce = (callback, timeoutDelay = DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const removeElement = (selector) => document.querySelector(selector).remove();

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export {
  numDecline,
  shuffleArray,
  closeOnCancelButton,
  closeOnEsc,
  debounce,
  removeElement,
  closePreview,
  overlayElement,
  cancelButtonElement,
  loadMessageButtonElement,
  overlayUpload,
  cancelUploadButtonElement,
  killUploadHandlers
};
