import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import $ from 'jquery';

export default Component.extend({
  classNames:   [ 'item' ],
  tagName:      'div',
  imagePreview: computed.match('assignment.file.extension', /je?pg|png|gif/i),
  file:         computed('assignment.file', function () {
    return this.get('assignment.file');
  }),

  signatureModalId: computed('', function () {
    return `modal__file-assignment-signature-${this.get('assignment.id')}`;
  }),

  followupModalId: computed('', function () {
    //will get moved to component
    return `modal__followup-upload-${this.get('assignment.id')}`;
  }),

  signature: computed('assignment.signature', function () {
    return htmlSafe(`<img src=${this.get('assignment.signature')} class="ui medium image">`);
  }),

  actions: {
    openSignatureModal () {
      $(`#${this.get('signatureModalId')}`).modal({ detachable: true }).modal('show');
    },

    closeSignatureModal () {
      $(`#${this.get('signatureModalId')}`).modal('hide');
    },

    openFollowupModal () {
      //pieces will get moved to component
      $(`#${this.get('followupModalId')}`).modal({
        detachable: true,
        closable:   false,
        onHidden:   () => {
          console.log('resetting all properties');
          this.setProperties({
            //delete file and fileAssignment that are created here
          });
        }
      }).modal('show');
    },

    closeFollowupModal () {
      //will get moved to component
      $(`#${this.get('followupModalId')}`).modal('hide');
    },

    uploadFollowup () {
      //will get moved to component
      console.log('inside uploadFollowup');
      //launch modal here
      //modal will have dropzone and save/cancel buttons
      //modal will send back file to add to followups array on assignent record
      //file needs to be marked systemUse=true
      this.send('closeFollowupModal');
    }
  }
});
