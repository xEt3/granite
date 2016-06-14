import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import { states as stateOptions } from 'granite/config';

const { Controller } = Ember;

export default Controller.extend(addEdit, {
  stateOptions,
  selectedState: null,
  useMiddleName: false,

  actions: {
    saveCompany () {
      let company = this.get('model');

      this.ajaxStart();

      company.save()
      .then(() => {
        this.ajaxSuccess();
        this.transitionToRoute('signup.billing');
      })
      .catch(this.ajaxError.bind(this));
    }
  }
});
