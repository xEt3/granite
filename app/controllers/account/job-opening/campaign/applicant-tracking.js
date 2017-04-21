import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    toggleProperty (prop) {
      this.toggleProperty(prop);
    }
  }
});
