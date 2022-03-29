import './hashtags.js';
import './data.js';
import {renderGalery} from './galery.js';
import {closeUploadModal} from './upload-img-form.js';
import {setUploadFormSubmit} from './upload-img-form.js';
import {getData} from './api.js';


getData((photoData) => {
  renderGalery(photoData);
});

setUploadFormSubmit(closeUploadModal);
