import {scaleControlHandler} from './upload-img-form.js';

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

  const closeModalHandler = (evt) => {
    const hideModal = () => {
      const scale = document.querySelector('.img-upload__scale');
      const textError = document.querySelector('.img-upload__error');
      description.value = '';
      hashtag.value = '';
      if (textError) {textError.textContent = '';}
      overlay.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      button.removeEventListener('click', closeModalHandler);
      document.removeEventListener('keyup', closeModalHandler);
      scale.removeEventListener('click', scaleControlHandler);

    };
    if (evt.target === description || evt.target === hashtag || evt.target === commentField) {
      if (evt.pointerId === 1) {hideModal();}
    } else {
      if (evt.key === 'Escape') {hideModal();}
      if (evt.pointerId === 1) {hideModal();}
    }
  };

  button.addEventListener('click', closeModalHandler);
  document.addEventListener('keyup', closeModalHandler);
};

const numDecline = (num,  genitiveSingular, genitivePlural) => {
  let str = num.toString();
  if (str.length > 2) {
    const count = str.length - 2;
    str = str.slice(count, count + 2);
  }
  const number = parseInt(str,10);
  if (parseInt(str.slice(-1), 10) === 1 && number !== 11) {return genitiveSingular;}
  return genitivePlural;
};

export {getRandomInt, shuffleArray, closeModal, numDecline};
