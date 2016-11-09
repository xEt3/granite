import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller, RSVP: { Promise } } = Ember;

export default Controller.extend(addEdit, {
  fileIsAdded: false,
  transitionAfterSave: 'account.documents.index',
  transitionWithModel: false,
  tagSuggestions: [ 'Reference', 'Employee Specific', 'Company Wide' ],

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
      res.files = [ res.file ];
      delete res.file;
      this.get('store').pushPayload(res);
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
        let properties = [ 'title', 'description', 'tags' ];

        properties.forEach(prop => {
          file.set(prop, this.get(prop));
          this.set(prop, null);
        });

        return file;
      })
      .then(this.saveModel.bind(this))
      .catch(this.ajaxError.bind(this));
    }
  }
});
