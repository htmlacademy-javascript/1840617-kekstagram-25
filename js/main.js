'strict';
const firstNumber = 11;
const secondNumber = 1001;

function getRandomNumber (min, max) {
  const errorMessage = 'the first numder equals or greater than the second number';
  const result = max <= min ? errorMessage : Math.floor((Math.random() * (max - min + 1) + min));
  return result;
}

getRandomNumber (firstNumber, secondNumber);

const text = 'Some long, very long text';
const maxLengthCurrent =140;
function getLineLenght (lineText, maxLength) {
  const result = () => maxLength >= lineText.length;
  return result();
}

getLineLenght(text, maxLengthCurrent);
