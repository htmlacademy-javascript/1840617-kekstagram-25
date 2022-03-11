const showBigPicture = (currentPhoto) => {
  document.querySelector('.big-picture').classList.remove('hidden');
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  const picture = document.querySelector('.big-picture__preview');

  picture.querySelector('.big-picture__img img').src = currentPhoto.url;
  picture.querySelector('.social__caption').textContent = currentPhoto.description;
  picture.querySelector('.likes-count').textContent = currentPhoto.likes;

  const allCommentsCount = currentPhoto.comments.length;

  picture.querySelector('.comments-count').textContent = allCommentsCount;

  const makeComment = (commentInfo) => `<li class="social__comment"><img class="social__picture" src="${commentInfo.avatar}" alt="${commentInfo.name}" width="35" height="35"><p class="social__text">${commentInfo.message}</p></li>`;

  const createCommets = (comments) => {
    const commentList = picture.querySelector('.social__comments');
    commentList.innerHTML = '';
    for (let i = 0; i < allCommentsCount; i++) {
      const element = makeComment(comments[i]);
      commentList.insertAdjacentHTML('beforeend', element);
    }
  };

  createCommets(currentPhoto.comments);
  document.addEventListener('keyup', (evt) => {
    if (evt.key === 'Escape') {
      document.querySelector('.big-picture').classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
    }
  });

  document.querySelector('.big-picture__cancel').addEventListener('click', () => {
    document.querySelector('.big-picture').classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  });
};

export {showBigPicture};
