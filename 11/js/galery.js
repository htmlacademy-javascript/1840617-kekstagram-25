import {showBigPicture} from './big-picture.js';
import {loadImg} from './upload-img-form.js';
import {shuffleArray, debounce} from './utils.js';


const previewList = document.querySelector('.pictures');
const previewTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filter = document.querySelector('.img-filters');

const listFragment = document.createDocumentFragment();


/// filtration
const filtersForm = document.querySelector('.img-filters__form');
const filters = filtersForm.querySelectorAll('.img-filters__button');
const previewContainer = document.querySelector('.pictures');


const ACTIVE_CLASS = 'img-filters__button--active';
const MAX_PREVIEWS = 10;

const Filters = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
  DEFAULT: 'filter-default',
};

let photos = [];
let defaultPhotos = [];

const createPreviewPicture = (pictureInfo) => {

  const previewElement = previewTemplate.cloneNode(true);
  previewElement.querySelector('.picture__img').src = pictureInfo.url;
  previewElement.querySelector('.picture__comments').textContent = pictureInfo.comments.length;
  previewElement.querySelector('.picture__likes').textContent = pictureInfo.likes;

  listFragment.appendChild(previewElement);

  previewElement.addEventListener('click', () => {

    showBigPicture(pictureInfo);

  });

};


const togleActiveFilter = (btn) => {

  filters.forEach((el) => {

    if (el.classList.contains(ACTIVE_CLASS)) {

      el.classList.remove(ACTIVE_CLASS);

    }

  });

  btn.classList.add(ACTIVE_CLASS);

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

const filterClickHandler = (evt) => {

  let button;

  if (evt.target.closest(TogleSelectors.CLASS.buttonClass)) {

    button = evt.target.closest('button');

    togleActiveFilter(button);

  } else {

    button = document.querySelector(`.${ACTIVE_CLASS}`);
  }


  let filteredPhotos;

  if (button.id === Filters.RANDOM) {

    filteredPhotos = shuffleArray(photos).slice(0, MAX_PREVIEWS);

  }


  if (button.id === Filters.DISCUSSED) {

    filteredPhotos = photos;
    filteredPhotos.sort((a, b) => b.comments.length - a.comments.length);

  }

  if (button.id === Filters.DEFAULT) {

    filteredPhotos = defaultPhotos;

  }


  createGalery(filteredPhotos);


};


const renderGalery = (photoInfo) => {

  photos = photoInfo.slice(0);
  defaultPhotos = photoInfo.slice(0);

  filtersForm.addEventListener('click', debounce((evt) => filterClickHandler(evt)));


  createGalery(photos);

  filter.classList.remove('hidden');
  filter.style.opacity = 1;

  loadImg();
};

export {renderGalery};
