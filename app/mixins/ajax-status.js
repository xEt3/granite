import Ember from 'ember';
import Mixin from '@ember/object/mixin';
import { A } from '@ember/array';
import { run } from '@ember/runloop';

const { Logger } = Ember;

function searchError (errors) {
  const detailKeys = A([ 'detail', 'message', 'title', 'status' ]),
        key = detailKeys.find(k => errors[0][k]);

  return key ? errors.mapBy(key).join(', ') : errors[0];
}

export default Mixin.create({
  successMessageTimeout: 3,
  enableNotify:          true,
  loadingProp:           'working',
  slowRunningThreshold:  500,

  ajaxError (err, user) {
    this.__cancelLongRunningProp();

    let errMsg = err ? err.payload || err.responseText || err.message || err : err;

    if (errMsg && errMsg.errors) {
      errMsg = typeof errMsg.errors[0] === 'string' ? errMsg.errors : searchError(errMsg.errors);
    }

    if (err && !user) {
      Logger.error(err.stack || err);
    }

    this.setProperties({
      [this.get('loadingProp')]:          false,
      [`${this.get('loadingProp')}Slow`]: false,
      errorMessage:                       errMsg
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
      successMessage:                     success
    });

    run.later(() => {
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
      successMessage:                     null
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
      if (this.get(loadingProp)) {
        this.set(`${loadingProp}Slow`, true);
      }
    }, this.get('slowRunningThreshold')));
  }
});
