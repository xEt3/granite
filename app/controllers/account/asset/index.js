import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as controller } from '@ember/controller';
import del from 'granite/mixins/controller-abstractions/delete';

export default Controller.extend(del, {
  application: controller(),
  addingAsset: computed.equal('application.currentPath', 'account.asset.index.new'),

  actions: {
    toggleProperty ( prop ) {
      this.toggleProperty(prop);
    }
  }
});
