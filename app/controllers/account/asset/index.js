import Ember from 'ember';
import del from 'granite/mixins/controller-abstractions/delete';

const { Controller, computed, inject } = Ember;

export default Controller.extend(del, {
  application: inject.controller(),
  addingAsset: computed.equal('application.currentPath', 'account.asset.index.new'),

  actions: {
    toggleProperty ( prop ) {
      this.toggleProperty(prop);
    }
  }
});
