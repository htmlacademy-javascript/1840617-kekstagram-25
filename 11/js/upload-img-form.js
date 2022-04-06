import {getData} from './api.js';
import {Effects, FetchConfig, ServerAdress} from './data.js';
import {hashtagHandler, error} from './hashtags.js';
import {createErrorMessage, createSuccessMessage} from './messages.js';
import {closeOnCancelButton, closeOnEsc, body} from './utils.js';


const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;
const DEFAULT_SCALE = 1;


const SubmitButtonText = {
  BLOCK: 'Отправляю...',
  UNBLOCK: 'ОПУБЛИКОВАТЬ',
};

const DefaultEfect = {
  MIN: 0,
  MAX: 10,
  START: 10,
  STEP: 1,
  FILTER: 'none',
  UNIT: '',
};


const description = document.querySelector('.text__description');

const effectVlue = document.querySelector('.effect-level__value');

const submitButton = document.querySelector('.img-upload__submit');

const hashtag = document.querySelector('.text__hashtags');
const uploadForm = document.querySelector('.img-upload__form');


const overlay = document.querySelector('.img-upload__overlay');
const scale = document.querySelector('.img-upload__scale');
const loadPicture = document.querySelector('#upload-file');

const originalFilter = document.querySelector('#effect-none');

const cancelButtonElement = overlay.querySelector('.cancel');

//Img transformation
const controlSmaller = scale.querySelector('.scale__control--smaller');
const controlBigger = scale.querySelector('.scale__control--bigger');
const scaleValue = scale.querySelector('.scale__control--value');
const picture = document.querySelector('.img-upload__preview > img');
const sliderControl = document.querySelector('.img-upload__effect-level');
const effectsList = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');


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

noUiSlider.create(sliderElement, {
  range: {
    min: DefaultEfect['MIN'],
    max: DefaultEfect['MAX'],
  },
  start: DefaultEfect['START'],
  step: DefaultEfect['STEP'],
});


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


    const preset = effectControl.toUpperCase();

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: Effects[preset]['MIN'],
        max: Effects[preset]['MAX'],
      },
      start: Effects[preset]['START'],
      step: Effects[preset]['STEP'],
    });


    sliderElement.noUiSlider.on('update', () => {

      picture.style.filter = `${Effects[preset]['FILTER']}(${sliderElement.noUiSlider.get()}${Effects[preset]['UNIT']})`;

      effectVlue.value = sliderElement.noUiSlider.get();

    });
  }
});

//close modal window
const clearUploadModal = () => {

  const textError = document.querySelector('.img-upload__error');

  if (textError) {

    textError.textContent = '';

  }


  picture.style.transform = `scale(${DEFAULT_SCALE})`;
  picture.style.filter = 'none';
  originalFilter.checked = 'true';
  document.querySelector('.img-upload__form').reset();

};


const cancelButtonClickHandler = (evt) => {

  closeOnCancelButton(evt, () => {
    closeUploadModal();

  });

};

const modalKeyupHandler = (evt) => {

  if (evt.target !== hashtag && evt.target !== description) {

    closeOnEsc(evt, () => {
      closeUploadModal();

    });

  }

};


function closeUploadModal() {

  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();

  clearUploadModal();

  document.removeEventListener('keyup', modalKeyupHandler);
  cancelButtonElement.removeEventListener('click', cancelButtonClickHandler);
  scale.removeEventListener('click', scaleControlHandler);

}


//validation
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__item',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__item',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});


pristine.addValidator(hashtag, hashtagHandler, error, 2, false);

const onHashtagInput = () => {
  pristine.validate();
};

hashtag.addEventListener('input', onHashtagInput());

//upload data to server
const blockSubmitButton = () => {

  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.BLOCK;

};

const unblockSubmitButton = () => {

  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.UNBLOCK;

};

const setUploadFormSubmit = (onSuccess) => {

  uploadForm.addEventListener('submit', (evt) => {

    evt.preventDefault();

    FetchConfig.UPLOAD_CONFIG.body = new FormData(evt.target);


    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      getData(

        () => {

          createSuccessMessage();
          onSuccess();

          unblockSubmitButton();
        },
        () => {

          createErrorMessage();
          closeUploadModal();
          unblockSubmitButton();

        },
        ServerAdress.UPLOAD_URL,
        FetchConfig.UPLOAD_CONFIG

      );

    }

  });

};


//init
const loadImg = () => {

  loadPicture.addEventListener('change', () => {

    sliderControl.classList.add('hidden');
    overlay.classList.remove('hidden');
    body.classList.add('modal-open');

    scaleValue.value = `${DEFAULT_SCALE_VALUE}%`;

    scale.addEventListener('click', scaleControlHandler);


    document.addEventListener('keyup', modalKeyupHandler);
    cancelButtonElement.addEventListener('click', cancelButtonClickHandler);


  });
};

export {loadImg, setUploadFormSubmit, closeUploadModal};
