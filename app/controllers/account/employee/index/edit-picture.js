import Ember from 'ember';

const { computed, Controller } = Ember;

export default Controller.extend({
  pictureExts:    [ 'jpg', 'jpeg', 'png'],
  pictureEndpoint: computed('model.id', function () {
    return `/api/v1/employee/${this.get('model.id')}/picture`;
  }),
  fileIsAdded: false,

  actions: {

    addedFile () {
      this.set('dropzone', this);
      this.set('fileIsAdded', true);
    },
    processQueue () {
      Dropzone.forElement('#employee-profile-image').processQueue();
    },

    uploadedFile () {
      this.get('model').reload().then(model => {
        model.rollbackAttributes();
        this.transitionToRoute('account.employee.index');
      });
    },

    removeFile ( file ) {
      Dropzone.forElement('#employee-profile-image').removeAllFiles( file );
      this.set('fileIsAdded', false);
    },
    leaveUpload () {
      this.transitionToRoute('account.employee.index');
    }
  }
});
