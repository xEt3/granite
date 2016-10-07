import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import del from 'granite/mixins/controller-abstractions/delete';

const { Controller, computed } = Ember;

export default Controller.extend(addEdit, del, {
  addingCustomFieldName: false,

  customFieldHelper: computed('addingCustomFieldName', function () {
    return this.get('addingCustomFieldName') ? 'Cancel' : 'Add a new custom field';
  }),

  afterSave () {
    this.setProperties({
      pendingCustomFieldName: null,
      addingCustomFieldName: false
    });
  },

  actions: {
    toggleProperty ( prop ) {
      this.toggleProperty(prop);
    },

    saveCustomFieldName () {
      let model = this.get('model'),
          attr = this.get('pendingCustomFieldName');

      this.ajaxStart();

      if ( !attr ) {
        this.ajaxError('Custom Field name is required.');
        return;
      }

      if ( !model.get('customFields') ) {
        model.set('customFields', {});
      }
      model.set(`customFields.${attr}`, null);
      this.send('save', model);
    }
  }
});
