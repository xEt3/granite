import Ember from 'ember';
import Mixin from '@ember/object/mixin';
import { A } from '@ember/array';

const { Logger } = Ember;

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

export default Mixin.create({
  successMessageTimeout: 3,
  enableNotify:          true,
  loadingProp:           'working',
  slowRunningThreshold:  500,

  ajaxError (err, user) {
    this.__cancelLongRunningProp();

    let errMsg = err ? err.payload || err.responseText || err.message || err : err,
        errorsArray = errMsg && errMsg.errors;

    if (errorsArray) {
      errMsg = typeof errMsg.errors[0] === 'string' ? errorsArray : searchError(errorsArray);
    }

    if (err && !user) {
      Logger.error(err.stack || err);
    }

    this.setProperties({
      [this.get('loadingProp')]:          false,
      [`${this.get('loadingProp')}Slow`]: false,
      errorMessage:                       errMsg,
      fieldErrors:                        errorsArray && findFieldErrors(errorsArray)
    });

    if (this.get('enableNotify')) {
      this.send('notify', 'error', 'Whoops! ' + errMsg);
    }
  },

  ajaxSuccess (success, silent) {
    this.__cancelLongRunningProp();

    this.setProperties({
      [this.get('loadingProp')]:          false,
      [`${this.get('loadingProp')}Slow`]: false,
      errorMessage:                       null,
      successMessage:                     success,
      fieldErrors:                        false
    });

    setTimeout(() => {
      if (!this.get('isDestroyed') && !this.get('isDestroying')) {
        this.set('successMessage', null);
      }
    }, this.get('successMessageTimeout') * 1000);

    if (!silent && this.get('enableNotify')) {
      this.send('notify', 'success', success || 'Successfully saved.');
    }
  },

  ajaxStart () {
    this.setProperties({
      [this.get('loadingProp')]:          true,
      [`${this.get('loadingProp')}Slow`]: false,
      errorMessage:                       null,
      successMessage:                     null,
      fieldErrors:                        false
    });

    this.__scheduleLongRunningProp();
  },

  __cancelLongRunningProp () {
    const timeoutId = this.get('__longRunningPropToid');

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  },

  __scheduleLongRunningProp () {
    const loadingProp = this.get('loadingProp');

    this.set('__longRunningPropToid', setTimeout(() => {
      if (!this.get('isDestroyed') && this.get(loadingProp)) {
        this.set(`${loadingProp}Slow`, true);
      }
    }, this.get('slowRunningThreshold')));
  }
});
