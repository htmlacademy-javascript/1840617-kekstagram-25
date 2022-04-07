import {ServerAdress, FetchConfig} from './data.js';
import {renderGalery} from './galery.js';

import {setUploadFormSubmit, closeUploadModal} from './upload-img-form.js';
import {requestData} from './api.js';
import {showAlert, AlertMessage} from './messages.js';


requestData(renderGalery, () => showAlert(AlertMessage.FAIL, AlertMessage.FAIL_COLOR), ServerAdress.LOAD_URL, FetchConfig.LOAD_CONFIG);

setUploadFormSubmit(closeUploadModal);
