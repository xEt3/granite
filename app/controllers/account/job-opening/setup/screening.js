import Controller from '@ember/controller';
import { computed } from '@ember/object';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  enableModelValidations: true,

  sortGroupClass: computed('showingPreview', function () {
    return `ui middle aligned divided list screening__form-elements ${this.showingPreview ? 'screening__form-elements--preview' : ''}`;
  }),

  afterSave () {
    let form = this.form,
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
      this.form.set('elements', elements);
    },

    async saveAndContinue () {
      this.ajaxStart();

      let f = await this.form;
      if (!f.elements.length) {
        try {
          await f.destroyRecord();
          this.set('model.screening', null);
          await this.target.send('saveAndContinue');
          this.ajaxSuccess();
        } catch (e) {
          this.ajaxError(e);
        }
        return;
      }

      f.setProperties({
        targetType: 'JobOpening',
        targetId:   this.get('model.id')
      });

      try {
        let form = await this.saveModel(f);
        this.set('model.screening', form);
        await this.target.send('saveAndContinue');
      } catch (e) {
        this.ajaxError(e);
      }
    }
  }
});
