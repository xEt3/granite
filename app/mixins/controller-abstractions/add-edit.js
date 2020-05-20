/*
  Usage:
  ```
  import addEdit from 'slate-payroll/mixins/controller-abstractions/add-edit'

  export default Ember.Controller.extend(addEdit, {
    enableModelValidations: true, // if you want add-edit to check your validations
    transitionWithModel: true,
    transitionAfterSave: 'index',

    actions: {
      triggerSave () {
        this.send('save');
      }
    }
  });
 */
import Mixin from '@ember/object/mixin';
import { get } from '@ember/object';
import { map } from 'rsvp';
import AjaxHooks from '../ajax-status';

export default Mixin.create(AjaxHooks, {
  enableNotify:        true,
  transitionWithModel: true,

  getModelValidations (model) {
    const validations = get(model, 'validations.messages');

    if (!validations.length) {
      return;
    }

    return validations.map(x => `\n\u2022 ${x}`);
  },

  _validateModel (model) {
    const fields = this.requireFields;

    if (!fields) {
      return false;
    }

    let invalidFields = [];

    fields.forEach(field => {
      if (!get(model, field)) {
        invalidFields.push(field);
      }
    });

    return invalidFields.length > 0 ? invalidFields : false;
  },

  _afterSave (record) {
    const transitionAfterSave = this.transitionAfterSave;

    if (transitionAfterSave) {
      let transitionArgs = [ transitionAfterSave ];

      if (this.transitionWithModel) {
        transitionArgs.push(record.get(this.getWithDefault('modelIdentifier', 'id')));
      }

      this.transitionToRoute.apply(this, transitionArgs);
    }
  },

  async saveModel (model) {
    console.warn('Mixing in the controller-abstraction for add-edit is deprecated in favor of extending the granite service: data.'); // eslint-disable-line

    const _model = model || this.model;

    if (!_model) {
      return;
    }

    if (get(_model, 'length')) {
      return map(_model, this.saveModel.bind(this));
    }

    this.ajaxStart();

    let invalid = this._validateModel(_model);

    let validationsError = this.enableModelValidations && await this.getModelValidations(_model);

    if (validationsError) {
      throw validationsError;
    }

    if (invalid) {
      let requireFieldDescriptors = this.requireFieldDescriptors,
          invalidMessage = 'You must specify these fields: ' + invalid.map(field => {
            return requireFieldDescriptors ? requireFieldDescriptors[field] || field : field;
          }).join(', ');

      throw invalidMessage;
    }

    let record;

    try {
      record = await _model.save();

      this.ajaxSuccess('Successfully saved.');

      if (this.afterSave && typeof this.afterSave === 'function') {
        this.afterSave(record);
      }

      this._afterSave(record);
    } catch (e) {
      this.ajaxError(e);
    }
    return record;
  },

  actions: {
    save (model) {
      this.saveModel(model);
    }
  }
});
