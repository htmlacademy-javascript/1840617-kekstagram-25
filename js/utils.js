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

export {numDecline, closeOnCancelButton, closeOnEsc, showAlert, body};
