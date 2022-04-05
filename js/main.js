import './hashtags.js';
import {ServerAdress, FetchConfig} from './data.js';
import {renderGalery} from './galery.js';
import {closeUploadModal} from './upload-img-form.js';
import {setUploadFormSubmit} from './upload-img-form.js';
import {getData} from './api.js';
import {showAlert, AlertMessage} from './messages.js';


getData(renderGalery, () => showAlert(AlertMessage.FAIL, AlertMessage.FAIL_COLOR), ServerAdress.LOAD_URL, FetchConfig.LOAD_CONFIG);

setUploadFormSubmit(closeUploadModal);
