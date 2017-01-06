import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    addFormElement () {
      let formElement = this.store.createRecord('form-element', {});
      this.get('form.elements').pushObject(formElement);
    },

    deleteFormElement (element) {
      this.get('form.elements').removeObject(element);
    },

    reorderElements (elements) {
      this.get('form').set('elements', elements);
    }
  }
});
