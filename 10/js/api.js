const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photoData) => {

      onSuccess(photoData); //rendergalery(photoData)

    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },

  )
    .then((response) => {

      if (response.ok) {

        onSuccess();

      } else {

        onFail('Данные невалидны');

      }

    })
    .catch(() => {
      onFail('err');
    });
};

export {getData, sendData};
