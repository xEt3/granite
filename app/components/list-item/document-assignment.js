import BaseLiComponent from './base';
import { or } from '@ember/object/computed';

export default BaseLiComponent.extend({
  isPendingState: or('model.isLoading', 'model.isSaving', 'model.isReloading'),

  actions: {
    checkBoxDisplay () {
      let model = this.get('model');

      if (model.visibleToEmployee) {
        return;
      }
      model.setProperties({
        signatureRequired: false,
        effectiveOn:       null
      });
      return;
    }
  },

  onChange () {
    //noop
  }
});
