import Controller from '@ember/controller';
import { computed } from '@ember/object';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  sortGroupClass: computed('showingPreview', function () {
    return `ui middle aligned divided list screening__form-elements ${this.get('showingPreview') ? 'screening__form-elements--preview' : ''}`;
  }),

  afterSave () {
    let form = this.get('form'),
        removeDuplicates = [];

    form.get('elements').forEach(e => {
      if (!e.get('id')) {
        e.destroy();
        removeDuplicates.push(e);
      }
    });
    form.get('elements').removeObjects(removeDuplicates);
  },

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
        targetId:   this.get('model.id')
      });

      this.saveModel(f)
      .then(form => {
        this.set('model.screening', form.elements.length ? form : null);
        this.get('target').send('saveAndContinue');
      });
    }
  }
});
