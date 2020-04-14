import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import { run } from '@ember/runloop';
import moment from 'moment';

@classic
export default class EditPictureController extends Controller {
  pictureExts = [ 'jpg', 'jpeg', 'png' ];

  @computed('model.id')
  get pictureEndpoint() {
    return `/api/v1/employee/${this.get('model.id')}/picture`;
  }

  fileIsAdded = false;

  @action
  addedFile(file) {
    this.set('dropzone', this);
    this.set('fileIsAdded', file);
  }

  @action
  processQueue() {
    Dropzone.forElement('#input__dropzone--employee-profile-image').processQueue();
  }

  @action
  uploadedFile() {
    this.get('model').reload().then(model => {
      model.set('picture', model.get('picture') + '?t=' + moment().unix());
      run.later(() => {
        model.rollbackAttributes();
        this.transitionToRoute('account.employee.index');
      }, 800);
    });
  }

  @action
  removeFile(file) {
    Dropzone.forElement('#input__dropzone--employee-profile-image').removeAllFiles(file);
    this.set('fileIsAdded', false);
  }

  @action
  leaveUpload() {
    this.send('removeFile', this.get('fileIsAdded'));
    this.transitionToRoute('account.employee.index');
  }
}
