import {ServerAdress, AlertMessage} from './data.js';
import {showAlert} from './utils.js';

const getData = (onSuccess, onFail, adress, config) => {

  fetch(
    adress,
    config
  )
    .then((response) => {

      if (response.ok) {

        if (adress === ServerAdress.LOAD_URL) {

          response.json().then(onSuccess);

          showAlert(AlertMessage.SUCCESS, AlertMessage.SUCCESS_COLOR);

        }
        if (adress === ServerAdress.UPLOAD_URL) {

          onSuccess();
        }
      } else {


        onFail(AlertMessage.FAIL, AlertMessage.FAIL_COLOR);
      }
    })
    .catch(() => {

      onFail(AlertMessage.FAIL, AlertMessage.FAIL_COLOR);
    });
};

export {getData};
