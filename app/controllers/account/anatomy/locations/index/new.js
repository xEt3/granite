import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { states } from 'granite/config/statics';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  states,
  stateIsMontana:      computed.equal('model.addressState', 'MT'),
  transitionAfterSave: 'account.anatomy.locations.index',
  transitionWithModel: false,

  afterSave () {
    this.send('refresh');
  }
});
