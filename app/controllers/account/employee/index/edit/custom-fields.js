import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';
import $ from 'jquery';

export default class EditCustomFieldsController extends Controller {
  @service data
  @tracked adding = false
  @tracked addingCustomFieldName = false
  @tracked customFieldArray
  @tracked pendingCustomFieldName
  @tracked pendingCustomFieldValue

  get showTable () {
    return this.objectLength || this.adding;
  }

  get objectLength () {
    return this.model.get('customFields') ? Object.keys(this.model.get('customFields')).length : 0;
  }

  get customFieldHelper () {
    return this.addingCustomFieldName ? 'Cancel' : 'Add a new custom field';
  }

  updateCustomFields () {
    let customFields = this.model.get('customFields') || {},
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

    this.customFieldArray = fields;
  }

  @action
  beginAddingCustomField () {
    this.adding = true;
  }

  @action
  createCustomField () {
    $('.new-custom-field').modal('show');
  }

  @action
  saveCustomField () {
    const {
      model,
      pendingCustomFieldName: attr,
      pendingCustomFieldValue: value
    } = this;

    if (!attr) {
      this.data.notify('error', 'Custom field name is required.');
      return;
    }

    if (!value) {
      this.data.notify('error', 'Custom field value is required.');
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
  }

  @action
  editValue (key, newValue) {
    let model = this.model;
    model.set(`customFields.${key}`, newValue);
    this.updateCustomFields();
    model.set('hasDirtyAttributes', true);
  }

  @action
  deleteCustomField (key) {
    const model = this.model,
          customFields = model.get('customFields');

    delete customFields[key];

    model.set('customFields', customFields);
    this.updateCustomFields();
    model.set('hasDirtyAttributes', true);
  }
}
