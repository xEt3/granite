import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller, computed } = Ember;

export default Controller.extend(addEdit, {
  transitionAfterSave: 'account.anatomy.company-users',
  transitionWithModel: false,

  disableForm: computed('model.{email,employee}', function () {
    let model = this.get('model');
    return !model.get('email') || !model.get('employee');
  }),

  actions: {
    presetAttrs () {
      let model = this.get('model'),
          employee = this.get('model.employee'),
          attrs = [ 'firstName', 'middleName', 'lastName' ];

      attrs.map(a => model.set(a, employee.get(a)));
    }
  }
});
