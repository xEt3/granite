import Controller from 'granite/core/controller';
import { states } from 'granite/config/statics';
import { computed, action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AccountAnatomyLocationEditController extends Controller {
  @service data

  states = states

  saveOptions = {
    transitionAfterSave: 'account.anatomy.locations.index',
    transitionWithModel: false
  }

  @computed.equal('model.addressState', 'MT') stateIsMontana

  @action
  cancel () {
    this.model.rollbackAttributes();
    this.transitionToRoute('account.anatomy.locations.index');
  }
}
