import Ember from 'ember';
import Component from '@glimmer/component';
import { elementId } from 'granite/core';
import { computed, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import $ from 'jquery';

const { Logger } = Ember;

@elementId
export default class ElementsFileUploaderComponent extends Component {
  @service auth
  @service data

  @tracked fileError =      null
  @tracked files =          A()
  @tracked uploadProgress = null
  @tracked saveError =      null
  @tracked dragging =       false

  allowedExtensions = [ 'xls', 'xlsx', 'csv', 'numbers', 'txt' ]
  allowMulti =        true
  url =               ''

  @computed.not('hasFiles') doesNotHaveFiles

  get inputId () {
    return this.elementId + '-input';
  }

  dragEnter (e) {
    e.stopPropagation();
    e.preventDefault();
  }

  @action
  dragOver (e) {
    e.stopPropagation();
    e.preventDefault();
    this.dragging = true;
  }

  @action
  dragLeave (e) {
    e.stopPropagation();
    e.preventDefault();
    this.dragging = false;
  }

  @action
  drop (e) {
    e.stopPropagation();
    e.preventDefault();
    var addingFiles = this._buildFiles(e.dataTransfer.files);
    this._validateFiles(addingFiles);
    this.dragging = false;
    if (this.args.autoUpload) {
      this.saveDocument();
    }
  }

  @action
  uploadFile (file) {
    let formData = new FormData();
    formData.append('file', file);

    return new Promise((resolve, reject) => {
      $.ajax({
        type:        'POST',
        data:        formData,
        url:         this.args.url,
        processData: false,
        contentType: false,
        cache:       false,
        headers:     { 'X-API-Token': this.auth.get('token') },
        xhr:         () => {
          let xhr = new window.XMLHttpRequest();

          xhr.upload.addEventListener('progress', evt => {
            if (evt && evt.lengthComputable) {
              this.uploadProgress = Math.round(evt.loaded / evt.total * 100);
            }
          }, false);

          return xhr;
        },
        success: resolve,
        error:   reject
      });
    });
  }

  @action
  _validateFiles (files, clear) {
    this._clearError();

    if (clear !== false) {
      this._clearFiles();
    }

    var self   = this,
        allowMulti  = this.allowMulti,
        max    = this.maxFiles,
        _files = this.files;

    var extReg = new RegExp(this.args.allowedExtensions.map(function (ext, index, exts) {
      return exts.length - 1 === index ? ext : ext + '|';
    }).join(''), 'i');

    var handleError = err => {
      self.fileError = err;
    };

    for (var i in files) {
      if (!Object.prototype.hasOwnProperty.call(files, i) || typeof files[ i ] !== 'object') {
        continue;
      }

      var file = files[ i ];

      if (!extReg.test(file.name)) {
        handleError('One or more file types are not supported.');
      } else if (!allowMulti && _files.length > 0 || _files.length > max - 1) {
        handleError('File limit reached.');
      } else if (Math.floor(file.size / 1000000) > this.maxSize) {
        handleError('Max file size exceeded.');
      } else {
        _files.addObject(file);
      }
    }
  }

  @action
  _buildFiles (fileList) {
    var files = [];
    for (var i = 0; i < fileList.length; i++) {
      files.push(fileList.item(i));
    }
    return files;
  }

  @action
  _clearError () {
    this.fileError = null;
  }

  @action
  _clearFiles () {
    this.files = A();
  }

  @action
  _resetFileInput () {
    var $fileInput = this.$().find('.file-upload-hidden-input');
    $fileInput.wrap('<form>').parent('form').trigger('reset');
    $fileInput.unwrap();
  }

  @action
  _end (err) {
    let errMsg = err && err.responseText ? err.responseText : err;

    if (errMsg && errMsg.errors) {
      errMsg = errMsg.errors.mapBy('detail').join(', ');
    }

    if (err) {
      Logger.error(err);
    }

    this.setProperties({
      saveError: errMsg,
      saving:    false
    });
  }

  @action
  shouldSetHasFiles () {
    // eslint-disable-next-line ember/no-side-effects
    this.hasFiles = this.files && this.files.length > 0;
  }

  @action
  triggerFileInput () {
    $(`#${this.inputId}`).click();
  }

  @action
  selectFile () {
    var addingFiles = this._buildFiles($('#' + this.inputId)[0].files);
    this._validateFiles(addingFiles);

    if (this.args.autoUpload) {
      this.saveDocument();
    }
  }

  @action
  async saveDocument () {
    let { success, error } = this.data.createStatus();

    try {
      let successful = await this.uploadFile(this.files.firstObject);
      this.uploadProgress = false;
      this.args.onWinning(successful);
      success();
    } catch (e) {
      this.args.onError(e);
      error(e);
    }
  }

  @action
  removeFile (file) {
    this.files.removeObject(file);
    if (!this.files.length) {
      this._resetFileInput();
    }
  }
}
