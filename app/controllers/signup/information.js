import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import { states as stateOptions } from 'granite/config';

export default Ember.Controller.extend(addEdit, {
  stateOptions,
  selectedState: null,
  useMiddleName: false,

  actions: {
    test () {
      this.send('notify', 'success', 'some test');
    },
    saveCompany () {
      var company = this.get('model');
      company.save().then(() => {
        this.transitionToRoute('signup.billing');
      });
    }
  }
});
