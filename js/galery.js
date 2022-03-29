import {showBigPicture} from './big-picture.js';
import {loadImg} from './upload-img-form.js';


const previewList = document.querySelector('.pictures');
const previewTemplate = document.querySelector('#picture').content.querySelector('.picture');

const listFragment = document.createDocumentFragment();

const renderGalery = (photoInfo) => {

  const createPreviewPicture = (pictureInfo) => {

    const previewElement = previewTemplate.cloneNode(true);
    previewElement.querySelector('.picture__img').src = pictureInfo.url;
    previewElement.querySelector('.picture__comments').textContent = pictureInfo.comments.length;
    previewElement.querySelector('.picture__likes').textContent = pictureInfo.likes;

    previewElement.addEventListener('click', () => {

      showBigPicture(pictureInfo);

    });
    listFragment.appendChild(previewElement);
  };

  const createGalery = (infoArray) => {
    infoArray.forEach((infoObj) => {
      createPreviewPicture(infoObj);
    });
    previewList.appendChild(listFragment);
  };

  createGalery(photoInfo);

  loadImg();
};

export {renderGalery};
