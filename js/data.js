const Effects = {
  CHROME: {
    MIN: 0,
    MAX: 1,
    START: 1,
    STEP: 0.1,
    FILTER: 'grayscale',
    UNIT: '',
  },
  SEPIA: {
    MIN: 0,
    MAX: 1,
    START: 1,
    STEP: 0.1,
    FILTER: 'sepia',
    UNIT: '',
  },
  MARVIN: {
    MIN: 0,
    MAX: 100,
    START: 100,
    STEP: 1,
    FILTER: 'invert',
    UNIT: '%',
  },
  PHOBOS: {
    MIN: 0,
    MAX: 3,
    START: 3,
    STEP: 0.1,
    FILTER: 'blur',
    UNIT: 'px',
  },
  HEAT: {
    MIN: 1,
    MAX: 3,
    START: 3,
    STEP: 0.1,
    FILTER: 'brightness',
    UNIT: '',
  },
  NONE: {
    MIN: 0,
    MAX: 10,
    START: 10,
    STEP: 1,
    FILTER: 'none',
    UNIT: '',
  },
};

const Buttons = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  SPACE: 'Space',
  CLICK: '1',
  ANYCLICK: '-1',
};

const ServerAdress = {
  LOAD_URL: 'https://25.javascript.pages.academy/kekstagram/data',
  UPLOAD_URL: 'https://25.javascript.pages.academy/kekstagram/',
};

const FetchConfig = {
  LOAD_CONFIG: {
    method: 'GET'},
  UPLOAD_CONFIG: {
    method: 'POST',
    body: '',
  },
};

const AlertMessage = {
  FAIL:'Не удалось отправить форму. Попробуйте еще раз',
  SUCCESS: 'Загрузка прошла успешно',
  FAIL_COLOR: '#c32a2a',
  SUCCESS_COLOR: '#467744',
  TEST: '#ffffff'
};

export {Effects, Buttons, ServerAdress, FetchConfig, AlertMessage};
