import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { states } from 'granite/config/statics';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  states,
  stateIsMontana: computed.equal('model.addressState', 'MT'),

  actions: {
    onNotify (type, msg) {
      this.send('notify', type, msg);
    },

    interimAddForm (form) {
      this.availableExitForms.addObject(form);
    }
  }
});
