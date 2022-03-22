import {closeModal} from './utils.js';

const hashtag = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');
const button = document.querySelector('.img-upload__cancel');
const overlay = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const scale = document.querySelector('.img-upload__scale');

//Validation
const MAX_DESCRIPTION = 140;
const MAX_HASHTAGS = 5;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__item',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__item',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const getHashtags = (str) => {
  if (str) {
    const hashtags = str.split(/\s+/g);
    if (hashtags[0] === ''){hashtags.shift();}
    if (hashtags[hashtags.length - 1] === '') {hashtags.pop();}
    return hashtags;
  }
};

const validateStr = (str) => {
  if (str.length === 0) {return true;}
  const re = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
  const hashtags = getHashtags(str);
  const results = [];
  hashtags.forEach((element) => {
    results.push(re.test(element));
  });
  return results.indexOf(false) === -1;
};

pristine.addValidator(hashtag, validateStr, 'Какой то неправильный ХэшТег');

const validateDuplicateHashtag = (value) => {
  if (value.length === 0) {return true;}
  const hashtags = getHashtags(value);
  const swapArr = [...new Set(hashtags.map((element) => element.toLowerCase()))];
  return hashtags.length === swapArr.length;
};

pristine.addValidator(hashtag, validateDuplicateHashtag, 'Такой ХэшТег уже есть');

const validationMaxCountHashTags = (value) => {
  if (value.length === 0) {return true;}
  const hashtags = getHashtags(value);
  return hashtags.length < MAX_HASHTAGS;
};

pristine.addValidator(hashtag, validationMaxCountHashTags, `Максимум ${MAX_HASHTAGS} ХешТегов`);

const validateDescription = (value) => value.length <= MAX_DESCRIPTION;

pristine.addValidator(description, validateDescription, `Максимумум ${MAX_DESCRIPTION} символов`);

//Img transformation
const controlSmaller = scale.querySelector('.scale__control--smaller');
const controlBigger = scale.querySelector('.scale__control--bigger');
const scaleValue = scale.querySelector('.scale__control--value');

const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;

const scaleControlHandler = (evt) => {
  const value = parseInt(scaleValue.value, 10);
  if (evt.target === controlSmaller) {
    scaleValue.value = value > MIN_SCALE_VALUE ? `${value - SCALE_STEP}%` : `${MIN_SCALE_VALUE}%`;
  }
  if (evt.target === controlBigger) {
    scaleValue.value = value < MAX_SCALE_VALUE ? `${value + SCALE_STEP}%` : `${MAX_SCALE_VALUE}%`;
  }
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const loadImg = () => {
  const loadPicture = document.querySelector('#upload-file');
  loadPicture.addEventListener('change', () => {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    scaleValue.value = `${DEFAULT_SCALE_VALUE}%`;
    scale.addEventListener('click', scaleControlHandler);
    closeModal(button, overlay);
  });
};

export {loadImg, scaleControlHandler};
