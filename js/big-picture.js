import {
  numDecline,
  closeOnEsc,
  closeOnCancelButton,
  cancelButtonElement,
  loadMessageButtonElement,
  overlayElement,
  closePreview
} from './utils.js';
import {body} from './data.js';

const DEFAULT_COUNTER = 5;

const DeclineWords = {
  PLURAL: 'комментариев',
  SINGULAR: 'комментария',
};


const pictureElement = overlayElement.querySelector('.big-picture__preview');

const commentListElement = pictureElement.querySelector('.social__comments');
const commentElement =  commentListElement.querySelector('.social__comment');
const commentsCountElement = overlayElement.querySelector('.social__comment-count');
const commentInputElement = overlayElement.querySelector('.social__footer-text');
const pictureImgElement = pictureElement.querySelector('.big-picture__img img');
const socialCaptionElement = pictureElement.querySelector('.social__caption');
const likesCountElement = pictureElement.querySelector('.likes-count');
const commentsCountDigitElement = pictureElement.querySelector('.comments-count');

const clearComments = () => {

  commentListElement.querySelectorAll('.social__comment').forEach((element) => {

    commentListElement.removeChild(element);

  });

};


const createCommets = (allComments, start, end) => {

  const currentComments = allComments.slice(start, end);


  currentComments.forEach((comment) => {

    const commentClon = commentElement.cloneNode(true);

    commentClon.querySelector('.social__picture').src = comment.avatar;
    commentClon.querySelector('.social__picture').alt = comment.name;
    commentClon.querySelector('.social__text').textContent = comment.message;
    commentListElement.appendChild(commentClon);
  });

};

let first = 0;
let last = 0;
let commentsLength;
let commentsData;

const loadMessagesClickHandler = () => {

  if (first + DEFAULT_COUNTER < commentsLength) {

    first = last;

  }

  last = last + DEFAULT_COUNTER < commentsLength ? last + DEFAULT_COUNTER : commentsLength;

  if (first + DEFAULT_COUNTER >= commentsLength) {

    loadMessageButtonElement.classList.add('hidden');
    loadMessageButtonElement.removeEventListener('click', loadMessagesClickHandler);

  }

  createCommets (commentsData, first, last);
  commentsCountElement.firstChild.replaceWith(`${last} из `);

};


const showComments = (commentsInfo) => {

  commentsLength = commentsInfo.length;
  commentsData = commentsInfo;
  first = 0;

  commentsCountElement.firstChild.replaceWith(`${DEFAULT_COUNTER} из `);

  if (first === 0) {
    if (commentsLength <= DEFAULT_COUNTER) {

      commentsCountElement.firstChild.replaceWith(`${commentsLength} из `);
      last = commentsLength;

    } else {
      last = DEFAULT_COUNTER;
      loadMessageButtonElement.classList.remove('hidden');
      loadMessageButtonElement.addEventListener('click', loadMessagesClickHandler);
    }

    const decline = numDecline(commentsLength, DeclineWords.SINGULAR, DeclineWords.PLURAL);
    commentsCountElement.lastChild.replaceWith(` ${decline}`);
    createCommets(commentsInfo, first, last);
  }

};


const cancelButtonClickHandler = (evt) => {
  evt.preventDefault();

  closeOnCancelButton(evt, () => {
    closePreview(cancelButtonClickHandler, loadMessagesClickHandler);
    clearComments();
  });
};

const modalKeyupHandler = (evt) => {
  evt.preventDefault();

  if (evt.target !== commentInputElement) {

    closeOnEsc(evt, () => {
      closePreview(cancelButtonClickHandler, loadMessagesClickHandler);
      clearComments();
    });
  }
};


const showBigPicture = (currentPhoto) => {

  clearComments();


  overlayElement.classList.remove('hidden');
  loadMessageButtonElement.classList.add('hidden');
  body.classList.add('modal-open');


  pictureImgElement.src = currentPhoto.url;
  socialCaptionElement.textContent = currentPhoto.description;
  likesCountElement.textContent = currentPhoto.likes;
  commentsCountDigitElement.textContent = currentPhoto.comments.length;

  showComments(currentPhoto.comments);

  document.addEventListener('keyup', modalKeyupHandler);
  cancelButtonElement.addEventListener('click', cancelButtonClickHandler);

};

export {
  showBigPicture,
  showComments,
  modalKeyupHandler,
  loadMessagesClickHandler,
  cancelButtonClickHandler
};
