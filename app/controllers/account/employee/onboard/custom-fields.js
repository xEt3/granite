import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { or } from '@ember/object/computed';
import $ from 'jquery';

export default class AccountEmployeeOnboardCustomFieldsController extends Controller {
  @service data
  @tracked adding = false
  @tracked pendingCustomFieldName
  @tracked pendingCustomFieldValue

  @or('objectLength', 'adding') showTable

  get objectLength () {
    let cf = this.model.customFields;
    return cf ? Object.keys(cf).length : 0;
  }

  get customFieldHelper ()  {
    return this.addingCustomFieldName ? 'Cancel' : 'Add a new custom field';
  }

  @action
  beginAddingCustomField () {
    this.adding = true;
  }

  @action
  toggleProperty (prop) {
    this.toggleProperty(prop);
  }

  @action
  createCustomField () {
    $('.new-custom-field').modal('show');
  }

  @action
  async saveCustomField () {
    let model = this.model,
        attr = this.pendingCustomFieldName,
        value = this.pendingCustomFieldValue;

    let { success, error } = this.data.createStatus();

    if (!attr) {
      error('Custom field name is required.');
      return;
    } else if (!value) {
      error('Custom field value is required.');
      return;
    }

    if (!model.get('customFields')) {
      model.customFields = {};
    }
    model.customFields[attr] = value;

    try {
      await this.data.saveRecord(model, 'working', { notify: false });
      this.pendingCustomFieldValue = null;
      this.pendingCustomFieldName = null;
      this.adding = true;
      success(null, true);
    } catch (e) {
      error(e);
    }
  }

  @action
  editValue (key, newValue) {
    this.model.customFields[key] = newValue;
    this.data.saveRecord(this.model, 'working', { notify: false });
  }

  @action
  deleteCustomField (key) {
    let model = this.model,
        customFields = model.customFields;

    delete customFields[key];

    model.customFields = customFields;
    this.data.saveRecord(model, 'working', { notify: false });
  }
}
