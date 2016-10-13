import Ember from 'ember';

const { Controller, A, observer, computed, on } = Ember;

export default Controller.extend({
  adding: false,
  showTable: computed.or('objectLength', 'adding'),

  objectLength: computed('model.customFields', function () {
    let cf = this.get('model.customFields');
    return cf ? Object.keys(cf).length : 0;
  }),

  customFieldHelper: computed('addingCustomFieldName', function () {
    return this.get('addingCustomFieldName') ? 'Cancel' : 'Add a new custom field';
  }),

  recreateCustomFields: on('init', observer('model', function () {
    this.updateCustomFields();
  })),

  updateCustomFields () {
    let customFields = this.get('model.customFields') || {},
        fields = A();

    for ( var key in customFields ) {
      if ( !customFields.hasOwnProperty(key) ) {
        continue;
      }

      fields.pushObject({ key, value: customFields[key] });
    }

    this.set('customFieldArray', fields);
  },

  actions: {
    beginAddingCustomField () {
      this.set( 'adding', true );
    },

    toggleProperty ( prop ) {
      this.toggleProperty(prop);
    },

    createCustomField () {
      Ember.$('.new-custom-field').modal('show');
    },

    saveCustomField () {
      let model = this.get('model'),
          attr = this.get('pendingCustomFieldName'),
          value = this.get('pendingCustomFieldValue');

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
      this.updateCustomFields();

      this.setProperties({
        pendingCustomFieldValue: null,
        pendingCustomFieldName: null,
        adding: false
      });
      model.set('hasDirtyAttributes', true);
    },

    editValue ( key, newValue ) {
      let model = this.get('model');
      model.set(`customFields.${key}`, newValue);
      this.updateCustomFields();
      model.set('hasDirtyAttributes', true);
    },

    deleteCustomField ( key ) {
      let model = this.get('model'),
          customFields = model.get('customFields');

      delete customFields[key];

      model.set('customFields', customFields);
      this.updateCustomFields();
      model.set('hasDirtyAttributes', true);
    }
  }
});
