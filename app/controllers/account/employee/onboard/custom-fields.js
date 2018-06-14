import Controller from '@ember/controller';
import { computed } from '@ember/object';
import $ from 'jquery';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  adding: false,
  showTable: computed.or('objectLength', 'adding'),

  objectLength: computed('model.customFields', function () {
    let cf = this.get('model.customFields');
    return cf ? Object.keys(cf).length : 0;
  }),

  customFieldHelper: computed('addingCustomFieldName', function () {
    return this.get('addingCustomFieldName') ? 'Cancel' : 'Add a new custom field';
  }),

  actions: {
    beginAddingCustomField () {
      this.set( 'adding', true );
    },

    toggleProperty ( prop ) {
      this.toggleProperty(prop);
    },

    createCustomField () {
      $('.new-custom-field').modal('show');
    },

    saveCustomField () {
      let model = this.get('model'),
          attr = this.get('pendingCustomFieldName'),
          value = this.get('pendingCustomFieldValue');

      this.ajaxStart();

      if ( !attr ) {
        this.ajaxError('Custom field name is required.');
        return;
      } else if ( !value ) {
        this.ajaxError('Custom field value is required.');
        return;
      }

      if ( !model.get('customFields') ) {
        model.set('customFields', {});
      }
      model.set(`customFields.${attr}`, value);

      this.saveModel().then(() => {
        this.setProperties({
          pendingCustomFieldValue: null,
          pendingCustomFieldName: null,
          adding: true
        });
      });
    },

    editValue ( key, newValue ) {
      let model = this.get('model');
      model.set(`customFields.${key}`, newValue);
      this.saveModel();
    },

    deleteCustomField ( key ) {
      let model = this.get('model'),
          customFields = model.get('customFields');

      delete customFields[key];

      model.set('customFields', customFields);
      this.saveModel();
    }
  }
});
