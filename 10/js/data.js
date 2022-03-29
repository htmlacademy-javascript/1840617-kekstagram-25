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
export {Effects, Buttons};
