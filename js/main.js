const firstNumber = 110;
const secondNumber = -520;

const getRandomNumber = function (min, max) {
  const errorMessage = 'the first numder equals or greater than the second number';
  if (min < 0 || max < 0) {
    return 'one or more numbers is negative';
  }
  return max <= min ? errorMessage : Math.floor((Math.random() * (max - min + 1) + min));
};

getRandomNumber(firstNumber, secondNumber);

const textLine = 'Some long, very long text Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas a quos at, architecto consectetur illum nemo voluptate cupiditate tempore dolore dolor quasi deserunt, enim animi? Nobis eveniet autem cupiditate quibusdam!';
const MAX_SYMBOLS =140;

const isCorrectLength = function (text, maxLength) {
  return text.length < maxLength;
};

isCorrectLength(textLine, MAX_SYMBOLS);
