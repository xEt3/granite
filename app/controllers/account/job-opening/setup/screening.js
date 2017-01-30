import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller, computed } = Ember;

export default Controller.extend(addEdit, {
  sortGroupClass: computed('showingPreview', function () {
    return `ui middle aligned divided list screening__form-elements ${this.get('showingPreview') ? 'screening__form-elements--preview' : ''}`;
  }),

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
    },

    saveAndContinue () {
      let f = this.get('form');

      f.setProperties({
        targetType: 'JobOpening',
        targetId: this.get('model.id')
      });

      this.saveModel(f)
      .then(form => {
        form.get('elements').forEach(e => {
          if (!e.get('id')) {
            e.destroy();
          }
        });

        this.set('screening', form);
        this.get('target').send('saveAndContinue');
      });
    }
  }
});
