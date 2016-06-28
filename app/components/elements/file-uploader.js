import Ember from 'ember';


export default Ember.Component.extend({
  files: Ember.A(),
  doesNotHaveFiles: Ember.computed.not('hasFiles'),
  allowedExtensions: [ 'xls', 'xlsx', 'xlsm', 'csv', 'numbers', 'txt' ],
  allowMulti: true,

  dragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
  },

  dragOver(e) {
    e.stopPropagation();
    e.preventDefault();
  },

  dragLeave(e) {
    e.stopPropagation();
    e.preventDefault();
  },

  drop(e) {
    e.stopPropagation();
    e.preventDefault();
    var files = this.get('files');
    var dropped = files.addObject(e.dataTransfer.files[0]);
    console.log(dropped);
  },

  uploadFile ( file, documentId ) {
    let formData = new FormData();
    formData.append('file', file);

    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        type: 'POST',
        url: '/api/documents/' + documentId,
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        xhr: () => {
          let xhr = new window.XMLHttpRequest();

          xhr.upload.addEventListener('progress', evt => {
            if ( evt && evt.lengthComputable ) {
              this.set('uploadProgress', Math.round(evt.loaded / evt.total * 100));
            }
          }, false);

          return xhr;
        },
        success: resolve,
        error:   reject
      });
    });
  },

  _validateFiles ( files, clear ) {
    this._clearError();

    if ( clear !== false ) {
      this._clearFiles();
    }

    var self   = this,
        allowMulti  = this.get('allowMulti'),
        max    = this.get('maxFiles'),
        _files = this.get('files');

    var extReg = new RegExp(this.get('allowedExtensions').map(function ( ext, index, exts ) {
      return exts.length - 1 === index ? ext : ext + '|';
    }).join(''), 'i');

    var handleError = function ( err ) {
      self.set('fileError', err);
    };

    for ( var i in files ) {
      if ( !files.hasOwnProperty( i ) || typeof files[ i ] !== 'object' ) {
        continue;
      }

      var file = files[ i ];

      if ( !extReg.test( file.name ) ) {
        handleError('One or more file types are not supported.');
      } else if ( !allowMulti && _files.length > 0 || _files.length > max - 1 ) {
        handleError('File limit reached.');
      } else if ( Math.floor( file.size / 1000000 ) > this.get('maxSize') ) {
        handleError('Max file size exceeded.');
      } else {
        _files.addObject( file );
      }
    }
  },

  _clearError () {
    this.set('fileError', null);
  },

  _clearFiles () {
    this.set('files', Ember.A());
  },

  _resetFileInput () {
    var $fileInput = this.$().find('.file-upload-hidden-input');
    $fileInput.wrap('<form>').parent('form').trigger('reset');
    $fileInput.unwrap();
  },

  _end ( err ) {
    let errMsg = err && err.responseText ? err.responseText : err;

    if ( errMsg && errMsg.errors ) {
      errMsg = errMsg.errors.mapBy('detail').join(', ');
    }

    if ( err ) {
      Ember.Logger.error(err);
    }

    this.setProperties({
      saveError: errMsg,
      saving:    false
    });
  },

  inputId: Ember.computed('elementId', function (){
    return this.get('elementId') + '-input';
  }),

  shouldSetHasFiles: Ember.computed('files.[]', function() {
    this.set('hasFiles', this.get('files') && this.get('files.length') > 0);
  }),


  actions: {
    triggerFileInput () {
      this.$().find('#' + this.get('inputId')).click();
    },

    selectFile () {
      this._validateFiles( this.$().find('#' + this.get('inputId'))[0].files );
      var files = this.get('files');
      files.addObject(this.$().find('#' + this.get('inputId'))[0].files);
      console.log(files);
    },

    saveDocument () {
      var file = this.get('file.firstObject');
      this.uploadFile(file);
    }
  }
});
