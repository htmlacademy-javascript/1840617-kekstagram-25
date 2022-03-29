import {numDecline, closeOnEsc, closeOnCancelButton, body} from './utils.js';

const DEFAULT_COUNTER = 5;

const loadMessageButtonElement = document.querySelector('.social__comments-loader');
const pictureElement = document.querySelector('.big-picture__preview');
const cancelButtonElement = document.querySelector('.big-picture__cancel');
const overlayElement = document.querySelector('.big-picture');
const commentElement =  document.querySelector('.social__comment');
const commentListElement = pictureElement.querySelector('.social__comments');
const commentsCountElement = document.querySelector('.social__comment-count');
const commentInput = document.querySelector('.social__footer-text');
const pictureImgElement = pictureElement.querySelector('.big-picture__img img');
const socialCaptionElement = pictureElement.querySelector('.social__caption');
const likesCountElement = pictureElement.querySelector('.likes-count');
const commentsCountDigitElement = pictureElement.querySelector('.comments-count');

//remove default comments
commentListElement.querySelectorAll('.social__comment').forEach((comment) => {
  commentListElement.removeChild(comment);
});

// create commentList
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

const showComments = (commentsInfo) => {

  const commentsLength = commentsInfo.length;

  let first = 0;
  let last = 0;


  const clickLoadMessagesHandler = () => {
    first += DEFAULT_COUNTER;

    if ((last + DEFAULT_COUNTER) >= commentsLength) {

      last = commentsLength;
      loadMessageButtonElement.classList.add('hidden');

    } else {
      last +=DEFAULT_COUNTER;
    }


    createCommets (commentsInfo, first, last);

    commentsCountElement.firstChild.replaceWith(`${last} из `);

  };


  if (commentsLength <= DEFAULT_COUNTER) {

    commentsCountElement.firstChild.replaceWith(`${commentsLength} из `);

    last = commentsLength;

  } else {

    last = DEFAULT_COUNTER;
    loadMessageButtonElement.classList.remove('hidden');
    loadMessageButtonElement.addEventListener('click', clickLoadMessagesHandler);

  }

  const decline = numDecline(commentsLength, 'комментария', 'комментариев');
  commentsCountElement.lastChild.replaceWith(` ${decline}`);

  createCommets(commentsInfo, first, last);


};


const clearComments = () => {

  commentListElement.querySelectorAll('.social__comment').forEach((element) => {

    commentListElement.removeChild(element);

  });

};


const cancelButtonClickHandler = (evt) => {

  closeOnCancelButton(evt, () => {
    closePreview();
  });

};

const modalKeyupHandler = (evt) => {

  if (evt.target !== commentInput) {

    closeOnEsc(evt, () => {
      closePreview();
    });

  }
};


function closePreview() {

  cancelButtonElement.removeEventListener('click', cancelButtonClickHandler);
  document.removeEventListener('keyup', modalKeyupHandler);

  overlayElement.classList.add('hidden');
  body.classList.remove('modal-open');

  clearComments();
}


const showBigPicture = (currentPhoto) => {


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

export {showBigPicture, showComments};
