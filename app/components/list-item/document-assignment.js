import BaseLiComponent from './base';
import { or } from '@ember/object/computed';

export default BaseLiComponent.extend({
  isPendingState: or('model.isLoading', 'model.isSaving', 'model.isReloading'),

  actions: {
    checkBoxMagic () {
      let model = this.get('model');

      model.set('signatureRequired', model.visibleToEmployee ? true : false);
      model.set('effectiveOn', model.visibleToEmployee ? model.effectiveOn : null);
      return;
    }
  }
});
