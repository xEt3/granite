import Ember from 'ember';
import { states } from 'granite/config/statics';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller, computed, run } = Ember;

export default Controller.extend(addEdit, {
  states,
  stateIsMontana: computed.equal('model.addressState', 'MT'),

  init () {
    this._super(...arguments);

    run.scheduleOnce('afterRender', () => {
      let model = this.get('model');

      model.setProperties({
        finalAddressLine1: model.get('addressLine1'),
        finalAddressLine2: model.get('addressLine2'),
        finalAddressCity: model.get('addressCity'),
        finalAddressZip: model.get('addressZip'),
        finalAddressState: model.get('addressState')
      });
    });
  }
});
