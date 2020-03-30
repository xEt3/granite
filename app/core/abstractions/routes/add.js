import { assert } from '@ember/debug';
import { resolve } from 'rsvp';

export default {
  async model (params) {
    const modelName = this.modelName,
          defaults = this.modelDefaults || {},
          getDefaults = this.getModelDefaults;

    let defaultPromise;

    if (getDefaults && typeof getDefaults === 'function') {
      defaultPromise = getDefaults.call(this, params);
    }

    assert('You must specify a modelName.', modelName);

    let resolvedDefaults = await resolve(defaultPromise);
    return await this.store.createRecord(modelName, Object.assign({}, defaults, resolvedDefaults));
  },

  willTransition (transition) {
    const model = this.controller.get('model');

    if (!model || !model.get('isNew') || this.auth.isExpired) {
      return true;
    }

    if (Object.keys(model.changedAttributes()).length > 0 && !confirm('Are you sure you want to abandon progress on this page?')) {
      transition.abort();
    } else {
      model.destroyRecord();
      return true;
    }
  }
};
