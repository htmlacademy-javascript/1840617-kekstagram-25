const submit = document.querySelector('.img-upload__submit');
const hashtag = document.querySelector('.text__hashtags');

const showErrorMessage = () => {
  if (submit.disabled === true && document.querySelector('.text-error-message') === null) {
    const errorMessage = document.createElement('span');
    errorMessage.textContent = 'Введенное значение не корректно';
    errorMessage.style.color = '#ffffff';
    errorMessage.classList.add('text-error-message');
    document.querySelector('.img-upload__text').before(errorMessage);
  } else if (submit.disabled === false && document.querySelector('.text-error-message') !== null) {
    document.querySelector('.text-error-message').remove();
  }
};

const validateStr = (str) => {
  if (str[0] === '#' && str.length > 1 && str.length < 20 && str.slice(1).search(/[^\w]/g) === -1) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
};

const findDuplicateHashtag = (arr) => {
  const swapArr = [...new Set(arr)];
  return arr.length === swapArr.length;
};

const HashtagValidateHandler = () => {
  const hashtags = hashtag.value.split(/\s+/gm);
  if (hashtags.length === 1 && hashtags[0] === '') {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
  if (hashtags.indexOf('') === -1 && hashtags.length <= 5 && findDuplicateHashtag(hashtags)) {
    for (let i = 0; i < hashtags.length; i++) {
      validateStr(hashtags[i]);
    }
  }
  showErrorMessage();
};
const validateHashtag = () => {
  hashtag.addEventListener('input', HashtagValidateHandler, true);
};

const description = document.querySelector('.text__description');

const descriptionValidateHandler = () => {
  showErrorMessage();
  submit.disabled = description.value.length > 140;
  showErrorMessage();
};

const validateDescription = () => {
  description.addEventListener('input', descriptionValidateHandler, true);
};

const closeOverlay = (overlay, btnClass) => {
  const closeModalHandler = (evt) => {
    const hashtags = document.querySelector('.text__hashtags');

    const closeModal = () => {
      hashtag.value = '';
      description.value = '';
      document.querySelector(`.${overlay}`).classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      document.querySelector('.text__hashtags').removeEventListener('input', HashtagValidateHandler);
      document.querySelector('.text__description').removeEventListener('input', descriptionValidateHandler);
      document.querySelector(`.${btnClass}`).removeEventListener('click', closeModalHandler);
      document.removeEventListener('keyup', closeModalHandler);
    };

    if (evt.target !== description && evt.target !== hashtags) {
      if (evt.key === 'Escape') {
        closeModal();
      }
    }
    if (evt.pointerId === 1) {
      closeModal();
    }
  };

  document.addEventListener('keyup', closeModalHandler);

  document.querySelector(`.${btnClass}`).addEventListener('click', closeModalHandler);
};

const loadImg = () => {
  const loadPicture = document.querySelector('#upload-file');
  loadPicture.addEventListener('change', () => {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    closeOverlay('img-upload__overlay', 'img-upload__cancel');
  });

  validateHashtag();
  validateDescription();
};

export {loadImg};
