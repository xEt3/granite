import Ember from 'ember';
import { states as stateOptions } from 'granite/config';

export default Ember.Controller.extend({
  stateOptions,
  selectedState: null,
  useMiddleName: false,

  actions: {

    updateSelected: function(component, id, value) {
      this.set('selectedState', id);
    },

    saveCompany: function() {
      var company = this.get('model');
      company.save().then(() => {
        this.transitionToRoute('signup.billing');
      });
    }
  }
});
