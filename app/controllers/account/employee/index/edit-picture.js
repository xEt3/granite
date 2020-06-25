import Controller from 'granite/core/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { run } from '@ember/runloop';
import moment from 'moment';

// TODO: Use file handler constructor instead of reinventing the wheel here

export default class EditPictureController extends Controller {
  pictureExts = [ 'jpg', 'jpeg', 'png' ]
  @tracked fileIsAdded = false
  @tracked dropzone

  get pictureEndpoint () {
    return `/api/v1/employee/${this.model.get('id')}/picture`;
  }

  @action
  addedFile (file) {
    this.dropzone = this;
    this.fileIsAdded = file;
  }

  @action
  processQueue () {
    Dropzone.forElement('#input__dropzone--employee-profile-image').processQueue();
  }

  @action
  async uploadedFile () {
    const model = await this.model.reload();
    model.set('picture', model.get('picture') + '?t=' + moment().unix());

    run.later(() => {
      model.rollbackAttributes();
      this.transitionToRoute('account.employee.index');
    }, 800);
  }

  @action
  removeFile (file) {
    Dropzone.forElement('#input__dropzone--employee-profile-image').removeAllFiles(file);
    this.fileIsAdded = false;
  }

  @action
  leaveUpload () {
    this.removeFile(this.fileIsAdded);
    this.transitionToRoute('account.employee.index');
  }
}
