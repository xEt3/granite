import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import { states } from 'granite/config/statics';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  states,
  stateIsMontana: computed.equal('model.addressState', 'MT')
});
