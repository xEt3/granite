import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { states, suffixes } from 'granite/config/statics';

export default Controller.extend({
  states,
  suffixes,
  stateIsMontana: computed.equal('model.addressState', 'MT')
});
