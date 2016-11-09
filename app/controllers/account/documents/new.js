import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller, RSVP: { Promise } } = Ember;

export default Controller.extend(addEdit, {
  fileIsAdded: false,
  transitionToRoute: 'account.documents.index',
  transitionWithModel: false,

  actions: {
    addedFile (file) {
      if ( this.get('fileIsAdded') ) {
        this.send('removeFile', this.get('fileIsAdded'));
      }

      this.set('fileIsAdded', file);
    },

    processQueue () {
      Dropzone.forElement('#input__dropzone--document').processQueue();
    },

    uploadedFile (file, res) {
      console.log('_id', res.file._id);
      res.files = [ res.file ];
      delete res.file;
      console.log(res);
      console.log('push', this.get('store').pushPayload(res));
      console.log('peek record', res.files[0].id);
      console.log('peek result', this.get('store').peekRecord('file', res.files[0].id));
      this.get('resolveUpload')(this.get('store').peekRecord('file', res.files[0].id));
    },

    removeFile (file) {
      Dropzone.forElement('#input__dropzone--document').removeFile(file);
    },

    leaveUpload () {
      this.send('removeFile', this.get('fileIsAdded'));
      this.set('fileIsAdded', false);
      this.transitionToRoute('account.document.index');
    },

    uploadFile () {
      this.ajaxStart();
      let promise = new Promise(resolve => this.set('resolveUpload', resolve));
      this.send('processQueue');

      promise.then(file => {
        console.log(file);
        file.setProperties({
          title: this.get('title'),
          description: this.get('description')
        });
        return file;
      })
      .then(this.saveModel)
      .catch(this.ajaxError.bind(this));
    }
  }
});
