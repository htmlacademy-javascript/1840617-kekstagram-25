import {requestData} from './api.js';
import {Effects, FetchConfig, ServerAdress, body} from './data.js';
import {validateHashtag, error} from './hashtags.js';
import {createErrorMessage, createSuccessMessage} from './messages.js';
import {
  closeOnCancelButton,
  closeOnEsc,
  killUploadHandlers,
  overlayUpload,
  cancelUploadButtonElement
} from './utils.js';


const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;
const DEFAULT_SCALE = 1;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

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


const uploadForm = document.querySelector('.img-upload__form');
const description = uploadForm.querySelector('.text__description');
const hashtag = uploadForm.querySelector('.text__hashtags');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const loadPicture = uploadForm.querySelector('#upload-file');
const effectsList = uploadForm.querySelector('.effects__list');
const originalFilter = effectsList.querySelector('#effect-none');
const effectPreviewS = effectsList.querySelectorAll('.effects__preview');
const scale = uploadForm.querySelector('.img-upload__scale');
const controlSmaller = scale.querySelector('.scale__control--smaller');
const controlBigger = scale.querySelector('.scale__control--bigger');
const scaleValue = scale.querySelector('.scale__control--value');
const picture = uploadForm.querySelector('.img-upload__preview > img');
const sliderControl = uploadForm.querySelector('.img-upload__effect-level');
const effectVlue = sliderControl.querySelector('.effect-level__value');
const sliderElement = sliderControl.querySelector('.effect-level__slider');


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


const clearUploadModal = () => {

  const textError = document.querySelector('.img-upload__error');

  if (textError) {

    textError.textContent = '';

  }

  picture.src = '';
  picture.style.transform = `scale(${DEFAULT_SCALE})`;
  picture.style.filter = 'none';
  originalFilter.checked = 'true';

};


const closeUploadModal = () => {

  overlayUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();
  scale.removeEventListener('click', scaleControlHandler);
  killUploadHandlers();
  clearUploadModal();

};

const cancelUploadButtonClickHandler = (evt) => {
  evt.preventDefault();

  closeOnCancelButton(evt, () => {
    closeUploadModal();
  });

};

const modalUploadKeyupHandler = (evt) => {
  evt.preventDefault();

  if (evt.target !== hashtag && evt.target !== description) {

    closeOnEsc(evt, () => {
      closeUploadModal();
    });

  }

};


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__item',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__item',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});


pristine.addValidator(hashtag, validateHashtag, error, 2, false);

const onHashtagInput = () => {
  pristine.validate();
};

hashtag.addEventListener('input', onHashtagInput());


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
      requestData(
        () => {
          createSuccessMessage();
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          createErrorMessage();
          onSuccess();
          unblockSubmitButton();

        },
        ServerAdress.UPLOAD_URL,
        FetchConfig.UPLOAD_CONFIG
      );
    }
  });
};


const addUserPreviewImg = () => {

  const file = loadPicture.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {

    const url = URL.createObjectURL(file);
    picture.src = url;

    effectPreviewS.forEach((preview) => {

      preview.style.backgroundImage = `url(${url})`;

    });
  }
};

const loadImg = () => {

  loadPicture.addEventListener('change', () => {

    sliderControl.classList.add('hidden');
    overlayUpload.classList.remove('hidden');
    body.classList.add('modal-open');

    addUserPreviewImg();

    scaleValue.value = `${DEFAULT_SCALE_VALUE}%`;

    scale.addEventListener('click', scaleControlHandler);

    document.addEventListener('keyup', modalUploadKeyupHandler);
    cancelUploadButtonElement.addEventListener('click', cancelUploadButtonClickHandler);
  });
};

export {
  loadImg,
  setUploadFormSubmit,
  modalUploadKeyupHandler,
  cancelUploadButtonClickHandler,
  closeUploadModal
};
