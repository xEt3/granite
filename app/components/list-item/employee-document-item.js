import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { computed, action } from '@ember/object';
import { htmlSafe } from '@ember/string';
import $ from 'jquery';
import moment from 'moment';

export default class ListItemEmployeeDocumentItemComponent extends Component {
  @service data

  @computed.match('args.assignment.file.extension', /jpe?g|png|gif/i) imagePreview

  get file () {
    return this.args.assignment.file;
  }

  get modalId () {
    return `modal__file-assignment-signature-${this.args.assignment.id}`;
  }

  get signature () {
    return htmlSafe(`<img src=${this.args.assignment.signature} class="ui medium image">`);
  }

  get pastAssignment () {
    return !this.args.assignment.effectiveOn ? true : moment(this.args.assignment.effectiveOn).isBefore(moment());
  }

  @action
  openModal () {
    $(`#${this.modalId}`).modal({ detachable: true }).modal('show');
  }

  @action
  closeModal () {
    $(`#${this.modalId}`).modal('hide');
  }

  @action
  uploadFollowup (file) {
    let assignment = this.args.assignment;
    assignment.followups.pushObject(file);
    this.data.saveRecord(assignment);
  }
}
