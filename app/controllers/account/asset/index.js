import Ember from 'ember';

const { Controller, computed, inject } = Ember;

export default Controller.extend({
  application: inject.controller(),
  addingAsset: computed.equal('application.currentPath', 'account.asset.index.new')
});
