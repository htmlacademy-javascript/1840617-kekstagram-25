import {removeElement, closeOnEsc} from './utils.js';
import {body} from './data.js';

const ALERT_SHOW_TIME = 2000;

const AlertMessage = {
  FAIL:'Ошибка загрузки с сервера',
  FAIL_COLOR: '#c32a2a',
};

const Selectors = {
  ERR: '.error',
  SUCCESS: '.success',
};


const loadErrorMessageFragment = document.createDocumentFragment();
const successMessageFragment = document.createDocumentFragment();

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');


const еrrorEscKeyupHandler = (evt) => closeOnEsc(evt, () => {
  removeElement(Selectors.ERR);
  document.removeEventListener('keyup', еrrorEscKeyupHandler);
});

const successEscKeyupHandler = (evt) => closeOnEsc(evt, () => {
  removeElement(Selectors.SUCCESS);
  document.removeEventListener('keyup', successEscKeyupHandler);
});

const createErrorMessage = () => {

  const errorMessage = errorTemplate.cloneNode(true);
  loadErrorMessageFragment.appendChild(errorMessage);
  body.appendChild(loadErrorMessageFragment);
  const errorMessageElement = document.querySelector('.error');
  const errorButton = errorMessage.querySelector('.error__button');
  const innerError = errorMessage.querySelector('.error__inner');

  document.addEventListener('keyup', еrrorEscKeyupHandler);
  errorMessageElement.addEventListener('click', (evt) => {

    if (evt.target !==  innerError || evt.target === errorButton) {

      removeElement(Selectors.ERR);
      document.removeEventListener('keyup', еrrorEscKeyupHandler);

    }
  });
};


const createSuccessMessage = () => {

  const successMessage = successTemplate.cloneNode(true);
  successMessageFragment.appendChild(successMessage);
  body.appendChild(successMessageFragment);

  const successField = document.querySelector('.success');
  const successButton = successField.querySelector('.success__button');
  const successInner = successField.querySelector('.success__inner');


  successField.addEventListener('click', (evt) => {

    if (evt.target !== successInner || evt.target === successButton) {

      removeElement(Selectors.SUCCESS);
      document.removeEventListener('keyup', successEscKeyupHandler);
    }
  });

  document.addEventListener('keyup', successEscKeyupHandler);
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

export {createErrorMessage, createSuccessMessage, showAlert, AlertMessage};
