import {getGaleryArray} from './data.js';

const previewList = document.querySelector('.pictures');
const previewTemplate = document.querySelector('#picture').content.querySelector('.picture');

const picturesData = getGaleryArray();

const listFragment = document.createDocumentFragment();

picturesData.forEach(({url, likes, comments}) => {
  const previewElement = previewTemplate.cloneNode(true);
  previewElement.querySelector('.picture__img').src = url;
  previewElement.querySelector('.picture__comments').textContent = `${comments.length}`;
  previewElement.querySelector('.picture__likes').textContent = `${likes}`;
  listFragment.appendChild(previewElement);
});

previewList.appendChild(listFragment);
