const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;


let errorMessage = '';

const error = () => errorMessage;

const validateHashtagHandler = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  const inputArray = inputText.split(/\s+/);

  if(!inputText) {
    return true;
  }

  if (inputArray.length === 0) {
    return true;
  }

  const checks = [
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Максимум ${MAX_HASHTAGS} ХэшТегов.`,
    },
    {
      check: inputArray.some((item, number, arr) => arr.includes(item, (number +1))),
      error: 'Такой ХэшТег уже есть.\n',
    },
    {
      check: inputArray.some((item) => item === '#'),
      error: 'ХэшТег не может содержать только решетку.\n',
    },
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'ХэшТеги должны разделяться пробелами.\n',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `ХэшТег может состоять максимум из ${MAX_SYMBOLS}.\n`,
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'ХэшТег должен начинаться с решетки.\n',
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Обнаруженны недопустимые символы.\n',
    }
  ];

  return checks.every((rule) => {
    const isInValid = rule['check'];
    if (isInValid) {
      errorMessage = rule['error'];
    }
    return !isInValid;
  });
};


export {validateHashtagHandler, error};
