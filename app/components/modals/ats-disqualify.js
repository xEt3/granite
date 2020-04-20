import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default class AtsDisqualify extends Component {
  @service auth

  get disqualificationReasons () {
    return this.auth.user.get('company.disqualificationReasons');
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
