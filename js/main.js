const USERS_COUNT = 25;
const commentsArr = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Very well!!!',
  'AAAAAAAAAA!!!!!!!!!',
  'More coments',
  'WTF'
];
const commentatorArr = ['Алена', 'Наталья', 'Роман', 'Оксана', 'Василий', 'Борис', 'Sam', 'Евграф', 'Сигизмунд', 'Ольга', 'Kat'];

const getRandomInt = (min, max) => {
  if (min > max) { [min, max] = [max, min]; }
  return Math.floor((Math.random() * (max - min + 1) + min));
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getComments = (number) => {
  const commentsArray = [];
  for (let i = 0; i < number; i++) {
    const comment = {};
    const randomCommentator = getRandomInt(0, (commentatorArr.length - 1));
    const randdomMessage = getRandomInt(0, (commentsArr.length - 1));
    comment.id = getRandomInt(50, 233);
    comment.avatar = `img/vatar-${getRandomInt(1, 6)}.svg`;
    comment.message = commentsArr[randdomMessage];
    comment.name = commentatorArr[randomCommentator];
    commentsArray.push(comment);
  }
  return commentsArray;
};

const getGaleryArray = function () {
  const postsArray = [];
  const photoNumbers = shuffleArray(Array.from({ length: USERS_COUNT }, (item, index) => index + 1));
  for (let i = 0; i < USERS_COUNT; i++) {
    postsArray[i] = {};
    const post = postsArray[i];
    post.id = i + 1;
    post.url = `photos/${photoNumbers[i]}.jpg`;
    post.description = 'Какой замечательный вид';
    post.likes = getRandomInt(15, 200);
    post.comments = getComments(getRandomInt(0, 10));
  }
  return postsArray;
};

getGaleryArray();
