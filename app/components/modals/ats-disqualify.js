import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import $ from 'jquery';

@classic
export default class AtsDisqualify extends Component {
  @service auth

  get disqualificationReasons () {
    return this.get('auth.user.company.disqualificationReasons');
  }

  closeModal () {
    $('#' + this.modalId).modal('hide');
  }

  @action
  respond (response) {
    this.onResponse(response);
    this.closeModal();
  }
}
