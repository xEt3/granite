import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import $ from 'jquery';
import moment from 'moment';

@classic
@classNames('file-assignment-item')
export default class FileAssignment extends Component {
  @computed('')
  get modalId () {
    return `modal__file-assignment-signature-${this.get('assignment.id')}`;
  }

  @computed('assignment.effectiveOn')
  get pastAssignment () {
    return !this.get('assignment.effectiveOn') ? true : moment(this.get('assignment.effectiveOn')).isBefore(moment());
  }

  @action
  openSignatureModal () {
    $(`#${this.modalId}`).modal({ detachable: true }).modal('show');
  }

  @action
  closeSignatureModal () {
    $(`#${this.modalId}`).modal('hide');
  }
}
