import { assert } from '@ember/debug';

export default {
  async model (params) {
    const modelName = this.modelName,
          segmentKey = this.segmentKey;

    assert('You must specify a modelName.', modelName);
    return this.store.find(modelName, params[segmentKey || 'id']);
  },

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
};
