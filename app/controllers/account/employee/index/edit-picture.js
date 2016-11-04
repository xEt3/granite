import Ember from 'ember';
import moment from 'moment';

const { Controller, computed, run } = Ember;

export default Controller.extend({
  pictureExts:    [ 'jpg', 'jpeg', 'png'],
  pictureEndpoint: computed('model.id', function () {
    return `/api/v1/employee/${this.get('model.id')}/picture`;
  }),
  fileIsAdded: false,

  actions: {
    addedFile (file) {
      this.set('dropzone', this);
      this.set('fileIsAdded', file);
    },

    processQueue () {
      Dropzone.forElement('#input__dropzone--employee-profile-image').processQueue();
    },

    uploadedFile () {
      this.get('model').reload().then(model => {
        model.set('picture', model.get('picture') + '?t=' + moment().unix());
        run.later(() => {
          model.rollbackAttributes();
          this.transitionToRoute('account.employee.index');
        }, 800);
      });
    },

    removeFile (file) {
      Dropzone.forElement('#input__dropzone--employee-profile-image').removeAllFiles(file);
      this.set('fileIsAdded', false);
    },

    leaveUpload () {
      this.send('removeFile', this.get('fileIsAdded'));
      this.transitionToRoute('account.employee.index');
    }
  }
});
