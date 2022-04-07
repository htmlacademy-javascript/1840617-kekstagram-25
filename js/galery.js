import {showBigPicture} from './big-picture.js';
import {loadImg} from './upload-img-form.js';
import {shuffleArray, debounce} from './utils.js';

const ACTIVE_CLASS = 'img-filters__button--active';
const MAX_PREVIEWS = 10;

const Filters = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
  DEFAULT: 'filter-default',
};

const TogleSelectors = {
  TAGS: {
    form: 'form',
    button: 'button',
  },
  CLASS: {
    buttonClass: '.img-filters__button',
    activeButton: '.img-filters__button--active',
  }
};

const previewList = document.querySelector('.pictures');
const previewTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filter = document.querySelector('.img-filters');

const listFragment = document.createDocumentFragment();

/// filtration
const filtersForm = document.querySelector('.img-filters__form');
const previewContainer = document.querySelector('.pictures');


const createPreviewPicture = (pictureInfo) => {

  const previewElement = previewTemplate.cloneNode(true);
  previewElement.querySelector('.picture__img').src = pictureInfo.url;
  previewElement.querySelector('.picture__comments').textContent = pictureInfo.comments.length;
  previewElement.querySelector('.picture__likes').textContent = pictureInfo.likes;

  listFragment.appendChild(previewElement);

  previewElement.addEventListener('click', (evt) => {
    evt.preventDefault();

    showBigPicture(pictureInfo);

  });

};


const clearPreviews = () => {

  const previews = previewContainer.querySelectorAll('.picture');

  previews.forEach((el) => {

    previewContainer.removeChild(el);

  });

};

const createGalery = (infoArray) => {

  clearPreviews();
  infoArray.forEach((infoObj) => {

    createPreviewPicture(infoObj);

  });

  previewList.appendChild(listFragment);

};


const filtration = (photoData) => {

  const btn = document.querySelector(`.${ACTIVE_CLASS}`);
  const data = photoData;
  let photos = data.slice(0);

  switch (btn.id) {

    case Filters.DEFAULT:
      photos = data;
      break;

    case Filters.RANDOM:
      photos = shuffleArray(photos).slice(0, MAX_PREVIEWS);
      break;

    case Filters.DISCUSSED:
      photos.sort((a, b) => b.comments.length - a.comments.length);
      break;
  }

  createGalery(photos);

};

const filterClickHandler = (evt) => {

  if (evt.target.type === TogleSelectors.TAGS.button) {

    filtersForm.querySelector(`.${ACTIVE_CLASS}`).classList.remove(ACTIVE_CLASS);
    evt.target.closest(TogleSelectors.TAGS.button).classList.add(ACTIVE_CLASS);
  }

};

const debounceHandler = (data) => debounce(() => filtration(data));

const renderGalery = (photoInfo) => {

  filtersForm.addEventListener('click', filterClickHandler);
  filtersForm.addEventListener('click', debounceHandler(photoInfo));

  createGalery(photoInfo);

  filter.classList.remove('hidden');
  filter.style.opacity = 1;

  loadImg();
};

export {renderGalery};
