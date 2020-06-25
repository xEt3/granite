import Mixin from '@ember/object/mixin';
import { assert } from '@ember/debug';
import { inject as service } from '@ember/service';

export default Mixin.create({
  auth: service(),

  model (params) {
    console.warn('Mixing in the route-abstraction for edit is deprecated in favor of extending the granite core route.'); // eslint-disable-line

    if (this.bypassModelHook) {
      return this._super(...arguments);
    }

    const modelName = this.modelName,
          segmentKey = this.segmentKey;

    assert('You must specify a modelName.', modelName);
    return this.store.find(modelName, params[segmentKey || 'id']);
  },

  actions: {
    willTransition (transition) {
      if (this.auth.isExpired) {
        return true;
      }

      var model = this.controller.get('model'),
          hasChangedAttributes = Object.keys(model.changedAttributes()).length > 0;

      if (hasChangedAttributes && !confirm('Are you sure you want to abandon progress on this page?')) {
        transition.abort();
      } else {
        if (hasChangedAttributes) {
          model.rollbackAttributes();
        }

        return true;
      }
    }
  }
});
