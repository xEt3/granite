import Controller from 'granite/core/controller';
import { computed } from '@ember/object';
import { states } from 'granite/config/statics';
import { inject as service } from '@ember/service';

export default class AccountAnatomyLocationsNewController extends Controller {
  @service data

  states = states
  saveOptions = {
    transitionAfterSave: 'account.anatomy.locations.index',
    transitionWithModel: false
  }

  @computed.equal('model.addressState', 'MT') stateIsMontana
}
