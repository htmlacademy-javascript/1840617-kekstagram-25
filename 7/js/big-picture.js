import {closeModal} from './utils.js';


const showBigPicture = (currentPhoto) => {
  const defaultComentsCount = document.querySelectorAll('.social__comment').length;
  const overlay = document.querySelector('.big-picture');
  const button = document.querySelector('.big-picture__cancel');
  overlay.classList.remove('hidden');
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  const picture = document.querySelector('.big-picture__preview');

  picture.querySelector('.big-picture__img img').src = currentPhoto.url;
  picture.querySelector('.social__caption').textContent = currentPhoto.description;
  picture.querySelector('.likes-count').textContent = currentPhoto.likes;

  const allCommentsCount = currentPhoto.comments.length;

  picture.querySelector('.comments-count').textContent = allCommentsCount;

  const createCommets = (comments) => {
    const commentList = picture.querySelector('.social__comments');

    for (let i = 0; i < allCommentsCount; i++) {
      const comment = document.querySelector('.social__comment').cloneNode(true);
      const commentInfo = comments[i];
      comment.querySelector('.social__picture').src = commentInfo.avatar;
      comment.querySelector('.social__picture').alt = commentInfo.name;
      comment.querySelector('.social__text').textContent = commentInfo.message;
      commentList.appendChild(comment);
    }

    //removing default comments
    for (let i = 0; i < defaultComentsCount; i++) {
      commentList.removeChild(commentList.querySelectorAll('.social__comment')[0]);
    }

  };


  createCommets(currentPhoto.comments);


  closeModal(button, overlay);
};

export {showBigPicture};
