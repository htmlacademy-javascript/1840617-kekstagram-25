/*
const textLine = 'Some long, very long text Lorem ipsum dolor sit ';
const MAX_SYMBOLS = 140;
const isCorrectLength = function (text, maxLength) {
  return text.length < maxLength;
};
*/

const USERS_COUNT = 40;
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
  if (min < 0 || max < 0) { return -1; }
  if (min > max) { [min, max] = [max, min]; }
  return Math.floor((Math.random() * (max - min + 1) + min));
};

const getNoRepeatNumbers = (start, end) => {
  if (start > end) { [start, end] = [end, start]; }
  if (start < 0 || end < 0) { return -1; }
  const norepeatNumbers = [];
  const numbers = [];
  let number = start;
  for (let i = 0; i < end - start + 1; i++) {
    numbers[i] = number;
    number++;
  }
  for (let i = 0; i < end - start + 1; i++) {
    const n = getRandomInt(0, numbers.length - 1);
    norepeatNumbers.push(numbers[n]);
    numbers.splice(n, 1);
  }
  return norepeatNumbers;
};


const getComments = (number) => {
  if (number <= 0) { return 'no commets'; }
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
  if (USERS_COUNT <= 0) { return 'No Users'; }
  const postsArray = [];
  const iDs = getNoRepeatNumbers(1, USERS_COUNT);
  const photoNumbers = getNoRepeatNumbers(1, USERS_COUNT);
  for (let i = 0; i < iDs.length; i++) {
    postsArray[i] = {};
    const post = postsArray[i];
    post.id = iDs[i];
    post.url = `photos/${photoNumbers[i]}.jpg`;
    post.description = 'Какой замечательный вид';
    post.likes = getRandomInt(15, 200);
    post.comments = getComments(getRandomInt(0, 10));
  }
  return postsArray;
};

getGaleryArray();
