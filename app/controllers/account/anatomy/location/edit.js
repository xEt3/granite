import Controller from '@ember/controller';
import { states } from 'granite/config/statics';
import { computed } from '@ember/object';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  states,
  stateIsMontana:      computed.equal('model.addressState', 'MT'),
  transitionAfterSave: 'account.anatomy.locations.index',
  transitionWithModel: false,

  actions: {
    cancel () {
      this.model.rollbackAttributes();
      this.transitionToRoute('account.anatomy.locations.index');
    }
  }
});
