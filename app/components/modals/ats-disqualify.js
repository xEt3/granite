import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import $ from 'jquery';

@classic
export default class AtsDisqualify extends Component {
  @service
  auth;

  @computed('auth.user.company')
  get disqualificationReasons() {
    return this.get('auth.user.company.disqualificationReasons');
  }

  closeModal() {
    $('#' + this.get('modalId')).modal('hide');
  }

  @action
  respond(response) {
    this.get('onResponse')(response);
    this.closeModal();
  }
}
