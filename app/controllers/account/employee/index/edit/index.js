import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { states, suffixes, gender } from 'granite/config/statics';

export default Controller.extend({
  states,
  suffixes,
  gender,
  stateIsMontana: computed.equal('model.addressState', 'MT')
});
