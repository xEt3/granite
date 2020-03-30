import Mixin from '@ember/object/mixin';
import { assert } from '@ember/debug';
import { resolve } from 'rsvp';
import { inject as service } from '@ember/service';

export default Mixin.create({
  auth: service(),

  modelDefaults: {},

  async model (params) {
    console.warn('Mixing in the route-abstraction for add is deprecated in favor of extending the granite core route.');

    const modelName = this.get('modelName'),
          defaults = this.get('modelDefaults'),
          getDefaults = this.getModelDefaults;

    let defaultPromise;

    if (getDefaults && typeof getDefaults === 'function') {
      defaultPromise = this.getModelDefaults(params);
    }

    assert('You must specify a modelName.', modelName);

    let resolvedDefaults = await resolve(defaultPromise);
    return await this.store.createRecord(modelName, Object.assign({}, defaults, resolvedDefaults));
  },

  actions: {
    willTransition (transition) {
      var model = this.controller.get('model');

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
  }
});
