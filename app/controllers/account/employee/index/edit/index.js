import Ember from 'ember';
import { states, suffixes } from 'granite/config/statics';

const { Controller, computed } = Ember;

export default Controller.extend({
  states,
  suffixes,
  stateIsMontana: computed.equal('model.addressState', 'MT')
});
