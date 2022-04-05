import {Buttons} from './data.js';


const LAST_DIGITS = 2;
const PLURAL_CONTROL = '1';
const SINGLE_DIGIT = 1;
const ALERT_SHOW_TIME = 5000;


const body = document.querySelector('body');

const numDecline = (num,  genitiveSingular, genitivePlural) => {

  const str = num.toString();
  const lastSymbol = str.slice(-1);
  let penultSymbol = '';

  if (str.length > SINGLE_DIGIT) {

    penultSymbol =str.slice(str.length - LAST_DIGITS, -1);


    return penultSymbol !== PLURAL_CONTROL && lastSymbol === PLURAL_CONTROL ?  genitiveSingular : genitivePlural;

  }

  return lastSymbol === PLURAL_CONTROL ? genitiveSingular :genitivePlural;

};


const isClick = (evt) => evt.pointerId >= Buttons.ANYCLICK;

const isEsc = (evt) => evt.key === Buttons.ESCAPE;


const closeOnCancelButton = (evt, cb) => {

  if (isClick(evt)) {

    cb();

  }

};


const closeOnEsc = (evt, cb) => {

  if(isEsc(evt)) {

    cb();
  }

};

const showAlert = (message, color) => {


  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = color;
  alertContainer.style.color = '#ffffff';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);

};

const DELAY = 500;


function debounce (callback, timeoutDelay = DELAY) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}


const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export {
  numDecline,
  shuffleArray,
  closeOnCancelButton,
  closeOnEsc,
  showAlert,
  debounce,
  body
};
