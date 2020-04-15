import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import { on } from '@ember/object/evented';
import { A } from '@ember/array';
import $ from 'jquery';

export default Controller.extend({
  adding:    false,
  showTable: computed.or('objectLength', 'adding'),

  objectLength: computed('model.customFields', function () {
    let cf = this.get('model.customFields');
    return cf ? Object.keys(cf).length : 0;
  }),

  customFieldHelper: computed('addingCustomFieldName', function () {
    return this.addingCustomFieldName ? 'Cancel' : 'Add a new custom field';
  }),

  /* eslint-disable-next-line */
  recreateCustomFields: on('init', observer('model', function () {
    this.updateCustomFields();
  })),

  updateCustomFields () {
    let customFields = this.get('model.customFields') || {},
        fields = A();

    for (var key in customFields) {
      if (!Object.prototype.hasOwnProperty.call(customFields, key)) {
        continue;
      }

      fields.pushObject({
        key,
        value: customFields[key]
      });
    }

    this.set('customFieldArray', fields);
  },

  actions: {
    beginAddingCustomField () {
      this.set('adding', true);
    },

    toggleProperty (prop) {
      this.toggleProperty(prop);
    },

    createCustomField () {
      $('.new-custom-field').modal('show');
    },

    saveCustomField () {
      let model = this.model,
          attr = this.pendingCustomFieldName,
          value = this.pendingCustomFieldValue;

      if (!attr) {
        this.ajaxError('Custom field name is required.');
        return;
      } else if (!value) {
        this.ajaxError('Custom field value is required.');
        return;
      }

      if (!model.get('customFields')) {
        model.set('customFields', {});
      }

      model.set(`customFields.${attr}`, value);
      this.updateCustomFields();

      this.setProperties({
        pendingCustomFieldValue: null,
        pendingCustomFieldName:  null,
        adding:                  true
      });
      model.set('hasDirtyAttributes', true);
    },

    editValue (key, newValue) {
      let model = this.model;
      model.set(`customFields.${key}`, newValue);
      this.updateCustomFields();
      model.set('hasDirtyAttributes', true);
    },

    deleteCustomField (key) {
      let model = this.model,
          customFields = model.get('customFields');

      delete customFields[key];

      model.set('customFields', customFields);
      this.updateCustomFields();
      model.set('hasDirtyAttributes', true);
    }
  }
});
