import Service, { inject as service } from '@ember/service';
import { get, action } from '@ember/object';
import { map } from 'rsvp';
import { A } from '@ember/array';
import { notifyDefaults } from 'granite/config';
import ENV from 'granite/config/environment';

const IS_TEST = ENV.environment === 'test';

function searchError (errors) {
  const detailKeys = A([ 'detail', 'message', 'title', 'status' ]),
        key = detailKeys.find(k => errors[0][k]);

  return key ? errors.mapBy(key).join(', ') : errors[0];
}

function findFieldErrors (errors = []) {
  let fe = errors.reduce((fieldErrors, err) => {
    if (err && err.path) {
      fieldErrors[err.path] = err.detail || err.title;
    }

    return fieldErrors;
  }, {});

  return Object.keys(fe).length > 0 ? fe : false;
}

export default class DataService extends Service {
  @service('notification-messages') notifications
  @service router
  statuses = {}
  __longRunningProps = {}
  enableNotify = true
  successMessageTimeout = 3
  slowRunningThreshold = 500

  notify (type) {
    const notifications = this.get('notifications'),
          args = Array.prototype.slice.call(arguments, 1);

    args[1] = Object.assign({}, notifyDefaults, args[1]);

    if (IS_TEST) {
      args[1].clearDuration = 1;
    }

    notifications[type].apply(notifications, args);
  }

  getModelValidations (model) {
    const validations = get(model, 'validations.messages');

    if (!validations.length) {
      return;
    }

    return validations.map(x => `\n\u2022 ${x}`);
  }

  _validateModel (model, fields) {
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
  }

  _afterDelete (record) {
    const transitionAfterSave = this.get('transitionAfterDelete') || this.get('transitionAfterSave');

    if (transitionAfterSave) {
      let transitionArgs = [ transitionAfterSave ];

      if (this.get('transitionWithModel')) {
        transitionArgs.push(record.get(this.getWithDefault('modelIdentifier', 'id')));
      }

      this.transitionToRoute.apply(this, transitionArgs);
    }
  }

  @action
  async saveRecord (_model, label = 'working', options) {
    if (!_model) {
      return;
    }
    const {
      requireFields,
      transitionAfterSave,
      transitionWithModel,
      modelIdentifier,
      notify
    } = options || {};

    const { success, error } = this.createStatus(label, notify ?? true);

    if (get(_model, 'length')) {
      await map(_model, (m, i) => this.saveRecord(m, `label${i}`, false, { requireFields })); // don't pass along transition or we prematurely transition...
      success('Successfully saved.');
      return;
    }

    let invalid = this._validateModel(_model, requireFields),
        validationsError = this.get('enableModelValidations') && await this.getModelValidations(_model);

    if (validationsError) {
      throw validationsError;
    }

    if (invalid) {
      let requireFieldDescriptors = get(this, 'requireFieldDescriptors'),
          invalidMessage = 'You must specify these fields: ' + invalid.map(field => {
            return requireFieldDescriptors ? requireFieldDescriptors[field] || field : field;
          }).join(', ');

      throw invalidMessage;
    }

    let record;

    try {
      record = await _model.save();

      success('Successfully saved.');
    } catch (e) {
      error(e);
      return false;
    }

    if (transitionAfterSave) {
      let transitionArgs = [ transitionAfterSave ];

      if (transitionWithModel) {
        transitionArgs.push(record.get(modelIdentifier || 'id'));
      }

      this.router.transitionTo.apply(this.router, transitionArgs);
    }

    return record;
  }

  @action
  async deleteRecord (_model, label = 'working', options) {
    if (!_model) {
      return;
    }

    const {
      transitionAfterSave,
      transitionAfterDelete,
      transitionWithModel,
      modelIdentifier,
      notify
    } = options || {};

    const { success, error } = this.createStatus(label, notify ?? true);

    try {
      await _model.destroyRecord();
      success('Successfully deleted.');
    } catch (e) {
      error(e);
      return false;
    }

    if (transitionAfterSave || transitionAfterDelete) {
      let transitionArgs = [ transitionAfterSave || transitionAfterDelete ];

      if (transitionWithModel) {
        transitionArgs.push(_model.get(modelIdentifier || 'id'));
      }

      this.router.transitionTo.apply(this.router, transitionArgs);
    }
  }

  createStatus (label = 'working', notify = true) {
    this.set(`statuses.${label}`, {
      isLoading: true,
      isLoaded:  false,
      isSlow:    false,
      error:     null
    });

    return {
      success: this.ajaxSuccess.bind(this, {
        label,
        notify
      }),
      error: this.ajaxError.bind(this, {
        label,
        notify
      })
    };
  }

  ajaxError ({ label, notify }, err, user) {
    this.__cancelLongRunningProp(label);

    let errMsg = err ? err.payload || err.responseText || err.message || err : err,
        errorsArray = errMsg && errMsg.errors;

    if (errorsArray) {
      errMsg = typeof errMsg.errors[0] === 'string' ? errorsArray : searchError(errorsArray);
    }

    if (err && !user) {
      console.error(err.stack || err); /* eslint-disable-line */
    }

    this.set(`statuses.${label}`, {
      isLoading: false,
      isLoaded:  false,
      isSlow:    false,
      error:     {
        message:     errMsg,
        stack:       (err || {}).stack,
        fieldErrors: errorsArray && findFieldErrors(errorsArray)
      }
    });

    if (notify) {
      this.notify('error', 'Whoops! ' + errMsg);
    }
  }

  ajaxSuccess ({ label, notify }, success, silent) {
    this.__cancelLongRunningProp(label);

    this.set(`statuses.${label}`, {
      isLoading: true,
      isLoaded:  true,
      isSlow:    false,
      message:   success,
      error:     null
    });

    if (success && this.successMessageTimeout) {
      setTimeout(() => {
        if (!this.get('isDestroyed') && !this.get('isDestroying')) {
          this.set(`statuses.${label}`, {
            isLoading: true,
            isLoaded:  true,
            isSlow:    false,
            message:   null,
            error:     null
          });
        }
      }, this.successMessageTimeout * 1000);
    }

    if (!silent && notify) {
      this.notify('success', success || 'Successfully saved.');
    }
  }

  __cancelLongRunningProp (label) {
    const timeoutId = this.get(`__longRunningProps.${label}`);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  __scheduleLongRunningProp (label) {
    this.set(`__longRunningProps.${label}`, setTimeout(() => {
      if (!this.get('isDestroyed') && this.get(`statuses.${label}.isLoading`)) {
        this.set(`statuses.${label}.isSlow`, true);
      }
    }, this.slowRunningThreshold));
  }
}
