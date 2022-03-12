import {getGaleryArray} from './data.js';
import {showBigPicture} from './big-picture.js';

const previewList = document.querySelector('.pictures');
const previewTemplate = document.querySelector('#picture').content.querySelector('.picture');

const listFragment = document.createDocumentFragment();

const renderGalery = () => {
  const createPreviewPicture = (pictureInfo) => {
    const previewElement = previewTemplate.cloneNode(true);
    previewElement.querySelector('.picture__img').src = pictureInfo.url;
    previewElement.querySelector('.picture__comments').textContent = pictureInfo.comments.length;
    previewElement.querySelector('.picture__likes').textContent = pictureInfo.likes;
    listFragment.appendChild(previewElement);
  };

  const createGalery = (infoArray) => {
    infoArray.forEach((infoObj) => {
      createPreviewPicture(infoObj);
    });
    previewList.appendChild(listFragment);
  };

  const photoData = getGaleryArray();
  createGalery(photoData);

  const photoColection = document.querySelectorAll('.pictures .picture');
  for (let i = 0; i < photoColection.length; i++) {
    photoColection[i].addEventListener('click', () => {
      showBigPicture(photoData[i]);
    });
  }
};


export {renderGalery};
