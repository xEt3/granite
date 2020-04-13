import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AccountEmployeeOnboardPictureController extends Controller {
  @service data
  @service auth

  pictureExts =     [ 'jpg', 'jpeg', 'png', 'gif', 'tif' ]

  get pictureEndpoint () {
    return `/api/v1/employee/${this.model.id}/picture`;
  }

  @action
  uploadedFile (file, res) {
    this.model.picture = res.employee.picture;
  }

  @action
  removeFile (file) {
    // this.get('model').set('picture', undefined);
    file.previewElement.remove();
  }
}
